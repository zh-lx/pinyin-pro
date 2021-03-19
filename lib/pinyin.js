import { DICT1 } from '../data/dict1';
import { DICT2 } from '../data/dict2';
import { DICT3 } from '../data/dict3';
import { DICT4 } from '../data/dict4';
import { DICT5 } from '../data/dict5';
import { INITIAL_LIST } from '../data/initial';
const dictArr = [DICT1, DICT2, DICT3, DICT4, DICT5];

/**
 * @description: 得到对应的音调数字
 * @param {string} word 汉字字符串
 * @param {number} length 当前length长度标记
 * @return {string} 拼音字符串
 * @example
 * ```js
 * getPinyin('汉语拼音', 4); // 'hàn yǔ pīn yīn'
 * ```
 */
export const getPinyin = (word, length) => {
  // 若word为空字符串返回空字符串
  if (length === 0) {
    return word;
  }
  // 若length值大于5或大于word的词长，返回getPinyin(word, min)
  const min = Math.min(length, word.length);
  if (length > 5 || length > word.length) {
    return getPinyin(word, min - 1);
  }
  // 若word长度为1, 找到则返回相应拼音（多音字的第一个）；未找到则返回word
  if (word.length === 1) {
    const pinyin_length_1 = dictArr[length - 1][word];
    return pinyin_length_1 ? pinyin_length_1.split(' ')[0] : word;
  }
  // 若当前dict存在word则返回相应拼音
  if (dictArr[length - 1][word]) {
    return dictArr[length - 1][word];
  }
  // 遍历
  let pinyin = '';
  for (let key in dictArr[length - 1]) {
    // 若为单字则返回多音字第一个
    const item =
      key.length === 1
        ? dictArr[length - 1][key].split(' ')[0]
        : dictArr[length - 1][key];
    const index = word.indexOf(key);
    // 遍历包含
    if (index > -1) {
      const left_word = word.slice(0, index);
      const right_word = word.slice(index + key.length);
      const left_pinyin =
        left_word.length > 0
          ? `${getPinyin(left_word, left_word.length)} `
          : '';
      const right_pinyin =
        right_word.length > 0
          ? ` ${getPinyin(right_word, right_word.length)}`
          : '';
      pinyin = `${left_pinyin}${item}${right_pinyin}`;
      break;
    }
  }
  return pinyin ? pinyin : getPinyin(word, length - 1);
};

/**
 * @description: 得到无音调的拼音字符串
 * @param {string} pinyin 带音调的拼音字符串
 * @return {string} 不带音调的拼音字符串
 * @example
 * ```js
 * getPinyinWithoutTone('hàn yǔ pīn yīn');  // 'han yu pin yin'
 * ```
 */
export const getPinyinWithoutTone = (pinyin) => {
  if (pinyin.length === 0) {
    return '';
  }
  return pinyin
    .replace(/(ā|á|ǎ|à)/g, 'a')
    .replace(/(ō|ó|ǒ|ò)/g, 'o')
    .replace(/(ē|é|ě|è)/g, 'e')
    .replace(/(ī|í|ǐ|ì)/g, 'i')
    .replace(/(ū|ú|ǔ|ù)/g, 'u')
    .replace(/(ǖ|ǘ|ǚ|ǜ)/g, 'ü');
};

/**
 * @description: 得到单个字的多音
 * @param {string} word 长度为1的汉字字符串
 * @return {string} 汉字的多个音调
 * @example
 * ```js
 * getMultipleTone('好');  // 'hǎo hào'
 * ```
 */
export const getMultipleTone = (word) => {
  if (word.length === 0) {
    return '';
  }
  if (word.length !== 1) {
    throw Error('getMultipleTone的参数必须为单个汉字字符串');
  }
  return DICT1[word];
};

/**
 * @description: 得到拼音的声母和韵母
 * @param {string} pinyin 拼音字符串
 * @return {{final: string; initial: string;}} 包含声母字符串和韵母字符串的对象
 * @example
 * ```js
 * getInitialAndFinal('hàn yǔ pīn yīn'); // {initial: 'h y p y', final: 'àn yǔ pīn yīn'}
 * ```
 */
export const getInitialAndFinal = (pinyin) => {
  if (pinyin.length === 0) {
    return { final: '', initial: '' };
  }
  const pinyin_arr = pinyin.split(' ');
  const initial_arr = [];
  const final_arr = [];
  for (let _pinyin of pinyin_arr) {
    for (let _initial of INITIAL_LIST) {
      if (_pinyin.startsWith(_initial)) {
        const _final = _pinyin.slice(_initial.length);
        initial_arr.push(_initial);
        final_arr.push(_final);
        break;
      }
    }
  }
  return {
    final: final_arr.join(' '), // 韵母
    initial: initial_arr.join(' '), // 声母
  };
};

/**
 * @description: 得到对应的音调数字
 * @param {string} pinyin 拼音字符串
 * @return {string} 音调对应数字字符串
 * @example
 * ```js
 * getNumOfTone('hàn yǔ pīn yīn'); // '4 3 1 1'
 * ```
 */
export const getNumOfTone = (pinyin) => {
  if (pinyin.length === 0) {
    return '';
  }
  const reg_tone1 = /(ā|ō|ē|ī|ū|ǖ)/;
  const reg_tone2 = /(á|ó|é|í|ú|ǘ)/;
  const reg_tone3 = /(ǎ|ǒ|ě|ǐ|ǔ|ǚ)/;
  const reg_tone4 = /(à|ò|è|ì|ù|ǜ)/;
  const reg_tone0 = /(a|o|e|i|u|ü)/;
  const tone_num_arr = [];
  const pinyin_arr = pinyin.split(' ');
  pinyin_arr.forEach((_pinyin) => {
    if (reg_tone1.test(_pinyin)) {
      tone_num_arr.push(1);
    } else if (reg_tone2.test(_pinyin)) {
      tone_num_arr.push(2);
    } else if (reg_tone3.test(_pinyin)) {
      tone_num_arr.push(3);
    } else if (reg_tone4.test(_pinyin)) {
      tone_num_arr.push(4);
    } else if (reg_tone0.test(_pinyin)) {
      tone_num_arr.push(0);
    } else {
      tone_num_arr.push('');
    }
  });
  return tone_num_arr.join(' ');
};

/**
 * @description: 得到对应的音调数字
 * @param {string} pinyin 拼音字符串
 * @return {string} 以数字作为音调的拼音字符串
 * @example
 * ```js
 * getPinyinWithNum('hàn yǔ pīn yīn'); // 'han4 yu3 pin1 yin1'
 * ```
 */
export const getPinyinWithNum = (pinyin) => {
  if (pinyin.length === 0) {
    return '';
  }
  const pinyin_arr = getPinyinWithoutTone(pinyin).split(' ');
  const tone_num_arr = getNumOfTone(pinyin).split(' ');
  const res_arr = [];
  pinyin_arr.forEach((item, index) => {
    res_arr.push(`${item}${tone_num_arr[index]}`);
  });
  return res_arr.join(' ');
};

/**
 * @description: 得到拼音首字母
 * @param {string} pinyin 拼音字符串
 * @return {string}
 */
export const getFirstLetter = (pinyin) => {
  return '';
};
