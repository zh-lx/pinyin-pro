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
  更: 'gēng',
};

// 与以下词组合时，不变调
function genNumberDict() {
  const dict: { [key: string]: string } = {
    // 表示量词
    第一: 'dì yī',
    一号: 'yī hào', // 如：一号球鞋，但暂不支持如：他忽然一号(yì háo)。
    
    // 表示日期
    月一: 'yuè yī', // 如：五月一号

    // 表示数字
    零一: 'líng yī', // 如：二零零一、二百零一行
    二一: 'èr yī', // 如：二一添作五
    三一: 'sān yī',
    四一: 'sì yī',
    五一: 'wǔ yī',
    六一: 'liù yī', // 如：六一儿童节
    七一: 'qī yī',
    八一: 'bā yī', // 如：八一建军节
    九一: 'jiǔ yī',
    十一: 'shí yī', // 如：十一国庆节
    一二: 'yī èr', // 如：乘法口诀表，一二得二
    一三: 'yī sān',
    一四: 'yī sì',
    一五: 'yī wǔ', // 如：一五一十
    一六: 'yī liù',
    一七: 'yī qī',
    一八: 'yī bā',
    一九: 'yī jiǔ', // 如：一九天很冷
    一十: 'yī shí',
    一又: 'yī yòu', // 如小数：一又二分之一

    // 其他
    归一: 'guī yī', // 如：归一化、九九归一

    风一更: 'fēng yì gēng', // 风一更，雪一更
    雪一更: 'xuě yì gēng',
    一更更: 'yì gēng gēng', // 一声声，一更更。
  };

  // 特殊词语根据上下文变调
  const contextualSandhiDict: { [key: string]: string } = {
    一更: 'yī gēng', // 如：「一更天」时读 yī，「风一更」时读 yì
  };

  for (let number in Numbers) {
    for (let key in NumberWordMap) {
      const word = `${number}${key}`;
      let pinyin = contextualSandhiDict[word] ?
        contextualSandhiDict[word] :
        `${Numbers[number as keyof typeof Numbers]} ${
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

const toneSandhiIgnoreSuffix = ['的', '而', '之', '后', '也', '还'];
export const toneSandhiList = Object.keys(toneSandhiMap);

// 处理「一」和 「不」字的变调
export function processToneSandhi(cur: string, pre: string, next: string) {  
  if (toneSandhiList.indexOf(cur) === -1) {
    return getSingleWordPinyin(cur);
  }
  // 轻声变调：说不说，说一说，叠词之间发音为轻声
  if (pre === next && getSingleWordPinyin(pre) !== pre) {
    return getPinyinWithoutTone(getSingleWordPinyin(cur));
  }
  // 「一」和 「不」字变调处理
  if (next && !toneSandhiIgnoreSuffix.includes(next)) {
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
  if (cur === '了' && !isZhChar(pre)) {
    return 'liǎo';
  }
}

export function processSepecialPinyin(cur: string, pre: string, next: string) {
  return (
    processToneSandhiLiao(cur, pre) ||
    processToneSandhi(cur, pre, next) ||
    getSingleWordPinyin(cur)
  );
}