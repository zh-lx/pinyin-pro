import { pinyin } from '../lib/index';
import { expect, describe, it } from 'vitest';

describe('[get-num-of-tone]getNumOfTone', () => {
  it('no tone', () => {
    const result = pinyin('赵钱孙李吧你b', { pattern: 'num' });
    expect(result).to.be.equal('4 2 1 3 0 3 ');
  });
});
