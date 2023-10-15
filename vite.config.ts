import { defineConfig } from 'vite';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: ['lib/index.ts'],
      formats: ['es', 'cjs'],
      fileName: 'index',
      name: 'pinyinPro',
    },

    minify: true,
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './lib'),
    },
  },
});
