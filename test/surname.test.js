const { pinyin } = require('../');
const expect = require('chai').expect;

describe('surname', () => {
  it('[surname]multiple surname1', () => {
    const result = pinyin('万俟', { mode: 'surname' });
    expect(result).to.be.equal('mò qí');
  });

  it('[surname]multiple surname2', () => {
    const result = pinyin('我叫令狐冲', { mode: 'surname' });
    expect(result).to.be.equal('wǒ jiào líng hú chōng');
  });

  it('[surname]multiple surname3', () => {
    const result = pinyin('曾令狐冲', { mode: 'surname' });
    expect(result).to.be.equal('zēng líng hú chōng');
  });

  it('[surname]multiple surname4', () => {
    const result = pinyin('我叫区中青', { mode: 'surname' });
    expect(result).to.be.equal('wǒ jiào ōu zhōng qīng');
  });

  it('[surname]multiple surname5', () => {
    const result = pinyin('我叫覃晓旭', { mode: 'surname' });
    expect(result).to.be.equal('wǒ jiào qín xiǎo xù');
  });

  it('[surname]multiple surname6', () => {
    const result = pinyin('我叫朴岁植', { mode: 'surname' });
    expect(result).to.be.equal('wǒ jiào piáo suì zhí');
  });
});
