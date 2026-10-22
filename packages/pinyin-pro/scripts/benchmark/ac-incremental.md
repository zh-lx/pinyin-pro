# Incremental AC measurements

This benchmark compares fixed source revisions in fresh Node processes.
It measures AC construction, retained memory, and incremental insertion.

## Run

Run these commands from the repository root.

```sh
node packages/pinyin-pro/scripts/benchmark/ac-incremental-smoke.cjs 0785234b 291e4cf
node packages/pinyin-pro/scripts/benchmark/ac-incremental.cjs 0785234b 291e4cf 7 > ac-results.json
```

Both scripts support `--help`.
The benchmark writes raw samples and summary statistics as JSON.
The smoke test uses three patterns and checks all three modes.

## Method

- Base: `0785234b4dc0fa3ea9f244e3d77703b2df6a9db4`.
- Head: `291e4cf7fb0f0de8900e6fcc3a983507589db84a`.
- Runtime: Node v24.15.0, linux x64.
- CPU: AMD Ryzen 7 8745HS w/ Radeon 780M Graphics.
- Each dataset and mode uses seven fresh processes.
- Process order alternates between rounds.
- Each process uses the same Node executable with `--expose-gc`.
- The parent compiles both revisions with the same installed TypeScript compiler.
- Compilation finishes before measurement processes start.
- Module loading and pattern preparation finish before construction timing starts.
- Each process executes three garbage collections before construction and three after construction.
- Memory samples retain the AC instance and its pattern array.
- The benchmark verifies that both revisions contain the same complete dictionary.
- Incremental timings include Trie insertion and failure-pointer maintenance.
- Each process adds twelve new two-character paths per final character.
- Each path starts with a distinct supplementary character absent from the Trie root.
- Candidate counts come from inspection after each timed insertion.
- The `full` mode uses base nodes and rebuilds every failure pointer with breadth-first traversal.
- Full rebuild timings include traversal and queue allocation.
- Reported insertion medians include all 84 samples per character, including the first insertion.
- No tests or builds run alongside the final measurement series.

## Initial construction

Values are medians. Heap and RSS values use MiB.

| Dictionary | Mode | Words | Nodes | Build ms | Post-GC heap | Post-GC RSS | Heap allocation delta | RSS delta |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| normal | base | 4677 | 9371 | 13.24 | 10.57 | 67.34 | 4.50 | 15.02 |
| normal | head | 4677 | 9371 | 13.95 | 11.11 | 68.55 | 5.05 | 16.38 |
| complete | base | 348838 | 497866 | 385.87 | 312.64 | 502.80 | 212.99 | 251.08 |
| complete | head | 348838 | 497866 | 460.39 | 322.57 | 505.51 | 222.92 | 252.53 |

Allocation deltas subtract each process memory sample before construction.
RSS includes allocator reservations and runtime memory.
RSS differences do not directly measure the index size.

| Dictionary | Base build range, ms | Head build range, ms | Median time change | Retained heap change, MiB |
| --- | ---: | ---: | ---: | ---: |
| normal | 10.81–15.79 | 10.88–17.24 | +5.3% | +0.55 |
| complete | 375.43–451.11 | 433.66–481.28 | +19.3% | +9.93 |

## Incremental insertion

The scan counts below describe the first insertion for each final character.
Each later insertion adds one indexed node at depth two.
Those new depth-two nodes do not become repair candidates in this workload.

| Dictionary | Final character | Indexed nodes scanned | Repair candidates | Base median ms | Head median ms | Head maximum ms | Full median ms |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
| normal | 的 | 15 | 6 | 0.0083 | 0.0128 | 0.3455 | 1.21 |
| normal | 中 | 33 | 16 | 0.0023 | 0.0059 | 0.0434 | 0.58 |
| normal | 人 | 40 | 23 | 0.0015 | 0.0063 | 0.0442 | 0.59 |
| complete | 的 | 223 | 160 | 0.0034 | 0.0518 | 0.8557 | 132.21 |
| complete | 中 | 1051 | 686 | 0.0020 | 0.6931 | 2.0676 | 130.49 |
| complete | 人 | 3165 | 2578 | 0.0018 | 0.5239 | 2.4802 | 135.29 |

The base implementation does not repair stale pointers.
Its insertion timing is not a correct replacement for either repair method.

## Interpretation

The default dictionary retains approximately 0.55 MiB of additional heap.
The complete dictionary retains approximately 9.93 MiB of additional heap.
The complete dictionary construction median increases by 19.3% in this series.
The construction ranges overlap, so these values do not establish a universal regression percentage.
These costs need review before merge.

Common final characters select hundreds or thousands of candidates in the complete dictionary.
Candidate repair remains much faster than the measured full rebuild for these workloads.
These synthetic insertions do not represent every dictionary update.
Large batches or different character distributions can increase repair costs.

These measurements use Node source modules, not browser bundles.
They do not establish browser memory usage or first-call latency.
The CDN comparison in CI does not isolate this change.
This follow-up retains the current implementation and adds measurement tools and randomized differential tests.
The pull request remains a draft.

## Correctness validation

The differential test uses seeds `1`, `42`, and `20261023`.
Each seed generates twenty short-word sets with supplementary characters.
Each set uses three shuffled insertion orders.
After each insertion, three texts must match the naive code-point search results.
Failure messages include the seed, trial, insertion order, active patterns, and text.
Existing fixed cases still cover all six suffix insertion orders.
The benchmark smoke test also checks process output and insertion results.
