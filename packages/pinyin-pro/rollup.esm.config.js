import path from 'path';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs'; // commonjs模块转换插件
import ts from 'rollup-plugin-typescript2';
import alias from '@rollup/plugin-alias';

const extensions = ['.mjs', '.js', '.json', '.node', '.ts'];

const plugins = [
  alias({
    entries: [{ find: '@', replacement: path.resolve(__dirname, './lib') }],
    customResolver: nodeResolve({ extensions }),
  }),
  nodeResolve({ extensions }),
  ts({
    tsconfig: path.resolve(__dirname, './tsconfig.json'), // 导入本地ts配置
    clean: true,
    include: [path.resolve(__dirname, './lib/**/*.ts')],
    useTsconfigDeclarationDir: true,
  }),
  commonjs(),
  json(),
];

module.exports = {
  input: path.resolve('./lib/index.ts'),
  output: [
    {
      exports: 'auto',
      dir: path.resolve(__dirname, './dist/esm'),
      entryFileNames: '[name].mjs',
      format: 'es',
      preserveModules: true,
      preserveModulesRoot: path.resolve(__dirname, './lib'),
      sourcemap: false,
    },
  ],
  plugins,
};
