[![pinyin-pro Logo](https://t1.wodetu.cn/2022/11/15/168e8a29acc856c48fdef4060c0ba5ad.png)](https://github.com/zh-lx/pinyin-pro)

[![NPM version](https://img.shields.io/npm/v/pinyin-pro.svg)](https://www.npmjs.com/package/pinyin-pro)
[![GITHUB star](https://img.shields.io/github/stars/zh-lx/pinyin-pro.svg)](https://github.com/zh-lx/pinyin-pro)
[![travis-build](https://travis-ci.com/zh-lx/pinyin-pro.svg?branch=main)](https://travis-ci.com/github/zh-lx/pinyin-pro)
[![NPM Downloads](https://img.shields.io/npm/dm/pinyin-pro.svg)](https://npmcharts.com/compare/pinyin-pro?minimal=true)
[![Coverage Status](https://coveralls.io/repos/github/zh-lx/pinyin-pro/badge.svg?branch=main)](https://coveralls.io/github/zh-lx/pinyin-pro?branch=main)
[![MIT-license](https://img.shields.io/npm/l/pinyin-pro.svg)](https://opensource.org/licenses/MIT)
[![GITHUB-language](https://img.shields.io/github/languages/top/zh-lx/pinyin-pro.svg)](https://github.com/zh-lx/pinyin-pro)

### 📖 介绍

`pinyin-pro` 是一个专业的 js 汉字拼音转换库，功能丰富、准确率高、性能优异。

[使用文档](https://pinyin-pro.cn) | [在线运行](https://pinyin-pro.cn/run/run)

### 🎨 特色功能

- 获取汉字、词语、句子等多种格式的拼音
- 获取声母
- 获取韵母、韵头、韵腹、韵尾
- 获取拼音首字母
- 获取音调
- 获取多音字的多种拼音
- 支持人名姓氏模式
- 支持自定义拼音
- 支持字符串和数组两种输出形式
- 支持拼音文本匹配功能

### 🔨 安装

npm 安装

```html
npm install pinyin-pro
```

浏览器引入

```html
<script src="https://unpkg.com/pinyin-pro"></script>
```

### 💡 使用示例

更多功能的使用说明文档请查看[使用示例](https://pinyin-pro.cn/use/pinyin)

```js
import { pinyin } from 'pinyin-pro';

// 获取带音调拼音
pinyin('汉语拼音'); // 'hàn yǔ pīn yīn'

// 获取数组形式带音调拼音
pinyin('汉语拼音', { type: 'array' }); // ["hàn", "yǔ", "pīn", "yīn"]

// 获取数组形式不带声调的拼音
pinyin('汉语拼音', { toneType: 'none', type: 'array' }); // ["han", "yu", "pin", "yin"]

// 获取带音调韵母
pinyin('汉语拼音', { pattern: 'final' }); // 'àn ǔ īn īn'
```

### 🏆 竞品对比

以下是 `pinyin-pro`、`pinyin` 及 `@napi-rs/pinyin` 包对于汉字转换的速度及准确率对比，可以看到 `pinyin-pro` 在各方面都全面领先。
- 准确率测试数据: [accuracy](https://github.com/zh-lx/pinyin-pro/blob/main/benchmark/accuracy.js)
- 性能测试数据：[speed](https://github.com/zh-lx/pinyin-pro/blob/main/benchmark/speed.js)
<table>
    <tr>
        <th colspan="2">对比项</th>
        <th>pinyin</th>
        <th>@napi-rs/pinyin</th>
        <th>pinyin-pro</th>
    </tr>
    <tr>
        <td rowspan="2" colspan="2">准确率</td>
        <td>😕 Node 版: 97.844%</td>
        <td rowspan="2">😕 97.433%</td>
        <td rowspan="2">🤩 99.744%</td>
    </tr>
    <tr>
        <td>😕 Web 版: 94.507%	</td>
    </tr>
    <tr>
        <td rowspan="3">性能</td>
        <td>5k字转换耗时</td>
        <td>🐢 749.111ms</td>
        <td>🚲 200.877ms</td>
        <td>🚀 5.958ms</td>
    </tr>
    <tr>
        <td>1w字转换耗时</td>
        <td>🐢 795.904ms</td>
        <td>🚲 206.5ms</td>
        <td>🚀 15.260ms</td>
    </tr>
    <tr>
        <td>100w字转换耗时</td>
        <td>⛔ 内存溢出转换失败</td>
        <td>🚀 638.888ms</td>
        <td>🚀 607.131ms</td>
    </tr>
    <tr>
        <td rowspan="3">兼容性</td>
        <td>Web 环境</td>
        <td>✔️ 支持</td>
        <td>❌ 不支持</td>
        <td>✔️ 支持</td>
    </tr>
    <tr>
        <td>Node 环境</td>
        <td>✔️ 支持</td>
        <td>✔️ 支持</td>
        <td>✔️ 支持</td>
    </tr>
    <tr>
        <td>ESM </td>
        <td>❌ 不支持</td>
        <td>✔️ 支持</td>
        <td>✔️ 支持</td>
    </tr>
</table>

### 📠 反馈

使用遇到问题或者需要功能支持欢迎提 issue。

技术交流欢迎加 pinyin-pro 用户群 或者微信：

<div style="display: flex;">
  <img src="https://user-images.githubusercontent.com/73059627/226233976-5dbb9daa-6620-4d16-a2b0-359055dcafe1.png" width="200" >
  <img src="https://user-images.githubusercontent.com/73059627/226233691-848b2a40-f1a9-414e-a80f-3fc6c6209eb1.png" width="200" >
</div>
