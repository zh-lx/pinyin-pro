const jieba = require('../data/complete.json')

for(let key in jieba) {
  const pinyin = jieba[key][0]
    .replace(/(ā|á|ǎ|à)/g, 'a')
    .replace(/(ō|ó|ǒ|ò)/g, 'o')
    .replace(/(ē|é|ě|è)/g, 'e')
    .replace(/(ī|í|ǐ|ì)/g, 'i')
    .replace(/(ū|ú|ǔ|ù)/g, 'u')
    .replace(/(ǖ|ǘ|ǚ|ǜ)/g, 'ü')
    .replace(/(ń|ň|ǹ)/g, 'n')
    .replace(/ḿ|m̀/g, 'm');
  if (!/^[a-z\sü]+$/.test(pinyin) || pinyin.split(' ').length !== key.length) {
    console.log(key, pinyin)
  }
}