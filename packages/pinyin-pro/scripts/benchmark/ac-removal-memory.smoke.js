const assert = require("node:assert/strict");
const path = require("node:path");
const { spawnSync } = require("node:child_process");
const { test } = require("node:test");

const script = path.join(__dirname, "ac-removal-memory.js");

test("prints benchmark usage", () => {
  const result = spawnSync(process.execPath, [script, "--help"], { encoding: "utf8" });
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Usage:.*ac-removal-memory/);
});

test("measures isolated instances and validates failure references", () => {
  const result = spawnSync(process.execPath, [script, "--smoke"], {
    encoding: "utf8",
    timeout: 60000,
  });
  assert.equal(result.status, 0, result.stderr);
  const rows = result.stdout.trim().split("\n").map(JSON.parse);
  assert.equal(rows.length, 16);
  for (const mode of ["unique", "reuse", "discard", "retained"]) {
    const samples = rows.filter(row => row.mode === mode);
    assert.deepEqual(samples.map(row => row.cycles), [0, 1, 2, "released"]);
    for (const row of samples) {
      assert.equal(row.patterns, mode === "retained" && row.cycles !== "released" ? 3 : 0);
      assert.equal(row.dictionaries, mode === "retained" && row.cycles !== "released" ? 1 : 0);
      assert.equal(row.queuedNodes, 0);
      assert.equal(row.childNodes, row.reachableNodes);
      assert.equal(row.failReference.childNodes, 3);
      assert.equal(row.failReference.reachableNodes, 3);
      assert.ok(Number.isFinite(row.heapBeforeGc));
      assert.ok(Number.isFinite(row.heapAfterGc));
    }
    assert.equal(samples.at(-1).reachableNodes, 0);
  }
  const final = mode => rows.find(row => row.mode === mode && row.cycles === 2);
  assert.equal(final("unique").reachableNodes, 1);
  assert.equal(final("reuse").reachableNodes, 1);
  assert.equal(final("retained").reachableNodes, 17);
  assert.equal(final("discard").reachableNodes, 1);
});
