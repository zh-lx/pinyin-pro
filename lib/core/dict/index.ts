import { Probability } from "@/common/constant";
import { Pattern, Priority, acTree } from "@/common/segmentit";

type DICT = {
  [key: string]:
    | string // 拼音
    | [string] // [拼音]
    | [string, number] // [拼音, 词频概率]
    | [string, number, string]; // [拼音, 词频概率, 词性]
};

export function addDict(dict: DICT | {}, name?: string) {
  const patterns: Pattern[] = [];
  for (let key in dict as DICT) {
    const value = (dict as DICT)[key];
    if (typeof value === "string") {
      patterns.push({
        zh: key,
        pinyin: value,
        probability: Probability.DICT * key.length * key.length,
        length: key.length,
        priority: Priority.Normal,
        dict: name || Symbol(""),
      });
    } else if (Array.isArray(value)) {
      patterns.push({
        zh: key,
        pinyin: value[0],
        probability: typeof value[1] === "number" ? value[1] : Probability.DICT * key.length * key.length,
        length: key.length,
        priority: Priority.Normal,
        dict: name || Symbol(""),
        pos: typeof value[2] === "string" ? value[2] : "",
      });
    }
  }
  acTree.build(patterns);
}

export function removeDict(dictName: string) {
  acTree.removeDict(dictName);
}
