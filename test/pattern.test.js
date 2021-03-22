const { pinyin } = require('../dist/index');
const expect = require('chai').expect;

describe('pattern', () => {
  it('num', () => {
    const result = pinyin('汉语拼音', { pattern: 'num' });
    expect(result).to.be.equal('4 3 1 1');
  });

  it('num-array', () => {
    const result = pinyin('汉语拼音', { pattern: 'num', type: 'array' });
    expect(result).to.deep.equal(['4', '3', '1', '1']);
  });

  it('final', () => {
    const result = pinyin('汉语拼音', { pattern: 'final' });
    expect(result).to.be.equal('àn ǔ īn īn');
  });

  it('final-array', () => {
    const result = pinyin('汉语拼音', { pattern: 'final', type: 'array' });
    expect(result).to.deep.equal(['àn', 'ǔ', 'īn', 'īn']);
  });

  it('initial', () => {
    const result = pinyin('汉语拼音', { pattern: 'initial' });
    expect(result).to.be.equal('h y p y');
  });

  it('initial-array', () => {
    const result = pinyin('汉语拼音', { pattern: 'initial', type: 'array' });
    expect(result).to.deep.equal(['h', 'y', 'p', 'y']);
  });
});
