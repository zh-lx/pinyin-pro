import { DICT1 } from '../data/dict1';
import { DICT2 } from '../data/dict2';
import { DICT3 } from '../data/dict3';
import { DICT4 } from '../data/dict4';
import { DICT5 } from '../data/dict5';
import { INITIAL_LIST } from '../data/initial';
const dictArr = [DICT1, DICT2, DICT3, DICT4, DICT5];

type GetPinYin = (word: string, length: number) => string;
const getPinyin: GetPinYin = (word, length) => {
  // 若word为空字符串返回空字符串
  if (length === 0) {
    return word;
  }
  // 若length值大于5，返回getPinyin(word, length - 1)
  if (length > 5) {
    return getPinyin(word, length - 1);
  }
  // 若当前dict存在word则返回相应拼音
  const current_pinyin = dictArr[length - 1][word];
  if (current_pinyin) {
    return word.length === 1 ? current_pinyin.split(' ')[0] : current_pinyin;
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

type GetMultipleTone = (word: string) => string;
const getMultipleTone: GetMultipleTone = (word) => {
  return DICT1[word];
};

type GetInitialAndFinal = (
  pinyin: string
) => { final: string; initial: string };
const getInitialAndFinal: GetInitialAndFinal = (pinyin) => {
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

export {
  getPinyin,
  getPinyinWithoutTone,
  getInitialAndFinal,
  getMultipleTone,
  getNumOfTone,
  getPinyinWithNum,
};
