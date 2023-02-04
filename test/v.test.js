const { pinyin } = require('../');
const expect = require('chai').expect;

describe('v', () => {
  it('[v]no v', () => {
    const result1 = pinyin('吕布');
    expect(result1).to.be.equal('lǚ bù');
  });

  it('[v]no v toneType none', () => {
    const result2 = pinyin('吕布', { toneType: 'none' });
    expect(result2).to.be.equal('lü bu');
  });

  it('[v]v toneType none', () => {
    const result3 = pinyin('吕布', { toneType: 'none', v: true });
    expect(result3).to.be.equal('lv bu');
  });

  it('[v]v', () => {
    const result4 = pinyin('吕布', { v: true });
    expect(result4).to.be.equal('lǚ bù');
  });
});
