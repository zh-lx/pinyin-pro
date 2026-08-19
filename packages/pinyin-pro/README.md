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

  <details>
    <summary>点击展开文本和拼音匹配示例</summary>

  ```js
  import { match } from "pinyin-pro";

  // 支持首字母匹配
  match("中文拼音", "zwp"); // [0, 1, 2]

  // 支持全拼匹配
  match("中文拼音", "zhongwenpin"); // [0, 1, 2]

  // 支持混合匹配
  match("中文拼音", "zhongwp"); // [0, 1, 2]
  ```

  </details>

- 拼音格式转换，更多功能请查看[convert API](https://pinyin-pro.cn/use/convert.html)

  <details>
    <summary>点击展开拼音格式转换示例</summary>

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

  </details>

- 分词并获取拼音，更多配置请查看[segment API](https://pinyin-pro.cn/use/segment.html)

  <details>
    <summary>点击展开 segment 基础使用示例</summary>

  ```js
  import { segment, OutputFormat } from "pinyin-pro";

  // 默认返回分词及对应的拼音
  segment("我喜欢学习汉语");
  // [
  //   { origin: "我", result: "wǒ" },
  //   { origin: "喜欢", result: "xǐhuān" },
  //   { origin: "学习", result: "xuéxí" },
  //   { origin: "汉语", result: "hànyǔ" }
  // ]

  // 仅获取分词后的拼音
  segment("我喜欢学习汉语", { format: OutputFormat.PinyinString });
  // "wǒ xǐhuān xuéxí hànyǔ"
  ```

  </details>

- 获取带汉字拼音的 HTML 字符串，更多配置请查看[html API](https://pinyin-pro.cn/use/html.html)

  <details>
    <summary>点击展开 HTML 字符串示例</summary>

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

  </details>

- 更多的 API 请查看[pinyin-pro 官网](https://pinyin-pro.cn/)

### 🏆 竞品对比

以下是 `pinyin-pro`、`pinyin` 及 `@napi-rs/pinyin` 包对于汉字转换的速度及准确率对比，可以看到 `pinyin-pro` 在各方面都全面领先。

- 准确率测试数据: [accuracy](https://github.com/zh-lx/pinyin-pro/blob/main/packages/pinyin-pro/scripts/benchmark/accuracy.ts)
- 性能测试数据：[speed](https://github.com/zh-lx/pinyin-pro/blob/main/packages/pinyin-pro/scripts/benchmark/speed.ts)
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
        <td rowspan="5">性能</td>
        <td>首次使用字典初始化时长</td>
        <td>🚀 14.261ms</td>
        <td>🐢 160.769ms</td>
        <td>🚀 8.412ms</td>
    </tr>
    <tr>
        <td>10k字转换耗时</td>
        <td>🚲 74.442ms</td>
        <td>🚀 4.298ms</td>
        <td>🚀 7.216ms</td>
    </tr>
    <tr>
        <td>100k字转换耗时</td>
        <td>🐢 6287.332s</td>
        <td>🚀 29.32ms</td>
        <td>🚀 45.471ms</td>
    </tr>
    <tr>
        <td>1m字转换耗时</td>
        <td>⛔ 内存溢出转换失败</td>
        <td>🚀 297.41ms</td>
        <td>🚀 328.338ms</td>
    </tr>
    <tr>
        <td>10m字转换耗时</td>
        <td>⛔ 内存溢出转换失败</td>
        <td>🚀 3907.278ms</td>
        <td>🚀 3375.192ms</td>
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

### 📦 API Size

以下数据由 `pnpm size` 自动生成。ESM 各 API 为独立打包并开启 Tree Shaking 后的压缩体积；UMD 不支持按 API Tree Shaking，展示完整产物体积。括号内为对应产物 gzip 后的体积。

<table>
    <thead>
        <tr>
            <th>API</th>
            <th>ESM</th>
            <th>UMD</th>
        </tr>
    </thead>
    <tbody>
    <tr><td>pinyin</td><td>306.40 KB (gzip 134.52 KB)</td><td rowspan="7">316.84 KB (gzip 138.05 KB)</td></tr>
    <tr><td>segment</td><td>305.14 KB (gzip 133.75 KB)</td></tr>
    <tr><td>match</td><td>185.67 KB (gzip 80.90 KB)</td></tr>
    <tr><td>convert</td><td>1.78 KB (gzip 0.98 KB)</td></tr>
    <tr><td>html</td><td>307.23 KB (gzip 134.83 KB)</td></tr>
    <tr><td>polyphonic</td><td>180.75 KB (gzip 78.83 KB)</td></tr>
    <tr><td>总体积</td><td>559.41 KB (gzip 157.71 KB)</td></tr>
    </tbody>
</table>

### 📠 反馈

使用遇到问题或者需要功能支持欢迎提 issue。

技术交流欢迎加 pinyin-pro 用户群 或者微信：

<div style="display: flex;">
  <img src="https://user-images.githubusercontent.com/73059627/226233976-5dbb9daa-6620-4d16-a2b0-359055dcafe1.png" width="200" >
  <img src="https://user-images.githubusercontent.com/73059627/226233691-848b2a40-f1a9-414e-a80f-3fc6c6209eb1.png" width="200" >
</div>

### 🧰 Monorepo 开发

本仓库使用 pnpm workspace 管理以下项目：

- `packages/pinyin-pro`：`pinyin-pro` 核心包
- `packages/data`：`@pinyin-pro/data` 扩展字典包及数据处理脚本
- `packages/docs`：中英文 VitePress 文档

```shell
pnpm install
pnpm build          # 构建核心包与数据包
pnpm test           # 运行核心包测试
pnpm build:docs     # 构建并打包中英文文档
pnpm build:all      # 构建全部 workspace
pnpm docs:dev:zh    # 启动中文文档
pnpm docs:dev:en    # 启动英文文档
```
