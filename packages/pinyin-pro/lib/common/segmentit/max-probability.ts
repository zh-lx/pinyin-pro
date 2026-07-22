import { MatchPattern } from ".";
import { Probability, Priority } from "../constant";

type ProbabilityItem = {
  probability: number;
  decimal: number; // 为防止小数溢出，decimal 标识 Math.pow(1e-300, decimal)
  patterns: MatchPattern[];
  concatPattern?: MatchPattern;
};

// 根据 probability 和 decimal 获取两个概率中最大的
function getMaxProbability(a: ProbabilityItem, b: ProbabilityItem) {
  if (!a) {
    return b;
  }
  if (a.decimal < b.decimal) {
    return a;
  } else if (a.decimal === b.decimal) {
    return a.probability > b.probability ? a : b;
  } else {
    return b;
  }
}

// probability 小于 1e-300 时，为防止小数溢出需要进位
function checkDecimal(prob: ProbabilityItem) {
  if (prob.probability < 1e-300) {
    prob.probability *= 1e300;
    prob.decimal += 1;
  }
}

function getPatternDecimal(pattern: MatchPattern) {
  if (pattern.priority === Priority.Custom) {
    return -(pattern.length * pattern.length * 100);
  }
  if (pattern.priority === Priority.Surname) {
    return -(pattern.length * pattern.length * 10);
  }
  return 0;
}

// 最大概率算法
export function maxProbability(patterns: MatchPattern[], length: number) {
  const dp: ProbabilityItem[] = [];
  let patternIndex = patterns.length - 1;
  let pattern = patterns[patternIndex];
  // 按照长度去除重叠词
  for (let i = length - 1; i >= 0; i--) {
    // suffix
    const suffixDP =
      i + 1 >= length
        ? { probability: 1, decimal: 0, patterns: [] as MatchPattern[] }
        : dp[i + 1];
    while (pattern && pattern.index + pattern.length - 1 === i) {
      const startIndex = pattern.index;
      const curDP = {
        probability: pattern.probability * suffixDP.probability,
        decimal: suffixDP.decimal + getPatternDecimal(pattern),
        patterns: suffixDP.patterns,
        concatPattern: pattern,
      };
      checkDecimal(curDP);
      dp[startIndex] = getMaxProbability(dp[startIndex], curDP);
      pattern = patterns[--patternIndex];
    }
    // dp[i]
    const iDP = {
      probability: Probability.Unknown * suffixDP.probability,
      decimal: 0,
      patterns: suffixDP.patterns,
    };
    checkDecimal(iDP);
    dp[i] = getMaxProbability(dp[i], iDP);
    if (dp[i].concatPattern) {
      dp[i].patterns = dp[i].patterns.concat(dp[i].concatPattern as MatchPattern);
      dp[i].concatPattern = undefined;
      delete dp[i + 1];
    }
  }
  return dp[0].patterns.reverse();
}
