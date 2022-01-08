import {
  getPinyin,
  getMultipleTone,
  getPinyinWithoutTone,
  getInitialAndFinal,
  getNumOfTone,
  getPinyinWithNum,
  getFirstLetter,
} from './handle';
import { hasCustomConfig } from './custom';

interface BasicOptions {
  toneType?: 'symbol' | 'num' | 'none';
  pattern?: 'pinyin' | 'initial' | 'final' | 'num' | 'first';
  multiple?: boolean;
  mode?: 'normal' | 'surname';
  removeNonZh?: boolean;
}

interface OptionsReturnString extends BasicOptions {
  type?: 'string';
}

interface OptionsReturnArray extends BasicOptions {
  type: 'array';
}
interface CompleteOptions extends BasicOptions {
  type?: 'string' | 'array';
}

const DEFAULT_OPTIONS: CompleteOptions = {
  pattern: 'pinyin',
  toneType: 'symbol',
  type: 'string',
  multiple: false,
  mode: 'normal',
  removeNonZh: false,
};

/**
 * @description: 获取汉语字符串的拼音
 * @param {string} word 要转换的汉语字符串
 * @param {OptionsReturnString} options 配置项
 * @return {string | string[]} options 配置项中的 type 为 string 时，返回字符串，中间用空格隔开；为 array 时，返回拼音字符串数组
 */
function pinyin(word: string, options?: OptionsReturnString): string;

/**
 * @description: 获取汉语字符串的拼音
 * @param {string} word 要转换的汉语字符串
 * @param {OptionsReturnArray} options 配置项
 * @return {string | string[]} options 配置项中的 type 为 string 时，返回字符串，中间用空格隔开；为 array 时，返回拼音字符串数组
 */
function pinyin(word: string, options?: OptionsReturnArray): string[];

/**
 * @description: 获取汉语字符串的拼音
 * @param {string} word 要转换的汉语字符串
 * @param {CompleteOptions} options 配置项
 * @return {string | string[]} options 配置项中的 type 为 string 时，返回字符串，中间用空格隔开；为 array 时，返回拼音字符串数组
 */
function pinyin(word: string, options = DEFAULT_OPTIONS): string | string[] {
  // word传入类型错误时
  if (typeof word !== 'string') {
    return word;
  }
  // 如果 removeNonZh 为 true，移除非中文字符串
  if (options.removeNonZh) {
    let str = '';
    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      let code = char.charCodeAt(0);
      if (code >= 19968 && code <= 40869) {
        str += char;
      }
    }
    word = str;
  }
  // 传入空字符串
  if (word === '') {
    return options.type === 'array' ? [] : '';
  }

  // 获取原始拼音
  let pinyin = getPinyin(word, word.length, {
    mode: options.mode || 'normal',
    useCustomConfig: hasCustomConfig(),
  });

  // 对multiple进行处理
  if (word.length === 1 && options.multiple) {
    pinyin = getMultipleTone(word);
  }

  const originPinyin = pinyin;

  // pattern参数处理
  switch (options.pattern) {
    case 'pinyin':
      break;
    case 'num':
      const numOfTone = getNumOfTone(pinyin);
      return options.type === 'array' ? numOfTone.split(' ') : numOfTone;
    case 'initial':
      pinyin = getInitialAndFinal(pinyin).initial;
      break;
    case 'final':
      pinyin = getInitialAndFinal(pinyin).final;
      break;
    case 'first':
      pinyin = getFirstLetter(pinyin);
      break;
    default:
      break;
  }

  // toneType参数处理
  switch (options.toneType) {
    case 'symbol':
      break;
    case 'none':
      pinyin = getPinyinWithoutTone(pinyin);
      break;
    case 'num': {
      pinyin = getPinyinWithNum(pinyin, originPinyin);
      break;
    }
    default:
      break;
  }

  return options.type === 'array' ? pinyin.split(' ') : pinyin;
}

export { pinyin };
