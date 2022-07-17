import { pinyin as _pinyin } from './pinyin';

/**
 * @description: 检测汉语字符串和拼音是否匹配
 * @param {string} words 汉语字符串
 * @param {string} pinyin 拼音，支持各种缩写形式
 * @return {Array | null} 若匹配成功，返回拼音在汉字中的下标数组；若匹配失败，返回 null
 */
export const match = (words: string, pinyin: string) => {
  const result = [];
  let currentPinyin = pinyin;
  for (let i = 0; i < words.length; i++) {
    // 是否为中文匹配
    if (words[i] === currentPinyin[0]) {
      currentPinyin = currentPinyin.slice(1);
      result.push(i);
      continue;
    }
    // 当前字的多音字拼音
    const ps = _pinyin(words[i], {
      toneType: 'none',
      multiple: true,
      type: 'array',
    });
    let currentLength = 0;
    ps.forEach((p) => {
      const length = getMatchLength(p, currentPinyin);
      if (length > currentLength) {
        currentLength = length;
      }
    });
    if (currentLength) {
      currentPinyin = currentPinyin.slice(currentLength);
      result.push(i);
    }
    if (!currentPinyin) {
      break;
    }
  }
  return result.length && !currentPinyin ? result : null;
};

// 检测两个拼音最大的匹配长度
const getMatchLength = (pinyin1: string, pinyin2: string) => {
  let length = 0;
  for (let i = 0; i < pinyin1.length; i++) {
    if (pinyin1[i] === pinyin2[length]) {
      length++;
    }
  }
  return length;
};
