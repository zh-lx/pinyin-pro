declare function pinyinFn(word: string, options?: {
    toneType?: 'symbol' | 'num' | 'none';
    pattern?: 'pinyin' | 'initial' | 'final' | 'num' | 'first';
    type?: 'string';
    multiple?: boolean;
}): string;
declare function pinyinFn(word: string, options?: {
    toneType?: 'symbol' | 'num' | 'none';
    pattern?: 'pinyin' | 'initial' | 'final' | 'num' | 'first';
    type: 'array';
    multiple?: boolean;
}): string[];
export { pinyinFn };
