const { pinyin, customPinyin } = require('../');
const expect = require('chai').expect;

describe('customConfig', () => {
  it('[custom]custom none', () => {
    customPinyin();
    const result = pinyin('干一行行一行');
    expect(result).to.be.equal('gān yī xíng xíng yī xíng');
    customPinyin({});
  });

  it('[custom]custom1', () => {
    customPinyin({
      能: 'nài',
    });
    const result = pinyin('我姓能');
    expect(result).to.be.equal('wǒ xìng nài');
    customPinyin({});
  });

  it('[custom]custom2', () => {
    customPinyin({
      好好: 'hào hǎo',
    });
    const result = pinyin('爱好好多');
    expect(result).to.be.equal('ài hào hǎo duō');
    customPinyin({});
  });

  it('[custom]custom3', () => {
    customPinyin({
      哈什玛: 'hà shén mǎ',
    });
    const result = pinyin('哈什玛');
    expect(result).to.be.equal('hà shén mǎ');
    customPinyin({});
  });

  it('[custom]custom4', () => {
    customPinyin({
      暴虎冯河: 'bào hǔ píng hé',
    });
    const result = pinyin('暴虎冯河');
    expect(result).to.be.equal('bào hǔ píng hé');
    customPinyin({});
  });

  it('[custom]custom>5', () => {
    customPinyin({
      干一行行一行: 'gàn yī háng xíng yī háng',
    });
    const result = pinyin('干一行行一行');
    expect(result).to.be.equal('gàn yī háng xíng yī háng');
    customPinyin({});
  });

  it('[custom]custom with surname', () => {
    customPinyin({
      乐嘉: 'lè jiā',
    });
    const result = pinyin('乐嘉啊', { mode: 'surname' });
    expect(result).to.be.equal('lè jiā a');

    const result1 = pinyin('啊乐嘉', { mode: 'surname' });
    expect(result1).to.be.equal('a lè jiā');

    const result2 = pinyin('啊乐嘉是', { mode: 'surname' });
    expect(result2).to.be.equal('a lè jiā shì');
    customPinyin({});
  });

  it('[custom]customs', () => {
    customPinyin({
      好: 'hào',
      好好: 'hào hǎo',
    });
    const result = pinyin('好好');
    expect(result).to.be.equal('hào hǎo');
    customPinyin({});
  });

  it('[custom]custom with multiple', () => {
    customPinyin({
      嗯: 'en',
    });
    const result = pinyin('嗯', {
      multiple: true,
      type: 'array',
      nonZh: 'removed',
      toneType: 'num',
    });
    expect(result).to.deep.equal(['en0']);
    customPinyin({});
  });
});
