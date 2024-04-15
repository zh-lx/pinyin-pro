import { configDefaults, defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, './lib'),
      },
    ],
    coverage: {
      include: ['lib/**'],
      exclude: ['lib/data/dict1-pinyin.ts']
    }
  },
})