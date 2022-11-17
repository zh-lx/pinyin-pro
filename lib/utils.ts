var regex = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;

export function getStringLength(string: string) {
  return string.replace(regex, '_').length;
}

// 针对双音节中文特殊划分
export function getSplittedWord(string: string) {
  const arr = [];
  for (let i = 0; i < string.length; i++) {
    if (
      /[\uD800-\uDBFF]/.test(string[i]) &&
      i + 1 < string.length &&
      /[\uDC00-\uDFFF]/.test(string[i + 1])
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
