const { spawnSync } = require("node:child_process");
const path = require("node:path");

const distPath = path.resolve(__dirname, "../../dist/index.js");
const samples = Number(process.env.BENCH_SAMPLES || 5);

const SCENARIOS = [
  { name: "512x512", textLength: 512, queryLength: 512 },
  { name: "1024x1024", textLength: 1024, queryLength: 1024 },
  { name: "2048x2048", textLength: 2048, queryLength: 2048 },
];

const BASELINE = `
  require(process.env.PINYIN_PRO_DIST);
  if (global.gc) global.gc();
  console.log(JSON.stringify({
    maxRssMiB: process.resourceUsage().maxRSS / 1024,
  }));
`;

const CASE = `
  const { match } = require(process.env.PINYIN_PRO_DIST);
  const text = "汉".repeat(Number(process.env.TEXT_LENGTH));
  const query = "z".repeat(Number(process.env.QUERY_LENGTH));
  const start = process.hrtime.bigint();
  match(text, query, { precision: "first" });
  const elapsedMs = Number(process.hrtime.bigint() - start) / 1e6;
  if (global.gc) global.gc();
  console.log(JSON.stringify({
    elapsedMs,
    maxRssMiB: process.resourceUsage().maxRSS / 1024,
  }));
`;

function median(values) {
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.floor(sorted.length / 2)];
}

function runChild(code, extraEnv = {}) {
  const result = spawnSync(process.execPath, ["--expose-gc", "-e", code], {
    encoding: "utf8",
    env: {
      ...process.env,
      ...extraEnv,
      PINYIN_PRO_DIST: distPath,
    },
  });

  if (result.status !== 0) {
    throw new Error(
      result.stderr || `benchmark child exited with ${result.status}`,
    );
  }

  const line = result.stdout.trim().split("\n").at(-1);
  return JSON.parse(line);
}

function sample(code, extraEnv = {}) {
  const results = [];
  for (let i = 0; i < samples; i++) {
    results.push(runChild(code, extraEnv));
  }
  return results;
}

const baselineSamples = sample(BASELINE);
const baselineRss = median(
  baselineSamples.map((sample) => sample.maxRssMiB),
);

console.log(`Node ${process.version}`);
console.log(`fresh processes per case: ${samples}`);
console.log(`baseline maxRSS: ${baselineRss.toFixed(2)} MiB\n`);
console.log("scenario   | median(ms) | maxRSS(MiB) | delta(MiB)");
console.log("-----------|------------|-------------|-----------");

for (const scenario of SCENARIOS) {
  const results = sample(CASE, {
    TEXT_LENGTH: String(scenario.textLength),
    QUERY_LENGTH: String(scenario.queryLength),
  });
  const elapsedMs = median(results.map((sample) => sample.elapsedMs));
  const maxRssMiB = median(results.map((sample) => sample.maxRssMiB));
  console.log(
    `${scenario.name.padEnd(11)}| ${elapsedMs.toFixed(3).padStart(10)} | ${maxRssMiB.toFixed(2).padStart(11)} | ${(maxRssMiB - baselineRss).toFixed(2).padStart(9)}`,
  );
}
