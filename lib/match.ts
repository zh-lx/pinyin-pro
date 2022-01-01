import { pinyin as _pinyin } from './pinyin';

// 汉语和拼音是否匹配
export const match = (words: string, pinyin: string) => {
  const result = [];
  let currentPinyin = pinyin;
  for (let i = 0; i < words.length; i++) {
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
  return result.length ? result : null;
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
