const { pinyin, customPinyin, clearCustomDict, polyphonic } = require('../');
const expect = require('chai').expect;

function clearAllCustomDicts() {
  clearCustomDict(['pinyin', 'multiple', 'polyphonic']);
}

describe('customConfig', () => {
  it('[custom]custom none', () => {
    customPinyin();
    const result = pinyin('干一行行一行');
    expect(result).to.be.equal('gàn yì háng xíng yì háng');
    clearAllCustomDicts();
  });

  it('[custom]custom1', () => {
    customPinyin({
      能: 'nài',
    });
    const result = pinyin('我姓能');
    expect(result).to.be.equal('wǒ xìng nài');
    clearAllCustomDicts();
  });

  it('[custom]custom2', () => {
    customPinyin({
      好好: 'hào hǎo',
    });
    const result = pinyin('爱好好多');
    expect(result).to.be.equal('ài hào hǎo duō');
    clearAllCustomDicts();
  });

  it('[custom]custom3', () => {
    customPinyin({
      哈什玛: 'hà shén mǎ',
    });
    const result = pinyin('哈什玛');
    expect(result).to.be.equal('hà shén mǎ');
    clearAllCustomDicts();
  });

  it('[custom]custom4', () => {
    customPinyin({
      暴虎冯河: 'bào hǔ píng hé',
    });
    const result = pinyin('暴虎冯河');
    expect(result).to.be.equal('bào hǔ píng hé');
    clearAllCustomDicts();
  });

  it('[custom]custom>5', () => {
    customPinyin({
      干一行行一行: 'gàn yī háng xíng yī háng',
    });
    const result = pinyin('干一行行一行');
    expect(result).to.be.equal('gàn yī háng xíng yī háng');
    clearAllCustomDicts();
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
    clearAllCustomDicts();
  });

  it('[custom]customs', () => {
    customPinyin({
      好: 'hào',
      好好: 'hào hǎo',
    });
    const result = pinyin('好好');
    expect(result).to.be.equal('hào hǎo');
    clearAllCustomDicts();
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
    expect(result).to.deep.equal(['ng4', 'ng2', 'ng3']);
    clearAllCustomDicts();
  });

  it('[custom] ac high level', () => {
    customPinyin({
      银行: 'yin hang',
    });
    const result = pinyin('银行');
    expect(result).to.be.equal('yin hang');
    clearAllCustomDicts();
  });

  it('[custom] double unicode1', () => {
    customPinyin({
      𧒽: 'lei',
    });
    const result = pinyin('𧒽沙发𧒽𧒽𧒽算法是');
    expect(result).to.be.equal('lei shā fā lei lei lei suàn fǎ shì');
    clearAllCustomDicts();
  });

  it('[custom] double unicode2', () => {
    customPinyin({
      𧒽𧒽: 'lei ke',
    });
    const result = pinyin('𧒽沙发𧒽𧒽𧒽算法是');
    expect(result).to.be.equal('𧒽 shā fā lei ke 𧒽 suàn fǎ shì');
    clearAllCustomDicts();
  });
});


describe('custom for multiple', () => {
  it('[custom]custom multiple1', () => {
    customPinyin({
      你好: 'mi sao'
    }, {
      multiple: 'add'
    });
    const result = pinyin('你', { multiple: true });
    expect(result).to.be.equal('nǐ mi');
    clearAllCustomDicts();
  });

  it('[custom]custom multiple2', () => {
    customPinyin({
      你好: 'mi kao'
    }, {
      multiple: 'add'
    });
    const result = pinyin('好', { multiple: true });
    expect(result).to.be.equal('hǎo hào kao');
    clearAllCustomDicts();
  });

  it('[custom]custom multiple duplicated', () => {
    customPinyin({
      你好: 'mi hǎo'
    }, {
      multiple: 'add'
    });
    const result = pinyin('好', { multiple: true });
    expect(result).to.be.equal('hǎo hào');
    clearAllCustomDicts();
  });

  it('[custom]custom multiple replace', () => {
    customPinyin({
      你好: 'mi kao'
    }, {
      multiple: 'replace'
    });
    const result = pinyin('好', { multiple: true });
    expect(result).to.be.equal('kao');
    clearAllCustomDicts();
  });
});

describe('custom for polyphonic', () => {
  it('[custom]custom polyphonic1', () => {
    customPinyin({
      你好: 'mi kao'
    }, {
      polyphonic: 'add'
    });
    const result = polyphonic('好好学习');
    expect(result).to.deep.equal(['hǎo hào kao', 'hǎo hào kao', 'xué', 'xí']);
    clearAllCustomDicts();
  });
});
