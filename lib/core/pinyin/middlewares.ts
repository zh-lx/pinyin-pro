import { stringLength } from "@/common/utils";
import type { SingleWordResult } from "../../common/type";
import { getAllPinyin, getMultiplePinyin } from "./handle";
import { CompleteOptions } from "./index";
import {
  getNumOfTone,
  getInitialAndFinal,
  getFirstLetter,
  getFinalParts,
  getPinyinWithoutTone,
  getPinyinWithNum,
} from "./handle";
import DICT1 from "@/data/dict1";

// 验证输入是否为字符串
export const validateType = (word: unknown) => {
  if (typeof word !== "string") {
    console.error(
      "The first param of pinyin is error: " +
        word +
        ' is not assignable to type "string".'
    );
    return false;
  } else {
    return true;
  }
};

export function isNonZhScope(char: string, scope?: RegExp) {
  if (scope instanceof RegExp) {
    return scope.test(char);
  }
  return true;
}

// nonZh 属性处理
export const middleWareNonZh = (
  list: SingleWordResult[],
  options: CompleteOptions
) => {
  let nonZh = options.nonZh;

  if (nonZh === "removed") {
    return list.filter(
      (item) => item.isZh || !isNonZhScope(item.origin, options.nonZhScope)
    );
  } else if (nonZh === "consecutive") {
    for (let i = list.length - 2; i >= 0; i--) {
      const cur = list[i];
      const pre = list[i + 1];
      if (
        !cur.isZh &&
        !pre.isZh &&
        isNonZhScope(cur.origin, options.nonZhScope) &&
        isNonZhScope(pre.origin, options.nonZhScope)
      ) {
        cur.origin += pre.origin;
        cur.result += pre.result;
        pre.delete = true;
      }
    }
    return list.filter((item) => !item.delete);
  } else {
    return list;
  }
};

// multiple 属性处理
export const middlewareMultiple = (
  word: string,
  options: CompleteOptions
): SingleWordResult[] | false => {
  if (stringLength(word) === 1 && options.multiple) {
    return getMultiplePinyin(word, options.surname);
  } else {
    return false;
  }
};

// pattern 属性处理
export const middlewarePattern = (
  list: SingleWordResult[],
  options: CompleteOptions
) => {
  switch (options.pattern) {
    case "pinyin":
      break;
    case "num":
      list.forEach((item) => {
        item.result = item.isZh ? getNumOfTone(item.result) : "";
      });
      break;
    case "initial":
      list.forEach((item) => {
        item.result = item.isZh
          ? getInitialAndFinal(item.result, options.initialPattern).initial
          : "";
      });
      break;
    case "final":
      list.forEach((item) => {
        item.result = item.isZh
          ? getInitialAndFinal(item.result, options.initialPattern).final
          : "";
      });
      break;
    case "first":
      list.forEach((item) => {
        item.result = getFirstLetter(item.result, item.isZh);
      });
      break;
    case "finalHead":
      list.forEach((item) => {
        item.result = item.isZh ? getFinalParts(item.result).head : "";
      });
      break;
    case "finalBody":
      list.forEach((item) => {
        item.result = item.isZh ? getFinalParts(item.result).body : "";
      });
      break;
    case "finalTail":
      list.forEach((item) => {
        item.result = item.isZh ? getFinalParts(item.result).tail : "";
      });
      break;
    default:
      break;
  }
};

// toneType 属性处理
export const middlewareToneType = (
  list: SingleWordResult[],
  options: CompleteOptions
) => {
  switch (options.toneType) {
    case "symbol":
      break;
    case "none":
      list.forEach((item) => {
        if (item.isZh) {
          item.result = getPinyinWithoutTone(item.result);
        }
      });
      break;
    case "num": {
      list.forEach((item) => {
        if (item.isZh) {
          item.result = getPinyinWithNum(
            item.result,
            item.originPinyin as string
          );
        }
      });
      break;
    }
    default:
      break;
  }
};

// v 属性处理
export const middlewareV = (
  list: SingleWordResult[],
  options: CompleteOptions
) => {
  if (options.v) {
    list.forEach((item) => {
      if (item.isZh) {
        item.result = item.result.replace(
          /ü/g,
          typeof options.v === "string" ? options.v : "v"
        );
      }
    });
  }
};

// type 属性处理
export const middlewareType = (
  list: SingleWordResult[],
  options: CompleteOptions,
  word: string
) => {
  if (options.multiple && stringLength(word) === 1) {
    let last = "";
    list = list.filter((item) => {
      const res = item.result !== last;
      last = item.result;
      return res;
    });
  }
  if (options.type === "array") {
    return list.map((item) => item.result);
  }
  if (options.type === "all") {
    return list.map((item) => {
      const pinyin = item.isZh ? item.result : "";
      const { initial, final } = getInitialAndFinal(
        pinyin,
        options.initialPattern
      );
      const { head, body, tail } = getFinalParts(pinyin);
      let polyphonic: string[] = [];
      if (pinyin !== "") {
        polyphonic = [pinyin].concat(
          getAllPinyin(item.origin, options.surname).filter(
            (item) => item !== pinyin
          )
        );
      }
      return {
        origin: item.origin,
        pinyin,
        initial,
        final,
        first: getFirstLetter(item.result, item.isZh),
        finalHead: head,
        finalBody: body,
        finalTail: tail,
        num: Number(getNumOfTone(item.originPinyin)),
        isZh: item.isZh,
        polyphonic,
        inZhRange: !!DICT1.get(item.origin),
        result: item.result,
      };
    });
  }
  return list.map((item) => item.result).join(options.separator);
};

// 是否开启变调
export const middlewareToneSandhi = (
  list: SingleWordResult[],
  toneSandhi: boolean
): SingleWordResult[] => {
  if (toneSandhi === false) {
    list.forEach((item) => {
      if (item.origin === "一") {
        item.result = item.originPinyin = "yī";
      } else if (item.origin === "不") {
        item.result = item.originPinyin = "bù";
      }
    });
  }
  return list;
};
