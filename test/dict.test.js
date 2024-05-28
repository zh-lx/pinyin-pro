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

  it("[addDict]dict handle add", () => {
    const stringDict = {
      汉: ['yīn']
    }
    addDict(stringDict, { name: "handle-add", dict1: 'add' });
    const result = pinyin("汉", { multiple: true });
    expect(result).to.be.equal("hàn yīn");
    removeDict('handle-add');
  });

  it("[addDict]dict handle replace", () => {
    const stringDict = {
      汉: ['yīn']
    }
    addDict(stringDict, { name: "handle-replace", dict1: 'replace' });
    const result = pinyin("汉", { multiple: true });
    expect(result).to.be.equal("yīn");
    removeDict('handle-replace');
  });

  it("[addDict]undefined dict", () => {
    const stringDict = {
      䃜: 'yī'
    }
    addDict(stringDict, { name: "handle-new" });
    const result = pinyin("䃜");
    expect(result).to.be.equal("yī");
    removeDict('handle-new');
  });

  it("[addDict]unnamed dict", () => {
    const stringDict = {
      䃜: 'yī'
    }
    addDict(stringDict);
    const result = pinyin("䃜");
    expect(result).to.be.equal("yī");
    removeDict();
  });
});
