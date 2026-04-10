import type { Pattern } from "../common/segmentit";
export declare const InitialList: string[];
export declare const SpecialInitialList: string[];
export declare const SpecialFinalList: string[];
export declare const SpecialFinalMap: {
    uān: string;
    uán: string;
    uǎn: string;
    uàn: string;
    uan: string;
    uē: string;
    ué: string;
    uě: string;
    uè: string;
    ue: string;
    ūn: string;
    ún: string;
    ǔn: string;
    ùn: string;
    un: string;
    ū: string;
    ú: string;
    ǔ: string;
    ù: string;
    u: string;
};
export declare const doubleFinalList: string[];
export declare const PatternNumberDict: Pattern[];
/**
 * @description: 连续变调处理：https://zh.wiktionary.org/wiki/Appendix:%E2%80%9C%E4%B8%80%E2%80%9D%E5%8F%8A%E2%80%9C%E4%B8%8D%E2%80%9D%E7%9A%84%E5%8F%98%E8%B0%83
 */
export declare const toneSandhiMap: {
    不: {
        bú: number[];
    };
    一: {
        yí: number[];
        yì: number[];
    };
};
export declare const toneSandhiIgnoreSuffix: {
    不: string[];
    一: string[];
};
export declare const toneSandhiList: string[];
