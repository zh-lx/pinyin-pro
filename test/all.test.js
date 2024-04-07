const { pinyin, addDict } = require('../');
const expect = require('chai').expect;

const internalDict = require("../dist/dict.json");

addDict(internalDict);

describe('all', () => {
  it('[all]test all', () => {
    const result = pinyin('汉语拼音', {
      type: 'all',
    });
    expect(result).to.deep.equal([
      {
        origin: '汉',
        pinyin: 'hàn',
        initial: 'h',
        final: 'àn',
        first: 'h',
        finalHead: '',
        finalBody: 'à',
        finalTail: 'n',
        num: 4,
        isZh: true,
      },
      {
        origin: '语',
        pinyin: 'yǔ',
        initial: 'y',
        final: 'ǔ',
        first: 'y',
        finalHead: '',
        finalBody: 'ǔ',
        finalTail: '',
        num: 3,
        isZh: true,
      },
      {
        origin: '拼',
        pinyin: 'pīn',
        initial: 'p',
        final: 'īn',
        first: 'p',
        finalHead: '',
        finalBody: 'ī',
        finalTail: 'n',
        num: 1,
        isZh: true,
      },
      {
        origin: '音',
        pinyin: 'yīn',
        initial: 'y',
        final: 'īn',
        first: 'y',
        finalHead: '',
        finalBody: 'ī',
        finalTail: 'n',
        num: 1,
        isZh: true,
      },
    ]);
  });

  it('[all]test all with nonZh', () => {
    const result = pinyin('汉a𧒽音', {
      type: 'all',
    });
    expect(result).to.deep.equal([
      {
        origin: '汉',
        pinyin: 'hàn',
        initial: 'h',
        final: 'àn',
        first: 'h',
        finalHead: '',
        finalBody: 'à',
        finalTail: 'n',
        num: 4,
        isZh: true,
      },
      {
        origin: 'a',
        pinyin: '',
        initial: '',
        final: '',
        first: '',
        finalHead: '',
        finalBody: '',
        finalTail: '',
        num: 0,
        isZh: false,
      },
      {
        origin: '𧒽',
        pinyin: '',
        initial: '',
        final: '',
        first: '',
        finalHead: '',
        finalBody: '',
        finalTail: '',
        num: 0,
        isZh: false,
      },
      {
        origin: '音',
        pinyin: 'yīn',
        initial: 'y',
        final: 'īn',
        first: 'y',
        finalHead: '',
        finalBody: 'ī',
        finalTail: 'n',
        num: 1,
        isZh: true,
      },
    ]);
  });

  it('[all]test all removeNonZh', () => {
    const result = pinyin('汉a𧒽音', {
      type: 'all',
      nonZh: 'removed',
    });
    expect(result).to.deep.equal([
      {
        origin: '汉',
        pinyin: 'hàn',
        initial: 'h',
        final: 'àn',
        first: 'h',
        finalHead: '',
        finalBody: 'à',
        finalTail: 'n',
        num: 4,
        isZh: true,
      },
      {
        origin: '音',
        pinyin: 'yīn',
        initial: 'y',
        final: 'īn',
        first: 'y',
        finalHead: '',
        finalBody: 'ī',
        finalTail: 'n',
        num: 1,
        isZh: true,
      },
    ]);
  });

  it('[all]test all consecutive nonZh', () => {
    const result = pinyin('汉a𧒽音', {
      type: 'all',
      nonZh: 'consecutive',
    });
    expect(result).to.deep.equal([
      {
        origin: '汉',
        pinyin: 'hàn',
        initial: 'h',
        final: 'àn',
        first: 'h',
        finalHead: '',
        finalBody: 'à',
        finalTail: 'n',
        num: 4,
        isZh: true,
      },
      {
        origin: 'a𧒽',
        pinyin: '',
        initial: '',
        final: '',
        first: '',
        finalHead: '',
        finalBody: '',
        finalTail: '',
        num: 0,
        isZh: false,
      },
      {
        origin: '音',
        pinyin: 'yīn',
        initial: 'y',
        final: 'īn',
        first: 'y',
        finalHead: '',
        finalBody: 'ī',
        finalTail: 'n',
        num: 1,
        isZh: true,
      },
    ]);
  });
});
