const {
  pinyin,
  polyphonic,
  customPinyin,
  clearCustomDict,
} = require("../dist");

const LONG_TEXT = `
汉语拼音是中文信息处理中的基础能力之一。多音字识别、自定义词典导入和高频短文本转换，
通常是性能优化里最容易出现热路径的地方。这个脚本只测热点函数本身，不和体积、线上版本或其他库做混合对比。
为了让微优化效果更容易观察，这里采用循环计时，并输出平均耗时。
`.repeat(200);

const SINGLE_CHAR = "重";

function buildCustomConfig(size = 500) {
  const chars = [
    "阿", "八", "长", "的", "饿", "发", "个", "和", "家", "看",
    "了", "吗", "你", "哦", "跑", "去", "人", "是", "他", "我",
    "有", "在", "中", "这", "上", "下", "多", "音", "字", "词",
  ];
  const syllables = [
    "a", "ba", "chang", "de", "e", "fa", "ge", "he", "jia", "kan",
    "le", "ma", "ni", "o", "pao", "qu", "ren", "shi", "ta", "wo",
    "you", "zai", "zhong", "zhe", "shang", "xia", "duo", "yin", "zi", "ci",
  ];
  const config = {};

  for (let i = 0; i < size; i++) {
    const first = chars[i % chars.length];
    const second = chars[(i + 7) % chars.length];
    const third = chars[(i + 13) % chars.length];
    const word = `${first}${second}${third}${i}`;
    const pinyinValue = [
      syllables[i % syllables.length],
      syllables[(i + 7) % syllables.length],
      syllables[(i + 13) % syllables.length],
      `ci${i}`,
    ].join(" ");
    config[word] = pinyinValue;
  }

  return config;
}

function measure(name, fn, iterations = 100, warmup = 10) {
  for (let i = 0; i < warmup; i++) {
    fn();
  }

  const start = process.hrtime.bigint();
  for (let i = 0; i < iterations; i++) {
    fn();
  }
  const end = process.hrtime.bigint();
  const totalMs = Number(end - start) / 1e6;
  const avgMs = totalMs / iterations;

  console.log(`${name}`);
  console.log(`  iterations: ${iterations}`);
  console.log(`  total: ${totalMs.toFixed(3)}ms`);
  console.log(`  avg: ${avgMs.toFixed(3)}ms`);
}

function run() {
  const customConfig = buildCustomConfig();

  console.log("=== pinyin-pro Micro Benchmarks ===");

  measure("customPinyin() bulk custom dict import", () => {
    clearCustomDict(["pinyin", "multiple", "polyphonic"]);
    customPinyin(customConfig, {
      multiple: "add",
      polyphonic: "add",
    });
  }, 50, 5);

  clearCustomDict(["pinyin", "multiple", "polyphonic"]);

  measure("polyphonic() long text processing", () => {
    polyphonic(LONG_TEXT, { type: "array" });
  }, 100, 10);

  measure("pinyin() single-char hot loop", () => {
    pinyin(SINGLE_CHAR, { multiple: true, type: "array" });
  }, 20000, 100);

  clearCustomDict(["pinyin", "multiple", "polyphonic"]);
}

run();
