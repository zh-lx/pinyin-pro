import { getStringLength } from '@/common/utils';
import { SingleWordResult } from '@/common/type';
import { getMultiplePinyin } from './handle';
import { CompleteOptions } from './index';
import {
  getNumOfTone,
  getInitialAndFinal,
  getFirstLetter,
  getFinalParts,
  getPinyinWithoutTone,
  getPinyinWithNum,
} from './handle';

// 验证输入是否为字符串
export const validateType = (word: unknown) => {
  if (typeof word !== 'string') {
    console.error(
      'The first param of pinyin is error: ' +
        word +
        ' is not assignable to type "string".'
    );
    return false;
  } else {
    return true;
  }
};

// nonZh 属性处理
export const middleWareNonZh = (
  list: SingleWordResult[],
  options: CompleteOptions
) => {
  let nonZh = options.nonZh;

  if (nonZh === 'removed') {
    return list.filter((item) => item.isZh);
  } else if (nonZh === 'consecutive') {
    for (let i = list.length - 2; i >= 0; i--) {
      const cur = list[i];
      const pre = list[i + 1];
      if (!cur.isZh && !pre.isZh) {
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
  if (getStringLength(word) === 1 && options.multiple) {
    return getMultiplePinyin(word, options.mode);
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
    case 'pinyin':
      break;
    case 'num':
      list.forEach((item) => {
        item.result = getNumOfTone(item.result);
      });
      break;
    case 'initial':
      list.forEach((item) => {
        item.result = getInitialAndFinal(item.result).initial;
      });
      break;
    case 'final':
      list.forEach((item) => {
        item.result = getInitialAndFinal(item.result).final;
      });
      break;
    case 'first':
      list.forEach((item) => {
        item.result = getFirstLetter(item.result);
      });
      break;
    case 'finalHead':
      list.forEach((item) => {
        item.result = getFinalParts(item.result).head;
      });
      break;
    case 'finalBody':
      list.forEach((item) => {
        item.result = getFinalParts(item.result).body;
      });
      break;
    case 'finalTail':
      list.forEach((item) => {
        item.result = getFinalParts(item.result).tail;
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
    case 'symbol':
      break;
    case 'none':
      list.forEach((item) => {
        item.result = getPinyinWithoutTone(item.result);
      });
      break;
    case 'num': {
      list.forEach((item) => {
        item.result = getPinyinWithNum(
          item.result,
          item.originPinyin as string
        );
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
      item.result = item.result.replace(/ü/g, 'v');
    });
  }
};

// type 属性处理
export const middlewareType = (
  list: SingleWordResult[],
  options: CompleteOptions,
  word: string
) => {
  if (options.multiple && getStringLength(word) === 1) {
    let last = '';
    list = list.filter((item) => {
      const res = item.result !== last;
      last = item.result;
      return res;
    });
  }
  if (options.type === 'array') {
    return list.map((item) => item.result);
  }
  if (options.type === 'all') {
    return list.map((item) => {
      const pinyin = item.isZh ? item.result : '';
      const { initial, final } = getInitialAndFinal(pinyin);
      const { head, body, tail } = getFinalParts(pinyin);
      return {
        origin: item.origin,
        pinyin,
        initial,
        final,
        first: item.isZh ? getFirstLetter(item.result) : '',
        finalHead: head,
        finalBody: body,
        finalTail: tail,
        num: Number(getNumOfTone(item.originPinyin)),
        isZh: item.isZh,
      };
    });
  }
  return list.map((item) => item.result).join(' ');
};
