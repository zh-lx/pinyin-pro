const { pinyin } = require('../');
const expect = require('chai').expect;

describe('separator', () => {
  it('[separator]分割符', () => {
    const result = pinyin('汉语拼音', { separator: '-' });
    expect(result).to.be.equal('hàn-yǔ-pīn-yīn');
  });
});
