const { spawnSync } = require("node:child_process");
const path = require("node:path");

const distPath = path.resolve(__dirname, "../../dist/index.js");
const iterations = Number(process.env.BENCH_ITERATIONS || 20);
const warmup = Number(process.env.BENCH_WARMUP || 3);

const scenarios = {
  "import-idle": `
    const start = process.hrtime.bigint();
    require(process.env.PINYIN_PRO_DIST);
    setTimeout(() => {
      if (global.gc) global.gc();
      const memory = process.memoryUsage();
      console.log(JSON.stringify({
        elapsedMs: Number(process.hrtime.bigint() - start) / 1e6,
        rssMiB: memory.rss / 1024 / 1024,
        heapUsedMiB: memory.heapUsed / 1024 / 1024,
      }));
    }, 0);
  `,
  "first-pinyin": `
    const { pinyin } = require(process.env.PINYIN_PRO_DIST);
    const start = process.hrtime.bigint();
    pinyin("汉语拼音是中文信息处理的基础能力之一");
    const elapsedMs = Number(process.hrtime.bigint() - start) / 1e6;
    if (global.gc) global.gc();
    const memory = process.memoryUsage();
    console.log(JSON.stringify({
      elapsedMs,
      rssMiB: memory.rss / 1024 / 1024,
      heapUsedMiB: memory.heapUsed / 1024 / 1024,
    }));
  `,
  "delayed-first-pinyin": `
    const { pinyin } = require(process.env.PINYIN_PRO_DIST);
    setTimeout(() => {
      const start = process.hrtime.bigint();
      pinyin("汉语拼音是中文信息处理的基础能力之一");
      const elapsedMs = Number(process.hrtime.bigint() - start) / 1e6;
      if (global.gc) global.gc();
      const memory = process.memoryUsage();
      console.log(JSON.stringify({
        elapsedMs,
        rssMiB: memory.rss / 1024 / 1024,
        heapUsedMiB: memory.heapUsed / 1024 / 1024,
      }));
    }, 0);
  `,
};

function median(values) {
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.floor(sorted.length / 2)];
}

function runOnce(code) {
  const result = spawnSync(
    process.execPath,
    ["--expose-gc", "-e", code],
    {
      encoding: "utf8",
      env: {
        ...process.env,
        PINYIN_PRO_DIST: distPath,
      },
    },
  );

  if (result.status !== 0) {
    throw new Error(result.stderr || `benchmark child exited with ${result.status}`);
  }

  const line = result.stdout.trim().split("\n").at(-1);
  return JSON.parse(line);
}

function runScenario(name, code) {
  for (let i = 0; i < warmup; i++) {
    runOnce(code);
  }

  const samples = [];
  for (let i = 0; i < iterations; i++) {
    samples.push(runOnce(code));
  }

  return {
    name,
    elapsedMs: median(samples.map((sample) => sample.elapsedMs)),
    rssMiB: median(samples.map((sample) => sample.rssMiB)),
    heapUsedMiB: median(samples.map((sample) => sample.heapUsedMiB)),
  };
}

console.log(`Node ${process.version}`);
console.log(`fresh processes: ${iterations} (+ ${warmup} warmup)\n`);
console.log("scenario              | median(ms) | rss(MiB) | heapUsed(MiB)");
console.log("----------------------|------------|----------|--------------");

for (const [name, code] of Object.entries(scenarios)) {
  const result = runScenario(name, code);
  console.log(
    `${result.name.padEnd(22)}| ${result.elapsedMs.toFixed(3).padStart(10)} | ${result.rssMiB.toFixed(2).padStart(8)} | ${result.heapUsedMiB.toFixed(2).padStart(12)}`,
  );
}
