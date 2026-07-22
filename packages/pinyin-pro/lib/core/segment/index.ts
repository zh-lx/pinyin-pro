import type { BasicOptions } from "../pinyin";
import { TokenizationAlgorithm } from "../../common/segmentit";
import { stringLength } from "@/common/utils";
import { middleWareNonZh, middlewareToneSandhi, middlewareToneType, middlewareV, validateType } from "@/core/pinyin/middlewares";
import { getPinyin } from "@/core/pinyin/handle";
import { SurnameMode } from "../../common/type";
import { middlewareOutputFormat, middlewareSegment, Output, OutputFormat } from "./middlewares";

type SegmentBaseOptions = Pick<
  BasicOptions,
  "toneType" | "mode" | "surname" | "nonZh" | "v" | "toneSandhi" | "segmentit" | "traditional"
>;

interface AllSegmentReturnOptions extends SegmentBaseOptions {
  /**
   * @description 以片段格式返回全部信息
   */
  format?: OutputFormat.AllSegment;
}

interface AllArrayReturnOptions extends SegmentBaseOptions {
  /**
   * @description 以数组格式返回全部信息
   */
  format?: OutputFormat.AllArray;
}

interface AllStringReturnOptions extends SegmentBaseOptions {
  /**
   * @description 以字符串格式返回全部信息
   */
  format?: OutputFormat.AllString;
  /**
   * @description 分隔符，默认为空格，仅在 format 为 AllString(3)、PinyinString(6)、ZhString(9) 时生效
   */
  separator?: string;
}

interface PinyinSegmentReturnOptions extends SegmentBaseOptions {
  /**
   * @description 以片段格式返回拼音
   */
  format?: OutputFormat.PinyinSegment;
}

interface PinyinArrayReturnOptions extends SegmentBaseOptions {
  /**
   * @description 以数组格式返回拼音
   */
  format?: OutputFormat.PinyinArray;
}

interface PinyinStringReturnOptions extends SegmentBaseOptions {
  /**
   * @description 以字符串格式返回拼音
   */
  format?: OutputFormat.PinyinString;
  /**
   * @description 分隔符，默认为空格，仅在 format 为 AllString(3)、PinyinString(6)、ZhString(9) 时生效
   */
  separator?: string;
}

interface ZhSegmentReturnOptions extends SegmentBaseOptions {
  /**
   * @description 以片段格式返回中文
   */
  format?: OutputFormat.ZhSegment;
}

interface ZhArrayReturnOptions extends SegmentBaseOptions {
  /**
   * @description 以数组格式返回中文
   */
  format?: OutputFormat.ZhArray;
}

interface ZhStringReturnOptions extends SegmentBaseOptions {
  /**
   * @description 以字符串格式返回中文
   */
  format?: OutputFormat.ZhString;
  /**
   * @description 分隔符，默认为空格，仅在 format 为 AllString(3)、PinyinString(6)、ZhString(9) 时生效
   */
  separator?: string;
}

export interface SegmentCompleteOptions extends SegmentBaseOptions {
  format?: OutputFormat;
  /**
   * @description 分隔符，默认为空格，仅在 format 为 AllString(3)、PinyinString(6)、ZhString(9) 时生效
   */
  separator?: string;
}

const DEFAULT_OPTIONS: SegmentCompleteOptions = {
  toneType: "symbol",
  mode: "normal",
  nonZh: "spaced",
  v: false,
  separator: " ",
  toneSandhi: true,
  segmentit: TokenizationAlgorithm.MaxProbability,
  format: OutputFormat.AllSegment,
  traditional: false,
};

export function segment(word: string, options?: AllSegmentReturnOptions): Output['AllSegment'];
export function segment(word: string, options?: AllArrayReturnOptions): Output['AllArray'];
export function segment(word: string, options?: AllStringReturnOptions): Output['AllString'];
export function segment(word: string, options?: PinyinSegmentReturnOptions): Output['PinyinSegment'];
export function segment(word: string, options?: PinyinArrayReturnOptions): Output['PinyinArray'];
export function segment(word: string, options?: PinyinStringReturnOptions): Output['PinyinString'];
export function segment(word: string, options?: ZhSegmentReturnOptions): Output['ZhSegment'];
export function segment(word: string, options?: ZhArrayReturnOptions): Output['ZhArray'];
export function segment(word: string, options?: ZhStringReturnOptions): Output['ZhString'];

export function segment(word: string, options?: SegmentCompleteOptions) {
  options = { ...DEFAULT_OPTIONS, ...(options || {}) };

  // 校验 word 类型是否正确
  const legal = validateType(word);
  if (!legal) {
    return word;
  }

  if (options.surname === undefined) {
    if (options.mode === "surname") {
      options.surname = "all";
    } else {
      options.surname = "off";
    }
  }

  let _list = Array(stringLength(word));

  let { list, matches } = getPinyin(
    word,
    _list,
    options.surname as SurnameMode,
    options.segmentit as TokenizationAlgorithm,
    options.traditional as boolean
  );

  // 一和不变调处理
  list = middlewareToneSandhi(list, options.toneSandhi as boolean);

  // nonZh
  list = middleWareNonZh(list, options);

  // toneType参数处理
  middlewareToneType(list, options);

  // v参数处理
  middlewareV(list, options);
  
  const segments = middlewareSegment(list, matches);

  return middlewareOutputFormat(segments, { format: options.format, separator: options.separator });
}

export { OutputFormat };