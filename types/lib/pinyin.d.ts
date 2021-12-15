export { DICT1, dictArr } from './data';
declare function pinyin(word: string, options?: {
    toneType?: 'symbol' | 'num' | 'none';
    pattern?: 'pinyin' | 'initial' | 'final' | 'num' | 'first';
    type?: 'string';
    multiple?: boolean;
    mode?: 'normal' | 'surname';
}): string;
declare function pinyin(word: string, options?: {
    toneType?: 'symbol' | 'num' | 'none';
    pattern?: 'pinyin' | 'initial' | 'final' | 'num' | 'first';
    type: 'array';
    multiple?: boolean;
    mode?: 'normal' | 'surname';
}): string[];
export { pinyin };
