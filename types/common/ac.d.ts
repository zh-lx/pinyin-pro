/**
 * @description: AC 自动机
 */
export interface Pattern {
    zh: string;
    pinyin: string;
    priority: number;
    length: number;
    isSurname?: boolean;
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
    reset(): void;
    buildFailPointer(): void;
    search(text: string, isSurname?: boolean): MatchPattern[];
    filter(patterns: MatchPattern[], isSurname?: boolean): MatchPattern[];
}
export declare const PatternsNormal: Pattern[];
export declare const ACNormal: AC;
export {};
