declare type ConvertFormat = 'numToSymbol' | 'symbolToNum' | 'toneNone';
interface ConvertOptions {
    /**
     * @description 拼音之间的分隔符，默认为空格，convert方法会以该分隔符分割拼音进行转换
     */
    separator?: string;
    /**
     * @description 转换的格式， 默认为 numToSymbol
     * @example numToSymbol: pin yin -> pīn yīn
     * @example symbolToNum: pīn yīn -> pin yin
     * @example toneNone: pīn yīn -> pin yin
     */
    format?: ConvertFormat;
}
/**
 * @description: 拼音格式转换。pin yin -> pīn yīn 或 pīn yīn -> pin yin 或 pīn yīn -> pin yin
 * @param {string} pinyin 要转换的拼音字符串或者拼音字符串数组
 * @param {ConvertOptions=} options 配置项
 * @return {string} 转换后的拼音字符串或者拼音字符串数组
 */
declare function convert(pinyin: string, options?: ConvertOptions): string;
/**
 * @description: 拼音格式转换。pin yin -> pīn yīn 或 pīn yīn -> pin yin 或 pīn yīn -> pin yin
 * @param {string[]} pinyin 要转换的拼音字符串或者拼音字符串数组
 * @param {ConvertOptions=} options 配置项
 * @return {string[]} 转换后的拼音字符串或者拼音字符串数组
 */
declare function convert(pinyin: string[], options?: ConvertOptions): string[];
export { convert };
