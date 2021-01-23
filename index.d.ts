export declare const pinyin: (
  word: string,
  options?: {
    toneType?: 'symbol' | 'num' | 'none'; // 音调样式
    pattern?: 'pinyin' | 'initial' | 'final'; // 返回数据模式
    type?: 'string' | 'array'; // 返回数据类型
    multiple?: boolean; // 是否返回多音，仅在单字有效
  }
) => string | string[];
