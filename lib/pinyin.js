import { DICT1 } from '../data/dict1';
import { DICT2 } from '../data/dict2';
import { DICT3 } from '../data/dict3';
import { DICT4 } from '../data/dict4';
import { DICT5 } from '../data/dict5';
import { INITIAL_LIST } from '../data/initial';
const dictArr = [DICT1, DICT2, DICT3, DICT4, DICT5];

// 递归解析得到拼音
// @params: ('掘金关注梨香', 6)
// @return: 'jué jīn guān zhù lí xiāng'
export const getPinyin = (word, length) => {
  // 若length值大于4或大于word的词长，返回getPinyin(word, min)
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
  // 若word为空字符串返回空字符串
  if (word.length === 0) {
    return '';
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

// 得到音调拼音
// @params: ('jué jīn guān zhù lí xiāng')
// @return: 'jue jin guan zhu li xiang'
export const getNoTone = (pinyin) => {
  return pinyin
    .replace(/(ā|á|ǎ|à)/g, 'a')
    .replace(/(ō|ó|ǒ|ò)/g, 'o')
    .replace(/(ē|é|ě|è)/g, 'e')
    .replace(/(ī|í|ǐ|ì)/g, 'i')
    .replace(/(ū|ú|ǔ|ù)/g, 'u')
    .replace(/(ǖ|ǘ|ǚ|ǜ)/g, 'ü');
};

// 得到单字的多音
// @params: ('好')
// @return: 'hǎo hào'
export const getMultipleTone = (word) => {
  if (word.length !== 1) {
    return '';
  }
  return DICT1[word];
};

// 得到声母和韵母
// @params: ('jué jīn guān zhù lí xiāng')
// @return: {initial: 'j n n zh l n', final: 'ué īn uān ù í iāng'}
export const getInitialAndFinal = (pinyin) => {
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
    final: final_arr.join(' '),
    initial: initial_arr.join(' '),
  };
};

// 得到音调的对应数字
// @params: ('jué jīn guān zhù lí xiāng')
// @return: '2 1 1 4 2 1'
export const getToneNum = (pinyin) => {
  const reg_tone1 = /(ā|ō|ē|ī|ū|ǖ)/;
  const reg_tone2 = /(á|ó|é|í|ú|ǘ)/;
  const reg_tone3 = /(ǎ|ǒ|ě|ǐ|ǔ|ǚ)/;
  const reg_tone4 = /(à|ò|è|ì|ù|ǜ)/;
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
    } else {
      tone_num_arr.push(0);
    }
  });
  return tone_num_arr.join(' ');
};

// 得到音调的对应数字
// @params: ('jué jīn guān zhù lí xiāng')
// @return: 'jue2 jin1 guan1 zhu4 li2 xiang1'
export const getPinyinToneNum = (pinyin) => {
  const pinyin_arr = getNoTone(pinyin).split(' ');
  const tone_num_arr = getToneNum(pinyin).split(' ');
  const res_arr = [];
  pinyin_arr.forEach((item, index) => {
    res_arr.push(`${item}${tone_num_arr[index]}`);
  });
  return res_arr.join(' ');
};


