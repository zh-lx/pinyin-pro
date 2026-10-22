import { pinyin, addDict, customPinyin } from '../lib/index';
import { expect, describe, it, vi } from 'vitest';
import { AC, scheduleAcBuild } from '../lib/common/segmentit';

const completeDict = require("@pinyin-pro/data/complete.json");

addDict(completeDict);

describe('segmentit', () => {
  it.each([1, 42, 20261023])('[segmentit]random differential matching, seed %s', (seed) => {
    let state = seed;
    const random = (limit) => {
      state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
      return Math.floor(state / 4294967296 * limit);
    };
    const alphabet = ['甲', '乙', '丙', '𠮷'];
    const word = (length) => Array.from({ length }, () => alphabet[random(alphabet.length)]).join('');
    for (let trial = 0; trial < 20; trial++) {
      const words = [...new Set(Array.from({ length: 20 }, () => word(1 + random(5))))];
      const texts = [word(40), words.join(''), words.join('外')];
      for (let order = 0; order < 3; order++) {
        const shuffled = [...words];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = random(i + 1);
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        const ac = new AC();
        const active = [];
        for (const zh of shuffled) {
          active.push(Array.from(zh));
          ac.build([{ zh, pinyin: zh, probability: 1, length: Array.from(zh).length, priority: 1, dict: 'random' }]);
          for (const text of texts) {
            const chars = Array.from(text);
            const expected = [];
            for (const pattern of active) {
              for (let index = 0; index <= chars.length - pattern.length; index++) {
                if (pattern.every((char, offset) => chars[index + offset] === char)) {
                  expected.push(`${index}:${pattern.join('')}`);
                }
              }
            }
            const context = JSON.stringify({ seed, trial, order, active, text });
            expect(ac.match(text, 'off').map(({ zh, index }) => `${index}:${zh}`).sort(), context).toEqual(expected.sort());
          }
        }
      }
    }
  });

  it.each([
    ['甲乙丙', '乙丙', '丙'],
    ['丙', '乙丙', '甲乙丙'],
    ['乙丙', '甲乙丙', '丙'],
    ['甲乙丙', '丙', '乙丙'],
    ['丙', '甲乙丙', '乙丙'],
    ['乙丙', '丙', '甲乙丙'],
  ])('[segmentit]incremental suffixes: %s, %s, %s', (...words) => {
    const ac = new AC();
    for (const zh of words) {
      ac.build([{ zh, pinyin: zh, probability: 1, length: zh.length, priority: 1, dict: zh }]);
    }
    expect(ac.match('甲乙丙', 'off').map(({ zh, index }) => ({ zh, index }))).toEqual([
      { zh: '甲乙丙', index: 0 },
      { zh: '乙丙', index: 1 },
      { zh: '丙', index: 2 },
    ]);
  });

  it('[segmentit]matches a direct search after each dictionary update', () => {
    const ac = new AC();
    const words = ['甲乙丙', '乙丙丁', '丙丁', '丁', '乙丙', '丙', '甲乙', '乙', '𠮷乙', '乙𠮷', '𠮷'];
    const text = '甲乙丙丁甲甲乙𠮷乙丙丁';
    const chars = Array.from(text);
    const active = new Set();
    const check = () => {
      const expected = [];
      for (const zh of active) {
        const length = Array.from(zh).length;
        for (let index = 0; index <= chars.length - length; index++) {
          if (chars.slice(index, index + length).join('') === zh) {
            expected.push(`${index}:${zh}`);
          }
        }
      }
      expect(ac.match(text, 'off').map(({ zh, index }) => `${index}:${zh}`).sort()).toEqual(expected.sort());
    };
    for (const zh of words) {
      ac.build([{ zh, pinyin: zh, probability: 1, length: Array.from(zh).length, priority: 1, dict: zh }]);
      active.add(zh);
      check();
    }
    ac.build([]);
    check();
    for (const zh of words) {
      ac.removeDict(zh);
      active.delete(zh);
      check();
    }
  });

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

  it('[segmentit]matches suffixes through each fail pointer depth', () => {
    const ac = new AC();
    const patterns = ['甲乙丙', '乙丙', '丙'].map((zh) => ({
      zh,
      pinyin: '',
      probability: 1,
      length: zh.length,
      priority: 1,
      dict: 'test',
    }));
    ac.build(patterns);

    expect(ac.match('甲乙丙', 'off').map(({ zh, index }) => ({ zh, index }))).toEqual([
      { zh: '甲乙丙', index: 0 },
      { zh: '乙丙', index: 1 },
      { zh: '丙', index: 2 },
    ]);
  });

  it('[segmentit]schedule idle build when requestIdleCallback is available', () => {
    const requestIdleCallback = vi.fn((callback) => callback());
    vi.stubGlobal('requestIdleCallback', requestIdleCallback);

    scheduleAcBuild();

    expect(requestIdleCallback).toHaveBeenCalledOnce();
    vi.unstubAllGlobals();
  });

  it('[segmentit]keep AC build lazy without requestIdleCallback', () => {
    const setTimeout = vi.spyOn(globalThis, 'setTimeout');
    vi.stubGlobal('requestIdleCallback', undefined);

    scheduleAcBuild();

    expect(setTimeout).not.toHaveBeenCalled();
    setTimeout.mockRestore();
    vi.unstubAllGlobals();
  });

  it('[segmentit]ignore scheduling errors during initialization', () => {
    vi.stubGlobal('requestIdleCallback', () => {
      throw new Error('timers are not allowed in global scope');
    });

    expect(() => scheduleAcBuild()).not.toThrow();
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
