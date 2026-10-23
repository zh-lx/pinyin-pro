# Dictionary removal memory benchmark

`AC.removeDict()` now prunes unused branches and repairs failure pointers.
This benchmark checks node reclamation and measures heap usage during repeated dictionary changes.

## Run

Run these commands from the repository root after installing dependencies:

```sh
node packages/pinyin-pro/scripts/benchmark/ac-removal-memory.js --help
node --test packages/pinyin-pro/scripts/benchmark/ac-removal-memory.smoke.js
node packages/pinyin-pro/scripts/benchmark/ac-removal-memory.js > /tmp/ac-removal-memory-results.jsonl
```

The script loads source through the existing `ts-node` dependency.
Each scenario runs in three independent child processes with `--expose-gc`.
The smoke test uses two cycles with three words per cycle.
The full benchmark uses 100 cycles with 500 six-character words per cycle.

## Implementation

Removal filters each affected node once and clears removed patterns' node references.
It prunes empty branches from their leaves toward the root.
It clears parent and failure references on detached nodes.
If pruning changes the structure, it rebuilds failure pointers across all surviving nodes.

Adding new nodes also rebuilds failure pointers across existing branches.
This supports reintroducing a removed suffix that existing words need as a failure target.
Adding patterns without creating nodes skips that rebuild.
Removal preserves surviving nodes and their pattern order.
Pending build callbacks retain their existing execution behavior.

## Method

Each process uses an independent AC instance.
Warmup uses a separate instance for five cycles. The process releases that instance before measurement.
Every measured cycle builds a dictionary and removes it under the same name.
Input arrays leave the call stack before memory measurement.

- `unique`: Each cycle uses a different first character. Words within a cycle have different second characters.
- `reuse`: Every cycle uses the same 500 words.
- `discard`: Each cycle uses different words. A new AC replaces the instance after removal.
- `retained`: The AC keeps 10,000 other words while temporary dictionaries change.

The retained dictionary contains 50,002 nodes. Its initial construction occurs before the baseline measurement.
The smoke test retains three words instead.

Checkpoints record heap usage before and after GC.
Node counting follows children, parent links, failure links, pattern references, dictionary entries, and queued nodes.
No pending callback participates in this benchmark.
The script checks that temporary words no longer match after removal.
It also checks node, pattern, dictionary, and queue counts.

`released` means the process releases its last AC reference before measurement.
Heap growth uses each process's cycle-zero post-GC measurement as the baseline.
The raw `retainedBytes` field instead uses the earlier warmup baseline.
Pre-GC usage includes temporary allocations from earlier node counts.
Heap totals include Node and the source loader. Small positive or negative deltas reflect runtime and GC noise.

## Baseline

Source revision: `0785234b4dc0fa3ea9f244e3d77703b2df6a9db4`.
The baseline script and report are available at commit `b2ae1ab`.
Raw baseline samples remain in [ac-removal-memory-results.jsonl](./ac-removal-memory-results.jsonl).

| Scenario | Cycles | Reachable nodes | Post-GC heap growth (MiB) |
| --- | ---: | ---: | ---: |
| unique | 10 | 25,011 | 6.71 |
| unique | 50 | 125,051 | 33.98 |
| unique | 100 | 250,101 | 68.06 |
| reuse | 100 | 2,502 | 0.59 |

The baseline has no remaining patterns or dictionary entries at these checkpoints.
Failure pointers can still retain a node after its child edge is detached.

## Fixed results

Environment: Node v24.15.0, Linux x64.
Values are medians from three independent processes.
Raw fixed samples are in [ac-removal-memory-fixed-results.jsonl](./ac-removal-memory-fixed-results.jsonl).
The measured `lib/common/segmentit/index.ts` has this SHA-256:

```text
c2850bf0f720eb8b995c912678c29781dcf8c9df7d7d0482df7629d650051189
```

| Scenario | Cycles | Reachable nodes | Post-GC heap growth (MiB) |
| --- | ---: | ---: | ---: |
| unique | 10 | 1 | -0.41 |
| unique | 50 | 1 | -0.40 |
| unique | 100 | 1 | -0.38 |
| unique | released | 0 | -0.38 |
| reuse | 10 | 1 | -0.14 |
| reuse | 50 | 1 | -0.13 |
| reuse | 100 | 1 | -0.11 |
| reuse | released | 0 | -0.11 |
| discard | 10 | 1 | +0.02 |
| discard | 50 | 1 | +0.02 |
| discard | 100 | 1 | +0.04 |
| discard | released | 0 | +0.04 |
| retained | 10 | 50,002 | -0.07 |
| retained | 50 | 50,002 | -0.07 |
| retained | 100 | 50,002 | -0.05 |
| retained | released | 0 | -17.35 |

Every sample has the expected node count at every checkpoint.
The first three scenarios retain only the root after removal.
The retained scenario keeps exactly its original 50,002 nodes.
The measurements show no sustained heap growth from temporary dictionaries.
These synthetic results do not predict a specific production memory limit.

## Structural update cost

The table reports cumulative times for 100 cycles. Each cycle handles 500 temporary words.
Timing covers `build()` and `removeDict()` calls. It excludes input generation, assertions, explicit GC, and node counting.

| Scenario | Total build time (ms) | Total removal time (ms) |
| --- | ---: | ---: |
| unique | 48.53 | 39.96 |
| reuse | 46.38 | 40.49 |
| discard | 45.34 | 39.37 |
| retained | 512.29 | 474.78 |

With 10,000 retained words, mean build and removal costs are about five milliseconds per batch in this run.
A structural update traverses surviving nodes to repair failure pointers.
This adds CPU cost when dictionaries change. Read-only matching does not perform that traversal.
Large retained dictionaries can increase update latency and temporary queue memory.
The baseline measurement does not record operation timings, so these numbers are not a before-and-after speed comparison.

## Regression coverage

Tests cover repeated removal, shared prefixes, equal-priority patterns, suffix chains, dictionary reuse, queued nodes, and supplementary Unicode.
They also verify pending callback behavior and removal of stale pattern references.
The failure-reference benchmark now checks that detached nodes have no parent or failure links.
It verifies that surviving nodes no longer reference the removed suffix.
