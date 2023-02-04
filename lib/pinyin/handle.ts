import {
  InitialList,
  SpecialInitialList,
  SpecialFinalMap,
  SpecialFinalList,
  doubleFinalList,
} from '../data/special';
import Surnames from '../data/surname';
import DICT1 from '../data/dict1';
import DICT2 from '../data/dict2';
import DICT3 from '../data/dict3';
import DICT4 from '../data/dict4';
import DICT5 from '../data/dict5';
import { getCustomDict } from '../custom';
import { SingleWordResult, PinyinMode } from '../type';
const dictArr = [{}, {}, DICT2, DICT3, DICT4, DICT5];

// 最大长度词汇
const LongestWordLength = 5;

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

const getPinyinArray = (
  word: string,
  mode: 'normal' | 'surname',
  custom: boolean
): SingleWordResult[] => {
  let list: SingleWordResult[] = Array(word.length);
  if (custom) {
    getPinyinInCustomMode(word, word.length, list, 0, mode);
  } else if (mode === 'surname') {
    getPinyinInSurnameMode(word, word.length, list, 0);
  } else {
    getPinyinInNormalMode(word, word.length, list, 0);
  }
  // 记录双 Unicode 编码字符，将第二个删除
  for (let i = list.length - 2; i >= 0; i--) {
    const cur = list[i];
    const pre = list[i + 1];
    if (
      /[\uD800-\uDBFF]/.test(cur.result) &&
      /[\uDC00-\uDFFF]/.test(pre.result)
    ) {
      cur.origin += pre.origin;
      cur.result += pre.result;
      cur.originPinyin = cur.result;
      pre.delete = true;
      i--;
    }
  }
  list = list.filter((item) => {
    return !item.delete;
  });
  return list;
};

const getPinyinInNormalMode = (
  word: string,
  length: number,
  list: SingleWordResult[],
  index: number
): void => {
  // word 长度大于 5 时，直接从长度为 5 的 word 开始匹配
  if (length > LongestWordLength) {
    getPinyinInNormalMode(word, LongestWordLength, list, index);
    return;
  }

  // 若length为1，则说明字符串中不包含2字以上的词库字词，在DICT1中查询每个字符的拼音拼接后返回
  if (length <= 1) {
    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      const pinyin = getSingleWordPinyin(char);
      list[index + i] = {
        origin: char,
        result: pinyin,
        isZh: pinyin !== char,
        originPinyin: pinyin,
      };
    }
    return;
  }

  // 其他情况下，分治递归处理
  for (let key in dictArr[length]) {
    const idx = word.indexOf(key);
    // 若word中包含当前词典中某个词，则取出该词拼音，对word取出后的左右继续遍历
    if (idx > -1) {
      // 处理该词拼音
      const pinyin = dictArr[length][key];
      pinyin.split(' ').forEach((item, i) => {
        list[index + idx + i] = {
          origin: key[i],
          result: item,
          isZh: true,
          originPinyin: item,
        };
      });

      // 处理该词后左边拼音
      const left = word.slice(0, idx);
      getPinyinInNormalMode(left, left.length, list, index);

      // 处理该词后右边拼音
      const right = word.slice(idx + key.length);
      getPinyinInNormalMode(
        right,
        right.length,
        list,
        index + idx + key.length
      );
      return;
    }
  }

  // 若当前 dict 没包含对应词，返回下一级词
  getPinyinInNormalMode(word, length - 1, list, index);
};

const getPinyinInSurnameMode = (
  word: string,
  length: number,
  list: SingleWordResult[],
  index: number
): void => {
  for (let key in Surnames) {
    let idx = word.indexOf(key);
    if (idx > -1) {
      // 处理该词拼音
      const pinyin = Surnames[key];
      pinyin.split(' ').forEach((item, i) => {
        list[index + idx + i] = {
          origin: key[i],
          result: item,
          isZh: true,
          originPinyin: item,
        };
      });

      // 处理左边拼音
      const left = word.slice(0, idx);
      getPinyinInSurnameMode(left, left.length, list, index);

      // 处理右边拼音
      const right = word.slice(idx + key.length);
      getPinyinInSurnameMode(
        right,
        right.length,
        list,
        index + idx + key.length
      );

      return;
    }
  }

  // 若姓氏表中的词均未匹配成功，则使用常规匹配
  getPinyinInNormalMode(word, length, list, index);
};

const getPinyinInCustomMode = (
  word: string,
  length: number,
  list: SingleWordResult[],
  index: number,
  mode: 'normal' | 'surname'
): void => {
  const customDict = getCustomDict();
  for (let key in customDict) {
    let idx = word.indexOf(key);
    if (idx > -1) {
      // 处理该词拼音
      const pinyin = customDict[key];
      pinyin.split(' ').forEach((item, i) => {
        list[index + idx + i] = {
          origin: key[i],
          result: item,
          isZh: true,
          originPinyin: item,
        };
      });

      // 处理左边拼音
      const left = word.slice(0, idx);
      getPinyinInCustomMode(left, left.length, list, index, mode);

      // 处理右边拼音
      const right = word.slice(idx + key.length);
      getPinyinInCustomMode(
        right,
        right.length,
        list,
        index + idx + key.length,
        mode
      );

      return;
    }
  }

  if (mode === 'surname') {
    getPinyinInSurnameMode(word, length, list, index);
  } else {
    getPinyinInNormalMode(word, length, list, index);
  }
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
    .replace(/(ǖ|ǘ|ǚ|ǜ)/g, 'ü')
    .replace(/(ń|ň|ǹ)/g, 'n');
};

/**
 * @description: 获取单字符的多音拼音
 * @param {string} word
 * @return {WordResult[]}
 */
type GetMultiplePinyin = (
  word: string,
  mode?: PinyinMode
) => SingleWordResult[];
const getMultiplePinyin: GetMultiplePinyin = (word, mode = 'normal') => {
  const wordCode = word.charCodeAt(0);
  const customDict = getCustomDict();
  const pinyin =
    customDict[word] ||
    (mode === 'surname' ? Surnames[word] : '') ||
    DICT1[wordCode] ||
    '';
  if (pinyin) {
    return pinyin.split(' ').map((value) => ({
      origin: word,
      result: value,
      isZh: true,
      originPinyin: value,
    }));
  } else {
    return [
      {
        origin: word,
        result: word,
        isZh: false,
        originPinyin: word,
      },
    ];
  }
};

/**
 * @description: 获取拼音的声母和韵母
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
    for (let _initial of InitialList) {
      if (_pinyin.startsWith(_initial)) {
        let _final = _pinyin.slice(_initial.length);
        if (
          SpecialInitialList.indexOf(_initial) !== -1 &&
          SpecialFinalList.indexOf(_final) !== -1
        ) {
          // 针对 jqx 的 u 特殊处理
          _final = SpecialFinalMap[_final as keyof typeof SpecialFinalMap];
        }
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
 * @description: 获取韵母的韵头、韵腹和韵尾
 * @param {string} pinyin
 * @return {*}
 */
type GetFinalParts = (pinyin: string) => {
  head: string;
  body: string;
  tail: string;
};
const getFinalParts: GetFinalParts = (pinyin) => {
  const { final } = getInitialAndFinal(pinyin);
  let head = '',
    body = '',
    tail = '';
  if (doubleFinalList.indexOf(getPinyinWithoutTone(final)) !== -1) {
    head = final[0];
    body = final[1];
    tail = final.slice(2);
  } else {
    body = final[0] || '';
    tail = final.slice(1) || '';
  }
  return { head, body, tail };
};

/**
 * @description: 将带音调符号拼音转换为带音调数字
 * @param {string} pinyin
 * @return {string}
 */
type GetNumOfTone = (pinyin: string) => string;
const getNumOfTone: GetNumOfTone = (pinyin) => {
  const reg_tone1 = /(ā|ō|ē|ī|ū|ǖ)/;
  const reg_tone2 = /(á|ó|é|í|ú|ǘ|ń)/;
  const reg_tone3 = /(ǎ|ǒ|ě|ǐ|ǔ|ǚ|ň)/;
  const reg_tone4 = /(à|ò|è|ì|ù|ǜ|ǹ)/;
  const reg_tone0 = /(a|o|e|i|u|ü|n)/;
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
 * @param {string} originPinyin
 * @return {string}
 */
type GetPinyinWithNum = (pinyin: string, originPinyin: string) => string;
const getPinyinWithNum: GetPinyinWithNum = (pinyin, originPinyin) => {
  const pinyin_arr = getPinyinWithoutTone(pinyin).split(' ');
  const tone_num_arr = getNumOfTone(originPinyin).split(' ');
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
  getPinyinArray,
  getPinyinWithoutTone,
  getInitialAndFinal,
  getMultiplePinyin,
  getNumOfTone,
  getPinyinWithNum,
  getFirstLetter,
  getFinalParts,
};
