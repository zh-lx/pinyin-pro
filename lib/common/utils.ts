import { DoubleUnicodePrefixReg, DoubleUnicodeSuffixReg, DoubleUnicodeReg } from './constant';

export function getStringLength(string: string) {
  return string.replace(DoubleUnicodeReg, '_').length;
}

// 针对双音节中文特殊划分
export function getSplittedWord(string: string) {
  const arr = [];
  for (let i = 0; i < string.length; i++) {
    if (
      DoubleUnicodePrefixReg.test(string[i]) &&
      i + 1 < string.length &&
      DoubleUnicodeSuffixReg.test(string[i + 1])
    ) {
      arr.push(string[i] + string[i + 1]);
      i++;
    } else {
      arr.push(string[i]);
    }
  }
  return arr;
}

// 根据 Unicode 的定义判断是否为中文（表意文字）
export function isZhChar(char: string) {
  if (typeof char !== 'string') {
    return false;
  }

  // 通过 Unicode property escapes，方便扩展支持其他文字
  // 文章：https://zhuanlan.zhihu.com/p/33335629
  // Spec: https://github.com/tc39/proposal-regexp-unicode-property-escapes
  // 可以测试生僻字 鿏
  return /^[\p{Unified_Ideograph}]+$/ui.test(char)
}
