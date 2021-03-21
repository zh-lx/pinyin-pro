interface Options {
    toneType?: 'symbol' | 'num' | 'none';
    pattern?: 'pinyin' | 'initial' | 'final' | 'num';
    type?: 'string' | 'array';
    multiple?: boolean;
}
declare type PinyinFn = (word: string, options?: Options) => string | string[];
declare const pinyinFn: PinyinFn;
export { pinyinFn };
