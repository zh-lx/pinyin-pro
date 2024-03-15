import type { SingleWordResult, PinyinMode } from '../../common/type';
export declare const getPinyin: (word: string, list: SingleWordResult[], mode: 'normal' | 'surname') => SingleWordResult[];
/**
 * @description: 将带音调符号拼音转换为不带音调拼音
 * @param {string} pinyin
 * @return {string}
 */
type GetPinyinWithoutTone = (pinyin: string) => string;
declare const getPinyinWithoutTone: GetPinyinWithoutTone;
/**
 * @description: 获取单字符的多音拼音
 * @param {string} word
 * @return {WordResult[]}
 */
type GetMultiplePinyin = (word: string, mode?: PinyinMode) => SingleWordResult[];
declare const getMultiplePinyin: GetMultiplePinyin;
/**
 * @description: 获取拼音的声母和韵母
 * @param {string} pinyin
 * @return {*}
 */
type GetInitialAndFinal = (pinyin: string) => {
    final: string;
    initial: string;
};
declare const getInitialAndFinal: GetInitialAndFinal;
/**
 * @description: 获取韵母的韵头、韵腹和韵尾
 * @param {string} pinyin
 * @return {*}
 */
type GetFinalParts = (pinyin: string) => {
    head: string;
    body: string;
    tail: string;
};
declare const getFinalParts: GetFinalParts;
/**
 * @description: 将带音调符号拼音转换为带音调数字
 * @param {string} pinyin
 * @return {string}
 */
type GetNumOfTone = (pinyin: string) => string;
declare const getNumOfTone: GetNumOfTone;
/**
 * @description: 将带音调符号拼音转换为带音调数字拼音
 * @param {string} pinyin
 * @param {string} originPinyin
 * @return {string}
 */
type GetPinyinWithNum = (pinyin: string, originPinyin: string) => string;
declare const getPinyinWithNum: GetPinyinWithNum;
/**
 * @description: 获取拼音的首字母
 * @param {string} pinyin
 * @return {string}
 */
type GetFirstLetter = (pinyin: string) => string;
declare const getFirstLetter: GetFirstLetter;
export { getPinyinWithoutTone, getInitialAndFinal, getMultiplePinyin, getNumOfTone, getPinyinWithNum, getFirstLetter, getFinalParts, };
