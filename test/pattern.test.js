import { pinyin } from '../lib/index';
import { expect, describe, it } from 'vitest';

describe('pattern', () => {
  it('[pattern]num', () => {
    const result = pinyin('汉语拼音', { pattern: 'num' });
    expect(result).to.be.equal('4 3 1 1');
  });

  it('[pattern]num-array', () => {
    const result = pinyin('汉语拼音', { pattern: 'num', type: 'array' });
    expect(result).to.deep.equal(['4', '3', '1', '1']);
  });

  it('[pattern]final', () => {
    const result = pinyin('汉语拼音', { pattern: 'final' });
    expect(result).to.be.equal('àn ǔ īn īn');
  });

  it('[pattern]final-array', () => {
    const result = pinyin('汉语拼音', { pattern: 'final', type: 'array' });
    expect(result).to.deep.equal(['àn', 'ǔ', 'īn', 'īn']);
  });

  it('[pattern]initial', () => {
    const result = pinyin('汉语拼音', { pattern: 'initial' });
    expect(result).to.be.equal('h y p y');
  });

  it('[pattern]initial-array', () => {
    const result = pinyin('汉语拼音', { pattern: 'initial', type: 'array' });
    expect(result).to.deep.equal(['h', 'y', 'p', 'y']);
  });

  it('[pattern]num-all', () => {
    const resultNumStr = pinyin('赵钱孙李吧', { pattern: 'num' });
    expect(resultNumStr).to.be.equal('4 2 1 3 0');
  });

  it('[pattern]num-array', () => {
    const resultNumArr = pinyin('赵钱孙李吧', {
      pattern: 'num',
      type: 'array',
    });
    expect(resultNumArr).to.deep.equal(['4', '2', '1', '3', '0']);
  });

  it('[pattern]initial-all', () => {
    const resultInitial = pinyin('赵钱孙李吧', {
      pattern: 'initial',
    });
    expect(resultInitial).to.be.equal('zh q s l b');
  });

  it('[pattern]final-all', () => {
    const resultFinal = pinyin('赵钱孙李吧', {
      pattern: 'final',
    });
    expect(resultFinal).to.be.equal('ào ián ūn ǐ a');
  });

  it('[pattern]first-all', () => {
    const resultFirst = pinyin('赵钱孙李额', {
      pattern: 'first',
    });
    const resultFirst1 = pinyin('赵钱孙李very', {
      pattern: 'first',
    });
    expect(resultFirst).to.be.equal('z q s l é');
    expect(resultFirst1).to.be.equal('z q s l v e r y');
  });

  it('[pattern]first-all-none', () => {
    const resultFirstNone = pinyin('赵钱孙李额', {
      pattern: 'first',
      toneType: 'none',
    });
    expect(resultFirstNone).to.be.equal('z q s l e');
  });

  it('[pattern]nonZh', () => {
    const resultNonZhInitial = pinyin('a', {
      pattern: 'initial',
    });
    const resultNonZhFinal = pinyin('a', {
      pattern: 'final',
    });
    const resultNonZhFinalHead = pinyin('a', {
      pattern: 'finalHead',
    });
    const resultNonZhFinalBody = pinyin('a', {
      pattern: 'finalBody',
    });
    const resultNonZhFinalTail = pinyin('a', {
      pattern: 'finalTail',
    });
    expect(resultNonZhInitial).to.deep.equal('');
    expect(resultNonZhFinal).to.deep.equal('');
    expect(resultNonZhFinalHead).to.deep.equal('');
    expect(resultNonZhFinalBody).to.deep.equal('');
    expect(resultNonZhFinalTail).to.deep.equal('');
  });
});
