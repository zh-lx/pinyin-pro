import { pinyin } from '../lib/index';
import { expect, describe, it } from 'vitest';

describe('getPinyin', () => {
  it('[get-pinyin]double symbol', () => {
    const result = pinyin('aaaa');
    expect(result).to.be.equal('a a a a');
  });

  it('[get-pinyin]length greater than 5', () => {
    const result = pinyin('赵钱孙李吧你');
    expect(result).to.be.equal('zhào qián sūn lǐ ba nǐ');
  });

  it('[get-pinyin]dict2', () => {
    const result = pinyin('阿比让');
    expect(result).to.be.equal('ā bǐ ràng');
  });
});
