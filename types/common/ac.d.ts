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
declare class TrieNode {
    children: Map<string, TrieNode>;
    fail: TrieNode | null;
    isEnd: boolean;
    pattern: Pattern | null;
    constructor();
}
export declare class AC {
    root: TrieNode;
    constructor();
    buildTrie(patterns: Pattern[]): void;
    rebuildTrie(patterns: Pattern[]): void;
    buildFailPointer(): void;
    search(text: string): MatchPattern[];
    filter(patterns: MatchPattern[]): MatchPattern[];
}
export declare const PatternsNormal: Pattern[];
export declare const PatternsSurname: Pattern[];
export declare const ACNormal: AC;
export declare const ACSurname: AC;
export {};
