declare type PinyinFn = (word: string, options?: {
    toneType?: 'symbol' | 'num' | 'none';
    pattern?: 'pinyin' | 'initial' | 'final' | 'num';
    type?: 'string' | 'array';
    multiple?: boolean;
}) => string | string[];
declare const pinyinFn: PinyinFn;
export { pinyinFn };
