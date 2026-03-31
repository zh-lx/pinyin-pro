<a href="https://github.com/zh-lx/pinyin-pro"><img src="https://cdn.jsdelivr.net/gh/zh-lx/static-img/pinyin-pro/logo.svg" alt="logo" width="500" /></a>

[![NPM version](https://img.shields.io/npm/v/pinyin-pro.svg)](https://www.npmjs.com/package/pinyin-pro)
[![GITHUB star](https://img.shields.io/github/stars/zh-lx/pinyin-pro.svg)](https://github.com/zh-lx/pinyin-pro)
[![build-passing](https://img.shields.io/github/actions/workflow/status/zh-lx/pinyin-pro/ci.yaml)](https://github.com/zh-lx/pinyin-pro/actions)
[![NPM Downloads](https://img.shields.io/npm/dm/pinyin-pro.svg)](https://npmcharts.netlify.app/compare/pinyin-pro?minimal=true)
[![Coverage Status](https://img.shields.io/codecov/c/github/zh-lx/pinyin-pro)](https://app.codecov.io/gh/zh-lx/pinyin-pro)
[![DeepScan grade](https://deepscan.io/api/teams/20303/projects/26161/branches/829070/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=20303&pid=26161&bid=829070)
[![MIT-license](https://img.shields.io/npm/l/pinyin-pro.svg)](https://opensource.org/licenses/MIT)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/pinyin-pro)](https://bundlephobia.com/package/pinyin-pro)
[![GITHUB-language](https://img.shields.io/github/languages/top/zh-lx/pinyin-pro.svg)](https://github.com/zh-lx/pinyin-pro)

### 📖 介绍

`pinyin-pro` 是一个专业的 js 汉字拼音转换库，功能丰富、准确率高、性能优异。

[中文文档](https://pinyin-pro.cn) | [English Docs](https://pinyin-pro.cn/en) | [在线运行](https://pinyin-pro.cn/run/run)

### 🎨 特色功能

- 支持拼音/声母/韵母/首字母/音调/全部信息
- 支持人名姓氏模式
- 支持文本和拼音匹配
- 支持自定义拼音
- 支持获取带拼音汉字的 HTML 字符串
- 支持获取汉字的所有拼音
- 支持拼音输入转换
- 极致的性能和极高的拼音识别准确率

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

全部功能的使用说明文档请查看[在线文档](https://pinyin-pro.cn/use/pinyin.html)

- 获取拼音，更多功能请查看[pinyin API](https://pinyin-pro.cn/use/pinyin.html)

  ```js
  import { pinyin } from "pinyin-pro";

  // 获取字符串格式拼音
  pinyin("汉语拼音"); // 'hàn yǔ pīn yīn'

  // 获取数组格式拼音
  pinyin("汉语拼音", { type: "array" }); // ["hàn", "yǔ", "pīn", "yīn"]

  // 获取不带音调格式拼音
  pinyin("汉语拼音", { toneType: "none" }); // "han yu pin yin"

  // 获取不带音调数组格式拼音
  pinyin("汉语拼音", { toneType: "none", type: "array" }); // ["han", "yu", "pin", "yin"]

  // 音调以数字形式显示
  pinyin("汉语拼音", { toneType: "num" }); // "han4 yu3 pin1 yin1"

  // 自动识别多音字
  pinyin("睡着了"); // "shuì zháo le"
  ```

- 文本和拼音匹配，更多匹配规则请查看[match API](https://pinyin-pro.cn/use/match.html)

  ```js
  import { match } from "pinyin-pro";

  // 支持首字母匹配
  match("中文拼音", "zwp"); // [0, 1, 2]

  // 支持全拼匹配
  match("中文拼音", "zhongwenpin"); // [0, 1, 2]

  // 支持混合匹配
  match("中文拼音", "zhongwp"); // [0, 1, 2]
  ```

- 拼音格式转换，更多功能请查看[convert API](https://pinyin-pro.cn/use/convert.html)

  ```js
  import { convert } from "pinyin-pro";

  // 数组转符号
  convert("pin1 yin1"); // 'pīn yīn'

  // 符号转数字
  convert("pīn yīn", { format: "symbolToNum" }); // 'pin1 yin1'

  // 消除符号
  convert("pīn yīn", { format: "toneNone" }); // 'pin yin'

  // 儿化音
  convert("dou4 zhi1r") // dòu zhīr
  convert("dòu zhīr", { format: "symbolToNum" }) // dou4 zhi1r
  convert("dòu zhīr", { format: "toneNone" }); // 'dou zhir'
  ```

- 获取带汉字拼音的 HTML 字符串，更多配置请查看[html API](https://pinyin-pro.cn/use/html.html)

  ```js
  import { html } from "pinyin-pro";

  // 带拼音汉字的 HTML 字符串
  html("汉语拼音");
  /*
  <span class="py-result-item">
  <ruby>
      <span class="py-chinese-item">汉</span>
      <rp>(</rp>
      <rt class="py-pinyin-item">hàn</rt>
      <rp>)</rp>
  </ruby>
  </span>
  <span class="py-result-item">
  <ruby>
      <span class="py-chinese-item">语</span>
      <rp>(</rp>
      <rt class="py-pinyin-item">yǔ</rt>
      <rp>)</rp>
  </ruby>
  </span>
  */
  ```

  上述结果浏览器中预览效果如下：
  <span class="py-result-item">
  <ruby>
  <span class="py-chinese-item">汉</span>
  <rp>(</rp>
  <rt class="py-pinyin-item">hàn</rt>
  <rp>)</rp>
  </ruby>
  </span>
  <span class="py-result-item">
  <ruby>
  <span class="py-chinese-item">语</span>
  <rp>(</rp>
  <rt class="py-pinyin-item">yǔ</rt>
  <rp>)</rp>
  </ruby>
  </span>

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
        <td>😕 Node 版: 94.097%</td>
        <td rowspan="2">😕 94.097%</td>
        <td rowspan="2">🤩 99.846%</td>
    </tr>
    <tr>
        <td>😕 Web 版: 91.170%	</td>
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
        <td>🚀 820.131ms</td>
    </tr>
    <tr>
        <td rowspan="2">兼容性</td>
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
</table>

### 📠 反馈

使用遇到问题或者需要功能支持欢迎提 issue。

技术交流欢迎加 pinyin-pro 用户群 或者微信：

<div style="display: flex;">
  <img src="https://user-images.githubusercontent.com/73059627/226233976-5dbb9daa-6620-4d16-a2b0-359055dcafe1.png" width="200" >
  <img src="https://user-images.githubusercontent.com/73059627/226233691-848b2a40-f1a9-414e-a80f-3fc6c6209eb1.png" width="200" >
</div>
