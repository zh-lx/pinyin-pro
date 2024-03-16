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

export function isZhChar(char: string) {
  let code = char.charCodeAt(0);
  return code >= 19968 && code <= 40869;
}
