/**
 * @description: 默认输出配置
 * @type {{
 *   toneType: 'symbol' | 'num' | 'none';  // 音调样式
 *   pattern: 'pinyin'| 'initial' | 'final'; // 返回数据模式
 *   type: 'string' | 'array'; // 返回数据类型
 *   multiple: false | true; // 是否返回多音，仅在单字有效
 * }}
 */
export const DEFAULT_OPTIONS = {
  pattern: 'pinyin',
  toneType: 'symbol', // 音调样式 symbol、num、none
  type: 'string', // 返回值类型string | array。例如：可以， 'ke yi' ['ke', 'yi']
  multiple: false, // 是否开启多音，仅word的length为1时生效
};
