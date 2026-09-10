const { spawnSync } = require("node:child_process");
const path = require("node:path");

const distPath = process.env.PINYIN_PRO_DIST || path.resolve(__dirname, "../../dist/index.js");
const samples = Number(process.env.BENCH_SAMPLES || 5);

const EMPTY_SCENARIOS = [
  { name: "empty-512", textLength: 512, queryLength: 512 },
  { name: "empty-1024", textLength: 1024, queryLength: 1024 },
  { name: "empty-2048", textLength: 2048, queryLength: 2048 },
];

const POPULATED_SCENARIOS = [
  { name: "populated-512", textLength: 512, queryLength: 512 },
  { name: "populated-1024", textLength: 1024, queryLength: 1024 },
  { name: "populated-2048", textLength: 2048, queryLength: 2048 },
];

const BASELINE = `
  require(process.env.PINYIN_PRO_DIST);
  if (global.gc) global.gc();
  console.log(JSON.stringify({
    maxRssMiB: process.resourceUsage().maxRSS / 1024,
  }));
`;

const EMPTY_CASE = `
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

// populated-state: query = "h" * (n-1) + "z"
// "汉" → han, first letter "h" matches.
// late "z" fails at the very end, so DP paths grow to length n-1
// before the final failure forces a full scan.
const POPULATED_CASE = `
  const { match } = require(process.env.PINYIN_PRO_DIST);
  const n = Number(process.env.TEXT_LENGTH);
  const text = "汉".repeat(n);
  const query = "h".repeat(n - 1) + "z";
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
console.log("scenario     | median(ms) | maxRSS(MiB) | delta(MiB)");
console.log("-------------|------------|-------------|-----------");

function printResults(name, results) {
  const elapsedMs = median(results.map((s) => s.elapsedMs));
  const maxRssMiB = median(results.map((s) => s.maxRssMiB));
  console.log(
    `${name.padEnd(13)}| ${elapsedMs.toFixed(3).padStart(10)} | ${maxRssMiB.toFixed(2).padStart(11)} | ${(maxRssMiB - baselineRss).toFixed(2).padStart(9)}`,
  );
}

for (const scenario of EMPTY_SCENARIOS) {
  const results = sample(EMPTY_CASE, {
    TEXT_LENGTH: String(scenario.textLength),
    QUERY_LENGTH: String(scenario.queryLength),
  });
  printResults(scenario.name, results);
}

for (const scenario of POPULATED_SCENARIOS) {
  const results = sample(POPULATED_CASE, {
    TEXT_LENGTH: String(scenario.textLength),
    QUERY_LENGTH: String(scenario.queryLength),
  });
  printResults(scenario.name, results);
}
