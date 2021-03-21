// @ts-ignore
const { pinyin } = require('../dist/cjs/index');

test('pattern-num', () => {
  const result = pinyin('汉语拼音', { pattern: 'num' });
  expect(result).toBe('4 3 1 1');
});

test('pattern-num-array', () => {
  const result = pinyin('汉语拼音', { pattern: 'num', type: 'array' });
  expect(result).toStrictEqual(['4', '3', '1', '1']);
});

test('pattern-final', () => {
  const result = pinyin('汉语拼音', { pattern: 'final' });
  expect(result).toBe('àn ǔ īn īn');
});

test('pattern-final-array', () => {
  const result = pinyin('汉语拼音', { pattern: 'final', type: 'array' });
  expect(result).toStrictEqual(['àn', 'ǔ', 'īn', 'īn']);
});

test('pattern-initial', () => {
  const result = pinyin('汉语拼音', { pattern: 'initial' });
  expect(result).toBe('h y p y');
});

test('pattern-initial-array', () => {
  const result = pinyin('汉语拼音', { pattern: 'initial', type: 'array' });
  expect(result).toStrictEqual(['h', 'y', 'p', 'y']);
});
