var regex = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;

export function getStringLength(string: string) {
  return string.replace(regex, '_').length;
}

export function isZhChar(char: string) {
  let code = char.charCodeAt(0);
  return code >= 19968 && code <= 40869;
}
