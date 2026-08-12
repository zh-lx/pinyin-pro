import type { SurnameMode } from "../../common/type";
/** 获取单字的全部拼音，供 pinyin、polyphonic 和 match 复用。 */
export declare const getAllPinyin: (char: string, surname?: SurnameMode) => string[];
