/**
 * @description: 获取字符串带符号音调的拼音
 * @param {string} word
 * @param {number} length
 * @param {string} mode
 * @return {string}
 */
declare type GetPinYin = (word: string, length: number, params: {
    mode?: 'normal' | 'surname';
    useCustomConfig?: boolean;
    nonZh?: 'spaced' | 'consecutive' | 'removed';
}) => string;
declare const getPinyin: GetPinYin;
/**
 * @description: 将带音调符号拼音转换为不带音调拼音
 * @param {string} pinyin
 * @return {string}
 */
declare type GetPinyinWithoutTone = (pinyin: string) => string;
declare const getPinyinWithoutTone: GetPinyinWithoutTone;
/**
 * @description: 获取单字符的多音拼音
 * @param {string} word
 * @return {string}
 */
declare type GetMultipleTone = (word: string) => string;
declare const getMultipleTone: GetMultipleTone;
/**
 * @description: 获取拼音的声明和韵母
 * @param {string} pinyin
 * @return {*}
 */
declare type GetInitialAndFinal = (pinyin: string) => {
    final: string;
    initial: string;
};
declare const getInitialAndFinal: GetInitialAndFinal;
/**
 * @description: 将带音调符号拼音转换为带音调数字
 * @param {string} pinyin
 * @return {string}
 */
declare type GetNumOfTone = (pinyin: string) => string;
declare const getNumOfTone: GetNumOfTone;
/**
 * @description: 将带音调符号拼音转换为带音调数字拼音
 * @param {string} pinyin
 * @param {string} originPinyin
 * @return {string}
 */
declare type GetPinyinWithNum = (pinyin: string, originPinyin: string) => string;
declare const getPinyinWithNum: GetPinyinWithNum;
/**
 * @description: 获取拼音的首字母
 * @param {string} pinyin
 * @return {string}
 */
declare type GetFirstLetter = (pinyin: string) => string;
declare const getFirstLetter: GetFirstLetter;
export { getPinyin, getPinyinWithoutTone, getInitialAndFinal, getMultipleTone, getNumOfTone, getPinyinWithNum, getFirstLetter, };
