/**
 * @description: 用户自定义拼音
 * @param {{ [key: string]: string }} config 用户自定义的拼音映射（支持汉字、词语、句子的映射），若匹配到该映射，优先将汉字转换为该映射
 */
export declare function customPinyin(config?: {
    [key: string]: string;
}): void;
export declare const getCustomDict: () => {
    [key: string]: string;
};
export declare function hasCustomConfig(): boolean;
