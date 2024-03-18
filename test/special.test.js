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

// 连续变调
describe('tone sandhi for “一”', () => {
  it('[special tone sandhi]一面', () => {
    const result = pinyin('一面');
    expect(result).to.be.equal('yí miàn');
  });

  it('[special tone sandhi]一枕黄粱', () => {
    const result = pinyin('一枕黄粱');
    expect(result).to.be.equal('yì zhěn huáng liáng');
  });

  it('[special tone sandhi]说一说', () => {
    const result = pinyin('说一说');
    expect(result).to.be.equal('shuō yi shuō');
  });

  it('[special tone sandhi]一会儿', () => {
    const result = pinyin('一会儿');
    expect(result).to.be.equal('yí huì er');
  });

  it('[special tone sandhi for toneSandhi false]一会儿', () => {
    const result = pinyin('一会儿', { toneSandhi: false });
    expect(result).to.be.equal('yī huì er');
  });

  it('[special tone sandhi]一地鸡毛', () => {
    const result = pinyin('一地鸡毛');
    expect(result).to.be.equal('yí dì jī máo');
  });

  it('[special tone sandhi]洒了一地', () => {
    const result = pinyin('洒了一地');
    expect(result).to.be.equal('sǎ le yí dì');
  });

  it('[special tone sandhi]一地', () => {
    const result = pinyin('一地');
    expect(result).to.be.equal('yí dì');
  });

  // TODO: 连读数字（只有开头的「一」变调）
  it.skip('[special tone sandhi]一千一百一十一', () => {
    const result = pinyin('一千一百一十一');
    expect(result).to.be.equal('yì qiān yī bǎi yī shí yī');
  });

  // TODO: 连续数字不变调
  it.skip('[special tone sandhi]一二三四五', () => {
    const result = pinyin('一二三四五');
    expect(result).to.be.equal('yī èr sān sì wǔ');
  });

  // TODO: 文言文中的时间不变调
  it.skip('[special tone sandhi]十有一年而弃', () => {
    const result = pinyin('十有一年而弃');
    expect(result).to.be.equal('shí yòu yī nián ér qì');
  });

  // TODO: 作为时间时不变调
  it.skip('[special tone sandhi]九一年', () => {
    const result = pinyin('九一年');
    expect(result).to.be.equal('jiǔ yī nián');
  });

  // TODO: 作为序数时不变调
  it.skip('[special tone sandhi]一路公交', () => {
    const result = pinyin('一路公交');
    expect(result).to.be.equal('yī lù gōng jiāo');
  });

  // 但同样的词「一路」作为非序数时却要变调
  it('[special tone sandhi]一路顺风', () => {
    const result = pinyin('一路顺风');
    expect(result).to.be.equal('yí lù shùn fēng');
  });

  // TODO: 成语中的序数也不变调
  it.skip('[special tone sandhi]有一说一', () => {
    const result = pinyin('有一说一');
    expect(result).to.be.equal('yǒu yī shuō yī');
  });
});

describe('tone sandhi for “不”', () => {
  // 不变调
  it('[special tone sandhi]不甘', () => {
    const result = pinyin('不甘');
    expect(result).to.be.equal('bù gān');
  });

  it('[special tone sandhi]他说不！', () => {
    const result = pinyin('他说不！');
    expect(result).to.be.equal('tā shuō bù ！');
  });

  it('[special tone sandhi]要不你走', () => {
    const result = pinyin('要不你走');
    expect(result).to.be.equal('yào bù nǐ zǒu');
  });

  // 变调为二声
  it('[special tone sandhi]不悦', () => {
    const result = pinyin('不悦');
    expect(result).to.be.equal('bú yuè');
  });

  // 变调为轻声
  it('[special tone sandhi]说不说', () => {
    const result = pinyin('说不说');
    expect(result).to.be.equal('shuō bu shuō');
  });
});
