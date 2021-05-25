const { pinyin } = require('../dist/index');
const expect = require('chai').expect;

describe('aggregate', () => {
  it('test1', () => {
    const result = pinyin('汉语拼音', { pattern: 'num', toneType: 'num' });
    expect(result).to.be.equal('4 3 1 1');
  });

  it('test2', () => {
    const result = pinyin('汉语拼音', {
      pattern: 'num',
      toneType: 'num',
      type: 'array',
    });
    expect(result).to.deep.equal(['4', '3', '1', '1']);
  });

  it('test3', () => {
    const result = pinyin('汉语拼音', { pattern: 'num', toneType: 'none' });
    expect(result).to.be.equal('4 3 1 1');
  });

  it('test4', () => {
    const result = pinyin('汉语拼音', {
      pattern: 'num',
      toneType: 'none',
      type: 'array',
    });
    expect(result).to.deep.equal(['4', '3', '1', '1']);
  });

  it('test5', () => {
    const result = pinyin('汉语拼音', { pattern: 'initial', toneType: 'num' });
    expect(result).to.be.equal('h y p y');
  });

  it('test6', () => {
    const result = pinyin('汉语拼音', {
      pattern: 'initial',
      toneType: 'num',
      type: 'array',
    });
    expect(result).to.deep.equal(['h', 'y', 'p', 'y']);
  });

  it('test7', () => {
    const result = pinyin('汉语拼音', { pattern: 'final', toneType: 'num' });
    expect(result).to.be.equal('an4 u3 in1 in1');
  });

  it('test8', () => {
    const result = pinyin('汉语拼音', {
      pattern: 'final',
      toneType: 'num',
      type: 'array',
    });
    expect(result).to.deep.equal(['an4', 'u3', 'in1', 'in1']);
  });

  it('test9', () => {
    const result = pinyin('好', {
      pattern: 'final',
      toneType: 'num',
      multiple: true,
    });
    expect(result).to.be.equal('ao3 ao4');
  });

  it('test10', () => {
    const result = pinyin('好', {
      pattern: 'final',
      toneType: 'num',
      multiple: true,
      type: 'array',
    });
    expect(result).to.deep.equal(['ao3', 'ao4']);
  });
});

describe('boundary', () => {
  it('test1', () => {
    const result = pinyin('汉语拼音');
    expect(result).to.be.equal('hàn yǔ pīn yīn');
  });

  it('test2', () => {
    const result = pinyin('汉语拼音xxx.,');
    expect(result).to.be.equal('hàn yǔ pīn yīn xxx.,');
  });

  it('test3', () => {
    const result = pinyin('汉语拼音', { type: 'array' });
    expect(result).to.deep.equal(['hàn', 'yǔ', 'pīn', 'yīn']);
  });

  it('test4', () => {
    const result = pinyin('汉语拼音xxx.,', { type: 'array' });
    expect(result).to.deep.equal(['hàn', 'yǔ', 'pīn', 'yīn', 'xxx.,']);
  });

  it('test5', () => {
    const result = pinyin('');
    expect(result).to.be.equal('');
  });

  it('test6', () => {
    const result = pinyin('', { type: 'array' });
    expect(result).to.deep.equal([]);
  });

  it('test7', () => {
    const result = pinyin('哈发生你看三零四');
    expect(result).to.be.equal('hā fā shēng nǐ kàn sān líng sì');
  });

  it('test8', () => {
    const result = pinyin('哈发生你看三零四', { type: 'array' });
    expect(result).to.deep.equal([
      'hā',
      'fā',
      'shēng',
      'nǐ',
      'kàn',
      'sān',
      'líng',
      'sì',
    ]);
  });
});

describe('multiple', () => {
  it('word', () => {
    const result = pinyin('汉语拼音', { multiple: true });
    expect(result).to.be.equal('hàn yǔ pīn yīn');
  });

  it('single', () => {
    const result = pinyin('好', { multiple: true });
    expect(result).to.be.equal('hǎo hào');
  });

  it('word-array', () => {
    const result = pinyin('汉语拼音', { multiple: true, type: 'array' });
    expect(result).to.deep.equal(['hàn', 'yǔ', 'pīn', 'yīn']);
  });

  it('single-array', () => {
    const result = pinyin('好', { multiple: true, type: 'array' });
    expect(result).to.deep.equal(['hǎo', 'hào']);
  });

  it('none-find', () => {
    const result = pinyin('a', { multiple: true, type: 'array' });
    expect(result).to.deep.equal(['a']);
  });
});

describe('pattern', () => {
  it('num', () => {
    const result = pinyin('汉语拼音', { pattern: 'num' });
    expect(result).to.be.equal('4 3 1 1');
  });

  it('num-array', () => {
    const result = pinyin('汉语拼音', { pattern: 'num', type: 'array' });
    expect(result).to.deep.equal(['4', '3', '1', '1']);
  });

  it('final', () => {
    const result = pinyin('汉语拼音', { pattern: 'final' });
    expect(result).to.be.equal('àn ǔ īn īn');
  });

  it('final-array', () => {
    const result = pinyin('汉语拼音', { pattern: 'final', type: 'array' });
    expect(result).to.deep.equal(['àn', 'ǔ', 'īn', 'īn']);
  });

  it('initial', () => {
    const result = pinyin('汉语拼音', { pattern: 'initial' });
    expect(result).to.be.equal('h y p y');
  });

  it('initial-array', () => {
    const result = pinyin('汉语拼音', { pattern: 'initial', type: 'array' });
    expect(result).to.deep.equal(['h', 'y', 'p', 'y']);
  });
});

describe('toneType', () => {
  it('num', () => {
    const result = pinyin('汉语拼音', { toneType: 'num' });
    expect(result).to.be.equal('han4 yu3 pin1 yin1');
  });

  it('num-array', () => {
    const result = pinyin('汉语拼音', { toneType: 'num', type: 'array' });
    expect(result).to.deep.equal(['han4', 'yu3', 'pin1', 'yin1']);
  });

  it('none', () => {
    const result = pinyin('汉语拼音', { toneType: 'none' });
    expect(result).to.be.equal('han yu pin yin');
  });

  it('none-array', () => {
    const result = pinyin('汉语拼音', { toneType: 'none', type: 'array' });
    expect(result).to.deep.equal(['han', 'yu', 'pin', 'yin']);
  });

  it('symbol', () => {
    const result = pinyin('汉语拼音', { toneType: 'symbol' });
    expect(result).to.be.equal('hàn yǔ pīn yīn');
  });

  it('symbol-array', () => {
    const result = pinyin('汉语拼音', { toneType: 'symbol', type: 'array' });
    expect(result).to.deep.equal(['hàn', 'yǔ', 'pīn', 'yīn']);
  });
});

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
    expect(resultNumArr).to.deep.equal(['4', '2', '1', '3', '0']);

    const resultInitial = pinyin('赵钱孙李吧', {
      pattern: 'initial',
    });
    expect(resultInitial).to.be.equal('zh q s l b');

    const resultFinal = pinyin('赵钱孙李吧', {
      pattern: 'final',
    });
    expect(resultFinal).to.be.equal('ào ián ūn ǐ a');

    const resultFirst = pinyin('赵钱孙李额', {
      pattern: 'first',
    });
    expect(resultFirst).to.be.equal('z q s l é');

    const resultFirst2 = pinyin('赵钱孙李额', {
      pattern: 'first',
      toneType: 'none',
    });
    expect(resultFirst2).to.be.equal('z q s l e');
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
