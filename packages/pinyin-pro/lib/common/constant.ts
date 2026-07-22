export const DoubleUnicodePrefixReg = /^[\uD800-\uDBFF]$/;
export const DoubleUnicodeSuffixReg = /^[\uDC00-\uDFFF]$/;
export const DoubleUnicodeReg = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
export const DoubleUnicodeCharReg = /^[\uD800-\uDBFF][\uDC00-\uDFFF]$/g;
export const enum Probability {
  Unknown = 1e-13,
  Rule = 1e-12,
  DICT = 2e-8,
  Surname = 1,
  Custom = 1,
}
export const Priority = {
  Normal: 1,
  Surname: 10,
  Custom: 100,
}