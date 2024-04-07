import { MatchPattern } from ".";

// 判断 pre 是否可以被忽略的重叠词
function isIgnorablePattern(cur: MatchPattern, pre: MatchPattern) {
  // 未重叠
  if (pre.index + pre.length <= cur.index) {
    return false;
  }
  if (pre.priority > cur.priority) {
    return false;
  }
  if (pre.priority === cur.priority && pre.length > cur.length) {
    return false;
  }
  return true;
}

// 逆向最大匹配算法
export function reverseMaxMatch(patterns: MatchPattern[]) {
  const filteredArr = [];
  // 按照长度去除重叠词
  for (let i = patterns.length - 1; i >= 0; ) {
    const { index } = patterns[i];
    let j = i - 1;
    while (j >= 0 && isIgnorablePattern(patterns[i], patterns[j])) {
      j--;
    }
    if (j < 0 || patterns[j].index + patterns[j].length <= index) {
      filteredArr.push(patterns[i]);
    }
    i = j;
  }
  return filteredArr.reverse();
}
