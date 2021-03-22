require('@babel/register')({
  presets: [
    ['@babel/preset-env', { modules: 'commonjs' }],
    ['@babel/preset-typescript'],
  ],
  extensions: ['.ts'],
});

const { pinyin } = require('../lib/index');
const expect = require('chai').expect;

describe('lib', () => {
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

  it('test11', () => {
    const result = pinyin('汉语拼音', { multiple: true });
    expect(result).to.be.equal('hàn yǔ pīn yīn');
  });

  it('test12', () => {
    const result = pinyin('好', { multiple: true });
    expect(result).to.be.equal('hǎo hào');
  });

  it('test13', () => {
    const result = pinyin('汉语拼音', { multiple: true, type: 'array' });
    expect(result).to.deep.equal(['hàn', 'yǔ', 'pīn', 'yīn']);
  });

  it('test14', () => {
    const result = pinyin('好', { multiple: true, type: 'array' });
    expect(result).to.deep.equal(['hǎo', 'hào']);
  });
  it('test15', () => {
    const result = pinyin('汉语拼音', { pattern: 'num' });
    expect(result).to.be.equal('4 3 1 1');
  });

  it('test16', () => {
    const result = pinyin('汉语拼音', { pattern: 'num', type: 'array' });
    expect(result).to.deep.equal(['4', '3', '1', '1']);
  });

  it('test17', () => {
    const result = pinyin('汉语拼音', { pattern: 'final' });
    expect(result).to.be.equal('àn ǔ īn īn');
  });

  it('test18', () => {
    const result = pinyin('汉语拼音', { pattern: 'final', type: 'array' });
    expect(result).to.deep.equal(['àn', 'ǔ', 'īn', 'īn']);
  });

  it('test19', () => {
    const result = pinyin('汉语拼音', { pattern: 'initial' });
    expect(result).to.be.equal('h y p y');
  });

  it('test20', () => {
    const result = pinyin('汉语拼音', { pattern: 'initial', type: 'array' });
    expect(result).to.deep.equal(['h', 'y', 'p', 'y']);
  });

  it('test21', () => {
    const result = pinyin('汉语拼音');
    expect(result).to.be.equal('hàn yǔ pīn yīn');
  });

  it('test22', () => {
    const result = pinyin('汉语拼音xxx.,');
    expect(result).to.be.equal('hàn yǔ pīn yīn xxx.,');
  });

  it('test23', () => {
    const result = pinyin('汉语拼音', { type: 'array' });
    expect(result).to.deep.equal(['hàn', 'yǔ', 'pīn', 'yīn']);
  });

  it('test24', () => {
    const result = pinyin('汉语拼音xxx.,', { type: 'array' });
    expect(result).to.deep.equal(['hàn', 'yǔ', 'pīn', 'yīn', 'xxx.,']);
  });

  it('test25', () => {
    const result = pinyin('');
    expect(result).to.be.equal('');
  });

  it('test26', () => {
    const result = pinyin('', { type: 'array' });
    expect(result).to.deep.equal([]);
  });

  it('test27', () => {
    const result = pinyin('哈发生你看三零四aaa');
    expect(result).to.be.equal('hā fā shēng nǐ kàn sān líng sì aaa');
  });

  it('test28', () => {
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

  it('test29', () => {
    const result = pinyin('汉语拼音', { toneType: 'num' });
    expect(result).to.be.equal('han4 yu3 pin1 yin1');
  });

  it('test30', () => {
    const result = pinyin('汉语拼音', { toneType: 'num', type: 'array' });
    expect(result).to.deep.equal(['han4', 'yu3', 'pin1', 'yin1']);
  });

  it('test31', () => {
    const result = pinyin('汉语拼音', { toneType: 'none' });
    expect(result).to.be.equal('han yu pin yin');
  });

  it('test32', () => {
    const result = pinyin('汉语拼音', { toneType: 'none', type: 'array' });
    expect(result).to.deep.equal(['han', 'yu', 'pin', 'yin']);
  });

  it('test33', () => {
    const result = pinyin('汉语拼音', { toneType: 'symbol' });
    expect(result).to.be.equal('hàn yǔ pīn yīn');
  });

  it('test34', () => {
    const result = pinyin('汉语拼音', { toneType: 'symbol', type: 'array' });
    expect(result).to.deep.equal(['hàn', 'yǔ', 'pīn', 'yīn']);
  });
});
