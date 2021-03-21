import path from 'path';
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs'; // commonjs模块转换插件
import cleanup from 'rollup-plugin-cleanup';
import ts from 'rollup-plugin-typescript2';

// 公共插件配
const plugins = [
  cleanup(),
  json(),
  nodeResolve(),
  ts({
    tsconfig: path.resolve(__dirname, './tsconfig.json'), // 导入本地ts配置
    clean: true,
    useTsconfigDeclarationDir: true,
  }),
  commonjs(),
];
plugins.push(terser());

module.exports = {
  input: path.resolve('./index.ts'),
  output: [
    {
      exports: 'auto',
      file: path.resolve(__dirname, './dist/cjs/index.js'),
      format: 'cjs',
      sourcemap: false,
    },
    {
      exports: 'auto',
      file: path.join(__dirname, './dist/es/index.js'),
      format: 'es',
      sourcemap: false,
    },
  ],
  plugins,
};
