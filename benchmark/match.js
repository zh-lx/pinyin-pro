const { match } = require("../packages/pinyin-pro/dist");

const TEXT_64 = "汉语拼音是中文信息处理的基础能力之一，多音字识别和自定义词典导入。";
const TEXT_256 = TEXT_64.repeat(4);
const TEXT_1K = TEXT_64.repeat(16);

const QUERIES = [
  { name: "short", query: "中" },
  { name: "long", query: "汉语拼音是中文信息处理的基础能力之一" },
  { name: "match", query: "拼音" },
  { name: "no-match", query: "xyz123" },
];

const TEXTS = [
  { name: "64chars", text: TEXT_64 },
  { name: "256chars", text: TEXT_256 },
  { name: "1kchars", text: TEXT_1K },
];

const PRECISIONS = ["first", "start", "every"];

function measure(name, fn, iterations = 500, warmup = 50) {
  for (let i = 0; i < warmup; i++) fn();

  const times = [];
  for (let i = 0; i < iterations; i++) {
    const start = process.hrtime.bigint();
    fn();
    const end = process.hrtime.bigint();
    times.push(Number(end - start) / 1e6);
  }

  times.sort((a, b) => a - b);
  return { name, median: times[Math.floor(times.length / 2)] };
}

function run() {
  const results = [];

  for (const precision of PRECISIONS) {
    for (const { name: textName, text } of TEXTS) {
      for (const { name: queryName, query } of QUERIES) {
        const testName = `${precision}|${textName}|${queryName}`;
        const { median } = measure(testName, () => {
          match(text, query, { precision });
        });
        results.push({ precision, textName, queryName, median });
      }
    }
  }

  console.log("precision | text     | query    | median(ms)");
  console.log("----------|----------|----------|----------");
  for (const r of results) {
    console.log(
      `${r.precision.padEnd(10)}| ${r.textName.padEnd(9)}| ${r.queryName.padEnd(9)}| ${r.median.toFixed(3)}`
    );
  }
}

run();
