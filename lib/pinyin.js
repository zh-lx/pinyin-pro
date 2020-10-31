import { dict1 } from '../data/dict1'
import { dict2 } from '../data/dict2'
import { dict3 } from '../data/dict3'
import { dict4 } from '../data/dict4'
import { dict5 } from '../data/dict5'
const dictArr = [dict1, dict2, dict3, dict4, dict5]

// 递归解析拼音
export const getPinyin = (word, length) => {
  // 若length值大于4或大于word的词长，返回getPinyin(word, min)
  const min = Math.min(length, word.length)
  if (length > 5 || length > word.length) {
    return getPinyin(word, min - 1)
  }
  // 若word长度为1, 找到则返回相应拼音（多音字的第一个）；未找到则返回-
  if (word.length === 1) {
    const pinyin_length_1 = dictArr[length - 1][word]
    return pinyin_length_1 ? pinyin_length_1.split(' ')[0] : '-'
  }
  // 若当前dict存在word则返回相应拼音
  if (dictArr[length - 1][word]) {
    return dictArr[length - 1][word]
  }
  // 若word为空字符串返回空字符串
  if (word.length === 0) {
    return ''
  }
  // 遍历
  let pinyin = ''
  for (let key in dictArr[length - 1]) {
    // 若为单字则返回多音字第一个
    const item =
      key.length === 1
        ? dictArr[length - 1][key].split(' ')[0]
        : dictArr[length - 1][key]
    const index = word.indexOf(key)
    // 遍历包含
    if (index > -1) {
      const left_word = word.slice(0, index)
      const right_word = word.slice(index + key.length)
      const left_pinyin =
        left_word.length > 0 ? `${getPinyin(left_word, left_word.length)} ` : ''
      const right_pinyin =
        right_word.length > 0
          ? ` ${getPinyin(right_word, right_word.length)}`
          : ''
      pinyin = `${left_pinyin}${item}${right_pinyin}`
      break
    }
  }
  return pinyin ? pinyin : getPinyin(word, length - 1)
}

// 取消音调
export const removeTone = (pinyin) => {
  return pinyin
    .replace(/(ā|á|ǎ|à)/g, 'a')
    .replace(/(ō|ó|ǒ|ò)/g, 'o')
    .replace(/(ē|é|ě|è)/g, 'e')
    .replace(/(ī|í|ǐ|ì)/g, 'i')
    .replace(/(ū|ú|ǔ|ù)/g, 'u')
    .replace(/(ǖ|ǘ|ǚ|ǜ)/g, 'ü')
}

// 单字返回多音字
export const getMultitone = (word) => {
  if (word.length !== 1) {
    return ''
  }
  return dict1[word]
}
