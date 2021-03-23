const { pinyin } = require('../dist/index');
const expect = require('chai').expect;

describe('multiple', () => {
  it('word', () => {
    const result = pinyin('汉语拼音', { multiple: true });
    expect(result).to.be.equal('hàn yǔ pīn yīn');
  });

  it('single', () => {
    const result = pinyin('好', { multiple: true });
    expect(result).to.be.equal('hǎo hào');
  });

  it('word-array', () => {
    const result = pinyin('汉语拼音', { multiple: true, type: 'array' });
    expect(result).to.deep.equal(['hàn', 'yǔ', 'pīn', 'yīn']);
  });

  it('single-array', () => {
    const result = pinyin('好', { multiple: true, type: 'array' });
    expect(result).to.deep.equal(['hǎo', 'hào']);
  });
});
