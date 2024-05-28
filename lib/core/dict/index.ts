import { Priority, Probability } from "@/common/constant";
import { Pattern, acTree } from "@/common/segmentit";
import { getStringLength } from "@/common/utils";
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
  for (let key in dict as DICT) {
    const value = (dict as DICT)[key];
    const pinyin = Array.isArray(value) ? value[0] : value;
    if (getStringLength(key) === 1) {
      addToOriginDict(
        dictName,
        key,
        pinyin,
        dict1Handle
      );
    }
    if (Array.isArray(value)) {
      patterns.push({
        zh: key,
        pinyin,
        probability:
          typeof value[1] === "number"
            ? value[1]
            : Probability.DICT * key.length * key.length,
        length: key.length,
        priority: Priority.Normal,
        dict: dictName,
        pos: typeof value[2] === "string" ? value[2] : "",
      });
    } else {
      patterns.push({
        zh: key,
        pinyin,
        probability: Probability.DICT * key.length * key.length,
        length: key.length,
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
  key: string,
  pinyin: string,
  handle: "add" | "replace" | "ignore" = "add"
) {
  if (!originDictMap.get(dict)) {
    originDictMap.set(dict, {})
  }
  const originDict = originDictMap.get(dict)!;
  const code = key.charCodeAt(0);
  if (!originDict[key]) {
    originDict[key] = DICT1[code] as string;
  }
  if (handle === "add") {
    if (DICT1[code] && !DICT1[code].split(' ').includes(pinyin)) {
      DICT1[code] += ` ${pinyin}`;
    } else if (!DICT1[code]) {
      DICT1[code] = pinyin;
    }
  } else if (handle === "replace") {
    DICT1[code] = pinyin;
  }
}

function removeOriginDict(dict: string | Symbol) {
  const originDict = originDictMap.get(dict) || {};
  for (let key in originDict) {
    const code = key.charCodeAt(0);
    DICT1[code] = originDict[key];
    delete originDict[key];
  }
}
