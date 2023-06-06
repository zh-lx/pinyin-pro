import { pinyin as _pinyin } from '@/core/pinyin';

interface MatchOptions {
  /**
   * @description 每个汉字和拼音需要遵从的匹配精度
   */
  precision?: 'first' | 'start' | 'every' | 'any';
  /**
   * @description 匹配的汉字下标是否为连续的才算匹配成功
   */
  continuous?: boolean;
  /**
   * @description 匹配时对于空格的处理
   */
  space?: 'ignore' | 'preserve';
  /**
   * @description 最后一个字的匹配精度
   */
  lastPrecision?: 'first' | 'start' | 'every' | 'any';
}

const DefaultMatchOptions: MatchOptions = {
  precision: 'first',
  continuous: false,
  space: 'ignore',
  lastPrecision: 'start',
};

const MAX_PINYIN_LENGTH = 6;

/**
 * @description: 检测汉语字符串和拼音是否匹配
 * @param {string} text 汉语字符串
 * @param {string} pinyin 拼音，支持各种缩写形式
 * @param {MatchOptions=} options 配置项
 * @return {Array | null} 若匹配成功，返回 text 中匹配成功的下标数组；若匹配失败，返回 null
 */
export const match = (text: string, pinyin: string, options?: MatchOptions) => {
  if (options?.precision === 'any') {
    options.lastPrecision = 'any';
  }
  const completeOptions = {
    ...DefaultMatchOptions,
    ...(options || {}),
  } as Required<MatchOptions>;
  // 移除空格
  if (completeOptions.space === 'ignore') {
    pinyin = pinyin.replace(/\s/g, '');
  }
  const result =
    options?.precision === 'any'
      ? matchAny(text, pinyin, completeOptions)
      : matchAboveStart(text, pinyin, completeOptions);
  return result;
};

// 检测两个拼音最大的匹配长度
const getMatchLength = (pinyin1: string, pinyin2: string) => {
  let length = 0;
  for (let i = 0; i < pinyin1.length; i++) {
    if (pinyin1[i] === pinyin2[length]) {
      length++;
    }
  }
  return length;
};

const matchAny = (
  text: string,
  pinyin: string,
  options: Required<MatchOptions>
) => {
  let result = [];
  for (let i = 0; i < text.length; i++) {
    // 空格字符
    if (options.space === 'ignore' && text[i] === ' ') {
      result.push(i);
      continue;
    }
    // 是否为中文匹配
    if (text[i] === pinyin[0]) {
      pinyin = pinyin.slice(1);
      result.push(i);
      continue;
    }
    // 当前字的多音字拼音
    const ps = _pinyin(text[i], {
      toneType: 'none',
      multiple: true,
      type: 'array',
    });
    let currentLength = 0;
    ps.forEach((p) => {
      const length = getMatchLength(p, pinyin);
      if (length > currentLength) {
        currentLength = length;
      }
    });
    if (currentLength) {
      pinyin = pinyin.slice(currentLength);
      result.push(i);
    }
    if (!pinyin) {
      break;
    }
  }
  // 未匹配完
  if (pinyin) {
    return null;
  }
  // 是否连续
  if (options.continuous) {
    const _result = result;
    const isNotContinuous = result.some(
      (val, index) => index > 0 && val !== _result[index - 1] + 1
    );
    if (isNotContinuous) {
      return null;
    }
  }
  if (options.space === 'ignore') {
    result = result.filter((i) => text[i] !== ' ');
  }
  return result.length ? result : null;
};

const matchAboveStart = (
  text: string,
  pinyin: string,
  options: Required<MatchOptions>
) => {
  const words = text.split('');

  // 二维数组 dp[i][j]，i 表示遍历到的 text 索引+1, j 表示遍历到的 pinyin 的索引+1
  const dp = Array(words.length + 1);
  // 使用哨兵初始化 dp
  for (let i = 0; i < dp.length; i++) {
    dp[i] = Array(pinyin.length + 1);
    dp[i][0] = [];
  }
  for (let i = 0; i < dp[0].length; i++) {
    dp[0][i] = [];
  }

  // 动态规划匹配
  for (let i = 1; i < dp.length; i++) {
    // options.continuous 为 false 或 options.space 为 ignore 且当前为空格时，第 i 个字可以不参与匹配
    if (
      !options.continuous ||
      (options.space == 'ignore' && text[i - 1] === ' ')
    ) {
      for (let j = 1; j <= pinyin.length; j++) {
        dp[i][j - 1] = dp[i - 1][j - 1];
      }
    }
    // 第 i 个字参与匹配
    for (let j = 1; j <= pinyin.length; j++) {
      if (!dp[i - 1][j - 1]) {
        // 第 i - 1 已经匹配失败，停止向后匹配
        continue;
      } else if (j !== 1 && !dp[i - 1][j - 1].length) {
        // 非开头且前面的字符未匹配完成，停止向后匹配
        continue;
      } else {
        const muls = _pinyin(text[i - 1], {
          type: 'array',
          toneType: 'none',
          multiple: true,
        });

        // 非中文匹配
        if (text[i - 1] === pinyin[j - 1]) {
          const matches = [...dp[i - 1][j - 1], i - 1];
          // 记录最长的可匹配下标数组
          if (!dp[i][j] || matches.length > dp[i][j].length) {
            dp[i][j] = matches;
          }
          // pinyin 参数完全匹配完成，记录结果
          if (j === pinyin.length) {
            return dp[i][j];
          }
        }

        // 剩余长度小于等于 MAX_PINYIN_LENGTH(6) 时，有可能是最后一个拼音了
        if (pinyin.length - j <= MAX_PINYIN_LENGTH) {
          // lastPrecision 参数处理
          const last = muls.some((py) => {
            if (options.lastPrecision === 'any') {
              return py.includes(pinyin.slice(j - 1, pinyin.length));
            }
            if (options.lastPrecision === 'start') {
              return py.startsWith(pinyin.slice(j - 1, pinyin.length));
            }
            if (options.lastPrecision === 'first') {
              return py[0] === pinyin.slice(j - 1, pinyin.length);
            }
            if (options.lastPrecision === 'every') {
              return py === pinyin.slice(j - 1, pinyin.length);
            }
            return false;
          });
          if (last) {
            return [...dp[i - 1][j - 1], i - 1];
          }
        }

        const precision = options.precision;

        // precision 为 start 时，匹配开头
        if (precision === 'start') {
          muls.forEach((py) => {
            let end = j;
            const matches = [...dp[i - 1][j - 1], i - 1];
            while (
              end <= pinyin.length &&
              py.startsWith(pinyin.slice(j - 1, end))
            ) {
              if (!dp[i][end] || matches.length > dp[i][end].length) {
                dp[i][end] = matches;
              }
              end++;
            }
          });
        }

        // precision 为 first 时，匹配首字母
        if (precision === 'first') {
          if (muls.some((py) => py[0] === pinyin[j - 1])) {
            const matches = [...dp[i - 1][j - 1], i - 1];
            // 记录最长的可匹配下标数组
            if (!dp[i][j] || matches.length > dp[i][j].length) {
              dp[i][j] = matches;
            }
          }
        }

        // 匹配当前汉字的完整拼音
        const completeMatch = muls.find(
          (py: string) => py === pinyin.slice(j - 1, j - 1 + py.length)
        );
        if (completeMatch) {
          const matches = [...dp[i - 1][j - 1], i - 1];
          const endIndex = j - 1 + completeMatch.length;
          // 记录最长的可匹配下标数组
          if (!dp[i][endIndex] || matches.length > dp[i][endIndex].length) {
            dp[i][endIndex] = matches;
          }
        }
      }
    }
  }
  return null;
};
