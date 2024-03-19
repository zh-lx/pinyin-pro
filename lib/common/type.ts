// 单字拼音转换后的结果
export interface SingleWordResult {
  origin: string;
  originPinyin: string;
  result: string;
  isZh: boolean;
  hasPinyin: boolean;
  delete?: boolean;
}

// toneType 属性可选参数
export type ToneType = 'symbol' | 'num' | 'none';

export type PinyinMode = 'normal' | 'surname';
