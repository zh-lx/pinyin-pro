export interface SingleWordResult {
    origin: string;
    originPinyin: string;
    result: string;
    isZh: boolean;
    hasPinyin: boolean;
    delete?: boolean;
}
export type ToneType = 'symbol' | 'num' | 'none';
export type PinyinMode = 'normal' | 'surname';
