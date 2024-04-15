import { pinyin } from '../lib/index';
import { expect, describe, it } from 'vitest';

describe('separator', () => {
  it('[separator]分割符', () => {
    const result = pinyin('汉语拼音', { separator: '-' });
    expect(result).to.be.equal('hàn-yǔ-pīn-yīn');
  });
});
