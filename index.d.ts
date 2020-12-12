export declare const pinyin: (
  word: string,
  options?: {
    pattern?: 'pinyin' | 'pinyinNum' | 'initial' | 'final' | 'num' | pinyin;
    tone?: boolean;
    type?: 'string' | 'array';
    multiple?: boolean;
  }
) => string | Array<string>;
