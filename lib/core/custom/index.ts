import {
  ACNormal,
  ACSurname,
  PatternsNormal,
  PatternsSurname,
} from '@/common/ac';
import { getStringLength } from '@/common/utils';
let customDict: { [key: string]: string } = {};

/**
 * @description: 用户自定义拼音
 * @param {{ [key: string]: string }} config 用户自定义的拼音映射（支持汉字、词语、句子的映射），若匹配到该映射，优先将汉字转换为该映射
 */
export function customPinyin(config: { [key: string]: string } = {}) {
  customDict = {};
  const keys = Object.keys(config).sort(
    (key1, key2) => getStringLength(key2) - getStringLength(key1)
  );
  keys.forEach((key) => {
    customDict[key] = config[key];
  });
  const customPatterns = Object.keys(customDict).map((key) => ({
    zh: key,
    pinyin: customDict[key],
    priority: 999 + getStringLength(key),
    length: key.length,
  }));
  ACNormal.rebuildTrie([...customPatterns, ...PatternsNormal]);
  ACSurname.rebuildTrie([...customPatterns, ...PatternsSurname]);
}

export const getCustomDict = () => {
  return customDict;
};

export function hasCustomConfig() {
  return !!Object.keys(customDict).length;
}
