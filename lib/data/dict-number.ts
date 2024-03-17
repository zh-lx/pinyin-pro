import type { Pattern } from "../common/ac";
import { Priority } from "@/common/constant";

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
  两: 'liǎng',
  双: 'shuāng',
  多: 'duō',
  十一: 'shí yī',
  零一: 'líng yī',
  几: 'jǐ',
};

const NumberWordMap = {
  重: 'chóng',
  行: 'háng',
  斗: 'dǒu',
};

function genNumberDict() {
  const dict: { [key: string]: string; } = {};
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

export const PatternNumberDict: Pattern[] = Object.keys(NumberDict).map((key) => ({
  zh: key,
  pinyin: NumberDict[key],
  priority: Priority.DictNumber + key.length,
  length: key.length,
}));