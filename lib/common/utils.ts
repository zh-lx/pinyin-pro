import {
  DoubleUnicodePrefixReg,
  DoubleUnicodeSuffixReg,
  DoubleUnicodeReg,
} from "./constant";

export function stringLength(text: string) {
  return text.replace(DoubleUnicodeReg, "_").length;
}

// 双音节字符处理
export function splitString(text: string): string[] {
  const result = [];
  let i = 0;
  while (i < text.length) {
    const char = text.charAt(i);
    if (
      DoubleUnicodePrefixReg.test(char) &&
      DoubleUnicodeSuffixReg.test(text.charAt(i + 1))
    ) {
      result.push(text.substring(i, i + 2));
      i += 2;
    } else {
      result.push(char);
      i += 1;
    }
  }
  return result;
}

// todo: 双 unicode 编码字符的适配
export function isZhChar(char: string) {
  if (typeof char !== "string") {
    return false;
  }
  let code = char.charCodeAt(0);
  return code >= 19968 && code <= 40869;
}

export class FastDictFactory {
  NumberDICT: string[];
  StringDICT: Map<string, string>;

  constructor() {
    this.NumberDICT = [];
    this.StringDICT = new Map();
  }

  get(word: string): string {
    if (word.length > 1) {
      return this.StringDICT.get(word) as string;
    } else {
      const code = word.charCodeAt(0);
      return this.NumberDICT[code];
    }
  }

  set(word: string | number, pinyin: string) {
    if (typeof word === 'number') {
      this.NumberDICT[word] = pinyin;
    } else if (word.length > 1) {
      this.StringDICT.set(word, pinyin);
    } else {
      const code = word.charCodeAt(0);
      this.NumberDICT[code] = pinyin;
    }
  }

  clear() {
    this.NumberDICT = [];
    this.StringDICT.clear();
  }
}