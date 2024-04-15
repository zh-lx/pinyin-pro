import { pinyin, addDict, removeDict } from '../lib/index';
import { expect, describe, it } from 'vitest';

describe("addDict", () => {
  it("[addDict]string dict", () => {
    const stringDict = {
      汉语拼音: 'hàn yǔ pīn yīn'
    }
    addDict(stringDict);
    const result = pinyin("汉语拼音");
    expect(result).to.be.equal("hàn yǔ pīn yīn");
  });

  it("[addDict]array dict", () => {
    const stringDict = {
      汉语拼音: ['hàn yǔ pīn yīn']
    }
    addDict(stringDict, "arrayDict");
    removeDict('arrayDict');
    const result = pinyin("汉语拼音");
    expect(result).to.be.equal("hàn yǔ pīn yīn");
  });
});
