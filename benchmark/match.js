const { match } = require("../packages/pinyin-pro/dist");

const BASE_TEXT = "汉语拼音是中文信息处理的基础能力之一，多音字识别和自定义词典导入。";

const TEXTS = [
  { name: "33chars", text: BASE_TEXT },
  { name: "132chars", text: BASE_TEXT.repeat(4) },
  { name: "528chars", text: BASE_TEXT.repeat(16) },
];

const QUERIES = [
  { name: "pinyin-short", query: "hanyu" },
  { name: "pinyin-long", query: "hanyupinyinshizhongwenxinxichuli" },
  { name: "initials", query: "hypy" },
  { name: "late-fail", query: "hanyupinyinshizhongwenxinxichulixyz" },
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

  console.log("precision | text     | query          | median(ms)");
  console.log("----------|----------|----------------|----------");
  for (const r of results) {
    console.log(
      `${r.precision.padEnd(10)}| ${r.textName.padEnd(9)}| ${r.queryName.padEnd(15)}| ${r.median.toFixed(3)}`
    );
  }
}

run();
