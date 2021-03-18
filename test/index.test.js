// @ts-ignore
const { pinyin } = require('../dist/index');

test('test1', () => {
  const result = pinyin('汉语拼音');
  expect(result).toBe('hàn yǔ pīn yīn');
});

test('test2', () => {
  const result = pinyin('汉语拼音xxx.,');
  expect(result).toBe('hàn yǔ pīn yīn xxx.,');
});

test('test3', () => {
  const result = pinyin('汉语拼音', { type: 'array' });
  expect(result).toStrictEqual(['hàn', 'yǔ', 'pīn', 'yīn']);
});

test('test4', () => {
  const result = pinyin('汉语拼音xxx.,', { type: 'array' });
  expect(result).toStrictEqual(['hàn', 'yǔ', 'pīn', 'yīn', 'xxx.,']);
});
