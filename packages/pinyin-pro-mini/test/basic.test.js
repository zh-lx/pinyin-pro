import { describe, expect, it } from 'vitest';
import { pinyin, addDict, match, segment } from '../lib/index';

describe('pinyin-pro-mini', () => {
  it('supports the pinyin-pro public API with single-character data', () => {
    expect(pinyin('中国')).toBe('zhōng guó');
    expect(pinyin('重庆')).toBe('chóng qìng');
    expect(match('中国', 'zhong guo')).toEqual([0, 1]);
    expect(segment('中国')).toEqual([
      { origin: '中', result: 'zhōng' },
      { origin: '国', result: 'guó' },
    ]);
  });

  it('supports custom dictionaries without changing the shared core', () => {
    addDict({ 中国: 'zhōng guó' });
    expect(pinyin('中国')).toBe('zhōng guó');
  });

  it('does not include the large phrase dictionaries', () => {
    expect(pinyin('科学院')).toBe('kē xué yuàn');
  });
});
