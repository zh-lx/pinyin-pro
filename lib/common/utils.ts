import { DoubleUnicodePrefixReg, DoubleUnicodeSuffixReg, DoubleUnicodeReg } from './constant';

export function getStringLength(string: string) {
  return string.replace(DoubleUnicodeReg, '_').length;
}

export function isZhChar(char: string) {
  if (typeof char !== 'string') {
    return false;
  }
  let code = char.charCodeAt(0);
  return code >= 19968 && code <= 40869;
}
