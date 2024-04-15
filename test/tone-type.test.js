import { pinyin } from '../lib/index';
import { expect, describe, it } from 'vitest';

describe('pattern with toneType', () => {
  it('[tone-type]num_num字符串', () => {
    const result = pinyin('汉语拼音', { pattern: 'num', toneType: 'num' });
    expect(result).to.be.equal('4 3 1 1');
  });

  it('[tone-type]num_num数组', () => {
    const result = pinyin('汉语拼音', {
      pattern: 'num',
      toneType: 'num',
      type: 'array',
    });
    expect(result).to.deep.equal(['4', '3', '1', '1']);
  });

  it('[tone-type]num_none字符串', () => {
    const result = pinyin('汉语拼音', { pattern: 'num', toneType: 'none' });
    expect(result).to.be.equal('4 3 1 1');
  });

  it('[tone-type]num_none数组', () => {
    const result = pinyin('汉语拼音', {
      pattern: 'num',
      toneType: 'none',
      type: 'array',
    });
    expect(result).to.deep.equal(['4', '3', '1', '1']);
  });

  it('[tone-type]initial_num字符串', () => {
    const result = pinyin('汉语拼音', { pattern: 'initial', toneType: 'num' });
    expect(result).to.be.equal('h4 y3 p1 y1');
  });

  it('[tone-type]initial_num数组', () => {
    const result = pinyin('汉语拼音', {
      pattern: 'initial',
      toneType: 'num',
      type: 'array',
    });
    expect(result).to.deep.equal(['h4', 'y3', 'p1', 'y1']);
  });

  it('[tone-type]final_num字符串', () => {
    const result = pinyin('汉语拼音', { pattern: 'final', toneType: 'num' });
    expect(result).to.be.equal('an4 u3 in1 in1');
  });

  it('[tone-type]final_num数组', () => {
    const result = pinyin('汉语拼音', {
      pattern: 'final',
      toneType: 'num',
      type: 'array',
    });
    expect(result).to.deep.equal(['an4', 'u3', 'in1', 'in1']);
  });

  it('[tone-type]final_num多音字', () => {
    const result = pinyin('好', {
      pattern: 'final',
      toneType: 'num',
      multiple: true,
    });
    expect(result).to.be.equal('ao3 ao4');
  });

  it('[tone-type]final_num多音字数组', () => {
    const result = pinyin('好', {
      pattern: 'final',
      toneType: 'num',
      multiple: true,
      type: 'array',
    });
    expect(result).to.deep.equal(['ao3', 'ao4']);
  });

  it('[tone-type]none', () => {
    const resultNone = pinyin('赵钱孙李吧', { toneType: 'none' });
    expect(resultNone).to.be.equal('zhao qian sun li ba');
  });

  it('[tone-type]num', () => {
    const resultNum = pinyin('赵钱孙李吧', { toneType: 'num' });
    expect(resultNum).to.be.equal('zhao4 qian2 sun1 li3 ba0');
  });

  it('[tone-type]nonZh', () => {
    const resultNum = pinyin('ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz', { toneType: 'num', nonZh: 'consecutive' });
    expect(resultNum).to.be.equal('ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz');
  });

  it('[tone-type]nonZh with consecutive', () => {
    const resultNum = pinyin('How are you? ', { toneType: 'num', nonZh: 'consecutive' });
    expect(resultNum).to.be.equal('How are you? ');
  });
});
