export const DoubleUnicodePrefixReg = /^[\uD800-\uDBFF]$/;
export const DoubleUnicodeSuffixReg = /^[\uDC00-\uDFFF]$/;
export const DoubleUnicodeReg = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
export enum Priority {
  DictNumber = 15,
  DICT2 = 20,
  DICT3 = 30,
  DICT4 = 40,
  DICT5 = 50,
  Surname = 99,
  Custom = 999,
}