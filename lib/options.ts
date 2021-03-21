export const DEFAULT_OPTIONS = {
  pattern: 'pinyin',
  toneType: 'symbol', // 音调样式 symbol、num、none
  type: 'string', // 返回值类型string | array。例如：可以， 'ke yi' ['ke', 'yi']
  multiple: false, // 是否开启多音，仅word的length为1时生效
};
