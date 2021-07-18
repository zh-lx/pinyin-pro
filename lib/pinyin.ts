import {
  getPinyin,
  getMultipleTone,
  getPinyinWithoutTone,
  getInitialAndFinal,
  getNumOfTone,
  getPinyinWithNum,
  getFirstLetter,
} from './handle';

const DEFAULT_OPTIONS: {
  toneType?: 'symbol' | 'num' | 'none';
  pattern?: 'pinyin' | 'initial' | 'final' | 'num' | 'first';
  type?: 'string' | 'array';
  multiple?: boolean;
} = {
  pattern: 'pinyin',
  toneType: 'symbol',
  type: 'string',
  multiple: false,
};

function pinyinFn(
  word: string,
  options?: {
    toneType?: 'symbol' | 'num' | 'none';
    pattern?: 'pinyin' | 'initial' | 'final' | 'num' | 'first';
    type?: 'string';
    multiple?: boolean;
  }
): string;
function pinyinFn(
  word: string,
  options?: {
    toneType?: 'symbol' | 'num' | 'none';
    pattern?: 'pinyin' | 'initial' | 'final' | 'num' | 'first';
    type: 'array';
    multiple?: boolean;
  }
): string[];

function pinyinFn (word: string, options = DEFAULT_OPTIONS): string | string[] {
  // word传入类型错误时
  if (typeof word !== 'string') {
    return word;
  }
  // 传入空字符串
  if (word === '') {
    return options.type === 'array' ? [] : '';
  }
  // 获取原始拼音
  let pinyin = getPinyin(word, word.length);

  // 对multiple进行处理
  if (word.length === 1 && options.multiple) {
    pinyin = getMultipleTone(word);
  }

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
    case 'num':
      pinyin = getPinyinWithNum(pinyin);
      break;
    default:
      break;
  }

  return options.type === 'array' ? pinyin.split(' ') : pinyin;
};

export { pinyinFn };
