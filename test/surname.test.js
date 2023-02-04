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
});
