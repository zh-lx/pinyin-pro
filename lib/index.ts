import { DEFAULT_OPTIONS } from './options';

import {
  getPinyin,
  getMultipleTone,
  getPinyinWithoutTone,
  getInitialAndFinal,
  getNumOfTone,
  getPinyinWithNum,
} from './pinyin';

// /**
//  * @description: 获取汉字的拼音
//  * @param {string} word 汉语字符串
//  * @param {{
//  *   toneType?: 'symbol' | 'num' | 'none';
//  *   pattern?: 'pinyin'| 'initial' | 'final' | 'num';
//  *   type?: 'string' | 'array';
//  *   multiple?: false | true;
//  * }} options 输出配置
//  * @return {string | string[]} 拼音字符串或数组
//  */

interface OptionsTypeString {
  toneType?: 'symbol' | 'num' | 'none';
  pattern?: 'pinyin' | 'initial' | 'final' | 'num';
  type?: 'string';
  multiple?: boolean;
}

interface OptionsTypeArray {
  toneType?: 'symbol' | 'num' | 'none';
  pattern?: 'pinyin' | 'initial' | 'final' | 'num';
  type: 'array';
  multiple?: boolean;
}

export const pinyinFn = (word, options = DEFAULT_OPTIONS) => {
  options = { ...DEFAULT_OPTIONS, ...options };
  // word传入类型错误时
  if (typeof word !== 'string') {
    throw Error('word需要为字符串类型!');
  }
  // 传入空字符串
  if (!word) {
    return options.type === 'array' ? [] : '';
  }

  // 获取原始拼音
  let pinyin = getPinyin(word, word.length);

  // 对multiple进行处理
  if (word.length === 1 && options.multiple) {
    pinyin = getMultipleTone(word);
  }

  // 对pattern的处理
  if (options.pattern === 'num') {
    const numOfTone = getNumOfTone(pinyin);
    return options.type === 'array' ? numOfTone.split(' ') : numOfTone;
  } else if (options.pattern === 'initial') {
    pinyin = getInitialAndFinal(pinyin).initial;
  } else if (options.pattern === 'final') {
    pinyin = getInitialAndFinal(pinyin).final;
  }

  // 音调toneType处理
  if (options.toneType === 'none') {
    pinyin = getPinyinWithoutTone(pinyin);
  } else if (options.toneType === 'num') {
    pinyin = getPinyinWithNum(pinyin);
  }

  // 对type的处理
  if (options.type === 'array') {
    return pinyin.split(' ');
  } else {
    return pinyin;
  }
};
