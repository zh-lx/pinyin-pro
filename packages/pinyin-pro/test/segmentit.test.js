import { pinyin, addDict, customPinyin } from '../lib/index';
import { expect, describe, it } from 'vitest';

const completeDict = require("@pinyin-pro/data/complete.json");

addDict(completeDict);

describe('segmentit', () => {
  it('[surname]segmentit-max-probability', () => {
    const result = pinyin('小明硕士毕业于中国科学院计算所，后在日本京都大学深造');
    expect(result).to.be.equal('xiǎo míng shuò shì bì yè yú zhōng guó kē xué yuàn jì suàn suǒ ， hòu zài rì běn jīng dū dà xué shēn zào');
  });

  it('[surname]segmentit-reverse-max-match', () => {
    customPinyin({
      京都: 'jīng dū',
      士: 'shì',
    });
    const result = pinyin('小明硕士毕业于中国科学院计算所，后在日本京都大学深造', { segmentit: 1 });
    expect(result).to.be.equal('xiǎo míng shuò shì bì yè yú zhōng guó kē xué yuàn jì suàn suǒ ， hòu zài rì běn jīng dū dà xué shēn zào');
  });

  it('[surname]segmentit:min-segmentit', () => {
    const result = pinyin('小明硕士毕业于中国科学院计算所，后在日本京都大学深造', { segmentit: 3 });
    expect(result).to.be.equal('xiǎo míng shuò shì bì yè yú zhōng guó kē xué yuàn jì suàn suǒ ， hòu zài rì běn jīng dū dà xué shēn zào');
  });


  it('[surname]segmentit with custom', () => {
    customPinyin({
      京都: 'jīng dū',
      士: 'shì',
    });
    const result = pinyin('小明硕士毕业于中国科学院计算所，后在日本京都大学深造', { segmentit: 3, mode: 'surname' });
    expect(result).to.be.equal('xiǎo míng shuò shì bì yè yú zhōng guó kē xué yuàn jì suàn suǒ ， hòu zài rì běn jīng dū dà xué shēn zào');
  });
});
