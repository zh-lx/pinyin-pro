declare type GetPinYin = (word: string, length: number) => string;
declare const getPinyin: GetPinYin;
declare type GetPinyinWithoutTone = (pinyin: string) => string;
declare const getPinyinWithoutTone: GetPinyinWithoutTone;
declare type GetMultipleTone = (word: string) => string;
declare const getMultipleTone: GetMultipleTone;
declare type GetInitialAndFinal = (pinyin: string) => {
    final: string;
    initial: string;
};
declare const getInitialAndFinal: GetInitialAndFinal;
declare type GetNumOfTone = (pinyin: string) => string;
declare const getNumOfTone: GetNumOfTone;
declare type GetPinyinWithNum = (pinyin: string) => string;
declare const getPinyinWithNum: GetPinyinWithNum;
declare type GetFirstLetter = (pinyin: string) => string;
declare const getFirstLetter: GetFirstLetter;
export { getPinyin, getPinyinWithoutTone, getInitialAndFinal, getMultipleTone, getNumOfTone, getPinyinWithNum, getFirstLetter, };
