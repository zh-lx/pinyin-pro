import { DICT1 } from '../data/dict1';
import { DICT2 } from '../data/dict2';
import { DICT3 } from '../data/dict3';
import { DICT4 } from '../data/dict4';
import { DICT5 } from '../data/dict5';
import { INITIAL_LIST } from '../data/initial';
const dictArr = [{}, {}, DICT2, DICT3, DICT4, DICT5];

/**
 * @description: 获取单个字符的拼音
 * @param {string} word
 * @return {string}
 */
type GetSingleWordPinyin = (word: string) => string;
const getSingleWordPinyin: GetSingleWordPinyin = (word) => {
  const wordCode = word.charCodeAt(0);
  const pinyin = DICT1[wordCode];
  // 若查到, 则返回第一个拼音; 若未查到, 返回原字符
  return pinyin ? pinyin.split(' ')[0] : word;
};

/**
 * @description: 获取字符串带符号音调的拼音
 * @param {string} word
 * @param {number} length
 * @return {string}
 */
type GetPinYin = (word: string, length: number) => string;
const getPinyin: GetPinYin = (word, length) => {
  // 若length值大于5，返回getPinyin(word, length - 1)
  if (length > 5) {
    return getPinyin(word, length - 1);
  }

  // 若length为0时，返回原字符串
  if (length === 0) {
    return word;
  }

  let pinyin = '';

  // 若length为1，则说明字符串中不包含2字以上的词库字词，在DICT1中查询每个字符的拼音拼接后返回
  if (length === 1) {
    // 设置flag，记录DICT1中是否包含上一个处理的字符
    let flag = false;
    for (let i = 0; i < word.length; i++) {
      const result = getSingleWordPinyin(word[i]);
      if (flag && result === word[i]) {
        // 若前一个处理的字符和当前处理的字符都不在DICT1中，则不加空格直接拼接
        pinyin += result;
      } else if (!flag && result === word[i]) {
        // 若前一个处理的字符在DICT1中有，当前处理的字符在DICT1中没有。则加上空格拼接，并标记flag为true
        pinyin += pinyin ? ` ${result}` : result;
        flag = true;
      } else {
        // 若前一个处理的字符和当前处理的字符都在DICT1中，则加空格拼接并标记flag为false
        pinyin += pinyin ? ` ${result}` : result;
        flag = false;
      }
    }
    return pinyin;
  }

  // 其他情况下，分治递归处理
  for (let key in dictArr[length]) {
    const index = word.indexOf(key);
    // 若word中包含当前词典中某个词，则取出该词拼音，对word取出后的左右继续遍历
    if (index > -1) {
      // 取出该词后左边拼音
      const left_word = word.slice(0, index);
      const left_pinyin = left_word
        ? `${getPinyin(left_word, left_word.length)} `
        : '';
      // 取出该词后右边拼音
      const right_word = word.slice(index + key.length);
      const right_pinyin = right_word
        ? ` ${getPinyin(right_word, right_word.length)}`
        : '';
      // 取出的词的拼音
      const word_pinyin = dictArr[length][key];
      pinyin = `${left_pinyin}${word_pinyin}${right_pinyin}`;
      break;
    }
  }
  // 若不包含当前dict中的词，则对下一级词继续遍历
  return pinyin ? pinyin : getPinyin(word, length - 1);
};

/**
 * @description: 将带音调符号拼音转换为不带音调拼音
 * @param {string} pinyin
 * @return {string}
 */
type GetPinyinWithoutTone = (pinyin: string) => string;
const getPinyinWithoutTone: GetPinyinWithoutTone = (pinyin) => {
  return pinyin
    .replace(/(ā|á|ǎ|à)/g, 'a')
    .replace(/(ō|ó|ǒ|ò)/g, 'o')
    .replace(/(ē|é|ě|è)/g, 'e')
    .replace(/(ī|í|ǐ|ì)/g, 'i')
    .replace(/(ū|ú|ǔ|ù)/g, 'u')
    .replace(/(ǖ|ǘ|ǚ|ǜ)/g, 'ü');
};

/**
 * @description: 获取单字符的多音拼音
 * @param {string} word
 * @return {string}
 */
type GetMultipleTone = (word: string) => string;
const getMultipleTone: GetMultipleTone = (word) => {
  const wordCode = word.charCodeAt(0);
  const pinyin = DICT1[wordCode];
  return pinyin || word;
};

/**
 * @description: 获取拼音的声明和韵母
 * @param {string} pinyin
 * @return {*}
 */
type GetInitialAndFinal = (pinyin: string) => {
  final: string;
  initial: string;
};
const getInitialAndFinal: GetInitialAndFinal = (pinyin) => {
  const pinyin_arr = pinyin.split(' ');
  const initial_arr: string[] = [];
  const final_arr: string[] = [];
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
 * @description: 将带音调符号拼音转换为带音调数字
 * @param {string} pinyin
 * @return {string}
 */
type GetNumOfTone = (pinyin: string) => string;
const getNumOfTone: GetNumOfTone = (pinyin) => {
  const reg_tone1 = /(ā|ō|ē|ī|ū|ǖ)/;
  const reg_tone2 = /(á|ó|é|í|ú|ǘ)/;
  const reg_tone3 = /(ǎ|ǒ|ě|ǐ|ǔ|ǚ)/;
  const reg_tone4 = /(à|ò|è|ì|ù|ǜ)/;
  const reg_tone0 = /(a|o|e|i|u|ü)/;
  const tone_num_arr: string[] = [];
  const pinyin_arr = pinyin.split(' ');
  pinyin_arr.forEach((_pinyin) => {
    if (reg_tone1.test(_pinyin)) {
      tone_num_arr.push('1');
    } else if (reg_tone2.test(_pinyin)) {
      tone_num_arr.push('2');
    } else if (reg_tone3.test(_pinyin)) {
      tone_num_arr.push('3');
    } else if (reg_tone4.test(_pinyin)) {
      tone_num_arr.push('4');
    } else if (reg_tone0.test(_pinyin)) {
      tone_num_arr.push('0');
    } else {
      tone_num_arr.push('');
    }
  });
  return tone_num_arr.join(' ');
};

/**
 * @description: 将带音调符号拼音转换为带音调数字拼音
 * @param {string} pinyin
 * @return {string}
 */
type GetPinyinWithNum = (pinyin: string) => string;
const getPinyinWithNum: GetPinyinWithNum = (pinyin) => {
  const pinyin_arr = getPinyinWithoutTone(pinyin).split(' ');
  const tone_num_arr = getNumOfTone(pinyin).split(' ');
  const res_arr: string[] = [];
  pinyin_arr.forEach((item, index) => {
    res_arr.push(`${item}${tone_num_arr[index]}`);
  });
  return res_arr.join(' ');
};

/**
 * @description: 获取拼音的首字母
 * @param {string} pinyin
 * @return {string}
 */
type GetFirstLetter = (pinyin: string) => string;
const getFirstLetter: GetFirstLetter = (pinyin) => {
  const first_letter_arr: string[] = [];
  const pinyin_arr = pinyin.split(' ');
  pinyin_arr.forEach((pinyin) => {
    first_letter_arr.push(pinyin[0]);
  });
  return first_letter_arr.join(' ');
};

export {
  getPinyin,
  getPinyinWithoutTone,
  getInitialAndFinal,
  getMultipleTone,
  getNumOfTone,
  getPinyinWithNum,
  getFirstLetter,
};
