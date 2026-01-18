import { pinyin, html, addTraditionalDict, segment } from '../lib/index';
import traditionalDict from '@pinyin-pro/data/traditional'
import { expect, describe, it } from 'vitest';

describe("without traditional", () => {
  it("[pinyin traditional]轉盤", () => {
    const result = pinyin("轉盤");
    expect(result).to.be.equal("zhuǎn pán");
  });

  it("[segment traditional]一个轉盤", () => {
    const result = segment("一个轉盤");
    expect(result).to.deep.equal([
      {
        "origin": "一",
        "result": "yí",
      },
      {
        "origin": "个",
        "result": "gè",
      },
      {
        "origin": "轉",
        "result": "zhuǎn",
      },
      {
        "origin": "盤",
        "result": "pán",
      },
    ]);
  });

  it("[html traditional]轉盤", () => {
    const result = html("轉盤");
    expect(result).to.be.equal('<span class="py-result-item"><ruby><span class="py-chinese-item">轉</span><rp>(</rp><rt class="py-pinyin-item">zhuǎn</rt><rp>)</rp></ruby></span><span class="py-result-item"><ruby><span class="py-chinese-item">盤</span><rp>(</rp><rt class="py-pinyin-item">pán</rt><rp>)</rp></ruby></span>');
  });
});


describe("with traditional", () => {
  addTraditionalDict(traditionalDict);
  it("[pinyin with traditional]一个🌛轉盤", () => {
    const result = pinyin("一个🌛轉盤", { traditional: true });
    expect(result).to.be.equal("yí gè 🌛 zhuàn pán");
  });

  it("[segment traditional]一个轉盤", () => {
    const result = segment("一个轉盤", { traditional: true });
    expect(result).to.deep.equal([
      {
        "origin": "一",
        "result": "yí",
      },
      {
        "origin": "个",
        "result": "gè",
      },
      {
        "origin": "轉盤",
        "result": "zhuànpán",
      },
    ]);
  });

  it("[html with traditional]轉盤", () => {
    const result = html("轉盤", { traditional: true });
    expect(result).to.be.equal('<span class="py-result-item"><ruby><span class="py-chinese-item">轉</span><rp>(</rp><rt class="py-pinyin-item">zhuàn</rt><rp>)</rp></ruby></span><span class="py-result-item"><ruby><span class="py-chinese-item">盤</span><rp>(</rp><rt class="py-pinyin-item">pán</rt><rp>)</rp></ruby></span>');
  });
});
