const { pinyin } = require('../');
const expect = require('chai').expect;

describe('final', () => {
  it('[final]head', () => {
    const result = pinyin('广', {
      pattern: 'finalHead',
    });
    expect(result).to.deep.equal('u');
  });

  it('[final]body', () => {
    const result1 = pinyin('广', {
      pattern: 'finalBody',
    });
    expect(result1).to.deep.equal('ǎ');
  });

  it('[final]tail', () => {
    const result2 = pinyin('广', {
      pattern: 'finalTail',
    });
    expect(result2).to.deep.equal('ng');
  });

  it('[final]no head', () => {
    const result4 = pinyin('敢', {
      pattern: 'finalHead',
    });
    expect(result4).to.deep.equal('');
  });

  it('[final]no head body', () => {
    const result5 = pinyin('敢', {
      pattern: 'finalBody',
    });
    expect(result5).to.deep.equal('ǎ');
  });

  it('[final]no tail', () => {
    const result6 = pinyin('哈', {
      pattern: 'finalTail',
    });
    expect(result6).to.deep.equal('');
  });

  it('[final]special-un', () => {
    const result = pinyin('群', {
      pattern: 'final',
    });
    expect(result).to.deep.equal('ǘn');
  });

  it('[final]special-u', () => {
    const result1 = pinyin('局', {
      pattern: 'final',
    });
    expect(result1).to.deep.equal('ǘ');
  });

  it('[final]special-uan', () => {
    const result2 = pinyin('选', {
      pattern: 'final',
    });
    expect(result2).to.deep.equal('üǎn');
  });

  it('[final]special-ue', () => {
    const result3 = pinyin('却', {
      pattern: 'final',
    });
    expect(result3).to.deep.equal('üè');
  });
});
