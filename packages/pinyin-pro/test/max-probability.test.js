import { describe, expect, it } from 'vitest';
import { maxProbability } from '../lib/common/segmentit/max-probability';
import { Priority } from '../lib/common/constant';

const createPattern = (
  zh,
  index,
  length,
  probability = 1,
  priority = Priority.Normal,
) => ({
  zh,
  pinyin: zh,
  probability,
  length,
  priority,
  dict: 'test',
  index,
});

const getPatternNames = (patterns, length) =>
  maxProbability(patterns, length).map((pattern) => pattern.zh);

describe('maxProbability', () => {
  it('reconstructs normal and overlapping phrase paths', () => {
    expect(
      getPatternNames(
        [
          createPattern('甲乙', 0, 2, 0.9),
          createPattern('丙丁', 2, 2, 0.8),
        ],
        4,
      ),
    ).toEqual(['甲乙', '丙丁']);

    expect(
      getPatternNames(
        [
          createPattern('甲', 0, 1, 0.5),
          createPattern('甲乙', 0, 2, 0.25),
          createPattern('乙', 1, 1, 0.5),
        ],
        2,
      ),
    ).toEqual(['甲', '乙']);
  });

  it('preserves custom and surname priority', () => {
    expect(
      getPatternNames(
        [
          createPattern('甲', 0, 1, 1e-200, Priority.Custom),
          createPattern('甲乙', 0, 2, 1),
        ],
        2,
      ),
    ).toEqual(['甲']);

    expect(
      getPatternNames(
        [
          createPattern('甲', 0, 1),
          createPattern('甲乙', 0, 2, 1e-200, Priority.Surname),
          createPattern('乙', 1, 1),
        ],
        2,
      ),
    ).toEqual(['甲乙']);
  });

  it('handles unknown characters and decimal rollover', () => {
    expect(getPatternNames([], 3)).toEqual([]);

    expect(
      getPatternNames(
        [createPattern('甲', 0, 1, 1e-310)],
        1,
      ),
    ).toEqual([]);

    expect(
      getPatternNames(
        [createPattern('甲', 0, 1, 1e-310, Priority.Custom)],
        1,
      ),
    ).toEqual(['甲']);
  });
});
