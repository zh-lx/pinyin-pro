const { pinyin } = require('../');
const expect = require('chai').expect;

describe('removeNonZh', () => {
  it('[removeNonZh]mix', () => {
    const result = pinyin('汉sa语2拼音', { removeNonZh: true });
    expect(result).to.be.equal('hàn yǔ pīn yīn');
  });

  it('[removeNonZh]none', () => {
    const result = pinyin('saf21a', { removeNonZh: true });
    expect(result).to.be.equal('');
  });
});
