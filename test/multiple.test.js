import { pinyin } from '../lib/index';
import { expect, describe, it } from 'vitest';

describe('multiple', () => {
  it('[multiple]非单字', () => {
    const result = pinyin('汉语拼音', { multiple: true });
    expect(result).to.be.equal('hàn yǔ pīn yīn');
  });

  it('[multiple]单字', () => {
    const result = pinyin('好', { multiple: true });
    expect(result).to.be.equal('hǎo hào');
  });

  it('[multiple]去 tone 同音', () => {
    const result = pinyin('好', { multiple: true, toneType: 'none' });
    expect(result).to.be.equal('hao');
  });

  it('[multiple]非单字数组', () => {
    const result = pinyin('汉语拼音', { multiple: true, type: 'array' });
    expect(result).to.deep.equal(['hàn', 'yǔ', 'pīn', 'yīn']);
  });

  it('[multiple]单字数组', () => {
    const result = pinyin('好', { multiple: true, type: 'array' });
    expect(result).to.deep.equal(['hǎo', 'hào']);
  });

  it('[multiple]非汉字：字母', () => {
    const result = pinyin('a', { multiple: true, type: 'array' });
    expect(result).to.deep.equal(['a']);
  });

  it('[multiple]非字符串：multiple: false', () => {
    const result = pinyin('a', { multiple: false, type: 'array' });
    expect(result).to.deep.equal(['a']);
  });

  it('[multiple]汉字和非汉字混合：multiple: false', () => {
    const result = pinyin('Bar好', { multiple: false, type: 'array' });
    expect(result).to.deep.equal(['B', 'a', 'r', 'hǎo']);
  });

  it('[multiple]非汉字：多个字母', () => {
    const result = pinyin('Bar', { multiple: true, type: 'array' });
    expect(result).to.deep.equal(['B', 'a', 'r']);
  });

  it('[multiple]非中国汉字：越南喃字', () => {
    const result = pinyin('𠄼', { multiple: true, type: 'array' });
    expect(result).to.deep.equal(['𠄼']);
  });

  it('[multiple]非中国汉字：多个越南喃字', () => {
    const result = pinyin('𠄼𦒹', { multiple: true, type: 'array' });
    expect(result).to.deep.equal(['𠄼', '𦒹']);
  });

  it('[multiple]非中国汉字和汉字混合（多音字仅单字生效）', () => {
    const result = pinyin('好𠄼𦒹。', { multiple: true, type: 'array' });
    expect(result).to.deep.equal(['hǎo', '𠄼', '𦒹', '。']);
  });

  it('[multiple]multiple+surname同时使用', () => {
    const result = pinyin('能', { mode: 'surname', multiple: true });
    expect(result).to.be.equal('nài néng');
  });

  it('[multiple]multiple+surname同时使用,无surname', () => {
    const result = pinyin('好', { mode: 'surname', multiple: true });
    expect(result).to.be.equal('hǎo hào');
  });

  it('[multiple]base', () => {
    const result = pinyin('好', { multiple: true });
    expect(result).to.be.equal('hǎo hào');
  });

  it('[multiple]multiple+surname同时使用,多音字优先使用姓氏读音', () => {
    const result = pinyin('数学家华罗庚', { mode: 'surname', multiple: true });
    expect(result).to.be.equal('shù xué jiā huà luó gēng');
  });
});
