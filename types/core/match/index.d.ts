interface MatchOptions {
    precision?: 'first' | 'start' | 'every' | 'any';
    continuous?: boolean;
    space?: 'ignore' | 'preserve';
    lastPrecision?: 'first' | 'start' | 'every' | 'any';
}
/**
 * @description: 检测汉语字符串和拼音是否匹配
 * @param {string} text 汉语字符串
 * @param {string} pinyin 拼音，支持各种缩写形式
 * @param {MatchOptions=} options 配置项
 * @return {Array | null} 若匹配成功，返回 text 中匹配成功的下标数组；若匹配失败，返回 null
 */
export declare const match: (text: string, pinyin: string, options?: MatchOptions | undefined) => any;
export {};
