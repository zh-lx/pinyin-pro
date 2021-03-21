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

test('test5', () => {
  const result = pinyin('');
  expect(result).toBe('');
});

test('test6', () => {
  const result = pinyin('', { type: 'array' });
  expect(result).toStrictEqual([]);
});

test('test7', () => {
  const result = pinyin('哈发生你看三零四aaa');
  expect(result).toBe('hā fā shēng nǐ kàn sān líng sì aaa');
});

test('test8', () => {
  const result = pinyin('哈发生你看三零四aaa', { type: 'array' });
  expect(result).toStrictEqual([
    'hā',
    'fā',
    'shēng',
    'nǐ',
    'kàn',
    'sān',
    'líng',
    'sì',
    'aaa',
  ]);
});
