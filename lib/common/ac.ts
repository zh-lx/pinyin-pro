import { Pattern2 } from './../data/dict2';
import { Pattern3 } from './../data/dict3';
import { Pattern4 } from './../data/dict4';
import { Pattern5 } from './../data/dict5';
import { PatternSurname } from './../data/surname';

/**
 * @description: AC 自动机
 */

export interface Pattern {
  zh: string;
  pinyin: string;
  priority: number;
  length: number;
}

interface MatchPattern extends Pattern {
  index: number;
}

class TrieNode {
  children: Map<string, TrieNode>; // 子节点
  fail: TrieNode | null; // 失效指针
  isEnd: boolean;
  pattern: Pattern | null;

  constructor() {
    this.children = new Map();
    this.fail = null;
    this.isEnd = false;
    this.pattern = null;
  }
}

export class AC {
  root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  // 构建 trie 树
  buildTrie(patterns: Pattern[]) {
    for (let pattern of patterns) {
      const { zh, priority } = pattern;
      let cur = this.root;
      for (let i = 0; i < zh.length; i++) {
        let c = zh.charAt(i);
        if (!cur.children.has(c)) {
          cur.children.set(c, new TrieNode());
        }
        cur = cur.children.get(c) as TrieNode;
      }
      cur.isEnd = true;
      if (!cur.pattern || priority >= cur.pattern.priority) {
        cur.pattern = pattern;
      }
    }
    this.buildFailPointer();
  }

  // 重新构建树
  rebuildTrie(patterns: Pattern[]) {
    this.root = new TrieNode();
    this.buildTrie(patterns);
    this.buildFailPointer();
  }

  // 构建失败指针
  buildFailPointer() {
    let queue = [];
    for (let [key, value] of this.root.children) {
      value.fail = this.root;
      queue.push(value);
    }

    while (queue.length > 0) {
      let node = queue.shift() as TrieNode;
      for (let [key, child] of node.children) {
        let failNode = node.fail;
        while (failNode !== null && !failNode.children.has(key)) {
          failNode = failNode.fail;
        }
        if (failNode === null) {
          child.fail = this.root;
        } else {
          child.fail = failNode.children.get(key) as TrieNode;
        }
        queue.push(child);
      }
    }
  }

  // 搜索字符串返回匹配的模式串
  search(text: string) {
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
        if (cur.isEnd) {
          result.push({
            ...(cur.pattern as Pattern),
            index: i - (cur.pattern as Pattern).length + 1,
          });
        }
        let failNode = cur.fail;
        while (failNode !== null && failNode.isEnd) {
          result.push({
            ...(failNode.pattern as Pattern),
            index: i - (failNode.pattern as Pattern).length + 1,
          });
          failNode = failNode.fail;
        }
      }
    }
    return this.filter(result);
  }

  // 去除搜索的重叠字符串，按照优先级保留
  filter(patterns: MatchPattern[]) {
    const filteredArr = [];
    let prevEndIndex = 0;
    // 按照优先级去除重叠词
    for (let i = 0; i < patterns.length; i++) {
      const { index, length, priority } = patterns[i];
      if (index >= prevEndIndex) {
        filteredArr.push(patterns[i]);
        prevEndIndex = index + length;
      } else if (priority > filteredArr[filteredArr.length - 1].priority) {
        filteredArr[filteredArr.length - 1] = patterns[i];
        prevEndIndex = index + length;
      }
    }
    return filteredArr;
  }
}

export const PatternsNormal = [
  ...Pattern5,
  ...Pattern4,
  ...Pattern3,
  ...Pattern2,
];
export const PatternsSurname = [...PatternSurname, ...PatternsNormal];

// 常规匹配
export const ACNormal = new AC();
ACNormal.buildTrie(PatternsNormal);

// 姓氏模式匹配
export const ACSurname = new AC();
ACSurname.buildTrie(PatternsSurname);
