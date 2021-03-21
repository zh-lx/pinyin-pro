import path from 'path';
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs'; // commonjs模块转换插件
import ts from 'rollup-plugin-typescript2';

// 公共插件配
const plugins = [
  json(),
  nodeResolve(),
  ts({
    tsconfig: path.resolve(__dirname, './tsconfig.json'), // 导入本地ts配置
    clean: true,
  }),
  commonjs(),
];
plugins.push(terser());

module.exports = {
  input: path.resolve('./index.js'),
  output: [
    {
      exports: 'auto',
      file: path.resolve(__dirname, './dist/cjs/index.js'),
      format: 'cjs',
      sourcemap: true,
    },
    {
      exports: 'auto',
      file: path.join(__dirname, './dist/es/index.js'),
      format: 'es',
      sourcemap: true,
    },
  ],
  plugins,
};

// module.exports = (commandLineArgs) => {
//   const root = path.resolve(__dirname, 'packages');
//   const pkgName = commandLineArgs.pkgName;
//   const pkg = require(path.resolve(root, pkgName, 'package.json'));
//   return {
//     input: path.resolve(root, `${pkgName}/src/index.ts`),
//     output: [
//       {
//         exports: 'auto',
//         file: path.resolve(root, pkgName, pkg.main),
//         format: 'cjs',
//         sourcemap: true,
//       },
//       {
//         exports: 'auto',
//         file: path.join(root, pkgName, pkg.module),
//         format: 'es',
//         sourcemap: true,
//       },
//     ],
//     plugins
//   };
// }
