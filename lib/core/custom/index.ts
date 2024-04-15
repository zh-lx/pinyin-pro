import { acTree } from '@/common/segmentit';
import { Probability, Priority } from '@/common/constant';
import { getStringLength } from '@/common/utils';
import DICT1 from '@/data/dict1';
let customDict: { [key: string]: string } = {};
let customMultipleDict: string[] = [];
let customPolyphonicDict: string[] = [];

type CustomHandleType = 'add' | 'replace';

type CustomDictType = 'pinyin' | 'multiple' | 'polyphonic';

interface CustomPinyinOptions {
  /**
   * @description: multiple 对于 customPinyin 补充词汇的处理
   */
  multiple?: CustomHandleType;
  /**
   * @description: polyphonic 对于 customPinyin 补充词汇的处理
   */
  polyphonic?: CustomHandleType;
}

const CustomDictName = Symbol('custom');

/**
 * @description: 用户自定义拼音
 * @param {{ [key: string]: string }} config 用户自定义的拼音映射（支持汉字、词语、句子的映射），若匹配到该映射，优先将汉字转换为该映射
 * @param {CustomPinyinOptions} options multiple/polyphonic 对于 customPinyin 补充词汇的处理
 */
export function customPinyin(
  config: { [key: string]: string } = {},
  options?: CustomPinyinOptions
) {
  const keys = Object.keys(config).sort(
    (key1, key2) => getStringLength(key2) - getStringLength(key1)
  );
  keys.forEach((key) => {
    customDict[key] = config[key];
  });
  const customPatterns = Object.keys(customDict).map((key) => ({
    zh: key,
    pinyin: customDict[key],
    probability: Probability.Custom + getStringLength(key),
    length: key.length,
    priority: Priority.Custom,
    dict: CustomDictName,
  }));
  acTree.build(customPatterns);
  // add words for multiple and polyphonic
  if (options?.multiple) {
    addCustomConfigToDict(config, customMultipleDict, options.multiple);
  }
  if (options?.polyphonic) {
    addCustomConfigToDict(config, customPolyphonicDict, options.polyphonic);
  }
}

function addCustomConfigToDict(
  config: { [key: string]: string },
  dict: string[],
  handleType: CustomHandleType
) {
  for (let key in config) {
    const pinyins = config[key];
    key.split('').forEach((word, index) => {
      const pinyin = pinyins.split(' ')[index] || '';
      const wordCode = word.charCodeAt(0);
      if (handleType === 'replace') {
        // 直接覆盖原词典
        dict[wordCode] = pinyin;
      } else {
        // 补充至原词典
        dict[wordCode] = dict[wordCode] || DICT1[wordCode];
        if (!dict[wordCode].split(' ').includes(pinyin)) {
          dict[wordCode] += ` ${pinyin}`;
          dict[wordCode] = dict[wordCode].trim();
        }
      }
    });
  }
}

export const getCustomMultpileDict = () => {
  return customMultipleDict;
};

export const getCustomPolyphonicDict = () => {
  return customPolyphonicDict;
};

export function clearCustomDict(dict: CustomDictType | CustomDictType[]) {
  if (dict === 'pinyin' || dict.indexOf('pinyin') !== -1) {
    Object.keys(customDict).forEach(function (key) {
      delete customDict[key];
    });
    acTree.removeDict(CustomDictName);
  }
  if (dict === 'multiple' || dict.indexOf('multiple') !== -1) {
    customMultipleDict.length = 0;
  }
  if (dict === 'polyphonic' || dict.indexOf('polyphonic') !== -1) {
    customPolyphonicDict.length = 0;
  }
}