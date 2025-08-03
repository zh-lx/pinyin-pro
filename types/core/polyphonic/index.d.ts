import type { SingleWordResult, CommonOptions } from "../../common/type";
interface BasicOptions extends CommonOptions {
}
interface AllData {
    origin: string;
    pinyin: string;
    initial: string;
    final: string;
    num: number;
    first: string;
    finalHead: string;
    finalBody: string;
    finalTail: string;
    isZh: boolean;
    inZhRange: boolean;
}
interface OptionsReturnString extends BasicOptions {
    /**
     * @description 返回结果的格式
     * @value string：以字符串格式返回，拼音之间用空格隔开 （默认值）
     * @value array：以数组格式返回
     * @value array: 返回全部信息数组
     */
    type?: "string";
}
interface OptionsReturnArray extends BasicOptions {
    /**
     * @description 返回结果的格式
     * @value string：以字符串格式返回，拼音之间用空格隔开 （默认值）
     * @value array：以数组格式返回
     * @value array: 返回全部信息数组
     */
    type: "array";
}
interface OptionsReturnAll extends BasicOptions {
    /**
     * @description 返回结果的格式
     * @value string：以字符串格式返回，拼音之间用空格隔开 （默认值）
     * @value array：以数组格式返回
     * @value array: 返回全部信息数组
     */
    type: "all";
}
export interface CompleteOptions extends BasicOptions {
    /**
     * @description 返回结果的格式
     * @value string：以字符串格式返回，拼音之间用空格隔开 （默认值）
     * @value array：以数组格式返回
     * @value array: 返回全部信息数组
     */
    type?: "string" | "array" | "all";
}
/**
 * @description: 获取每个汉字的所有读音
 * @param {string} text 要转换的汉语字符串
 * @param {OptionsReturnString=} options 配置项
 * @return {string[] | string[][] | AllData[][]} options.type 为 string 时，返回字符串数组，中间用空格隔开；为 array 时，返回二维拼音字符串数组；为 all 时返回二维全部信息的数组
 */
declare function polyphonic(text: string, options?: OptionsReturnString): string[];
/**
 * @description: 获取每个汉字的所有读音
 * @param {string} text 要转换的汉语字符串
 * @param {OptionsReturnArray=} options 配置项
 * @return {string[] | string[][] | AllData[][]} options.type 为 string 时，返回字符串数组，中间用空格隔开；为 array 时，返回二维拼音字符串数组；为 all 时返回二维全部信息的数组
 */
declare function polyphonic(text: string, options?: OptionsReturnArray): string[][];
/**
 * @description: 获取每个汉字的所有读音
 * @param {string} text 要转换的汉语字符串
 * @param {OptionsReturnAll=} options 配置项
 * @return {string[] | string[][] | AllData[][]} options.type 为 string 时，返回字符串数组，中间用空格隔开；为 array 时，返回二维拼音字符串数组；为 all 时返回二维全部信息的数组
 */
declare function polyphonic(text: string, options?: OptionsReturnAll): AllData[][];
export declare const handleType: (list: SingleWordResult[], options: CompleteOptions) => string | string[] | {
    origin: string;
    pinyin: string;
    initial: string;
    final: string;
    first: string;
    finalHead: string;
    finalBody: string;
    finalTail: string;
    num: number;
    isZh: boolean;
    inZhRange: boolean;
}[];
export { polyphonic };
