const { pinyin } = require('../');
const expect = require('chai').expect;

describe('number', () => {
  it('[number]数字发音 一行', () => {
    const result = pinyin('一行');
    expect(result).to.be.equal('yì háng');
  });

  it('[number]数字发音 两行', () => {
    const result = pinyin('两行');
    expect(result).to.be.equal('liǎng háng');
  });

  it('[number]数字发音 多重', () => {
    const result = pinyin('多重');
    expect(result).to.be.equal('duō chóng');
  });

  it('[number]数字发音 一行人', () => {
    const result = pinyin('一行人');
    expect(result).to.be.equal('yì xíng rén');
  });

  it('[number]数字发音 二百零一行', () => {
    const result = pinyin('二百零一行');
    expect(result).to.be.equal('èr bǎi líng yī háng');
  });
});


describe('special change tone', () => {
  it('[special change tone]一面', () => {
    const result = pinyin('一面');
    expect(result).to.be.equal('yí miàn');
  });

  it('[special change tone]一枕黄粱', () => {
    const result = pinyin('一枕黄粱');
    expect(result).to.be.equal('yì zhěn huáng liáng');
  });

  it('[special change tone]说一说', () => {
    const result = pinyin('说一说');
    expect(result).to.be.equal('shuō yi shuō');
  });

  it('[special change tone]不甘', () => {
    const result = pinyin('不甘');
    expect(result).to.be.equal('bù gān');
  });

  it('[special change tone]不悦', () => {
    const result = pinyin('不悦');
    expect(result).to.be.equal('bú yuè');
  });

  it('[special change tone]说不说', () => {
    const result = pinyin('说不说');
    expect(result).to.be.equal('shuō bu shuō');
  });

  it('[special change tone]一会儿', () => {
    const result = pinyin('一会儿');
    expect(result).to.be.equal('yí huì er');
  });

  it('[special change tone]一会儿', () => {
    const result = pinyin('一会儿', { inflection: false });
    expect(result).to.be.equal('yī huì er');
  });
});
