import { polyphonic } from '../lib/index';
import { expect, describe, it } from 'vitest';

describe('polyphonic', () => {
  it('[polyphonic]normal', () => {
    const result = polyphonic('好好学习');
    expect(result).to.deep.equal(['hǎo hào', 'hǎo hào', 'xué', 'xí']);
  });

  it('[polyphonic]array', () => {
    const result = polyphonic('好好学习', { type: 'array' });
    expect(result).to.deep.equal([
      ['hǎo', 'hào'],
      ['hǎo', 'hào'],
      ['xué'],
      ['xí'],
    ]);
  });

  it('[polyphonic]all', () => {
    const result = polyphonic('好好学习', { type: 'all' });
    expect(result).to.deep.equal([
      [
        {
          final: 'ǎo',
          finalBody: 'ǎ',
          finalHead: '',
          finalTail: 'o',
          first: 'h',
          initial: 'h',
          isZh: true,
          num: 3,
          origin: '好',
          pinyin: 'hǎo',
          inZhRange: true,
        },
        {
          final: 'ào',
          finalBody: 'à',
          finalHead: '',
          finalTail: 'o',
          first: 'h',
          initial: 'h',
          isZh: true,
          num: 4,
          origin: '好',
          pinyin: 'hào',
          inZhRange: true,
        },
      ],
      [
        {
          final: 'ǎo',
          finalBody: 'ǎ',
          finalHead: '',
          finalTail: 'o',
          first: 'h',
          initial: 'h',
          isZh: true,
          num: 3,
          origin: '好',
          pinyin: 'hǎo',
          inZhRange: true,
        },
        {
          final: 'ào',
          finalBody: 'à',
          finalHead: '',
          finalTail: 'o',
          first: 'h',
          initial: 'h',
          isZh: true,
          num: 4,
          origin: '好',
          pinyin: 'hào',
          inZhRange: true,
        },
      ],
      [
        {
          final: 'üé',
          finalBody: 'é',
          finalHead: 'ü',
          finalTail: '',
          first: 'x',
          initial: 'x',
          isZh: true,
          num: 2,
          origin: '学',
          pinyin: 'xué',
          inZhRange: true,
        },
      ],
      [
        {
          final: 'í',
          finalBody: 'í',
          finalHead: '',
          finalTail: '',
          first: 'x',
          initial: 'x',
          isZh: true,
          num: 2,
          origin: '习',
          pinyin: 'xí',
          inZhRange: true,
        },
      ],
    ]);
  });

  it('[polyphonic]type error', () => {
    // @ts-ignore
    const result = polyphonic(11);
    expect(result).to.deep.equal([]);
  });

  it('[polyphonic]empty', () => {
    const result = polyphonic('');
    expect(result).to.deep.equal([]);
  });

  it('[polyphonic]nonzh', () => {
    const result = polyphonic('好好学习s');
    expect(result).to.deep.equal(['hǎo hào', 'hǎo hào', 'xué', 'xí', '']);
  });

  it('[polyphonic]all&nonZh', () => {
    const result = polyphonic('好好学习s', { type: 'all' });
    expect(result).to.deep.equal([
      [
        {
          final: 'ǎo',
          finalBody: 'ǎ',
          finalHead: '',
          finalTail: 'o',
          first: 'h',
          initial: 'h',
          isZh: true,
          num: 3,
          origin: '好',
          pinyin: 'hǎo',
          inZhRange: true,
        },
        {
          final: 'ào',
          finalBody: 'à',
          finalHead: '',
          finalTail: 'o',
          first: 'h',
          initial: 'h',
          isZh: true,
          num: 4,
          origin: '好',
          pinyin: 'hào',
          inZhRange: true,
        },
      ],
      [
        {
          final: 'ǎo',
          finalBody: 'ǎ',
          finalHead: '',
          finalTail: 'o',
          first: 'h',
          initial: 'h',
          isZh: true,
          num: 3,
          origin: '好',
          pinyin: 'hǎo',
          inZhRange: true,
        },
        {
          final: 'ào',
          finalBody: 'à',
          finalHead: '',
          finalTail: 'o',
          first: 'h',
          initial: 'h',
          isZh: true,
          num: 4,
          origin: '好',
          pinyin: 'hào',
          inZhRange: true,
        },
      ],
      [
        {
          final: 'üé',
          finalBody: 'é',
          finalHead: 'ü',
          finalTail: '',
          first: 'x',
          initial: 'x',
          isZh: true,
          num: 2,
          origin: '学',
          pinyin: 'xué',
          inZhRange: true,
        },
      ],
      [
        {
          final: 'í',
          finalBody: 'í',
          finalHead: '',
          finalTail: '',
          first: 'x',
          initial: 'x',
          isZh: true,
          num: 2,
          origin: '习',
          pinyin: 'xí',
          inZhRange: true,
        },
      ],
      [
        {
          final: '',
          finalBody: '',
          finalHead: '',
          finalTail: '',
          first: '',
          initial: '',
          isZh: false,
          num: 0,
          origin: 's',
          pinyin: '',
          inZhRange: false,
        },
      ],
    ]);
  });

  it('[polyphonic]num', () => {
    const result = polyphonic('好好学习', { pattern: 'num' });
    expect(result).to.deep.equal(['3 4', '3 4', '2', '2']);
  });

  it('[polyphonic]toneType', () => {
    const result = polyphonic('好好学习', { toneType: 'none' });
    expect(result).to.deep.equal(['hao', 'hao', 'xue', 'xi']);
  });

  it('[polyphonic]toneType&num', () => {
    const result = polyphonic('好好学习', { toneType: 'num' });
    expect(result).to.deep.equal(['hao3 hao4', 'hao3 hao4', 'xue2', 'xi2']);
  });
});
