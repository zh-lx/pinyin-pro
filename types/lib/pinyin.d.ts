interface BasicOptions {
    toneType?: 'symbol' | 'num' | 'none';
    pattern?: 'pinyin' | 'initial' | 'final' | 'num' | 'first';
    multiple?: boolean;
    mode?: 'normal' | 'surname';
    removeNonZh?: boolean;
}
interface OptionsReturnString extends BasicOptions {
    type?: 'string';
}
interface OptionsReturnArray extends BasicOptions {
    type: 'array';
}
/**
 * @description: 获取汉语字符串的拼音
 * @param {string} word 要转换的汉语字符串
 * @param {OptionsReturnString} options 配置项
 * @return {string | string[]} options 配置项中的 type 为 string 时，返回字符串，中间用空格隔开；为 array 时，返回拼音字符串数组
 */
declare function pinyin(word: string, options?: OptionsReturnString): string;
/**
 * @description: 获取汉语字符串的拼音
 * @param {string} word 要转换的汉语字符串
 * @param {OptionsReturnArray} options 配置项
 * @return {string | string[]} options 配置项中的 type 为 string 时，返回字符串，中间用空格隔开；为 array 时，返回拼音字符串数组
 */
declare function pinyin(word: string, options?: OptionsReturnArray): string[];
export { pinyin };
