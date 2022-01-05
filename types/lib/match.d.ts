/**
 * @description: 检测汉语字符串和拼音是否匹配
 * @param {string} words 汉语字符串
 * @param {string} pinyin 拼音，支持各种缩写形式
 * @return {Array | null} 若匹配成功，返回拼音在汉字中的下标数组；若匹配失败，返回 null
 */
export declare const match: (words: string, pinyin: string) => number[] | null;
