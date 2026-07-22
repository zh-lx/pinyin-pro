# addTraditionalDict <Badge type="tip" text="v3.28.0+" vertical="middle" />

`pinyin-pro` exports the `addTraditionalDict` function, which is used to better recognize traditional Chinese characters.

::: tip
You need to install `@pinyin-pro/data` to import the traditional character mapping table

```bash
npm install @pinyin-pro/data
```

:::

## Examples

### `pinyin`

```js
import { pinyin, addTraditionalDict } from 'pinyin-pro';
import TraditionalDict from '@pinyin-pro/data/traditional';

// Before using addTraditionalDict
const result1 = pinyin('一个轉盤'); // Result: yī gè zhuǎn pán

// After using addTraditionalDict
addTraditionalDict(TraditionalDict);
const result2 = pinyin('一个轉盤', { traditional: true }); // Result: yī gè zhuàn pán
```

### `html`

```js
import { html, addTraditionalDict } from 'pinyin-pro';
import TraditionalDict from '@pinyin-pro/data/traditional';

// Before using addTraditionalDict
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

// After using addTraditionalDict
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


### `segment`

```js
import { segment, addTraditionalDict } from 'pinyin-pro';
import TraditionalDict from '@pinyin-pro/data/traditional';

// Before using addTraditionalDict
const result1 = segment('一个轉盤');
/*
[
  { "origin": "一", "result": "yí" },
  { "origin": "个", "result": "gè" },
  { "origin": "轉", "result": "zhuǎn" },
  { "origin": "盤", "result": "pán" }
]
*/

// After using addTraditionalDict
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

## Syntax and Parameters

Receives a traditional and simplified character mapping table object as a parameter.

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
