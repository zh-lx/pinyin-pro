import { PatternNumberDict } from "@/data/special";
import { Pattern2 } from "@/data/dict2";
import { Pattern3 } from "@/data/dict3";
import { Pattern4 } from "@/data/dict4";
import { Pattern5 } from "@/data/dict5";
import { PatternSurname } from "@/data/surname";
import { maxProbability } from "./max-probability";
import { minTokenization } from "./min-tokenization";
import { reverseMaxMatch } from "./reverse-max-match";
import { Priority } from "@/common/constant";
import type { SurnameMode } from "../type";

export const enum TokenizationAlgorithm {
  ReverseMaxMatch = 1,
  MaxProbability = 2,
  MinTokenization = 3,
}

/**
 * @description: AC 自动机
 */
export interface Pattern {
  zh: string;
  pinyin: string;
  probability: number;
  length: number;
  priority: number;
  dict: string | symbol;
  pos?: string; // 词性
  node?: TrieNode; // pattern 所属的 node 节点
}

export interface MatchPattern extends Pattern {
  index: number;
}

class TrieNode {
  children: Map<string, TrieNode>; // 子节点
  fail: TrieNode | null; // 失效指针
  patterns: Pattern[];
  prefix: string; // 前置字符串
  parent: TrieNode | null; // 父节点
  key: string; // 所在父节点的 key

  constructor(parent: TrieNode | null, prefix: string = "", key = "") {
    this.children = new Map();
    this.fail = null;
    this.patterns = [];
    this.parent = parent;
    this.prefix = prefix;
    this.key = key;
  }
}

export class AC {
  root: TrieNode;
  dictMap = new Map<string | Symbol, Set<Pattern>>();
  queues: TrieNode[][] = [];

  constructor() {
    this.root = new TrieNode(null);
  }

  build(patternList: Pattern[]) {
    this.buildTrie(patternList);
    this.buildFailPointer();
  }

  // 构建 trie 树
  buildTrie(patternList: Pattern[]) {
    for (let pattern of patternList) {
      const { zh } = pattern;
      let cur = this.root;
      for (let i = 0; i < zh.length; i++) {
        let c = zh.charAt(i);
        if (!cur.children.has(c)) {
          const trieNode = new TrieNode(cur, zh.slice(0, i), c);
          cur.children.set(c, trieNode);
          this.addNodeToQueues(trieNode);
        }
        cur = cur.children.get(c) as TrieNode;
      }
      this.insertPattern(cur.patterns, pattern);
      pattern.node = cur;
      this.addPatternToDictMap(pattern);
    }
  }

  // 构建失败指针
  buildFailPointer() {
    let queue: TrieNode[] = [];
    let queueIndex = 0;
    this.queues.forEach((_queue) => {
      queue = queue.concat(_queue);
    });
    this.queues = [];

    while (queue.length > queueIndex) {
      let node = queue[queueIndex++] as TrieNode;
      let failNode = node.parent && (node.parent.fail as TrieNode | null);
      let key = node.key;

      while (failNode && !failNode.children.has(key)) {
        failNode = failNode.fail;
      }
      if (!failNode) {
        node.fail = this.root;
      } else {
        node.fail = failNode.children.get(key) as TrieNode;
      }
    }
  }

  // 将 pattern 添加到 dictMap 中
  addPatternToDictMap(pattern: Pattern) {
    if (!this.dictMap.has(pattern.dict)) {
      this.dictMap.set(pattern.dict, new Set());
    }
    (this.dictMap.get(pattern.dict) as Set<Pattern>).add(pattern);
  }

  addNodeToQueues(trieNode: TrieNode) {
    if (!this.queues[trieNode.prefix.length]) {
      this.queues[trieNode.prefix.length] = [];
    }
    this.queues[trieNode.prefix.length].push(trieNode);
  }

  // 按照优先级插入 pattern
  insertPattern(patterns: Pattern[], pattern: Pattern) {
    for (let i = patterns.length - 1; i >= 0; i--) {
      const _pattern = patterns[i];
      if (
        pattern.priority === _pattern.priority &&
        pattern.probability >= _pattern.probability
      ) {
        patterns[i + 1] = _pattern;
      } else if (pattern.priority > _pattern.priority) {
        patterns[i + 1] = _pattern;
      } else {
        patterns[i + 1] = pattern;
        return;
      }
    }
    patterns[0] = pattern;
  }

  removeDict(dictName: string | symbol) {
    if (this.dictMap.has(dictName)) {
      const set = this.dictMap.get(dictName) as Set<Pattern>;
      set.forEach((pattern) => {
        (pattern.node as TrieNode).patterns = (
          pattern.node as TrieNode
        ).patterns.filter((_pattern) => _pattern !== pattern);
      });
      this.dictMap.delete(dictName);
    }
  }

  // 搜索字符串返回匹配的模式串
  match(text: string, surname: SurnameMode) {
    let cur = this.root;
    let result: MatchPattern[] = [];
    for (let i = 0; i < text.length; i++) {
      let c = text.charAt(i);

      while (cur !== null && !cur.children.has(c)) {
        cur = cur.fail as TrieNode;
      }

      if (cur === null) {
        cur = this.root;
      } else {
        cur = cur.children.get(c) as TrieNode;
        const pattern = cur.patterns.find((item) => {
          if (surname === "off") {
            return item.priority !== Priority.Surname;
          } else if (surname === "head") {
            return i === 0;
          } else {
            return true;
          }
        });
        if (pattern) {
          result.push({
            ...pattern,
            index: i - pattern.length + 1,
          });
        }
        let failNode = cur.fail;
        while (failNode !== null) {
          const pattern = failNode.patterns.find((item) => {
            if (surname === "off") {
              return item.priority !== Priority.Surname;
            } else if (surname === "head") {
              return i === 0;
            } else {
              return true;
            }
          });
          if (pattern) {
            result.push({
              ...pattern,
              index: i - pattern.length + 1,
            });
          }
          failNode = failNode.fail;
        }
      }
    }
    return result;
  }

  search(
    text: string,
    surname: SurnameMode,
    algorithm: TokenizationAlgorithm = TokenizationAlgorithm.MaxProbability
  ) {
    const patterns = this.match(text, surname);
    if (algorithm === TokenizationAlgorithm.ReverseMaxMatch) {
      return reverseMaxMatch(patterns);
    } else if (algorithm === TokenizationAlgorithm.MinTokenization) {
      return minTokenization(patterns, text.length);
    }
    return maxProbability(patterns, text.length);
  }
}

// 常规匹配
export const PatternsNormal = [
  ...Pattern5,
  ...Pattern4,
  ...Pattern3,
  ...Pattern2,
  ...PatternNumberDict,
  ...PatternSurname,
];
export const acTree = new AC();
acTree.build(PatternsNormal);
