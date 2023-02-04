const { match } = require('../');
const expect = require('chai').expect;

describe('match', () => {
  it('[match]match1', () => {
    const result = match('欢迎使用汉语拼音', 'hy');
    expect(result).to.deep.equal([0, 1]);
  });

  it('[match]match2', () => {
    const result = match('欢迎使用汉语拼音', 'yingshy');
    expect(result).to.deep.equal([1, 2, 3]);
  });

  it('[match]match3', () => {
    const result = match('会计', 'kj');
    expect(result).to.deep.equal([0, 1]);
  });

  it('[match]match4', () => {
    const result = match('会计', 'huij');
    expect(result).to.deep.equal([0, 1]);
  });

  it('[match]match5', () => {
    const result = match('开会', 'kaiui');
    expect(result).to.deep.equal([0, 1]);
  });

  it('[match]match6', () => {
    const result = match('开会', 'kaig');
    expect(result).to.deep.equal(null);
  });

  it('[match]match7', () => {
    const result = match('开会', 'l');
    expect(result).to.deep.equal(null);
  });

  it('[match]match8', () => {
    const result = match('汉语拼音', 'hanpin');
    expect(result).to.deep.equal([0, 2]);
  });

  it('[match]match9', () => {
    const result = match('汉语拼音', 'hyupy');
    expect(result).to.deep.equal([0, 1, 2, 3]);
  });

  it('[match]match10', () => {
    const result = match('𧒽测试', 'cs');
    expect(result).to.deep.equal([2, 3]);
  });

  it('[match]match11', () => {
    const result = match('欢迎使用汉语拼音', '欢yingshy拼');
    expect(result).to.deep.equal([0, 1, 2, 3, 6]);
  });
});
