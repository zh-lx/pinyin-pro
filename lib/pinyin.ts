import {
  getPinyin,
  getMultipleTone,
  getPinyinWithoutTone,
  getInitialAndFinal,
  getNumOfTone,
  getPinyinWithNum,
  getFirstLetter,
} from './handle';
import { getStringLength, isZhChar } from './utils';
import { hasCustomConfig } from './custom';

interface BasicOptions {
  toneType?: 'symbol' | 'num' | 'none';
  pattern?: 'pinyin' | 'initial' | 'final' | 'num' | 'first';
  multiple?: boolean;
  mode?: 'normal' | 'surname';
  removeNonZh?: boolean;
  nonZh?: 'spaced' | 'consecutive' | 'removed';
  v?: boolean;
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
  nonZh: 'spaced',
  v: false,
};

/**
 * @description: 获取汉语字符串的拼音
 * @param {string} word 要转换的汉语字符串
 * @param {OptionsReturnString=} options 配置项
 * @return {string | string[]} options 配置项中的 type 为 string 时，返回字符串，中间用空格隔开；为 array 时，返回拼音字符串数组
 */
function pinyin(word: string, options?: OptionsReturnString): string;

/**
 * @description: 获取汉语字符串的拼音
 * @param {string} word 要转换的汉语字符串
 * @param {OptionsReturnArray=} options 配置项
 * @return {string | string[]} options 配置项中的 type 为 string 时，返回字符串，中间用空格隔开；为 array 时，返回拼音字符串数组
 */
function pinyin(word: string, options?: OptionsReturnArray): string[];

/**
 * @description: 获取汉语字符串的拼音
 * @param {string} word 要转换的汉语字符串
 * @param {CompleteOptions=} options 配置项
 * @return {string | string[]} options 配置项中的 type 为 string 时，返回字符串，中间用空格隔开；为 array 时，返回拼音字符串数组
 */
function pinyin(word: string, options = DEFAULT_OPTIONS): string | string[] {
  // word传入类型错误时
  if (typeof word !== 'string') {
    return word;
  }
  // 如果 removeNonZh 为 true，移除非中文字符串
  if (options.removeNonZh || options.nonZh === 'removed') {
    let str = '';
    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      if (isZhChar(char)) {
        str += char;
      }
    }
    word = str;
  }
  // 传入空字符串
  if (word === '') {
    return options.type === 'array' ? [] : '';
  }

  let pinyin = '';
  if (options.removeNonZh || options.nonZh === 'removed') {
    pinyin = getPinyin(word, getStringLength(word), {
      mode: options.mode || 'normal',
      nonZh: options.nonZh,
      useCustomConfig: hasCustomConfig(),
    });
  } else {
    // 针对双精度unicode编码字符处理
    let i = 0;
    let lastIndex = 0;
    let items: {
      val: string;
      isDouble: boolean;
      firstNonZh?: boolean;
      lastNonZh?: boolean;
    }[] = [];
    while (i < word.length) {
      const currentWord = word.substring(i, i + 2);
      if (getStringLength(currentWord) !== currentWord.length) {
        // 双精度unicode编码字符
        if (lastIndex !== i) {
          const leftWord = word.substring(lastIndex, i);
          const leftPinyin = getPinyin(leftWord, getStringLength(leftWord), {
            mode: options.mode || 'normal',
            nonZh: options.nonZh || 'spaced',
            useCustomConfig: hasCustomConfig(),
          });
          items.push({
            val: leftPinyin,
            isDouble: false,
            firstNonZh: !isZhChar(leftWord[0]),
            lastNonZh: !isZhChar(leftWord[leftWord.length - 1]),
          });
        }
        items.push({ val: currentWord, isDouble: true });
        lastIndex = i + 2;
        i = i + 2;
      } else {
        i++;
      }
    }
    if (lastIndex !== i) {
      const remainedWord = word.substring(lastIndex, i);
      const remainedPinyin = getPinyin(
        remainedWord,
        getStringLength(remainedWord),
        {
          mode: options.mode || 'normal',
          nonZh: options.nonZh || 'spaced',
          useCustomConfig: hasCustomConfig(),
        }
      );
      items.push({
        val: remainedPinyin,
        isDouble: false,
        firstNonZh: !isZhChar(remainedWord[0]),
        lastNonZh: !isZhChar(remainedWord[remainedWord.length - 1]),
      });
    }

    if (options.nonZh === 'consecutive') {
      for (let i = 0; i < items.length; i++) {
        if (i === 0) {
          pinyin += items[0].val;
        } else {
          // 当前字符起始是否为非中文
          const currentNonZh = items[i].isDouble || items[i].firstNonZh;
          // 上一个字符结束是否为非中文
          const preNonZh = items[i - 1].isDouble || items[i - 1].lastNonZh;
          pinyin =
            pinyin + (currentNonZh && preNonZh ? '' : ' ') + items[i].val;
        }
      }
    } else {
      pinyin = items.map((item) => item.val).join(' ');
    }
  }

  // 对multiple进行处理
  if (getStringLength(word) === 1 && options.multiple) {
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

  // v参数处理
  if (options.v) {
    pinyin = pinyin.replace(/ü/g, 'v');
  }

  return options.type === 'array' ? pinyin.split(' ') : pinyin;
}

export { pinyin };
