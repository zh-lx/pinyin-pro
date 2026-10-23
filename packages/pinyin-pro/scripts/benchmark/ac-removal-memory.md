# Dictionary removal memory benchmark

`AC.removeDict()` removes patterns but retains Trie nodes.
This benchmark measures retained nodes and heap growth while dictionaries change.
It does not change the package implementation.

## Run

Run these commands from the repository root after installing dependencies:

```sh
node packages/pinyin-pro/scripts/benchmark/ac-removal-memory.js --help
node --test packages/pinyin-pro/scripts/benchmark/ac-removal-memory.smoke.js
node packages/pinyin-pro/scripts/benchmark/ac-removal-memory.js > /tmp/ac-removal-memory-results.jsonl
```

The script loads the source `AC` class through the existing `ts-node` dependency.
Each scenario runs in three separate child processes with `--expose-gc`.
The smoke test uses two cycles with three words per cycle.
The full benchmark uses 100 cycles with 500 words per cycle.

## Method

Each process creates an independent AC instance.
Warmup uses a separate instance for five cycles. The process releases that instance before measurement.
Each measured cycle builds 500 six-character words and removes their dictionary.
All cycles use the same dictionary name.
The input arrays leave the call stack before measurement.

- `unique`: Each cycle uses a different first character. Words within a cycle have different second characters.
- `reuse`: Every cycle uses the same 500 words.
- `discard`: Each cycle uses different words. A new AC replaces the old instance after removal.

Each checkpoint records heap usage before GC and after GC.
Node counting follows `children`, `parent`, `fail`, pattern `node` references, dictionary entries, and queued nodes.
The benchmark sets no pending build callback.
It checks that pattern counts, dictionary counts, and queue counts are zero after removal.
Each cycle also checks that a removed word no longer matches.

`released` means the process releases its last AC reference before measurement.
Heap growth uses each process's cycle-zero post-GC heap as its baseline.
The raw `retainedBytes` field instead uses the initial warmup baseline, before the cycle-zero checkpoint.
Small differences between these baselines reflect runtime and GC noise.
Pre-GC values include temporary allocations from earlier node counts.
Heap totals include Node and the source loader. Post-GC growth is the relevant retention measurement.

## Results

Source revision: `0785234b4dc0fa3ea9f244e3d77703b2df6a9db4`.
Environment: Node v24.15.0, Linux x64.
Values below are medians from three independent processes.
Raw samples are in [ac-removal-memory-results.jsonl](./ac-removal-memory-results.jsonl).

| Scenario | Cycles | Reachable nodes | Heap before GC (MiB) | Heap after GC (MiB) | Heap growth (MiB) |
| --- | ---: | ---: | ---: | ---: | ---: |
| unique | 0 | 1 | 41.54 | 41.39 | +0.00 |
| unique | 1 | 2,502 | 42.74 | 42.11 | +0.71 |
| unique | 10 | 25,011 | 55.69 | 48.11 | +6.71 |
| unique | 25 | 62,526 | 59.22 | 58.33 | +16.94 |
| unique | 50 | 125,051 | 78.79 | 75.38 | +33.98 |
| unique | 100 | 250,101 | 115.35 | 109.45 | +68.06 |
| unique | released | 0 | 134.63 | 41.30 | -0.09 |
| reuse | 0 | 1 | 41.55 | 41.38 | +0.00 |
| reuse | 1 | 2,502 | 42.73 | 42.09 | +0.70 |
| reuse | 10 | 2,502 | 48.06 | 41.98 | +0.58 |
| reuse | 25 | 2,502 | 50.52 | 41.98 | +0.58 |
| reuse | 50 | 2,502 | 54.46 | 41.99 | +0.59 |
| reuse | 100 | 2,502 | 48.50 | 41.99 | +0.59 |
| reuse | released | 0 | 43.98 | 41.30 | -0.09 |
| discard | 0 | 1 | 41.55 | 41.25 | +0.00 |
| discard | 1 | 1 | 42.67 | 41.95 | +0.70 |
| discard | 10 | 1 | 53.55 | 41.97 | +0.73 |
| discard | 25 | 1 | 45.98 | 41.97 | +0.73 |
| discard | 50 | 1 | 71.27 | 41.98 | +0.73 |
| discard | 100 | 1 | 69.83 | 41.98 | +0.73 |
| discard | released | 0 | 41.99 | 41.30 | +0.05 |

All three samples produce identical node counts.
In this workload, each unique batch retains 2,501 additional nodes after removal and GC.
After 100 cycles, 50,000 different words leave 250,101 reachable nodes.
Reusing words keeps the node count constant. Releasing the AC returns heap usage close to baseline.
These results establish retention for this synthetic workload. They do not predict a specific production growth rate.

The script asserts the current node counts to detect measurement errors.
A future reclamation change must update those assertions and the failure-reference demonstration.

## Failure references

A separate experiment builds `甲乙` and `乙` under different dictionary names.
After removing the second dictionary, the `甲乙` node still has a failure pointer to the `乙` node.
The experiment detaches the root's `乙` child edge.
Traversal through children then finds three nodes. Traversal through all references still finds four nodes.
This experiment only changes its temporary instance.

Removing child edges alone therefore does not guarantee reclamation.
A future implementation must repair failure pointers or rebuild them from retained patterns.
The current `buildFailPointer()` only visits queued nodes. Calling it after removal does not rebuild every remaining failure pointer.

## Follow-up work

First evaluate rebuilding the Trie from active patterns.
Rebuilding must update pattern `node` references and keep dictionary indexes consistent.
It must preserve priority order and equal-priority tie behavior.
Measure rebuild latency and peak memory with a large retained dictionary.
A deletion threshold could reduce rebuild frequency.

Test shared prefixes, suffix words, cross-dictionary failure pointers, duplicate words, dictionary reuse, and pending build callbacks.
This benchmark provides evidence for that work. It does not implement node reclamation.
