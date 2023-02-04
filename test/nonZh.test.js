const { pinyin } = require('../');
const expect = require('chai').expect;

describe('nonZh', () => {
  it('[nonZh]init', () => {
    const result1 = pinyin('我very喜欢你');
    expect(result1).to.be.equal('wǒ v e r y xǐ huān nǐ');
  });

  it('[nonZh]spaced', () => {
    const result2 = pinyin('我very喜欢你', { nonZh: 'spaced' });
    expect(result2).to.be.equal('wǒ v e r y xǐ huān nǐ');
  });

  it('[nonZh]consecutive', () => {
    const result3 = pinyin('我very喜欢你', { nonZh: 'consecutive' });
    expect(result3).to.be.equal('wǒ very xǐ huān nǐ');
  });

  it('[nonZh]removed', () => {
    const result4 = pinyin('我very喜欢你', { nonZh: 'removed' });
    expect(result4).to.be.equal('wǒ xǐ huān nǐ');
  });

  it('[nonZh]has space', () => {
    const result4 = pinyin('喜 欢');
    expect(result4).to.be.equal('xǐ   huān');
  });

  it('[nonZh]has space', () => {
    const result4 = pinyin('喜 欢', { type: 'array' });
    expect(result4).to.deep.equal(['xǐ', ' ', 'huān']);
  });
});
