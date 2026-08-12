const path = require('path');

module.exports = {
  test: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, '../pinyin-pro/lib') },
      { find: '@/data/dict1', replacement: path.resolve(__dirname, './lib/data/dict1.ts') },
      { find: '@/data/patterns', replacement: path.resolve(__dirname, './lib/data/patterns.ts') },
    ],
  },
};
