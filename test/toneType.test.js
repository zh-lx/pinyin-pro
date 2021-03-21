// @ts-ignore
const { pinyin } = require('../dist/index');

test('toneType-num', () => {
  const result = pinyin('汉语拼音', { toneType: 'num' });
  expect(result).toBe('han4 yu3 pin1 yin1');
});

test('toneType-num-array', () => {
  const result = pinyin('汉语拼音', { toneType: 'num', type: 'array' });
  expect(result).toStrictEqual(['han4', 'yu3', 'pin1', 'yin1']);
});

test('toneType-none', () => {
  const result = pinyin('汉语拼音', { toneType: 'none' });
  expect(result).toBe('han yu pin yin');
});

test('toneType-none-array', () => {
  const result = pinyin('汉语拼音', { toneType: 'none', type: 'array' });
  expect(result).toStrictEqual(['han', 'yu', 'pin', 'yin']);
});

test('toneType-symbol', () => {
  const result = pinyin('汉语拼音', { typeTone: 'symbol' });
  expect(result).toBe('hàn yǔ pīn yīn');
});

test('toneType-symbol-array', () => {
  const result = pinyin('汉语拼音', { typeTone: 'symbol', type: 'array' });
  expect(result).toStrictEqual(['hàn', 'yǔ', 'pīn', 'yīn']);
});
