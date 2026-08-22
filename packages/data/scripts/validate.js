const jieba = require('../data/complete.json');

function normalizePinyin(value) {
  return value
    .replace(/(ā|á|ǎ|à)/g, 'a')
    .replace(/(ō|ó|ǒ|ò)/g, 'o')
    .replace(/(ē|é|ě|è)/g, 'e')
    .replace(/(ī|í|ǐ|ì)/g, 'i')
    .replace(/(ū|ú|ǔ|ù)/g, 'u')
    .replace(/(ǖ|ǘ|ǚ|ǜ)/g, 'ü')
    .replace(/(ń|ň|ǹ)/g, 'n')
    .replace(/ḿ|m̀/g, 'm');
}

function validateDictionary(dictionary) {
  const invalidEntries = [];

  for (const key in dictionary) {
    const entry = dictionary[key];
    const value = Array.isArray(entry) ? entry[0] : undefined;
    const reasons = [];

    if (!Array.isArray(entry)) {
      reasons.push('entry is not an array');
    } else if (typeof value !== 'string') {
      reasons.push('pinyin is not a string');
    } else {
      const pinyin = normalizePinyin(value);
      const syllableCount = pinyin.split(' ').length;
      const characterCount = Array.from(key).length;

      if (!/^[a-z\sü]+$/.test(pinyin)) {
        reasons.push('pinyin contains invalid characters');
      }
      if (syllableCount !== characterCount) {
        reasons.push(
          `expected ${characterCount} syllables but found ${syllableCount}`,
        );
      }
    }

    if (reasons.length > 0) {
      invalidEntries.push({ key, pinyin: value, reasons });
    }
  }

  return invalidEntries;
}

function runValidation(dictionary, output = console) {
  const invalidEntries = validateDictionary(dictionary);
  const entryCount = Object.keys(dictionary).length;

  if (invalidEntries.length > 0) {
    for (const { key, pinyin, reasons } of invalidEntries) {
      output.error(`${key}: ${String(pinyin)} (${reasons.join('; ')})`);
    }
    output.error(
      `Validation failed: ${invalidEntries.length} of ${entryCount} entries are invalid.`,
    );
    return 1;
  } else {
    output.log(`Validation passed: ${entryCount} entries are valid.`);
    return 0;
  }
}

if (require.main === module) {
  process.exitCode = runValidation(jieba);
}

module.exports = { normalizePinyin, runValidation, validateDictionary };
