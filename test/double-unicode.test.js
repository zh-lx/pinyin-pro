const { pinyin } = require('../');
const expect = require('chai').expect;

describe('double unicode', () => {
  it('[double unicode]base', () => {
    const result1 = pinyin('𧒽');
    expect(result1).to.be.equal('𧒽');
  });

  it('[double unicode]with pinyin', () => {
    const result2 = pinyin('𧒽测试');
    expect(result2).to.be.equal('𧒽 cè shì');
  });

  it('[double unicode]dpdp', () => {
    const result3 = pinyin('𧒽测试𧒽测试', {});
    expect(result3).to.be.equal('𧒽 cè shì 𧒽 cè shì');
  });

  it('[double unicode]dp consecutive', () => {
    const result4 = pinyin('𧒽测试', { nonZh: 'consecutive' });
    expect(result4).to.be.equal('𧒽 cè shì');
  });

  it('[double unicode]dpdpdp consecutive', () => {
    const result5 = pinyin('测试a𧒽𧒽a测试a𧒽𧒽a测试', {
      nonZh: 'consecutive',
    });
    expect(result5).to.be.equal('cè shì a𧒽𧒽a cè shì a𧒽𧒽a cè shì');
  });
});
