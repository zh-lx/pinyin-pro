const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { execFileSync } = require("node:child_process");
const assert = require("node:assert/strict");

const make = (zh) => ({ zh, pinyin: zh, probability: 1, length: Array.from(zh).length, priority: 1, dict: "bench" });
const median = (values) => [...values].sort((a, b) => a - b)[Math.floor(values.length / 2)];

function collect() {
  for (let i = 0; i < 3; i++) global.gc();
  const { heapUsed, rss } = process.memoryUsage();
  return { heapMiB: heapUsed / 1048576, rssMiB: rss / 1048576 };
}

function fullRebuild(ac) {
  let queue = [ac.root];
  while (queue.length) {
    const next = [];
    for (const parent of queue) {
      for (const [key, node] of parent.children) {
        let fail = parent.fail;
        while (fail && !fail.children.has(key)) fail = fail.fail;
        node.fail = fail ? fail.children.get(key) : ac.root;
        next.push(node);
      }
    }
    queue = next;
  }
  ac.queues = [];
}

function worker(directory, dataset, mode, dictionary) {
  const { AC, PatternsNormal } = require(path.join(directory, "common/segmentit/index.js"));
  const patterns = dataset === "normal" ? PatternsNormal.map(p => ({ ...p })) : Object.keys(require(dictionary)).map(make);
  const before = collect();
  const ac = new AC();
  const start = performance.now();
  ac.build(patterns);
  const buildMs = performance.now() - start;
  const after = collect();
  const initial = { buildMs, ...after, heapDeltaMiB: after.heapMiB - before.heapMiB, rssDeltaMiB: after.rssMiB - before.rssMiB };
  const increments = [];
  // Each insertion creates a new two-character path with a common final character.
  for (const key of ["的", "中", "人"]) {
    for (let i = 0; i < 12; i++) {
      const zh = String.fromCodePoint(0x30000 + increments.length) + key;
      assert(!ac.root.children.has(Array.from(zh)[0]));
      const pattern = make(zh);
      const t = performance.now();
      if (mode === "full") {
        ac.buildTrie([pattern]);
        fullRebuild(ac);
      } else {
        ac.build([pattern]);
      }
      const ms = performance.now() - t;
      const bucket = ac.nodesByKey?.get(key) || [];
      const scanned = Math.max(0, bucket.length - 1);
      const candidates = bucket.filter(n => n.depth > 2).length;
      assert(ac.match(zh, "off").some(p => p.zh === zh));
      increments.push({ key, ms, scanned, candidates });
    }
  }
  let nodes = 0;
  const stack = [ac.root];
  while (stack.length) {
    const node = stack.pop();
    nodes++;
    for (const child of node.children.values()) stack.push(child);
  }
  return { dataset, mode, words: patterns.length, nodesBefore: nodes - 72, initial, increments };
}

function main() {
  if (process.argv[2] === "--worker") {
    console.log(JSON.stringify(worker(...process.argv.slice(3))));
    return;
  }
  if (process.argv.includes("--help") || process.argv.includes("-h")) {
    console.log("Usage: node scripts/benchmark/ac-incremental.cjs BASE_SHA HEAD_SHA [ROUNDS=7]\nUse --smoke for one round with a small dictionary. Output: JSON.");
    return;
  }
  const smoke = process.argv.includes("--smoke");
  const args = process.argv.slice(2).filter(a => a !== "--smoke");
  const [base, head, count = "7"] = args;
  if (!base || !head) throw new Error("BASE_SHA and HEAD_SHA are required. Use --help.");
  const rounds = smoke ? 1 : Number(count);
  assert(Number.isInteger(rounds) && rounds > 0);
  const repo = execFileSync("git", ["rev-parse", "--show-toplevel"], { encoding: "utf8" }).trim();
  const git = (...argv) => execFileSync("git", argv, { cwd: repo, encoding: "utf8", maxBuffer: 32 * 1024 * 1024 });
  const refs = { base: git("rev-parse", "--verify", `${base}^{commit}`).trim(), head: git("rev-parse", "--verify", `${head}^{commit}`).trim() };
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), "pinyin-ac-"));
  try {
    const ts = require("typescript");
    for (const [name, sha] of Object.entries(refs)) {
      const prefix = "packages/pinyin-pro/lib/";
      const files = git("ls-tree", "-r", "--name-only", sha, prefix).trim().split("\n").filter(f => f.endsWith(".ts"));
      for (const file of files) {
        const output = path.join(temp, name, file.slice(prefix.length).replace(/\.ts$/, ".js"));
        fs.mkdirSync(path.dirname(output), { recursive: true });
        const source = git("show", `${sha}:${file}`).replace(/(["'])@\//g, (_, quote) => quote + path.join(temp, name) + "/");
        fs.writeFileSync(output, ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2018, module: ts.ModuleKind.CommonJS } }).outputText);
      }
    }
    const dictionary = path.join(temp, "complete.json");
    const dataPath = "packages/data/json/complete.json";
    assert.equal(git("rev-parse", `${refs.base}:${dataPath}`).trim(), git("rev-parse", `${refs.head}:${dataPath}`).trim());
    fs.writeFileSync(dictionary, smoke ? JSON.stringify({ "甲乙丙": "", "乙丙": "", "丙": "" }) : git("show", `${refs.head}:${dataPath}`));
    const samples = [];
    for (let round = 0; round < rounds; round++) {
      for (const dataset of smoke ? ["complete"] : ["normal", "complete"]) {
        for (const mode of round % 2 ? ["full", "head", "base"] : ["base", "head", "full"]) {
          const dir = path.join(temp, mode === "head" ? "head" : "base");
          const output = execFileSync(process.execPath, ["--expose-gc", __filename, "--worker", dir, dataset, mode, dictionary], { encoding: "utf8" });
          samples.push({ round, ...JSON.parse(output) });
        }
      }
    }
    const summary = [];
    for (const dataset of [...new Set(samples.map(s => s.dataset))]) {
      for (const mode of ["base", "head", "full"]) {
        const group = samples.filter(s => s.dataset === dataset && s.mode === mode);
        const initial = Object.fromEntries(Object.keys(group[0].initial).map(k => [k, median(group.map(s => s.initial[k]))]));
        const increments = ["的", "中", "人"].map(key => {
          const values = group.flatMap(s => s.increments.filter(p => p.key === key));
          return { key, medianMs: median(values.map(v => v.ms)), maxMs: Math.max(...values.map(v => v.ms)), scanned: values[0].scanned, candidates: values[0].candidates };
        });
        summary.push({ dataset, mode, words: group[0].words, nodes: group[0].nodesBefore, initial, increments });
      }
    }
    console.log(JSON.stringify({ node: process.version, platform: `${os.platform()} ${os.arch()}`, cpu: os.cpus()[0].model, refs, rounds, smoke, summary, samples }, null, 2));
  } finally {
    fs.rmSync(temp, { recursive: true, force: true });
  }
}
main();
