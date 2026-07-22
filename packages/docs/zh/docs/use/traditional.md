# addTraditionalDict <Badge type="tip" text="v3.28.0+" vertical="middle" />

`pinyin-pro` 内部导出了 `addTraditionalDict` 函数，用于更好的识别繁体字。

::: tip
需要安装 `@pinyin-pro/data` 来引入繁体字映射表

```bash
npm install @pinyin-pro/data
```

:::

## 示例

### pinyin

```js
import { pinyin, addTraditionalDict } from 'pinyin-pro';
import TraditionalDict from '@pinyin-pro/data/traditional';

// 使用 addTraditionalDict 前
const result1 = pinyin('一个轉盤'); // 结果: yī gè zhuǎn pán

// 使用 addTraditionalDict 后
addTraditionalDict(TraditionalDict);
const result2 = pinyin('一个轉盤', { traditional: true }); // 结果: yī gè zhuàn pán
```

### html

```js
import { html, addTraditionalDict } from 'pinyin-pro';
import TraditionalDict from '@pinyin-pro/data/traditional';

// 使用 addTraditionalDict 前
const result1 = html('一个轉盤');
/*
<span class="py-result-item">
  <ruby>
    <span class="py-chinese-item">一</span>
    <rp>(</rp>
    <rt class="py-pinyin-item">yí</rt>
    <rp>)</rp>
  </ruby>
</span>
<span class="py-result-item">
  <ruby>
    <span class="py-chinese-item">个</span>
    <rp>(</rp>
    <rt class="py-pinyin-item">gè</rt>
    <rp>)</rp>
  </ruby>
</span>
<span class="py-result-item">
  <ruby>
    <span class="py-chinese-item">轉</span>
    <rp>(</rp>
    <rt class="py-pinyin-item">zhuǎn</rt>
    <rp>)</rp>
  </ruby>
</span>
<span class="py-result-item">
  <ruby>
    <span class="py-chinese-item">盤</span>
    <rp>(</rp>
    <rt class="py-pinyin-item">pán</rt>
    <rp>)</rp>
  </ruby>
</span>
*/

// 使用 addTraditionalDict 后
addTraditionalDict(TraditionalDict);
const result2 = html('一个轉盤', { traditional: true });
/*
<span class="py-result-item">
  <ruby>
    <span class="py-chinese-item">一</span>
    <rp>(</rp>
    <rt class="py-pinyin-item">yí</rt>
    <rp>)</rp>
  </ruby>
</span>
<span class="py-result-item">
  <ruby>
    <span class="py-chinese-item">个</span>
    <rp>(</rp>
    <rt class="py-pinyin-item">gè</rt>
    <rp>)</rp>
  </ruby>
</span>
<span class="py-result-item">
  <ruby>
    <span class="py-chinese-item">轉</span>
    <rp>(</rp>
    <rt class="py-pinyin-item">zhuàn</rt>
    <rp>)</rp>
  </ruby>
</span>
<span class="py-result-item">
  <ruby>
    <span class="py-chinese-item">盤</span>
    <rp>(</rp>
    <rt class="py-pinyin-item">pán</rt>
    <rp>)</rp>
  </ruby>
</span>
*/
```


### segment

```js
import { segment, addTraditionalDict } from 'pinyin-pro';
import TraditionalDict from '@pinyin-pro/data/traditional';

// 使用 addTraditionalDict 前
const result1 = segment('一个轉盤');
/*
[
  { "origin": "一", "result": "yí" },
  { "origin": "个", "result": "gè" },
  { "origin": "轉", "result": "zhuǎn" },
  { "origin": "盤", "result": "pán" }
]
*/

// 使用 addTraditionalDict 后
addTraditionalDict(TraditionalDict);
const result2 = segment('一个轉盤', { traditional: true });
/*
[
  { "origin": "一", "result": "yí" },
  { "origin": "个", "result": "gè" },
  { "origin": "轉", "result": "zhuàn" },
  { "origin": "盤", "result": "pán" }
]
*/
```

## 语法及参数

接收一个繁简字映射表对象作为参数。

```ts
import { addTraditionalDict } from 'pinyin-pro';

function addTraditionalDict(dict: Record<string, string>);

// dict 示例
const Dict = {
  "萬": "万",
  "與": "与",
  "醜": "丑",
  "專": "专",
  "業": "业",
  "東": "东",
  "絲": "丝",
  "丟": "丢",
  "兩": "两",
}
```
