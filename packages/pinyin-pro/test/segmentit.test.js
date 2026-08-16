import { pinyin, addDict, customPinyin } from '../lib/index';
import { expect, describe, it, vi } from 'vitest';
import { AC, scheduleAcBuild } from '../lib/common/segmentit';

const completeDict = require("@pinyin-pro/data/complete.json");

addDict(completeDict);

describe('segmentit', () => {
  it('[segmentit]match after root miss and fail fallback', () => {
    const ac = new AC();
    const createPattern = (zh, pinyin) => ({
      zh,
      pinyin,
      probability: 1,
      length: zh.length,
      priority: 1,
      dict: 'test',
    });
    ac.build([
      createPattern('中华', 'zhōng huá'),
      createPattern('华人', 'huá rén'),
    ]);

    const result = ac.match('甲中华人', 'off').map(({ zh, index }) => ({
      zh,
      index,
    }));

    expect(result).toEqual([
      { zh: '中华', index: 1 },
      { zh: '华人', index: 2 },
    ]);

    const trieOnly = new AC();
    trieOnly.buildTrie([createPattern('中华', 'zhōng huá')]);
    expect(
      trieOnly.match('中甲中华', 'off').map(({ zh, index }) => ({ zh, index })),
    ).toEqual([{ zh: '中华', index: 2 }]);
    expect(trieOnly.match('中中华', 'off')).toEqual([]);
  });

  it('[segmentit]schedule idle build when requestIdleCallback is available', () => {
    const requestIdleCallback = vi.fn((callback) => callback());
    vi.stubGlobal('requestIdleCallback', requestIdleCallback);

    scheduleAcBuild();

    expect(requestIdleCallback).toHaveBeenCalledOnce();
    vi.unstubAllGlobals();
  });

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
