export interface SingleWordResult {
    origin: string;
    originPinyin: string;
    result: string;
    isZh: boolean;
    delete?: boolean;
}
export declare type ToneType = 'symbol' | 'num' | 'none';
export declare type PinyinMode = 'normal' | 'surname';
