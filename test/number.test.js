const { pinyin } = require('../');
const expect = require('chai').expect;

describe('basic', () => {
  it('[basic]数字发音 一行', () => {
    const result = pinyin('一行');
    expect(result).to.be.equal('yì háng');
  });

  it('[basic]数字发音 两行', () => {
    const result = pinyin('两行');
    expect(result).to.be.equal('liǎng háng');
  });

  it('[basic]数字发音 多重', () => {
    const result = pinyin('多重');
    expect(result).to.be.equal('duō chóng');
  });

  it('[basic]数字发音 一行人', () => {
    const result = pinyin('一行人');
    expect(result).to.be.equal('yī xíng rén');
  });

  it('[basic]数字发音 二百零一行', () => {
    const result = pinyin('二百零一行');
    expect(result).to.be.equal('èr bǎi líng yī háng');
  });
});
