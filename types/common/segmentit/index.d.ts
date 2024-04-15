export declare const enum TokenizationAlgorithm {
    ReverseMaxMatch = 1,
    MaxProbability = 2,
    MinTokenization = 3
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
    pos?: string;
    node?: TrieNode;
}
export interface MatchPattern extends Pattern {
    index: number;
}
declare class TrieNode {
    children: Map<string, TrieNode>;
    fail: TrieNode | null;
    patterns: Pattern[];
    prefix: string;
    parent: TrieNode | null;
    key: string;
    constructor(parent: TrieNode | null, prefix?: string, key?: string);
}
export declare class AC {
    root: TrieNode;
    dictMap: Map<string | Symbol, Set<Pattern>>;
    queues: TrieNode[][];
    constructor();
    build(patternList: Pattern[]): void;
    buildTrie(patternList: Pattern[]): void;
    buildFailPointer(): void;
    addPatternToDictMap(pattern: Pattern): void;
    addNodeToQueues(trieNode: TrieNode): void;
    insertPattern(patterns: Pattern[], pattern: Pattern): void;
    removeDict(dictName: string | symbol): void;
    match(text: string, isSurname?: boolean): MatchPattern[];
    search(text: string, isSurname?: boolean, algorithm?: TokenizationAlgorithm): MatchPattern[];
}
export declare const PatternsNormal: Pattern[];
export declare const acTree: AC;
export {};
