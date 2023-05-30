declare type MatchPrecision = 'first' | 'start' | 'every' | 'any';
declare type SpaceOption = 'ignore' | 'preserve';
interface MatchOptions {
    precision?: MatchPrecision;
    continuous?: boolean;
    space?: SpaceOption;
    lastPrecision?: MatchPrecision;
}
/**
 * @description: 检测汉语字符串和拼音是否匹配
 * @param {string} text 汉语字符串
 * @param {string} pinyin 拼音，支持各种缩写形式
 * @return {Array | null} 若匹配成功，返回拼音在汉字中的下标数组；若匹配失败，返回 null
 */
export declare const match: (text: string, pinyin: string, options?: MatchOptions | undefined) => any;
export {};
