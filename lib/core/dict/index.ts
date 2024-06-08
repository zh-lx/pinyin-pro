import { Priority, Probability } from "@/common/constant";
import { Pattern, acTree } from "@/common/segmentit";
import { stringLength } from "@/common/utils";
import DICT1 from "@/data/dict1";

const DefaultName = Symbol("default");

type DICT = {
  [key: string]:
    | string // 拼音
    | [string] // [拼音]
    | [string, number] // [拼音, 词频概率]
    | [string, number, string]; // [拼音, 词频概率, 词性]
};

type DictOptions = {
  name?: string;
  dict1?: "add" | "replace" | "ignore";
};

const originDictMap = new Map<string | Symbol, { [word: string]: string }>();

export function addDict(dict: DICT | {}, options?: string | DictOptions) {
  const patterns: Pattern[] = [];
  // string 类型时：options 为 name（）
  const name = typeof options === "object" ? options.name : options;
  const dictName = name || DefaultName;
  const dict1Handle = (options as DictOptions)?.dict1 || "add";
  for (let word in dict as DICT) {
    const value = (dict as DICT)[word];
    const pinyin = Array.isArray(value) ? value[0] : value;
    if (stringLength(word) === 1) {
      addToOriginDict(
        dictName,
        word,
        pinyin,
        dict1Handle
      );
    }
    if (Array.isArray(value)) {
      patterns.push({
        zh: word,
        pinyin,
        probability:
          typeof value[1] === "number"
            ? value[1]
            : Probability.DICT * stringLength(word) * stringLength(word),
        length: stringLength(word),
        priority: Priority.Normal,
        dict: dictName,
        pos: typeof value[2] === "string" ? value[2] : "",
      });
    } else {
      patterns.push({
        zh: word,
        pinyin,
        probability: Probability.DICT * stringLength(word) * stringLength(word),
        length: stringLength(word),
        priority: Priority.Normal,
        dict: dictName,
      });
    }
  }
  acTree.build(patterns);
}

export function removeDict(dictName?: string) {
  acTree.removeDict(dictName || DefaultName);
  removeOriginDict(dictName || DefaultName);
}

function addToOriginDict(
  dict: string | Symbol,
  char: string,
  pinyin: string,
  handle: "add" | "replace" | "ignore" = "add"
) {
  if (!originDictMap.get(dict)) {
    originDictMap.set(dict, {})
  }
  const originDict = originDictMap.get(dict)!;
  if (!originDict[char]) {
    originDict[char] = DICT1.get(char) as string;
  }
  if (handle === "add") {
    const existedPinyin = DICT1.get(char);
    if (existedPinyin && !existedPinyin.split(' ').includes(pinyin)) {
      DICT1.set(char, `${existedPinyin} ${pinyin}`);
    } else if (!DICT1.get(char)) {
      DICT1.set(char, pinyin);
    }
  } else if (handle === "replace") {
    DICT1.set(char, pinyin);
  }
}

function removeOriginDict(dict: string | Symbol) {
  const originDict = originDictMap.get(dict) || {};
  for (let char in originDict) {
    DICT1.set(char, originDict[char]);
    delete originDict[char];
  }
}
