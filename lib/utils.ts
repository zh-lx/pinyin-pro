var regex = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;

export function getStringLength(string: string) {
  return string.replace(regex, '_').length;
}
