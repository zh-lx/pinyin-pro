import { clearCustomDict, customPinyin, pinyin } from '../lib/index';
import { afterEach, expect, describe, it } from 'vitest';

describe("toneSandhi", () => {
  afterEach(() => {
    clearCustomDict('pinyin');
  });

  it("[toneSandhi]不", () => {
    const result = pinyin("不是", { toneSandhi: false });
    expect(result).to.be.equal("bù shì");
  });

  it("changes the first of two consecutive third tones", () => {
    expect(pinyin("你好", { toneSandhi: true })).to.be.equal("ní hǎo");
    expect(pinyin("你高", { toneSandhi: true })).to.be.equal("nǐ gāo");
  });

  it("supports each tone output format", () => {
    expect(
      pinyin("你好", { toneSandhi: true, toneType: "symbol" }),
    ).to.be.equal("ní hǎo");
    expect(
      pinyin("你好", { toneSandhi: true, toneType: "num" }),
    ).to.be.equal("ni2 hao3");
    expect(
      pinyin("你好", { toneSandhi: true, toneType: "none" }),
    ).to.be.equal("ni hao");
  });

  it("keeps both third tones when tone sandhi is disabled", () => {
    expect(pinyin("你好", { toneSandhi: false })).to.be.equal("nǐ hǎo");
  });

  it("does not apply across non-Chinese boundaries", () => {
    expect(pinyin("你，好", { toneSandhi: true })).to.be.equal("nǐ ， hǎo");
    expect(pinyin("你a好", { toneSandhi: true })).to.be.equal("nǐ a hǎo");
  });

  it("handles separate pairs between punctuation boundaries", () => {
    expect(pinyin("你好，很好", { toneSandhi: true })).to.be.equal(
      "ní hǎo ， hén hǎo",
    );
  });

  it("keeps runs longer than two third tones unchanged", () => {
    expect(pinyin("我很好", { toneSandhi: true })).to.be.equal("wǒ hěn hǎo");
    expect(pinyin("我想很好", { toneSandhi: true })).to.be.equal(
      "wǒ xiǎng hěn hǎo",
    );
  });

  it("uses custom pinyin results for third-tone sandhi", () => {
    customPinyin({
      你好: "wǒ hǎo",
    });

    expect(pinyin("你好", { toneSandhi: true })).to.be.equal("wó hǎo");
  });

  it("preserves existing tone sandhi for 一 and 不", () => {
    expect(pinyin("一把", { toneSandhi: true })).to.be.equal("yì bǎ");
    expect(pinyin("不想", { toneSandhi: true })).to.be.equal("bù xiǎng");
  });
});
