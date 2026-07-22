import { pinyin } from '../lib/index';
import { expect, describe, it } from 'vitest';

describe('toneType', () => {
  it('[pattern-mix-tone-type]num', () => {
    const result = pinyin('汉语拼音', { toneType: 'num' });
    expect(result).to.be.equal('han4 yu3 pin1 yin1');
  });

  it('[pattern-mix-tone-type]num-array', () => {
    const result = pinyin('汉语拼音', { toneType: 'num', type: 'array' });
    expect(result).to.deep.equal(['han4', 'yu3', 'pin1', 'yin1']);
  });

  it('[pattern-mix-tone-type]none', () => {
    const result = pinyin('汉语拼音', { toneType: 'none' });
    expect(result).to.be.equal('han yu pin yin');
  });

  it('[pattern-mix-tone-type]none-嗯', () => {
    const result = pinyin('阿斯蒂芬嗯', { pattern: 'first', toneType: 'none' });
    expect(result).to.be.equal('a s d f n');
  });

  it('[pattern-mix-tone-type]specials', () => {
    expect(pinyin('嗯')).to.be.equal('ǹg');
    expect(pinyin('哼')).to.be.equal('hēng', 'hng');
  });

  it('[pattern-mix-tone-type]none-array', () => {
    const result = pinyin('汉语拼音', { toneType: 'none', type: 'array' });
    expect(result).to.deep.equal(['han', 'yu', 'pin', 'yin']);
  });

  it('[pattern-mix-tone-type]symbol', () => {
    const result = pinyin('汉语拼音', { toneType: 'symbol' });
    expect(result).to.be.equal('hàn yǔ pīn yīn');
  });

  it('[pattern-mix-tone-type]symbol-array', () => {
    const result = pinyin('汉语拼音', { toneType: 'symbol', type: 'array' });
    expect(result).to.deep.equal(['hàn', 'yǔ', 'pīn', 'yīn']);
  });

  it('[pattern-mix-tone-type]first with num', () => {
    const result = pinyin('山西', { pattern: 'first', toneType: 'num' });
    expect(result).to.be.equal('s1 x1');
  });
});
