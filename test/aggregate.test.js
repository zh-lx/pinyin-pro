// @ts-ignore
const { pinyin } = require('../dist/index');

test('aggregate1', () => {
  const result = pinyin('汉语拼音', { pattern: 'num', toneType: 'num' });
  expect(result).toBe('4 3 1 1');
});

test('aggregate2', () => {
  const result = pinyin('汉语拼音', {
    pattern: 'num',
    toneType: 'num',
    type: 'array',
  });
  expect(result).toStrictEqual(['4', '3', '1', '1']);
});

test('aggregate3', () => {
  const result = pinyin('汉语拼音', { pattern: 'num', toneType: 'none' });
  expect(result).toBe('4 3 1 1');
});

test('aggregate4', () => {
  const result = pinyin('汉语拼音', {
    pattern: 'num',
    toneType: 'none',
    type: 'array',
  });
  expect(result).toStrictEqual(['4', '3', '1', '1']);
});

test('aggregate5', () => {
  const result = pinyin('汉语拼音', { pattern: 'initial', toneType: 'num' });
  expect(result).toBe('h y p y');
});

test('aggregate6', () => {
  const result = pinyin('汉语拼音', {
    pattern: 'initial',
    toneType: 'num',
    type: 'array',
  });
  expect(result).toStrictEqual(['h', 'y', 'p', 'y']);
});

test('aggregate7', () => {
  const result = pinyin('汉语拼音', { pattern: 'final', toneType: 'num' });
  expect(result).toBe('an4 u3 in1 in1');
});

test('aggregate8', () => {
  const result = pinyin('汉语拼音', {
    pattern: 'final',
    toneType: 'num',
    type: 'array',
  });
  expect(result).toStrictEqual(['an4', 'u3', 'in1', 'in1']);
});

test('aggregate9', () => {
  const result = pinyin('好', {
    pattern: 'final',
    toneType: 'num',
    multiple: true,
  });
  expect(result).toBe('ao3 ao4');
});

test('aggregate10', () => {
  const result = pinyin('好', {
    pattern: 'final',
    toneType: 'num',
    multiple: true,
    type: 'array',
  });
  expect(result).toStrictEqual(['ao3', 'ao4']);
});
