export interface SingleWordResult {
    origin: string;
    originPinyin: string;
    result: string;
    isZh: boolean;
    delete?: boolean;
}
export type ToneType = "symbol" | "num" | "none";
export type PinyinMode = "normal" | "surname";
export type SurnameMode = "all" | "head" | "off";
export type InitialPattern = "yw" | "standard";
export type CommonOptions = {
    /**
     * @description 返回的拼音音调类型
     * @value symbol：在字母上加音调 （默认值）
     * @value num：以数字格式展示音调，并跟在拼音后面
     * @value none：不展示音调
     */
    toneType?: "symbol" | "num" | "none";
    /**
     * @description 返回的拼音格式类型
     * @value pinyin：返回完整拼音 （默认值）
     * @value initial：返回声母
     * @value final：返回韵母
     * @value num：返回音调对应的数字
     * @value first：返回首字母
     * @value finalHead：返回韵头（介音）
     * @value finalBody：返回韵腹
     * @value finalTail：返回韵尾
     */
    pattern?: "pinyin" | "initial" | "final" | "num" | "first" | "finalHead" | "finalBody" | "finalTail";
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
    nonZh?: "spaced" | "consecutive" | "removed";
    /**
     * @description nonZh 生效范围的正则表达式
     */
    nonZhScope?: RegExp;
    /**
     * @description 对于 ü 的返回是否转换成 v（仅在 toneType: none 启用时生效）
     * @value false：返回值中保留 ü （默认值）
     * @value true：返回值中 ü 转换成 v
     * @value string：返回值中 ü 转换成指定字符
     */
    v?: boolean | string;
    /**
     * @description 是否将 `y`、`w` 视为声母
     * @value yw：将 `y`、`w` 视为声母
     * @value standard：不将 `y`、`w` 视为声母
     */
    initialPattern?: InitialPattern;
};
