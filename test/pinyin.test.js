const { pinyin } = require('../dist/index');
const expect = require('chai').expect;

describe('pinyinFn', () => {
  it('not string type', () => {
    const result = pinyin(2222);
    expect(result).to.be.equal(2222);
  });

  it('empty string', () => {
    const resultStr = pinyin('');
    const resultArr = pinyin('', { type: 'array' });
    expect(resultStr).to.be.equal('');
    expect(resultArr).to.deep.equal([]);
  });

  it('origin', () => {
    const result = pinyin('赵钱孙李吧');
    expect(result).to.be.equal('zhào qián sūn lǐ ba');
  });

  it('multiple', () => {
    const result = pinyin('好', { multiple: true });
    expect(result).to.be.equal('hǎo hào');
  });

  it('pattern', () => {
    const resultNumStr = pinyin('赵钱孙李吧', { pattern: 'num' });
    expect(resultNumStr).to.be.equal('4 2 1 3 0');

    const resultNumArr = pinyin('赵钱孙李吧', {
      pattern: 'num',
      type: 'array',
    });
    expect(resultNumArr).to.deep.equal([4, 2, 1, 3, 0]);

    const resultInitial = pinyin('赵钱孙李吧', {
      pattern: 'initial',
    });
    expect(resultInitial).to.be.equal('zh q s l b');

    const resultFinal = pinyin('赵钱孙李吧', {
      pattern: 'final',
    });
    expect(resultFinal).to.be.equal('ào ián ūn ǐ a');
  });

  it('toneType', () => {
    const resultNone = pinyin('赵钱孙李吧', { toneType: 'none' });
    expect(resultNone).to.be.equal('zhao qian sun li ba');

    const resultNum = pinyin('赵钱孙李吧', { toneType: 'num' });
    expect(resultNum).to.be.equal('zhao4 qian2 sun1 li3 ba0');
  });

  it('array', () => {
    const result = pinyin('赵钱孙李吧', { type: 'array' });
    expect(result).to.deep.equal(['zhào', 'qián', 'sūn', 'lǐ', 'ba']);
  });
});
