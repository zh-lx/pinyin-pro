const { pinyin } = require('../dist/index');
const expect = require('chai').expect;

describe('getPinyin', () => {
  it('double symbol', () => {
    const result = pinyin('aaaa');
    expect(result).to.be.equal('aaaa');
  });

  it('length greater than 5', () => {
    const result = pinyin('赵钱孙李吧你');
    expect(result).to.be.equal('zhào qián sūn lǐ ba nǐ');
  });

  it('dict2', () => {
    const result = pinyin('阿比让');
    expect(result).to.be.equal('ā bǐ ràng');
  });
});

describe('getNumOfTone', () => {
  it('no tone', () => {
    const result = pinyin('赵钱孙李吧你b', { pattern: 'num' });
    expect(result).to.be.equal('4 2 1 3 0 3 ');
  });
});
