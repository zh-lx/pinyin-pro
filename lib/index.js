import { DEFAULT_OPTIONS } from './options'

import {
  getPinyin,
  getMultitone,
  getNoTone,
  getInitialAndFinal,
  getToneNum,
  getPinyinToneNum,
} from './pinyin'

export const pinyinFn = (word = '', options) => {
  options = { ...DEFAULT_OPTIONS, ...options }
  let pinyin = getPinyin(word, word.length)
  // 是否开启音调
  if (!options.tone) {
    pinyin = getNoTone(pinyin)
  }
  // 单字且开启多音字
  if (word.length === 1 && options.multitone) {
    pinyin = getMultitone(word)
  }
  // 返回模式
  if (options.pattern === 'initial') {
    pinyin = getInitialAndFinal(pinyin).initial
  } else if (options.pattern === 'final') {
    pinyin = getInitialAndFinal(pinyin).final
  } else if (options.pattern === 'num') {
    pinyin = getToneNum(pinyin)
  } else if (options.pattern === 'pinyinNum') {
    pinyin = getPinyinToneNum(pinyin)
  }
  // 返回形式
  if (options.type === 'array') {
    pinyin = pinyin.split(' ')
  }
  return pinyin
}
