import { pinyin } from '../lib/index';
import { expect, describe, it } from 'vitest';

describe('nonZh', () => {
  it('[nonZh]init', () => {
    const result1 = pinyin('我very喜欢你');
    expect(result1).to.be.equal('wǒ v e r y xǐ huan nǐ');
  });

  it('[nonZh]spaced', () => {
    const result2 = pinyin('我very喜欢你', { nonZh: 'spaced' });
    expect(result2).to.be.equal('wǒ v e r y xǐ huan nǐ');
  });

  it('[nonZh]consecutive', () => {
    const result3 = pinyin('我very喜欢你', { nonZh: 'consecutive' });
    expect(result3).to.be.equal('wǒ very xǐ huan nǐ');
  });

  it('[nonZh]removed', () => {
    const result4 = pinyin('我very喜欢你', { nonZh: 'removed' });
    expect(result4).to.be.equal('wǒ xǐ huan nǐ');
  });

  it('[nonZh]has space', () => {
    const result4 = pinyin('喜 欢');
    expect(result4).to.be.equal('xǐ   huān');
  });

  it('[nonZh]has space', () => {
    const result4 = pinyin('喜 欢', { type: 'array' });
    expect(result4).to.deep.equal(['xǐ', ' ', 'huān']);
  });

  it('[nonZh]scope regexp', () => {
    const result4 = pinyin('我very喜欢你，真的', { nonZh: 'consecutive', nonZhScope: /[a-zA-Z]/ });
    expect(result4).to.be.equal('wǒ very xǐ huan nǐ ， zhēn de');
  });
});
