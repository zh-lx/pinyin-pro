import { DoubleUnicodePrefixReg, DoubleUnicodeSuffixReg, DoubleUnicodeReg } from './constant';

export function stringLength(text: string) {
  return text.replace(DoubleUnicodeReg, '_').length;
}

// 双音节字符处理
export function splitString(text: string): string[] {
  const result = [];
  let i = 0;
  while (i < text.length) {
    const char = text.charAt(i);
    if (DoubleUnicodePrefixReg.test(char) && DoubleUnicodeSuffixReg.test(text.charAt(i + 1))) {
      result.push(text.substring(i, i + 2));
      i += 2;
    } else {
      result.push(char);
      i += 1;
    }
  }
  return result;
}

export function isZhChar(char: string) {
  if (typeof char !== 'string') {
    return false;
  }
  let code = char.charCodeAt(0);
  return code >= 19968 && code <= 40869;
}
