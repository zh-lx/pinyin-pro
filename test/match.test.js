const { match } = require('../');
const expect = require('chai').expect;

describe('match', () => {
  it('[match]default', () => {
    const result = match('欢迎使用汉语拼音', 'hy');
    expect(result).to.deep.equal([0, 1]);
  });

  it('[match]start and continuous', () => {
    const result = match('欢迎使用汉语拼音', 'yingshyon', {
      precision: 'start',
      continuous: true,
    });
    expect(result).to.deep.equal([1, 2, 3]);
  });

  it('[match]multiple1', () => {
    const result = match('会计', 'kj');
    expect(result).to.deep.equal([0, 1]);
  });

  it('[match]multiple2', () => {
    const result = match('会计', 'huij');
    expect(result).to.deep.equal([0, 1]);
  });

  it('[match]any', () => {
    const result = match('开会', 'kaiui', { precision: 'any' });
    expect(result).to.deep.equal([0, 1]);
  });

  it('[match]any&empty', () => {
    const result = match('开会', '', { precision: 'any' });
    expect(result).to.deep.equal(null);
  });

  it('[match]any&continuous', () => {
    const result = match('开个大会', 'kaiui', {
      precision: 'any',
      continuous: true,
    });
    expect(result).to.deep.equal(null);
  });

  it('[match]any&nonZh', () => {
    const result = match('开会', 'kaiuiaaaa', { precision: 'any' });
    expect(result).to.deep.equal(null);
  });

  it('[match]any&space', () => {
    const result = match('开      会s  啊', 'kaiuisa', { precision: 'any' });
    expect(result).to.deep.equal([0, 7, 8, 11]);
  });

  it('[match]fail with sucess', () => {
    const result = match('开会', 'kaig');
    expect(result).to.deep.equal(null);
  });

  it('[match]fail', () => {
    const result = match('开会', 'l');
    expect(result).to.deep.equal(null);
  });

  it('[match]uncontinuous', () => {
    const result = match('汉语拼音', 'hanpin');
    expect(result).to.deep.equal([0, 2]);
  });

  it('[match]basic', () => {
    const result = match('汉语拼音', 'hyupy');
    expect(result).to.deep.equal([0, 1, 2, 3]);
  });

  it('[match]first & double unicode', () => {
    const result = match('𧒽测试', 'cs');
    expect(result).to.deep.equal([2, 3]);
  });

  it('[match]start', () => {
    const result = match('欢迎使用汉语拼音', '欢yingshy', {
      precision: 'start',
    });
    expect(result).to.deep.equal([0, 1, 2, 3]);
  });

  it('[match]first&space', () => {
    const result = match('𧒽测 试', 'c s');
    expect(result).to.deep.equal([2, 4]);
  });

  it('[match]nonZh match', () => {
    const result = match('测uuuuuuuuuu试', 'cuuuuuu');
    expect(result).to.deep.equal([0, 1, 2, 3, 4, 5, 6]);
  });

  it('[match]lastPrecision every fail', () => {
    const result = match('汉语拼音', 'hanyupinyi', { lastPrecision: 'every' });
    expect(result).to.deep.equal(null);
  });

  it('[match]lastPrecision every success', () => {
    const result = match('汉语拼音', 'hanyupinyin', { lastPrecision: 'every' });
    expect(result).to.deep.equal([0, 1, 2, 3]);
  });

  it('[match]lastPrecision first fail', () => {
    const result = match('汉语拼音', 'hanyupinyi', { lastPrecision: 'first' });
    expect(result).to.deep.equal(null);
  });

  it('[match]lastPrecision first success', () => {
    const result = match('汉语拼音', 'hanyupiny', { lastPrecision: 'first' });
    expect(result).to.deep.equal([0, 1, 2, 3]);
  });

  it('[match]lastPrecision any', () => {
    const result = match('汉语拼音', 'hanyupini', { lastPrecision: 'any' });
    expect(result).to.deep.equal([0, 1, 2, 3]);
  });

  it('[match]lastPrecision ignore space', () => {
    const result = match('汉语 拼音', 'hanyu pini', { lastPrecision: 'any', space: 'ignore' });
    expect(result).to.deep.equal([0, 1, 3, 4]);
  });

  it('[match]lastPrecision preserve space', () => {
    const result = match('汉语 拼音', 'hanyu pini', { lastPrecision: 'any', space: 'preserve' });
    expect(result).to.deep.equal([0, 1, 2, 3, 4]);
  });

  it('[match]precision preserve space', () => {
    const result = match('汉语 拼音', 'hanyu pini', { precision: 'any', space: 'preserve' });
    expect(result).to.deep.equal([0, 1, 2, 3, 4]);
  });

  it('[match]precision not continuous', () => {
    const result = match('汉语 拼音', 'hanyu yin', { precision: 'any', space: 'preserve', continuous: true });
    expect(result).to.deep.equal(null);
  });

  it('[match]precision continuous', () => {
    const result = match('汉语 拼音', 'hanyu pinyin', { precision: 'any', space: 'preserve', continuous: true });
    expect(result).to.deep.equal([0, 1, 2, 3, 4]);
  });

  it('[match]lastPrecision none', () => {
    // @ts-ignore
    const result = match('汉语拼音', 'hanyupini', { lastPrecision: 'none' });
    expect(result).to.deep.equal(null);
  });

  it('[match]insensitive', () => {
    const result = match('汉语KK拼音', 'hanyukkpinyin');
    expect(result).to.deep.equal([0, 1, 2, 3, 4, 5]);

    const result1 = match('汉语KK拼音', 'hanyukkpinyin', {
      insensitive: false,
    });
    expect(result1).to.deep.equal(null);
  });
});
