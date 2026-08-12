const path = require('path');
const json = require('@rollup/plugin-json');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const ts = require('rollup-plugin-typescript2');
const alias = require('@rollup/plugin-alias');
const cleanup = require('rollup-plugin-cleanup');
const { terser } = require('rollup-plugin-terser');

const sharedLib = path.resolve(__dirname, '../pinyin-pro/lib');
const sharedPatterns = path.resolve(sharedLib, 'data/patterns.ts');
const miniPatterns = path.resolve(__dirname, './lib/data/patterns.ts');
const extensions = ['.mjs', '.js', '.json', '.node', '.ts'];

module.exports = (format, file, name) => ({
  input: path.resolve(__dirname, './lib/index.ts'),
  output: {
    exports: 'auto',
    file: path.resolve(__dirname, file),
    format,
    ...(name ? { name } : {}),
    sourcemap: false,
  },
  plugins: [
    alias({
      entries: [
        // TypeScript may resolve the shared segmentit import to this absolute path
        // before Rollup applies the @/data/patterns alias.
        { find: sharedPatterns, replacement: miniPatterns },
        { find: '@/data/dict1', replacement: path.resolve(__dirname, './lib/data/dict1.ts') },
        { find: '@/data/patterns', replacement: path.resolve(__dirname, './lib/data/patterns.ts') },
        { find: '@', replacement: sharedLib },
      ],
      customResolver: nodeResolve({ extensions }),
    }),
    nodeResolve({ extensions }),
    ts({
      tsconfig: path.resolve(__dirname, './tsconfig.json'),
      clean: true,
      include: [path.resolve(__dirname, '../pinyin-pro/lib/**/*.ts'), path.resolve(__dirname, './lib/**/*.ts')],
      useTsconfigDeclarationDir: true,
    }),
    commonjs(),
    json(),
    cleanup(),
    terser(),
  ],
});
