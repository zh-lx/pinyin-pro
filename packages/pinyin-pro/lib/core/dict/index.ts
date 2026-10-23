import { Priority, Probability } from "@/common/constant";
import { Pattern, acTree, ensureAcBuilt } from "@/common/segmentit";
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

type DictChange = {
  dict: string | Symbol;
  pinyin: string;
  handle: "add" | "replace";
};

const affectedCharsByDict = new Map<string | Symbol, Set<string>>();
const charChanges = new Map<string, { original: string; changes: DictChange[] }>();

export function addDict(dict: DICT | {}, options?: string | DictOptions) {
  ensureAcBuilt();
  const patterns: Pattern[] = [];
  // string 类型时：options 为 name（）
  const name = typeof options === "object" ? options.name : options;
  const dictName = name || DefaultName;
  const dict1Handle = (options as DictOptions)?.dict1 || "add";
  for (let word in dict as DICT) {
    const value = (dict as DICT)[word];
    const pinyin = Array.isArray(value) ? value[0] : value;
    const wordLength = stringLength(word);
    if (wordLength === 1) {
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
            : Probability.DICT * wordLength * wordLength,
        length: wordLength,
        priority: Priority.Normal,
        dict: dictName,
        pos: typeof value[2] === "string" ? value[2] : "",
      });
    } else {
      patterns.push({
        zh: word,
        pinyin,
        probability: Probability.DICT * wordLength * wordLength,
        length: wordLength,
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
  if (handle === "ignore") {
    return;
  }
  if (!affectedCharsByDict.has(dict)) {
    affectedCharsByDict.set(dict, new Set());
  }
  affectedCharsByDict.get(dict)!.add(char);
  if (!charChanges.has(char)) {
    charChanges.set(char, { original: DICT1.get(char), changes: [] });
  }
  const change: DictChange = { dict, pinyin, handle };
  // Retain duplicate additions because another dictionary can own the same reading.
  charChanges.get(char)!.changes.push(change);
  DICT1.set(char, applyChange(DICT1.get(char), change));
}

function applyChange(current: string, { pinyin, handle }: DictChange): string {
  if (handle === "replace" || !current) {
    return pinyin;
  }
  return current.split(" ").includes(pinyin) ? current : `${current} ${pinyin}`;
}

function removeOriginDict(dict: string | Symbol) {
  affectedCharsByDict.get(dict)?.forEach((char) => {
    const state = charChanges.get(char)!;
    state.changes = state.changes.filter((change) => change.dict !== dict);
    // Replay surviving changes in call order, including repeated dictionary names.
    DICT1.set(char, state.changes.reduce(applyChange, state.original));
    if (!state.changes.length) {
      charChanges.delete(char);
    }
  });
  affectedCharsByDict.delete(dict);
}
