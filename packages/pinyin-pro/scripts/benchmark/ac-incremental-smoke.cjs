const assert = require("node:assert/strict");
const path = require("node:path");
const { execFileSync } = require("node:child_process");

if (process.argv.includes("--help") || process.argv.includes("-h")) {
  console.log("Usage: node scripts/benchmark/ac-incremental-smoke.cjs BASE_SHA HEAD_SHA");
} else {
  const [base, head] = process.argv.slice(2);
  assert(base && head, "BASE_SHA and HEAD_SHA are required. Use --help.");
  const output = execFileSync(process.execPath, [
    path.join(__dirname, "ac-incremental.cjs"), base, head, "--smoke",
  ], { encoding: "utf8" });
  const result = JSON.parse(output);
  assert.equal(result.smoke, true);
  assert.equal(result.samples.length, 3);
  for (const sample of result.samples) {
    assert.equal(sample.words, 3);
    assert.equal(sample.nodesBefore, 7);
    assert.equal(sample.increments.length, 36);
    assert(sample.initial.heapMiB > 0);
    assert(sample.increments.every(value => Number.isFinite(value.ms) && value.ms >= 0));
  }
  console.log("AC benchmark smoke test passes.");
}
