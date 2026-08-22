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
      reasons: ['pinyin has an invalid format'],
    },
  ]);
});

test('requires one ASCII space between pinyin syllables', () => {
  for (const [pinyin, syllableCount] of [
    ['zhōng  guó', 3],
    ['zhōng\tguó', 1],
    ['zhōng\nguó', 1],
  ]) {
    assert.deepEqual(validateDictionary({ 中国: [pinyin] }), [
      {
        key: '中国',
        pinyin,
        reasons: [
          'pinyin has an invalid format',
          `expected 2 syllables but found ${syllableCount}`,
        ],
      },
    ]);
  }
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

test('ignores inherited enumerable properties', () => {
  const dictionary = Object.create({
    inherited: ['yī'],
  });
  dictionary.一 = ['yī'];

  assert.deepEqual(validateDictionary(dictionary), []);
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
