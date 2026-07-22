import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: [
        'src/chars.ts',
        'src/modern.ts',
        'src/complete.ts',
        'src/traditional.ts',
      ],
      formats: ['es', 'cjs'],
      fileName: '[name]',
    },
    minify: true,
    emptyOutDir: true,
  },
});
