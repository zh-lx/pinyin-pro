const { pinyin } = require('../');
const expect = require('chai').expect;

describe('segmentit', () => {
  it('[surname]segmentit', () => {
    const result = pinyin('小明硕士毕业于中国科学院计算所，后在日本京都大学深造');
    expect(result).to.be.equal('xiǎo míng shuò shì bì yè yú zhōng guó kē xué yuàn jì suàn suǒ ， hòu zài rì běn jīng dū dà xué shēn zào');
  });
});
