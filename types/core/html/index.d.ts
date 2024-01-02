interface HtmlOptions {
    /**
     * @description html 结果中每个字+拼音外层 span 标签的类名。默认为 py-result-item
     */
    resultClass?: string;
    /**
     * @description html 结果中拼音 rt 标签的类名。默认为 py-pinyin-item
     */
    pinyinClass?: string;
    /**
     * @description html 结果中汉字 span 标签的类名。默认为 py-chinese-item
     */
    chineseClass?: string;
    /**
     * @description 是否用 span 标签包装非汉字字符的结果。默认为 false。建议输入的文本为纯文本时可以设置为 true；输入文本本身为 html 富文本字符串设置为 false
     */
    wrapNonChinese?: boolean;
    /**
     * @description html 非汉字字符外层 span 标签的类名，仅当 wrapNonChinese 为 true 时生效。默认为 py-non-chinese-item
     */
    nonChineseClass?: string;
    /**
     * @description 拼音上是否标注音调
     */
    toneType?: 'symbol' | 'num' | 'none';
}
/**
 * @description: 获取带拼音汉字的 html 字符串
 * @param {string} text 要转换的字符串
 * @param {HtmlOptions=} options html 中标签类名相关配置
 * @return {string} 带汉字的拼音字符串
 */
export declare const html: (text: string, options?: HtmlOptions) => string;
export {};
