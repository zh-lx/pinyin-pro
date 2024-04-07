import { MatchPattern, Priority } from ".";

type Tokenization = {
  count: number;
  patterns: MatchPattern[];
  concatPattern?: MatchPattern;
};

// 取最少分词数
function getMinCount(a: Tokenization, b: Tokenization) {
  if (!a) {
    return b;
  }
  if (!b) {
    return a;
  }
  return a.count <= b.count ? a : b;
}

function getPatternCount(pattern: MatchPattern) {
  if (pattern.priority === Priority.Custom) {
    return -(pattern.length * pattern.length * 100000);
  }
  if (pattern.priority === Priority.Surname) {
    return -(pattern.length * pattern.length * 100);
  }
  return 1;
}

// 最少分词算法
export function minTokenization(patterns: MatchPattern[], length: number) {
  const dp: Tokenization[] = [];
  let patternIndex = patterns.length - 1;
  let pattern = patterns[patternIndex];
  // 按照长度去除重叠词
  for (let i = length - 1; i >= 0; i--) {
    // suffix
    const suffixDP =
      i + 1 >= length
        ? { count: 0, patterns: [] as MatchPattern[] }
        : dp[i + 1];
    while (pattern && pattern.index + pattern.length - 1 === i) {
      const startIndex = pattern.index;
      const curDP = {
        count: getPatternCount(pattern) + suffixDP.count,
        patterns: suffixDP.patterns,
        concatPattern: pattern
      };
      dp[startIndex] = getMinCount(dp[startIndex], curDP);
      pattern = patterns[--patternIndex];
    }
    // dp[i]
    const iDP = {
      count: 1 + suffixDP.count,
      patterns: suffixDP.patterns,
    };
    dp[i] = getMinCount(dp[i], iDP);
    if (dp[i].concatPattern) {
      dp[i].patterns = dp[i].patterns.concat(dp[i].concatPattern as MatchPattern);
      dp[i].concatPattern = undefined;
      delete dp[i + 1];
    }
  }
  return dp[0].patterns.reverse();
}
