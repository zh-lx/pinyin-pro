import {
  InitialList,
  SpecialInitialList,
  SpecialFinalMap,
  SpecialFinalList,
  doubleFinalList,
  processSepecialPinyin,
} from "@/data/special";
import Surnames from "@/data/surname";
import DICT1 from "@/data/dict1";
import { getCustomMultpileDict } from "@/core/custom";
import { SingleWordResult } from "../../common/type";
import type { SurnameMode } from "../../common/type";
import { acTree, MatchPattern, TokenizationAlgorithm } from "../../common/segmentit";
import {  Priority } from "@/common/constant";
import { splitString } from "@/common/utils";

/**
 * @description: 获取单个字符的拼音
 * @param {string} char
 * @return {string}
 */
type GetSingleWordPinyin = (char: string) => string;
export const getSingleWordPinyin: GetSingleWordPinyin = (char) => {
  const pinyin = DICT1.get(char);
  // 若查到, 则返回第一个拼音; 若未查到, 返回原字符
  return pinyin ? pinyin.split(" ")[0] : char;
};

export const getPinyin = (
  word: string,
  list: SingleWordResult[],
  surname: SurnameMode,
  segmentit: TokenizationAlgorithm
): { list: SingleWordResult[], matches: MatchPattern[] } => {
  const matches = acTree.search(word, surname, segmentit);
  let matchIndex = 0;
  const zhChars = splitString(word);
  for (let i = 0; i < zhChars.length; ) {
    const match = matches[matchIndex];
    if (match && i === match.index) {
      if (match.length === 1 && match.priority <= Priority.Normal) {
        const char = zhChars[i];
        let pinyin: string = "";
        pinyin = processSepecialPinyin(char, zhChars[i - 1], zhChars[i + 1]);
        list[i] = {
          origin: char,
          result: pinyin,
          isZh: pinyin !== char,
          originPinyin: pinyin,
        };
        i++;
        matchIndex++;
        continue;
      }
      const pinyins = match.pinyin.split(" ");
      let pinyinIndex = 0;
      for (let j = 0; j < match.length; j++) {
        const zhChars = splitString(match.zh);
        list[i + j] = {
          origin: zhChars[j],
          result: pinyins[pinyinIndex],
          isZh: true,
          originPinyin: pinyins[pinyinIndex],
        };
        pinyinIndex++;
      }
      i += match.length;
      matchIndex++;
    } else {
      const char = zhChars[i];
      let pinyin: string = "";
      pinyin = processSepecialPinyin(char, zhChars[i - 1], zhChars[i + 1]);
      list[i] = {
        origin: char,
        result: pinyin,
        isZh: pinyin !== char,
        originPinyin: pinyin,
      };
      i++;
    }
  }
  return { list, matches };
};

/**
 * @description: 将带音调符号拼音转换为不带音调拼音
 * @param {string} pinyin
 * @return {string}
 */
type GetPinyinWithoutTone = (pinyin: string) => string;
const getPinyinWithoutTone: GetPinyinWithoutTone = (pinyin) => {
  return pinyin
    .replace(/(ā|á|ǎ|à)/g, "a")
    .replace(/(ō|ó|ǒ|ò)/g, "o")
    .replace(/(ē|é|ě|è)/g, "e")
    .replace(/(ī|í|ǐ|ì)/g, "i")
    .replace(/(ū|ú|ǔ|ù)/g, "u")
    .replace(/(ǖ|ǘ|ǚ|ǜ)/g, "ü")
    .replace(/(n̄|ń|ň|ǹ)/g, "n")
    .replace(/(m̄|ḿ|m̌|m̀)/g, "m")
    .replace(/(ê̄|ế|ê̌|ề)/g, "ê");
};

/**
 * @description: 获取单字符的多音拼音
 * @param {string} char
 * @return {WordResult[]}
 */
type GetAllPinyin = (char: string, surname?: SurnameMode) => string[];
export const getAllPinyin: GetAllPinyin = (char, surname = "off") => {
  const customMultpileDict = getCustomMultpileDict();
  let pinyin = DICT1.get(char) ? DICT1.get(char).split(" ") : [];
  if (customMultpileDict.get(char)) {
    pinyin = customMultpileDict.get(char).split(" ");
  } else if (surname !== "off") {
    const surnamePinyin = Surnames[char];
    if (surnamePinyin) {
      pinyin = [surnamePinyin].concat(
        pinyin.filter((py) => py !== surnamePinyin)
      );
    }
  }
  return pinyin;
};

/**
 * @description: 获取单字符的多音拼音
 * @param {string} word
 * @return {WordResult[]}
 */
type GetMultiplePinyin = (
  word: string,
  surname?: SurnameMode
) => SingleWordResult[];
const getMultiplePinyin: GetMultiplePinyin = (word, surname = "off") => {
  let pinyin = getAllPinyin(word, surname);
  if (pinyin.length > 0) {
    return pinyin.map((value) => ({
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
  const pinyin_arr = pinyin.split(" ");
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
    final: final_arr.join(" "), // 韵母
    initial: initial_arr.join(" "), // 声母
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
  let head = "",
    body = "",
    tail = "";
  if (doubleFinalList.indexOf(getPinyinWithoutTone(final)) !== -1) {
    head = final[0];
    body = final[1];
    tail = final.slice(2);
  } else {
    body = final[0] || "";
    tail = final.slice(1) || "";
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
  const reg_tone1 = /(ā|ō|ē|ī|ū|ǖ|n̄|m̄|ê̄)/;
  const reg_tone2 = /(á|ó|é|í|ú|ǘ|ń|ḿ|ế)/;
  const reg_tone3 = /(ǎ|ǒ|ě|ǐ|ǔ|ǚ|ň|m̌|ê̌)/;
  const reg_tone4 = /(à|ò|è|ì|ù|ǜ|ǹ|m̀|ề)/;
  const reg_tone0 = /(a|o|e|i|u|ü|ê)/;
  const special_tone = /(n|m)$/;
  const tone_num_arr: string[] = [];
  const pinyin_arr = pinyin.split(" ");
  pinyin_arr.forEach((_pinyin) => {
    if (reg_tone1.test(_pinyin)) {
      tone_num_arr.push("1");
    } else if (reg_tone2.test(_pinyin)) {
      tone_num_arr.push("2");
    } else if (reg_tone3.test(_pinyin)) {
      tone_num_arr.push("3");
    } else if (reg_tone4.test(_pinyin)) {
      tone_num_arr.push("4");
    } else if (reg_tone0.test(_pinyin)) {
      tone_num_arr.push("0");
    } else if (special_tone.test(_pinyin)) {
      tone_num_arr.push("0");
    } else {
      tone_num_arr.push("");
    }
  });
  return tone_num_arr.join(" ");
};

/**
 * @description: 将带音调符号拼音转换为带音调数字拼音
 * @param {string} pinyin
 * @param {string} originPinyin
 * @return {string}
 */
type GetPinyinWithNum = (pinyin: string, originPinyin: string) => string;
const getPinyinWithNum: GetPinyinWithNum = (pinyin, originPinyin) => {
  const pinyin_arr = getPinyinWithoutTone(pinyin).split(" ");
  const tone_num_arr = getNumOfTone(originPinyin).split(" ");
  const res_arr: string[] = [];
  pinyin_arr.forEach((item, index) => {
    res_arr.push(`${item}${tone_num_arr[index]}`);
  });
  return res_arr.join(" ");
};

/**
 * @description: 获取拼音的首字母
 * @param {string} pinyin
 * @return {string}
 */
type GetFirstLetter = (pinyin: string, isZh: boolean) => string;
const getFirstLetter: GetFirstLetter = (pinyin: string, isZh: boolean) => {
  const first_letter_arr: string[] = [];
  const pinyin_arr = pinyin.split(" ");
  pinyin_arr.forEach((pinyin) => {
    first_letter_arr.push(isZh ? pinyin[0] : pinyin);
  });
  return first_letter_arr.join(" ");
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
