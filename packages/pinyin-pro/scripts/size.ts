import path from "path";
import fs from "fs";
import zlib from "zlib";
import ts from "typescript";
import { rollup, Plugin, OutputChunk } from "rollup";
import alias from "@rollup/plugin-alias";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import { terser } from "rollup-plugin-terser";

const root = path.resolve(__dirname, "..");
const packages = {
  "pinyin-pro": {
    lib: path.join(root, "lib"),
    tsconfig: path.join(root, "tsconfig.json"),
  },
} as const;
const apis = [
  "pinyin",
  "segment",
  "match",
  "convert",
  "html",
  "polyphonic",
] as const;
const extensions = [".mjs", ".js", ".json", ".node", ".ts"];

type PackageName = keyof typeof packages;
type ApiName = (typeof apis)[number];

interface SizeResult {
  bytes: number;
  gzip: number;
}

interface ApiSizes {
  esm: SizeResult;
}

type PackageResults = Record<ApiName, ApiSizes>;
type SizeResults = Record<PackageName, PackageResults>;

interface OverallSizes {
  umd: SizeResult;
  esm: SizeResult;
}

function format(bytes: number): string {
  return `${(bytes / 1024).toFixed(2)} KB`;
}

function typescript(): Plugin {
  return {
    name: "typescript-strip",
    transform(code: string, id: string) {
      if (!id.endsWith(".ts")) return null;
      const result = ts.transpileModule(code, {
        compilerOptions: {
          target: ts.ScriptTarget.ES2018,
          module: ts.ModuleKind.ESNext,
          importsNotUsedAsValues: ts.ImportsNotUsedAsValues.Remove,
          sourceMap: false,
        },
        fileName: id,
      });
      return { code: result.outputText, map: null };
    },
  };
}

function createSizeEntryPlugin(input: string): Plugin {
  return {
    name: "size-entry",
    resolveId(id: string) {
      return id === "size-entry" ? "\0size-entry" : null;
    },
    load(id: string) {
      return id === "\0size-entry" ? input : null;
    },
  };
}

function plugins(pkg: PackageName, input: string, minify: boolean): Plugin[] {
  const config = packages[pkg];
  const rollupPlugins: Plugin[] = [
    createSizeEntryPlugin(input),
    alias({
      entries: [{ find: "@", replacement: config.lib }],
    }),
    nodeResolve({ extensions }),
    typescript(),
    commonjs(),
    json(),
  ];
  if (minify) {
    rollupPlugins.push(terser());
  }
  return rollupPlugins;
}

async function measure(
  pkg: PackageName,
  api: ApiName,
  minify: boolean,
): Promise<SizeResult> {
  const dist = path.join(root, "dist/esm/index.mjs");
  if (!fs.existsSync(dist)) {
    throw new Error(`Missing build output: ${dist}. Run pnpm build first.`);
  }
  const input = `export { ${api} } from ${JSON.stringify(dist)};`;
  const bundle = await rollup({
    input: "size-entry",
    treeshake: true,
    plugins: plugins(pkg, input, minify),
  });
  const generated = await bundle.generate({ format: "es" });
  const chunks = generated.output.filter(
    (item): item is OutputChunk => item.type === "chunk",
  );
  const code = chunks.map((item) => item.code).join("");
  await bundle.close();
  return {
    bytes: Buffer.byteLength(code),
    gzip: zlib.gzipSync(code, { level: 9 }).length,
  };
}

function measureDirectory(directory: string): SizeResult {
  const files: string[] = [];
  function collect(current: string): void {
    fs.readdirSync(current, { withFileTypes: true })
      .sort((a, b) => a.name.localeCompare(b.name))
      .forEach((entry) => {
        const file = path.join(current, entry.name);
        if (entry.isDirectory()) {
          collect(file);
        } else if (file.endsWith(".mjs")) {
          files.push(file);
        }
      });
  }
  collect(directory);
  files.sort();
  const code = Buffer.concat(files.map((file) => fs.readFileSync(file)));
  return {
    bytes: code.length,
    gzip: zlib.gzipSync(code, { level: 9 }).length,
  };
}

function measureFile(file: string): SizeResult {
  if (!fs.existsSync(file)) {
    throw new Error(`Missing build output: ${file}. Run pnpm build first.`);
  }
  const code = fs.readFileSync(file);
  return {
    bytes: code.length,
    gzip: zlib.gzipSync(code, { level: 9 }).length,
  };
}

function renderSize(size: SizeResult): string {
  return `${format(size.bytes)} (gzip ${format(size.gzip)})`;
}

function renderRows(
  packageResults: PackageResults,
  overall: OverallSizes,
  totalLabel: string,
): string[] {
  const rows = apis.map((api, index) => {
    const umd =
      index === 0
        ? `<td rowspan="${apis.length + 1}">${renderSize(overall.umd)}</td>`
        : "";
    return `    <tr><td>${api}</td><td>${renderSize(packageResults[api].esm)}</td>${umd}</tr>`;
  });
  rows.push(
    `    <tr><td>${totalLabel}</td><td>${renderSize(overall.esm)}</td></tr>`,
  );
  return rows;
}

function renderTable(results: SizeResults, overall: OverallSizes): string {
  const packageResults = results["pinyin-pro"];
  return [
    "### 📦 API Size",
    "",
    "以下数据由 `pnpm size` 自动生成。ESM 各 API 为独立打包并开启 Tree Shaking 后的压缩体积；UMD 不支持按 API Tree Shaking，展示完整产物体积。括号内为对应产物 gzip 后的体积。",
    "",
    "<table>",
    "    <thead>",
    "        <tr>",
    "            <th>API</th>",
    "            <th>ESM</th>",
    "            <th>UMD</th>",
    "        </tr>",
    "    </thead>",
    "    <tbody>",
    ...renderRows(packageResults, overall, "总体积"),
    "    </tbody>",
    "</table>",
    "",
  ].join("\n");
}

function renderGuidePage(
  results: SizeResults,
  overall: OverallSizes,
  language: "zh" | "en",
): string {
  const packageResults = results["pinyin-pro"];
  const isEnglish = language === "en";
  return [
    "# API Size",
    "",
    isEnglish
      ? "The following data is automatically generated by `pnpm size`. ESM API sizes are measured after independent bundling and Tree Shaking; UMD does not support API-level Tree Shaking, so its full artifact size is shown. Gzip sizes are shown in parentheses."
      : "以下数据由 `pnpm size` 自动生成。ESM 各 API 为独立打包并开启 Tree Shaking 后的压缩体积；UMD 不支持按 API Tree Shaking，展示完整产物体积。括号内为对应产物 gzip 后的体积。",
    "",
    "<table>",
    "    <thead>",
    "        <tr>",
    "            <th>API</th>",
    "            <th>ESM</th>",
    "            <th>UMD</th>",
    "        </tr>",
    "    </thead>",
    "    <tbody>",
    ...renderRows(packageResults, overall, isEnglish ? "Total" : "总体积"),
    "    </tbody>",
    "</table>",
    "",
  ].join("\n");
}

function updateReadme(results: SizeResults, overall: OverallSizes): void {
  const readme = path.join(root, "README.md");
  const content = fs.readFileSync(readme, "utf8");
  const section = renderTable(results, overall);
  const sectionPattern = /### 📦 API Size[\s\S]*?(?=\n### 📠 反馈)/;
  if (!sectionPattern.test(content)) {
    throw new Error(`Could not find API size section in ${readme}`);
  }
  fs.writeFileSync(readme, content.replace(sectionPattern, section), "utf8");
  console.log(`Updated ${readme}`);
}

function updateGuidePages(results: SizeResults, overall: OverallSizes): void {
  const pages: Array<{ file: string; language: "zh" | "en" }> = [
    {
      file: path.resolve(root, "../docs/zh/docs/guide/api-size.md"),
      language: "zh",
    },
    {
      file: path.resolve(root, "../docs/en/docs/guide/api-size.md"),
      language: "en",
    },
  ];
  for (const page of pages) {
    fs.writeFileSync(
      page.file,
      renderGuidePage(results, overall, page.language),
      "utf8",
    );
    console.log(`Updated ${page.file}`);
  }
}

async function main(): Promise<void> {
  const results = {
    "pinyin-pro": {} as PackageResults,
  } as SizeResults;
  for (const pkg of Object.keys(packages) as PackageName[]) {
    console.log(`\n${pkg}`);
    results[pkg] = {} as PackageResults;
    for (const api of apis) {
      const esm = await measure(pkg, api, true);
      results[pkg][api] = { esm };
      console.log(`${api}\tESM ${renderSize(esm)}`);
    }
  }
  const overall: OverallSizes = {
    umd: measureFile(path.join(root, "dist/index.js")),
    esm: measureDirectory(path.join(root, "dist/esm")),
  };
  updateReadme(results, overall);
  updateGuidePages(results, overall);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
