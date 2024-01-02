import { getNumOfTone, getPinyinWithoutTone } from '@/core/pinyin/handle';

type ConvertFormat = 'numToSymbol' | 'symbolToNum' | 'toneNone';

interface ConvertOptions {
  /**
   * @description 拼音之间的分隔符，默认为空格，convert方法会以该分隔符分割拼音进行转换
   */
  separator?: string;
  /**
   * @description 转换的格式， 默认为 numToSymbol
   * @example numToSymbol: pin1 yin1 -> pīn yīn
   * @example symbolToNum: pīn yīn -> pin1 yin1
   * @example toneNone: pīn yīn -> pin yin
   */
  format?: ConvertFormat;
}

const DefaultConvertOptions = {
  separator: ' ',
  format: 'numToSymbol' as ConvertFormat,
};

const toneMap = {
  a: ['a', 'ā', 'á', 'ǎ', 'à'],
  o: ['o', 'ō', 'ó', 'ǒ', 'ò'],
  e: ['e', 'ē', 'é', 'ě', 'è'],
  ü: ['ü', 'ǖ', 'ǘ', 'ǚ', 'ǜ'],
  v: ['ü', 'ǖ', 'ǘ', 'ǚ', 'ǜ'],
  ui: ['ui', 'uī', 'uí', 'uǐ', 'uì'],
  iu: ['iu', 'īu', 'íu', 'ǐu', 'ìu'],
  i: ['i', 'ī', 'í', 'ǐ', 'ì'],
  u: ['u', 'ū', 'ú', 'ǔ', 'ù'],
  n: ['n', 'n', 'ń', 'ň', 'ǹ'],
  m: ['m', 'm', 'ḿ', 'm', 'm̀'],
};

/**
 * @description: 拼音格式转换。pin1 yin1 -> pīn yīn 或 pīn yīn -> pin1 yin1 或 pīn yīn -> pin yin
 * @param {string} pinyin 要转换的拼音字符串或者拼音字符串数组
 * @param {ConvertOptions=} options 配置项
 * @return {string} 转换后的拼音字符串或者拼音字符串数组
 */
function convert(pinyin: string, options?: ConvertOptions): string;

/**
 * @description: 拼音格式转换。pin1 yin1 -> pīn yīn 或 pīn yīn -> pin1 yin1 或 pīn yīn -> pin yin
 * @param {string[]} pinyin 要转换的拼音字符串或者拼音字符串数组
 * @param {ConvertOptions=} options 配置项
 * @return {string[]} 转换后的拼音字符串或者拼音字符串数组
 */
function convert(pinyin: string[], options?: ConvertOptions): string[];

/**
 * @description: 拼音格式转换。pin1 yin1 -> pīn yīn 或 pīn yīn -> pin1 yin1 或 pīn yīn -> pin yin
 * @param {string | string[]} pinyin 要转换的拼音字符串或者拼音字符串数组
 * @param {ConvertOptions=} options 配置项
 * @return {string | string[]} 转换后的拼音字符串或者拼音字符串数组
 */
function convert(pinyin: string | string[], options?: ConvertOptions) {
  options = { ...DefaultConvertOptions, ...(options || {}) };
  const originType = typeof pinyin;

  if (typeof pinyin === 'string') {
    pinyin = pinyin.split(options.separator || ' ');
  }

  pinyin = pinyin.map((item) => {
    const format = options?.format;
    if (format === 'numToSymbol') {
      return formatNumToSymbol(item);
    } else if (format === 'symbolToNum') {
      return formatSymbolToNum(item);
    } else if (format === 'toneNone') {
      return formatToneNone(item);
    }
    return item;
  });

  if (originType === 'string') {
    return pinyin.join(options.separator);
  } else {
    return pinyin;
  }
}

function formatNumToSymbol(pinyin: string) {
  const lastChar = Number(pinyin[pinyin.length - 1]);
  if (lastChar >= 0 && lastChar <= 4) {
    for (let key in toneMap) {
      if (pinyin.includes(key)) {
        return pinyin
          .slice(0, pinyin.length - 1)
          .replace(key, toneMap[key as keyof typeof toneMap][lastChar]);
      }
    }
    return pinyin;
  } else {
    return pinyin;
  }
}

function formatSymbolToNum(pinyin: string) {
  return `${getPinyinWithoutTone(pinyin)}${getNumOfTone(pinyin)}`;
}

function formatToneNone(pinyin: string) {
  return getPinyinWithoutTone(pinyin);
}

export { convert };
