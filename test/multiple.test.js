// @ts-ignore
const { pinyin } = require('../dist/cjs/index');

test('multiple-word', () => {
  const result = pinyin('汉语拼音', { multiple: true });
  expect(result).toBe('hàn yǔ pīn yīn');
});

test('multiple-single', () => {
  const result = pinyin('好', { multiple: true });
  expect(result).toBe('hǎo hào');
});

test('multiple-word-array', () => {
  const result = pinyin('汉语拼音', { multiple: true, type: 'array' });
  expect(result).toStrictEqual(['hàn', 'yǔ', 'pīn', 'yīn']);
});

test('multiple-single-array', () => {
  const result = pinyin('好', { multiple: true, type: 'array' });
  expect(result).toStrictEqual(['hǎo', 'hào']);
});
