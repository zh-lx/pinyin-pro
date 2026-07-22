import { pinyin } from '../lib/index';
import { expect, describe, it } from 'vitest';

describe('v', () => {
  it('[v]no v', () => {
    const result1 = pinyin('吕布');
    expect(result1).to.be.equal('lǚ bù');
  });

  it('[v]no v toneType none', () => {
    const result2 = pinyin('吕布', { toneType: 'none' });
    expect(result2).to.be.equal('lü bu');
  });

  it('[v]v toneType none', () => {
    const result3 = pinyin('吕布', { toneType: 'none', v: true });
    expect(result3).to.be.equal('lv bu');
  });

  it('[v]v', () => {
    const result4 = pinyin('吕布', { v: true });
    expect(result4).to.be.equal('lǚ bù');
  });

  it('[v]nonZh', () => {
    const result4 = pinyin('吕布ü', { toneType: 'none', v: true });
    expect(result4).to.be.equal('lv bu ü');
  });

  it('[v]string', () => {
    const result4 = pinyin('吕和平', { toneType: 'none', v: 'yu' });
    expect(result4).to.be.equal('lyu he ping');
  });
});
