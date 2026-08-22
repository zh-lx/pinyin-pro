const assert = require('node:assert/strict');
const test = require('node:test');
const { runValidation, validateDictionary } = require('./validate');

test('accepts one non-BMP character with one pinyin syllable', () => {
  const invalidEntries = validateDictionary({ '𠀀': ['hē'] });

  assert.deepEqual(invalidEntries, []);
});

test('reports invalid characters and syllable counts', () => {
  const invalidEntries = validateDictionary({
    中国: ['zhōng'],
    文: ['wén1'],
  });

  assert.deepEqual(invalidEntries, [
    {
      key: '中国',
      pinyin: 'zhōng',
      reasons: ['expected 2 syllables but found 1'],
    },
    {
      key: '文',
      pinyin: 'wén1',
      reasons: ['pinyin contains invalid characters'],
    },
  ]);
});

test('reports malformed dictionary entries', () => {
  const invalidEntries = validateDictionary({
    一: 'yī',
    二: [],
  });

  assert.deepEqual(invalidEntries, [
    {
      key: '一',
      pinyin: undefined,
      reasons: ['entry is not an array'],
    },
    {
      key: '二',
      pinyin: undefined,
      reasons: ['pinyin is not a string'],
    },
  ]);
});

test('returns a failure exit code and prints a summary for invalid data', () => {
  const errors = [];
  const exitCode = runValidation(
    { 中国: ['zhōng'] },
    { error: (message) => errors.push(message), log: () => {} },
  );

  assert.equal(exitCode, 1);
  assert.deepEqual(errors, [
    '中国: zhōng (expected 2 syllables but found 1)',
    'Validation failed: 1 of 1 entries are invalid.',
  ]);
});
