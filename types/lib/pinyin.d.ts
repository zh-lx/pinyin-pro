interface BasicOptions {
    /**
     * @description 返回的拼音音调类型
     * @value symbol：在字母上加音调 （默认值）
     * @value num：以数字格式展示音调，并跟在拼音后面
     * @value none：不展示音调
     */
    toneType?: 'symbol' | 'num' | 'none';
    /**
     * @description 返回的拼音格式类型
     * @value pinyin：返回完整拼音 （默认值）
     * @value initial：返回声母
     * @value final：返回韵母
     * @value num：返回音调对应的数字
     * @value first：返回首字母
     */
    pattern?: 'pinyin' | 'initial' | 'final' | 'num' | 'first';
    /**
     * @description 是否返回单个汉字的所有多音，仅针对输入的 word 为单个汉字生效
     * @value false：返回最常用的一个拼音 （默认值）
     * @value true：返回所有读音
     */
    multiple?: boolean;
    /**
     * @description 优先的拼音匹配模式
     * @value normal：正常匹配模式 （默认值）
     * @value surname：姓氏模式，遇到姓氏表中的汉字时，优先匹配姓氏读音
     */
    mode?: 'normal' | 'surname';
    /**
     * @description 是否移除非汉字字符（推荐使用 removeNonZh: removed 代替）
     * @value false：返回结果保留非汉字字符 （默认值）
     * @value true：返回结果移除非汉字字符
     */
    removeNonZh?: boolean;
    /**
     * @description 非汉字字符的间距格式
     * @value spaced：连续非汉字字符之间用空格隔开 （默认值）
     * @value consecutive：连续非汉字字符无间距
     * @value removed：返回结果移除非汉字字符
     */
    nonZh?: 'spaced' | 'consecutive' | 'removed';
    /**
     * @description 对于 ü 的返回是否转换成 v（仅在 toneType: none 启用时生效）
     * @value false：返回值中保留 ü （默认值）
     * @value true：返回值中 ü 转换成 v
     */
    v?: boolean;
}
interface OptionsReturnString extends BasicOptions {
    /**
     * @description 返回结果的格式
     * @value string：以字符串格式返回，拼音之间用空格隔开 （默认值）
     * @value array：以数组格式返回
     */
    type?: 'string';
}
interface OptionsReturnArray extends BasicOptions {
    /**
     * @description 返回结果的格式
     * @value string：以字符串格式返回，拼音之间用空格隔开 （默认值）
     * @value array：以数组格式返回
     */
    type: 'array';
}
/**
 * @description: 获取汉语字符串的拼音
 * @param {string} word 要转换的汉语字符串
 * @param {OptionsReturnString=} options 配置项
 * @return {string | string[]} options 配置项中的 type 为 string 时，返回字符串，中间用空格隔开；为 array 时，返回拼音字符串数组
 */
declare function pinyin(word: string, options?: OptionsReturnString): string;
/**
 * @description: 获取汉语字符串的拼音
 * @param {string} word 要转换的汉语字符串
 * @param {OptionsReturnArray=} options 配置项
 * @return {string | string[]} options 配置项中的 type 为 string 时，返回字符串，中间用空格隔开；为 array 时，返回拼音字符串数组
 */
declare function pinyin(word: string, options?: OptionsReturnArray): string[];
export { pinyin };
