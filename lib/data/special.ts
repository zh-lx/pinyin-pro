import { Probability, Priority } from '@/common/constant';
import type { Pattern } from  '../common/segmentit';
import {
  getSingleWordPinyin,
  getNumOfTone,
  getPinyinWithoutTone,
} from '@/core/pinyin/handle';
import DICT1 from './dict1';
import { stringLength } from '@/common/utils';

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
  一十: 'yī shí',
  一十一: 'yī shí yī',
};
const NumberWordMap = {
  重: 'chóng',
  行: 'háng',
  斗: 'dǒu',
  更: 'gēng',
};

// 与以下词组合时，不变调
function genNumberDict() {
  const dict: { [key: string]: string } = {
    零一: 'líng yī', // 如：二零零一年、二百零一行
    〇一: 'líng yī', // 如：二〇〇一年、二〇一〇年
    十一: 'shí yī', // 如：十一国庆节
    一十: 'yī shí',
    第一: 'dì yī',
    一十一: 'yī shí yī',
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
    probability: Probability.Rule,
    length: stringLength(key),
    priority: Priority.Normal,
    dict: Symbol('rule'),
  })
);

/**
 * @description: 连续变调处理：https://zh.wiktionary.org/wiki/Appendix:%E2%80%9C%E4%B8%80%E2%80%9D%E5%8F%8A%E2%80%9C%E4%B8%8D%E2%80%9D%E7%9A%84%E5%8F%98%E8%B0%83
 */
const toneSandhiMap = {
  // 说不说，说一说，叠词之间发音为轻声
  不: {
    bú: [4], // "不" 后面跟 4 声时，变调为 2 声
  },
  一: {
    yí: [4], // "一" 后面跟 4 声时，变调为 2 声
    yì: [1, 2, 3],
  },
};

const toneSandhiIgnoreSuffix = {
  不: ['的', '而', '之', '后', '也', '还', '地'],
  一: ['的', '而', '之', '后', '也', '还', '是'],
};
export const toneSandhiList = Object.keys(toneSandhiMap);

// 处理「一」和 「不」字的变调
export function processToneSandhi(cur: string, pre: string, next: string) {
  if (toneSandhiList.indexOf(cur) === -1) {
    return getSingleWordPinyin(cur);
  }
  // 轻声变调：说不说，说一说，叠词之间发音为轻声
  if (pre === next && pre && getSingleWordPinyin(pre) !== pre) {
    return getPinyinWithoutTone(getSingleWordPinyin(cur));
  }
  // 「一」和 「不」字变调处理
  if (
    next &&
    !toneSandhiIgnoreSuffix[
      cur as keyof typeof toneSandhiIgnoreSuffix
    ].includes(next)
  ) {
    const nextPinyin = getSingleWordPinyin(next);
    if (nextPinyin !== next) {
      const nextTone = getNumOfTone(nextPinyin);
      const pinyinMap = toneSandhiMap[cur as keyof typeof toneSandhiMap];
      for (let pinyin in pinyinMap) {
        const tones = pinyinMap[pinyin as keyof typeof pinyinMap] as number[];
        if (tones.indexOf(Number(nextTone)) !== -1) {
          return pinyin;
        }
      }
    }
  }
}

// 处理「了」字的变调
export function processToneSandhiLiao(cur: string, pre: string) {
  if (cur === '了' && (!pre || !DICT1.get(pre))) {
    return 'liǎo';
  }
}

// 处理叠字符[々]
function processReduplicationChar(cur: string, pre: string) {
  if (cur === '々') {
    if (!pre || !DICT1.get(pre)) {
      return 'tóng';
    } else {
      return DICT1.get(pre).split(' ')[0];
    }
  }
}

export function processSepecialPinyin(cur: string, pre: string, next: string) {
  return (
    processReduplicationChar(cur, pre) ||
    processToneSandhiLiao(cur, pre) ||
    processToneSandhi(cur, pre, next) ||
    getSingleWordPinyin(cur)
  );
}
