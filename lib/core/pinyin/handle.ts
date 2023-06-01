import {
  InitialList,
  SpecialInitialList,
  SpecialFinalMap,
  SpecialFinalList,
  doubleFinalList,
} from '@/data/special';
import Surnames from '@/data/surname';
import DICT1 from '@/data/dict1';
import { getCustomDict } from '@/core/custom';
import { SingleWordResult, PinyinMode } from '@/common/type';
import { ACNormal, ACSurname } from '@/common/ac';
import {
  DoubleUnicodePrefixReg,
  DoubleUnicodeSuffixReg,
} from '@/common/constant';

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

// 处理双 Unicode 编码字符，将第二个删除
const handleUnicodeCharacters = (
  list: SingleWordResult[]
): SingleWordResult[] => {
  for (let i = list.length - 2; i >= 0; i--) {
    const cur = list[i];
    const next = list[i + 1];
    if (
      DoubleUnicodePrefixReg.test(cur.origin) &&
      DoubleUnicodeSuffixReg.test(next.origin)
    ) {
      cur.origin += next.origin;
      cur.result += next.result;
      cur.originPinyin = cur.result;
      next.delete = true;
      i--;
    }
  }
  list = list.filter((item) => {
    return !item.delete;
  });
  return list;
};

export const getPinyin = (
  word: string,
  list: SingleWordResult[],
  mode: 'normal' | 'surname'
): SingleWordResult[] => {
  const ac = mode === 'surname' ? ACSurname : ACNormal; // 选择不同的 AC 自动机
  const matches = ac.search(word);
  let matchIndex = 0;
  for (let i = 0; i < word.length; ) {
    const match = matches[matchIndex];
    if (match && i === match.index) {
      const pinyins = match.pinyin.split(' ');
      let pinyinIndex = 0;
      for (let j = 0; j < match.length; j++) {
        if (
          DoubleUnicodePrefixReg.test(match.zh[j - 1]) &&
          DoubleUnicodeSuffixReg.test(match.zh[j])
        ) {
          list[i + j] = {
            origin: match.zh[j],
            result: '',
            isZh: true,
            originPinyin: '',
          };
        } else {
          list[i + j] = {
            origin: match.zh[j],
            result: pinyins[pinyinIndex],
            isZh: true,
            originPinyin: pinyins[pinyinIndex],
          };
          pinyinIndex++;
        }
      }
      i += match.length;
      matchIndex++;
    } else {
      const char = word[i];
      const pinyin = getSingleWordPinyin(char);
      list[i] = {
        origin: char,
        result: pinyin,
        isZh: pinyin !== char,
        originPinyin: pinyin,
      };
      i++;
    }
  }
  return list;
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
    .replace(/(ń|ň|ǹ)/g, 'n')
    .replace(/ḿ|m̀/g, 'm');
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
  const reg_tone2 = /(á|ó|é|í|ú|ǘ|ń|ḿ)/;
  const reg_tone3 = /(ǎ|ǒ|ě|ǐ|ǔ|ǚ|ň)/;
  const reg_tone4 = /(à|ò|è|ì|ù|ǜ|ǹ|m̀)/;
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
  getPinyinWithoutTone,
  getInitialAndFinal,
  getMultiplePinyin,
  getNumOfTone,
  getPinyinWithNum,
  getFirstLetter,
  getFinalParts,
};
