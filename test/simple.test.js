const { pinyin } = require('../dist/index');
const expect = require('chai').expect;

describe('simple-test', () => {
  it('test1', () => {
    const result = pinyin('汉语拼音');
    expect(result).to.be.equal('hàn yǔ pīn yīn');
  });

  it('test2', () => {
    const result = pinyin('汉语拼音xxx.,');
    expect(result).to.be.equal('hàn yǔ pīn yīn xxx.,');
  });

  it('test3', () => {
    const result = pinyin('汉语拼音', { type: 'array' });
    expect(result).to.deep.equal(['hàn', 'yǔ', 'pīn', 'yīn']);
  });

  it('test4', () => {
    const result = pinyin('汉语拼音xxx.,', { type: 'array' });
    expect(result).to.deep.equal(['hàn', 'yǔ', 'pīn', 'yīn', 'xxx.,']);
  });

  it('test5', () => {
    const result = pinyin('');
    expect(result).to.be.equal('');
  });

  it('test6', () => {
    const result = pinyin('', { type: 'array' });
    expect(result).to.deep.equal([]);
  });

  it('test7', () => {
    const result = pinyin('哈发生你看三零四aaa');
    expect(result).to.be.equal('hā fā shēng nǐ kàn sān líng sì aaa');
  });

  it('test8', () => {
    const result = pinyin('哈发生你看三零四aaa', { type: 'array' });
    expect(result).to.deep.equal([
      'hā',
      'fā',
      'shēng',
      'nǐ',
      'kàn',
      'sān',
      'líng',
      'sì',
      'aaa',
    ]);
  });
});
