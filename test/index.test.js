// @ts-ignore
const { pinyin } = require('../dist/index');

test('test1', () => {
  const result = pinyin('汉语拼音');
  expect(result).toBe('hàn yǔ pīn yīn');
});

test('test2', () => {
  const result = pinyin('汉语拼音', { pattern: 'num' });
  expect(result).toBe('4 3 1 1');
});

test('test3', () => {
  const result = pinyin('汉语拼音', { pattern: 'final' });
  expect(result).toBe('àn ǔ īn īn');
});

test('test4', () => {
  const result = pinyin('汉语拼音', { pattern: 'initial' });
  expect(result).toBe('h y p y');
});

test('test5', () => {
  const result = pinyin('汉语拼音', { toneType: 'num' });
  expect(result).toBe('han4 yu3 pin1 yin1');
});

test('test6', () => {
  const result = pinyin('汉语拼音', { toneType: 'none' });
  expect(result).toBe('han yu pin yin');
});

test('test7', () => {
  const result = pinyin('汉语拼音', { typeTone: 'symbol' });
  expect(result).toBe('hàn yǔ pīn yīn');
});

test('test8', () => {
  const result = pinyin('汉语拼音', { pattern: 'num', toneType: 'num' });
  expect(result).toBe('4 3 1 1');
});

test('test9', () => {
  const result = pinyin('汉语拼音', { pattern: 'num', toneType: 'none' });
  expect(result).toBe('4 3 1 1');
});

test('test10', () => {
  const result = pinyin('汉语拼音', { pattern: 'initial', toneType: 'num' });
  expect(result).toBe('h y p y');
});

test('test11', () => {
  const result = pinyin('汉语拼音', { pattern: 'final', toneType: 'num' });
  expect(result).toBe('an4 u3 in1 in1');
});

test('test12', () => {
  const result = pinyin('汉语拼音', { multiple: true });
  expect(result).toBe('hàn yǔ pīn yīn');
});

test('test13', () => {
  const result = pinyin('好', { multiple: true });
  expect(result).toBe('hǎo hào');
});

test('test14', () => {
  const result = pinyin('好', {
    pattern: 'final',
    toneType: 'num',
    multiple: true,
  });
  expect(result).toBe('ao3 ao4');
});

test('test15', () => {
  const result = pinyin('汉语拼音xxx.,');
  expect(result).toBe('hàn yǔ pīn yīn xxx.,');
});
