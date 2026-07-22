# html <Badge type="tip" text="v3.15.0+" vertical="middle" />

使用 `html` api 获取`<ruby></ruby>` 格式的汉字和拼音 HTML 字符串。

## 示例

### 常规使用

`html` api 返回值为 HTML 格式的字符串：

- 每个汉字和拼音最外层是由一个 `<span class="py-result-item"></span>` 标签包裹(可以通过 `resultClass` 属性自定义该标签的类名)
- 内层是 `<ruby></ruby>` 标签用于展示汉字和拼音
- 汉字部分由 `<span class="py-chinese-item"></span>` 标签包裹(可以通过 `chineseClass` 属性自定义该标签的类名)
- 拼音部分由 `<rt class="py-pinyin-item"></rt>` 标签包裹(可以通过 `pinyinClass` 属性自定义该标签的类名)
- 默认情况下，非汉字没有标签包裹。通过设置 `wrapNonChinese` 属性的值为 `true`，非汉字部分会被 `<span class="py-non-chinese-item"></span>` 标签包裹。(可以通过 `nonChineseClass` 属性自定义该标签的类名)

```js
import { html } from 'pinyin-pro';

const htmlString = html('汉语拼音');

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
<span class="py-result-item">
  <ruby>
    <span class="py-chinese-item">拼</span>
    <rp>(</rp>
    <rt class="py-pinyin-item">pīn</rt>
    <rp>)</rp>
  </ruby>
</span>
<span class="py-result-item">
  <ruby>
    <span class="py-chinese-item">音</span>
    <rp>(</rp>
    <rt class="py-pinyin-item">yīn</rt>
    <rp>)</rp>
  </ruby>
</span>
*/
```

上述 `htmlString` 字符串在浏览器中的预览效果如下：

<html-basic-demo></html-basic-demo>

### 不带音调

当设置 `toneType` 属性的值为 `none` 时，返回值中的拼音是不带音调的。

```js
import { html } from 'pinyin-pro';

const htmlString = html('汉语拼音', { toneType: 'none' });

/*
<span class="py-result-item">
  <ruby>
    <span class="py-chinese-item">汉</span>
    <rp>(</rp>
    <rt class="py-pinyin-item">han</rt>
    <rp>)</rp>
  </ruby>
</span>
<span class="py-result-item">
  <ruby>
    <span class="py-chinese-item">语</span>
    <rp>(</rp>
    <rt class="py-pinyin-item">yu</rt>
    <rp>)</rp>
  </ruby>
</span>
<span class="py-result-item">
  <ruby>
    <span class="py-chinese-item">拼</span>
    <rp>(</rp>
    <rt class="py-pinyin-item">pin</rt>
    <rp>)</rp>
  </ruby>
</span>
<span class="py-result-item">
  <ruby>
    <span class="py-chinese-item">音</span>
    <rp>(</rp>
    <rt class="py-pinyin-item">yin</rt>
    <rp>)</rp>
  </ruby>
</span>
*/
```

上述 `htmlString` 字符串在浏览器中的预览效果如下：

<html-no-tone-demo></html-no-tone-demo>

### 自定义样式

可以通过 `html` api 返回值中的类名来控制具体的样式，如下面的例子中，我们让汉字部分为蓝色，拼音部分为红色。

```js
// js
import { html } from 'pinyin-pro';

const htmlString = html('汉语拼音');
```

```css
/* css */
.py-chinese-item {
  color: blue;
}
.py-pinyin-item {
  color: red;
}
```

在浏览器中的预览效果：

<html-style-demo></html-style-demo>

### 指定文字样式

可以通过 `customClassMap` 参数对于指定字符应用单独的样式。如下面的例子中，让 `汉` 部分为红色，`音` 部分为蓝色。

```js
import { html } from 'pinyin-pro';

const htmlString = html('汉语拼音', {
  customClassMap: {
    'red-item': ['汉'],
    'blue-item': ['音'],
  },
});

/*
<span class="py-result-item red-item">
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
<span class="py-result-item">
	<ruby>
		<span class="py-chinese-item">拼</span>
		<rp>(</rp>
		<rt class="py-pinyin-item">pīn</rt>
		<rp>)</rp>
	</ruby>
</span>
<span class="py-result-item blue-item">
	<ruby>
		<span class="py-chinese-item">音</span>
		<rp>(</rp>
		<rt class="py-pinyin-item">yīn</rt>
		<rp>)</rp>
	</ruby>
</span>
*/
```

```css
/* css */
.red-item {
  color: red;
}
.blue-item {
  color: blue;
}
```

在浏览器中的预览效果：

<html-custom-class-demo></html-custom-class-demo>

## 语法及参数

### 语法

```ts
import { customPinyin } from 'pinyin-pro';

interface HtmlOptions {
  resultClass?: string;
  pinyinClass?: string;
  chineseClass?: string;
  wrapNonChinese?: boolean;
  nonChineseClass?: string;
  tone?: boolean;
  rp?: boolean; // v3.24.2+  是否输出 <rp>(</rp> 和 <rp>)</rp> 标签
  toneType?: 'symbol' | 'num' | 'none';
  v?: boolean;
  segmentit?: TokenizationAlgorithm; // v3.20.0+
  surname?: 'off' | 'head' | 'all'; // v3.21.0+
  mode?: 'normal' | 'surname'; // 已废弃，使用 surname 替代
  toneSandhi?: boolean;
  initialPattern?: 'standard' | 'yw'; // 3.27.0+
  traditional?: boolean; // 3.28.0+
}

function html(text: string, options?: HtmlOptions): string {}
```

### 参数

- `text` (必传): string 类型，要转换的汉字字符串。
- `options` (可选): object 类型，返回值相关的配置，具体如下表：

<table>
    <tr>
        <th>属性</th>
        <th>类型</th>
        <th>描述</th>
        <th>可选值</th>
        <th width="180">默认值</th>
    </tr>
    <tr>
        <td>resultClass</td>
        <td>string</td>
        <td>汉字和拼音最外层 <code>&lt;span&gt;</code> 标签的类名</td>
        <td>-</td>
        <td>py-result-item</td>
    </tr>
    <tr>
        <td>pinyinClass</td>
        <td>string</td>
        <td>拼音外层 <code>&lt;rt&gt;</code> 标签的类名</td>
        <td>-</td>
        <td>py-pinyin-item</td>
    </tr>
    <tr>
        <td>chineseClass</td>
        <td>string</td>
        <td>汉字外层 <code>&lt;span&gt;</code> 标签的类名</td>
        <td>-</td>
        <td>py-chinese-item</td>
    </tr>
    <tr>
        <td>wrapNonChinese</td>
        <td>boolean</td>
        <td>是否用 <code>&lt;span&gt;</code> 标签包裹非汉字字符。如果是要对非汉字字符也做一些自定义样式处理，建议设置为 <code>true</code>; 如果 text 参数本身也是一个 HTML 字符串，建议设置为 <code>false</code> 以防止影响 text 本身的结构</td>
        <td><code>true/false</code></td>
        <td>false</td>
    </tr>
    <tr>
        <td>nonChineseClass</td>
        <td>string</td>
        <td>非汉字字符外层 <code>&lt;span&gt;</code> 标签的类名（仅在 <code>wrapNonChinese</code> 值为 <code>true</code> 时有效）</td>
        <td>-</td>
        <td>py-non-chinese-item</td>
    </tr>
    <tr>
        <td>toneType</td>
        <td>string</td>
        <td>拼音中音调的显示形式</td>
        <td><code>symbol/none/num</code></td>
        <td>symbol</td>
    </tr>
</table>
