import type { Pattern } from '../common/ac';
import { Priority } from '@/common/constant';
import {
  getSingleWordPinyin,
  getNumOfTone,
  getPinyinWithoutTone,
} from '@/core/pinyin/handle';
import { isZhChar } from '@/common/utils';

export const InitialList = [
  'zh',
  'ch',
  'sh',
  'z',
  'c',
  's',
  'b',
  'p',
  'm',
  'f',
  'd',
  't',
  'n',
  'l',
  'g',
  'k',
  'h',
  'j',
  'q',
  'x',
  'r',
  'y',
  'w',
  '',
];

export const SpecialInitialList = ['j', 'q', 'x'];
export const SpecialFinalList = [
  'uān',
  'uán',
  'uǎn',
  'uàn',
  'uan',
  'uē',
  'ué',
  'uě',
  'uè',
  'ue',
  'ūn',
  'ún',
  'ǔn',
  'ùn',
  'un',
  'ū',
  'ú',
  'ǔ',
  'ù',
  'u',
];

export const SpecialFinalMap = {
  uān: 'üān',
  uán: 'üán',
  uǎn: 'üǎn',
  uàn: 'üàn',
  uan: 'üan',
  uē: 'üē',
  ué: 'üé',
  uě: 'üě',
  uè: 'üè',
  ue: 'üe',
  ūn: 'ǖn',
  ún: 'ǘn',
  ǔn: 'ǚn',
  ùn: 'ǜn',
  un: 'ün',
  ū: 'ǖ',
  ú: 'ǘ',
  ǔ: 'ǚ',
  ù: 'ǜ',
  u: 'ü',
};

export const doubleFinalList = [
  'ia',
  'ian',
  'iang',
  'iao',
  'ie',
  'iu',
  'iong',
  'ua',
  'uai',
  'uan',
  'uang',
  'ue',
  'ui',
  'uo',
  'üan',
  'üe',
  'van',
  've',
];

/**
 * @description: 数量词 + 特殊词 音调处理
 */
const Numbers = {
  一: 'yì',
  二: 'èr',
  三: 'sān',
  四: 'sì',
  五: 'wǔ',
  六: 'liù',
  七: 'qī',
  八: 'bā',
  九: 'jiǔ',
  十: 'shí',
  百: 'bǎi',
  千: 'qiān',
  万: 'wàn',
  亿: 'yì',
  单: 'dān',
  两: 'liǎng',
  双: 'shuāng',
  多: 'duō',
  几: 'jǐ',
  十一: 'shí yī',
  零一: 'líng yī',
  第一: 'dì yī',
};
const NumberWordMap = {
  重: 'chóng',
  行: 'háng',
  斗: 'dǒu',
};
function genNumberDict() {
  const dict: { [key: string]: string } = {
    十一: 'shí yī',
    零一: 'líng yī',
    第一: 'dì yī',
  };
  for (let number in Numbers) {
    for (let key in NumberWordMap) {
      const word = `${number}${key}`;
      const pinyin = `${Numbers[number as keyof typeof Numbers]} ${
        NumberWordMap[key as keyof typeof NumberWordMap]
      }`;
      dict[word] = pinyin;
    }
  }
  return dict;
}
const NumberDict = genNumberDict();
export const PatternNumberDict: Pattern[] = Object.keys(NumberDict).map(
  (key) => ({
    zh: key,
    pinyin: NumberDict[key],
    priority: Priority.DictNumber + key.length,
    length: key.length,
  })
);

/**
 * @description: 特殊变调处理：https://zh.wiktionary.org/wiki/Appendix:%E2%80%9C%E4%B8%80%E2%80%9D%E5%8F%8A%E2%80%9C%E4%B8%8D%E2%80%9D%E7%9A%84%E5%8F%98%E8%B0%83
 */
const inflectionMap = {
  // 说不说，说一说，叠词之间发音为轻声
  不: {
    bú: [4], // "不" 后面跟 4 声时，变调为 2 声
  },
  一: {
    yí: [4], // "一" 后面跟 4 声时，变调为 2 声
    yì: [1, 2, 3],
  },
};
const inflectionIgnoreSuffix = ['的', '地', '而', '之', '后', '也', '还'];
export const inflectionList = Object.keys(inflectionMap);

// 处理 一、不 的变调
export function processInflection(cur: string, pre: string, next: string) {
  if (inflectionList.indexOf(cur) === -1) {
    return getSingleWordPinyin(cur);
  }
  // 说不说，说一说，叠词之间发音为轻声
  if (pre === next && getSingleWordPinyin(pre) !== pre) {
    return getPinyinWithoutTone(getSingleWordPinyin(cur));
  }
  // 一、不的变调处理
  if (next && !inflectionIgnoreSuffix.includes(next)) {
    const nextPinyin = getSingleWordPinyin(next);
    if (nextPinyin !== next) {
      const nextTone = getNumOfTone(nextPinyin);
      const pinyinMap = inflectionMap[cur as keyof typeof inflectionMap];
      for (let pinyin in pinyinMap) {
        const tones = pinyinMap[pinyin as keyof typeof pinyinMap] as number[];
        if (tones.indexOf(Number(nextTone)) !== -1) {
          return pinyin;
        }
      }
    }
  }
}

// 处理 了
export function processInflectionLiao(cur: string, pre: string) {
  if (cur === '了' && !isZhChar(pre)) {
    return 'liǎo';
  }
}

export function processSepecialPinyin(cur: string, pre: string, next: string) {
  return (
    processInflectionLiao(cur, pre) ||
    processInflection(cur, pre, next) ||
    getSingleWordPinyin(cur)
  );
}