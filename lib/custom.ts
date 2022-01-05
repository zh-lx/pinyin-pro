import _DICT1 from '../data/dict1';
import _DICT2 from '../data/dict2';
import _DICT3 from '../data/dict3';
import _DICT4 from '../data/dict4';
import _DICT5 from '../data/dict5';
const _dictArr = [{}, {}, _DICT2, _DICT3, _DICT4, _DICT5];

/**
 * @description: 用户自定义拼音
 * @param {{ [key: string]: string }} config 用户自定义的拼音映射（支持汉字、词语、句子的映射），若匹配到该映射，优先将汉字转换为该映射
 */
export function customPinyin(config: { [key: string]: string } = {}) {
  for (let key in config) {
    let pinyin = config[key];
    if (key.length === 1) {
      const wordCode = key.charCodeAt(0);
      _DICT1[wordCode] = pinyin;
    } else if (key.length === 2) {
      _dictArr[2][key] = pinyin;
    } else if (key.length === 3) {
      _dictArr[3][key] = pinyin;
    } else if (key.length === 4) {
      _dictArr[4][key] = pinyin;
    } else {
      _dictArr[5][key] = pinyin;
    }
  }
}

export const DICT1 = _DICT1;
export const dictArr = _dictArr;
