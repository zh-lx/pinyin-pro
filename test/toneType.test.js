const { pinyin } = require('../dist/index');
const expect = require('chai').expect;

describe('toneType', () => {
  it('num', () => {
    const result = pinyin('汉语拼音', { toneType: 'num' });
    expect(result).to.be.equal('han4 yu3 pin1 yin1');
  });

  it('num-array', () => {
    const result = pinyin('汉语拼音', { toneType: 'num', type: 'array' });
    expect(result).to.deep.equal(['han4', 'yu3', 'pin1', 'yin1']);
  });

  it('none', () => {
    const result = pinyin('汉语拼音', { toneType: 'none' });
    expect(result).to.be.equal('han yu pin yin');
  });

  it('none-array', () => {
    const result = pinyin('汉语拼音', { toneType: 'none', type: 'array' });
    expect(result).to.deep.equal(['han', 'yu', 'pin', 'yin']);
  });

  it('symbol', () => {
    const result = pinyin('汉语拼音', { typeTone: 'symbol' });
    expect(result).to.be.equal('hàn yǔ pīn yīn');
  });

  it('symbol-array', () => {
    const result = pinyin('汉语拼音', { typeTone: 'symbol', type: 'array' });
    expect(result).to.deep.equal(['hàn', 'yǔ', 'pīn', 'yīn']);
  });
});
