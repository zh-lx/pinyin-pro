import { pinyin, addDict } from '../lib/index';
import { expect, describe, it } from 'vitest';

const completeDict = require("@pinyin-pro/data/complete.json");

addDict(completeDict);

describe('basic', () => {
  it('[basic]正常拼音字符串', () => {
    const result = pinyin('汉语拼音');
    expect(result).to.be.equal('hàn yǔ pīn yīn');
  });

  it('[basic]拼音+非汉字字符串', () => {
    const result = pinyin('汉语拼音xxx.,');
    expect(result).to.be.equal('hàn yǔ pīn yīn x x x . ,');
  });

  it('[basic]正常拼音数组', () => {
    const result = pinyin('汉语拼音', { type: 'array' });
    expect(result).to.deep.equal(['hàn', 'yǔ', 'pīn', 'yīn']);
  });

  it('[basic]好好', () => {
    const result = pinyin('好好学习');
    expect(result).to.be.equal('hǎo hǎo xué xí');
  });

  it('[basic]拼音+非汉字数组', () => {
    const result = pinyin('汉语拼音xxx.,', { type: 'array' });
    expect(result).to.deep.equal([
      'hàn',
      'yǔ',
      'pīn',
      'yīn',
      'x',
      'x',
      'x',
      '.',
      ',',
    ]);
  });

  it('[basic]空字符串', () => {
    const result = pinyin('');
    expect(result).to.be.equal('');
  });

  it('[basic]空数组', () => {
    const result = pinyin('', { type: 'array' });
    expect(result).to.deep.equal([]);
  });

  it('[basic]正常拼音1', () => {
    const result = pinyin('哈发生你看三零四');
    expect(result).to.be.equal('hā fā shēng nǐ kàn sān líng sì');
  });

  it('[basic]正常拼音数组1', () => {
    const result = pinyin('哈发生你看三零四', { type: 'array' });
    expect(result).to.deep.equal([
      'hā',
      'fā',
      'shēng',
      'nǐ',
      'kàn',
      'sān',
      'líng',
      'sì',
    ]);
  });

  // TODO: 暂时跳过
  it.skip('[basic]test行不行', () => {
    const result = pinyin('行不行');
    expect(result).to.be.equal('xíng bu xíng');
  });
});
