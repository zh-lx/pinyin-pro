const path = require('node:path');
const { createRequire } = require('node:module');
const { spawnSync } = require('node:child_process');
const assert = require('node:assert/strict');
const repo = path.resolve(__dirname, '../../../..');
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log('Usage: node packages/pinyin-pro/scripts/benchmark/ac-removal-memory.js [--smoke]');
  process.exit(0);
}
const smoke = process.argv.includes('--smoke');
const checkpoints = smoke ? [0, 1, 2] : [0, 1, 10, 25, 50, 100];
const batchSize = smoke ? 3 : 500;
const modes = ['unique', 'reuse', 'discard'];
if (!process.argv.includes('--child')) {
  const samples = smoke ? 1 : 3;
  for (const mode of modes) {
    for (let sample = 1; sample <= samples; sample++) {
      const args = [__filename, '--child', mode, ...(smoke ? ['--smoke'] : [])];
      const result = spawnSync(process.execPath, ['--expose-gc', ...args], { encoding: 'utf8' });
      if (result.status !== 0) throw new Error(result.stderr || result.stdout);
      for (const line of result.stdout.trim().split('\n')) {
        console.log(JSON.stringify({ sample, ...JSON.parse(line) }));
      }
    }
  }
  process.exit(0);
}
const mode = process.argv[process.argv.indexOf('--child') + 1];
const requireRepo = createRequire(path.join(repo, 'package.json'));
requireRepo('ts-node').register({ project: path.join(repo, 'packages/pinyin-pro/scripts/tsconfig.json'), transpileOnly: true });
// Resolve source aliases only inside the isolated benchmark process.
const Module = require('node:module');
const resolve = Module._resolveFilename;
Module._resolveFilename = function (name, ...args) {
  return resolve.call(this, name.startsWith('@/') ? path.join(repo, 'packages/pinyin-pro/lib', name.slice(2)) : name, ...args);
};
const { AC } = require(path.join(repo, 'packages/pinyin-pro/lib/common/segmentit/index.ts'));
const pattern = (zh, dict = 'temporary') => ({ zh, pinyin: '', probability: 1, length: [...zh].length, priority: 1, dict });
function count(ac) {
  if (!ac) return { childNodes: 0, reachableNodes: 0, patterns: 0, dictionaries: 0, queuedNodes: 0 };
  function visit(seeds, all) {
    const seen = new Set();
    const stack = [...seeds];
    while (stack.length) {
      const node = stack.pop();
      if (!node || seen.has(node)) continue;
      seen.add(node);
      stack.push(...node.children.values());
      if (all) {
        stack.push(node.parent, node.fail);
        for (const item of node.patterns) stack.push(item.node);
      }
    }
    return seen;
  }
  const queued = ac.queues.flat();
  const seeds = [ac.root, ...queued];
  for (const entries of ac.dictMap.values()) for (const item of entries) seeds.push(item.node);
  const reachable = visit(seeds, true);
  return {
    childNodes: visit([ac.root], false).size,
    reachableNodes: reachable.size,
    patterns: [...reachable].reduce((sum, node) => sum + node.patterns.length, 0),
    dictionaries: ac.dictMap.size,
    queuedNodes: queued.length,
  };
}
// Keep input arrays out of the measurement call stack.
function cycle(ac, index) {
  const prefix = String.fromCharCode(0x4e00 + index);
  const patterns = Array.from({ length: batchSize }, (_, i) => pattern(prefix + String.fromCharCode(0x6000 + i) + '测试词条'));
  ac.build(patterns);
  ac.removeDict('temporary');
  assert.equal(ac.dictMap.size, 0);
  assert.equal(ac.match(patterns[0].zh, 'off').length, 0);
}
function warmup() {
  const ac = new AC();
  for (let i = 0; i < 5; i++) cycle(ac, 0);
  count(ac);
}
function checkFailReference() {
  const ac = new AC();
  ac.build([pattern('甲乙', 'keep'), pattern('乙', 'remove')]);
  ac.removeDict('remove');
  const removed = ac.root.children.get('乙');
  const kept = ac.root.children.get('甲').children.get('乙');
  assert.equal(kept.fail, removed);
  // This detached edge demonstrates why pruning must also repair failure pointers.
  ac.root.children.delete('乙');
  const stats = count(ac);
  assert.equal(stats.childNodes, 3);
  assert.equal(stats.reachableNodes, 4);
  return stats;
}
const failReference = checkFailReference();
warmup();
let ac = new AC();
global.gc();
const baseline = process.memoryUsage().heapUsed;
function record(cycles) {
  const heapBeforeGc = process.memoryUsage().heapUsed;
  global.gc();
  const heapAfterGc = process.memoryUsage().heapUsed;
  const stats = count(ac);
  assert.equal(stats.patterns, 0);
  assert.equal(stats.dictionaries, 0);
  assert.equal(stats.queuedNodes, 0);
  if (typeof cycles === 'number') {
    const batches = mode === 'reuse' && cycles ? 1 : cycles;
    const expected = mode === 'discard' ? 1 : 1 + batches * (1 + batchSize * 5);
    assert.equal(stats.childNodes, expected);
    assert.equal(stats.reachableNodes, expected);
  }
  console.log(JSON.stringify({ mode, cycles, batchSize, node: process.version, ...stats, heapBeforeGc, heapAfterGc, retainedBytes: heapAfterGc - baseline, failReference }));
}
record(0);
for (let i = 1; i <= checkpoints.at(-1); i++) {
  cycle(ac, mode === 'reuse' ? 0 : i);
  if (mode === 'discard') ac = new AC();
  if (checkpoints.includes(i)) record(i);
}
ac = null;
record('released');
