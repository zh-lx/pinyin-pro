import { default_options } from './options'

import { getPinyin, getMultitone, removeTone } from './pinyin'

export const pinyinFn = (word = '', options) => {
  options = { ...default_options, ...options }
  let pinyin_with_tone = getPinyin(word, word.length)
  // 是否开启音调
  if (!options.tone) {
    pinyin_with_tone = removeTone(pinyin_with_tone)
  }
  // 单字且开启多音字
  if (word.length === 1 && options.multitone) {
    pinyin_with_tone = getMultitone(word)
  }
  // 返回形式
  if (options.type === 'array') {
    pinyin_with_tone = pinyin_with_tone.split(' ')
  }
  return pinyin_with_tone
}
