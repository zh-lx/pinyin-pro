const { pinyin } = require('../dist/index');
const expect = require('chai').expect;

describe('aggregate', () => {
  it('test1', () => {
    const result = pinyin('汉语拼音', { pattern: 'num', toneType: 'num' });
    expect(result).to.be.equal('4 3 1 1');
  });

  it('test2', () => {
    const result = pinyin('汉语拼音', {
      pattern: 'num',
      toneType: 'num',
      type: 'array',
    });
    expect(result).to.deep.equal(['4', '3', '1', '1']);
  });

  it('test3', () => {
    const result = pinyin('汉语拼音', { pattern: 'num', toneType: 'none' });
    expect(result).to.be.equal('4 3 1 1');
  });

  it('test4', () => {
    const result = pinyin('汉语拼音', {
      pattern: 'num',
      toneType: 'none',
      type: 'array',
    });
    expect(result).to.deep.equal(['4', '3', '1', '1']);
  });

  it('test5', () => {
    const result = pinyin('汉语拼音', { pattern: 'initial', toneType: 'num' });
    expect(result).to.be.equal('h y p y');
  });

  it('test6', () => {
    const result = pinyin('汉语拼音', {
      pattern: 'initial',
      toneType: 'num',
      type: 'array',
    });
    expect(result).to.deep.equal(['h', 'y', 'p', 'y']);
  });

  it('test7', () => {
    const result = pinyin('汉语拼音', { pattern: 'final', toneType: 'num' });
    expect(result).to.be.equal('an4 u3 in1 in1');
  });

  it('test8', () => {
    const result = pinyin('汉语拼音', {
      pattern: 'final',
      toneType: 'num',
      type: 'array',
    });
    expect(result).to.deep.equal(['an4', 'u3', 'in1', 'in1']);
  });

  it('test9', () => {
    const result = pinyin('好', {
      pattern: 'final',
      toneType: 'num',
      multiple: true,
    });
    expect(result).to.be.equal('ao3 ao4');
  });

  it('test10', () => {
    const result = pinyin('好', {
      pattern: 'final',
      toneType: 'num',
      multiple: true,
      type: 'array',
    });
    expect(result).to.deep.equal(['ao3', 'ao4']);
  });
});
