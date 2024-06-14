import { acTree } from '@/common/segmentit';
import { Probability, Priority } from '@/common/constant';
import { splitString, stringLength } from '@/common/utils';
import { FastDictFactory } from '../../common/utils';
import DICT1 from '@/data/dict1';
let customDict: { [key: string]: string } = {};
const customMultipleDict = new FastDictFactory();
const customPolyphonicDict = new FastDictFactory();

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
  config: { [word: string]: string } = {},
  options?: CustomPinyinOptions
) {
  const words = Object.keys(config).sort(
    (word1, word2) => stringLength(word2) - stringLength(word1)
  );
  words.forEach((word) => {
    customDict[word] = config[word];
  });
  const customPatterns = Object.keys(customDict).map((word) => ({
    zh: word,
    pinyin: customDict[word],
    probability: Probability.Custom + stringLength(word),
    length: stringLength(word),
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
  dict: FastDictFactory,
  handleType: CustomHandleType
) {
  for (let word in config) {
    const pinyins = config[word];
    splitString(word).forEach((char, index) => {
      const pinyin = pinyins.split(' ')[index] || '';
      if (handleType === 'replace' || (handleType === 'add' && !dict.get(char) && !DICT1.get(char))) {
        // 直接覆盖原词典
        dict.set(char, pinyin);
      } else {
        // 补充至原词典
        dict.set(char, dict.get(char) || DICT1.get(char));
        if (!dict.get(char).split(' ').includes(pinyin)) {
          dict.set(char, `${dict.get(char)} ${pinyin}`.trim());
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
    Object.keys(customDict).forEach(function (word) {
      delete customDict[word];
    });
    acTree.removeDict(CustomDictName);
  }
  if (dict === 'multiple' || dict.indexOf('multiple') !== -1) {
    customMultipleDict.clear();
  }
  if (dict === 'polyphonic' || dict.indexOf('polyphonic') !== -1) {
    customPolyphonicDict.clear();
  }
}