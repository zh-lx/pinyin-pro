import { pinyin } from '../lib/index';
import { expect, describe, it } from 'vitest';

describe("toneSandhi", () => {
  it("[toneSandhi]不", () => {
    const result = pinyin("不是", { toneSandhi: false });
    expect(result).to.be.equal("bù shì");
  });

});
