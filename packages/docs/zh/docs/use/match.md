# match <Badge type="tip" text="v3.15.0+" vertical="middle" />

`pinyin-pro` 内部导出了 `match` 函数，可以进行文字和拼音匹配，并返回匹配的文字在字符串中的下标。

## 示例

### 常规匹配

若拼音和文本匹配，返回匹配的文本下标:

```js
import { match } from 'pinyin-pro';

match('汉语拼音', 'hanyupinyin'); // [0, 1, 2, 3]
```

### 是否连续

使用 `continuous` 属性指定匹配的汉字下标是否为连续的才算匹配成功(默认值为 false，即不需要为连续的匹配)：

```js
import { match } from 'pinyin-pro';

match('汉语拼音', 'hanpin'); // [0, 2]

match('汉语拼音', 'hanpin', { continuous: true }); // null
```

### 精度

使用 `precision` 属性可以控制汉字和拼音匹配的精度：

```js
import { match } from 'pinyin-pro';

// 默认首字母匹配算匹配成功
match('中文拼音', 'zwpy'); // [0, 1, 2, 3]

// every 需要每一个字符都匹配成功
match('中文拼音', 'zwpy', { precision: 'every' }); // null
match('中文拼音', 'zhongwenpinyin', { precision: 'every' }); // [0, 1, 2, 3]

// start 只要开头任意个字母匹配就算匹配成功
match('中文拼音', 'zhwpy', { precision: 'start' }); // [0, 1, 2, 3]
match('中文拼音', 'zhwpy'); // null

// any 任意有一个字母匹配就算匹配成功
match('中文拼音', 'ongwpy', { precision: 'any' }); // [0, 1, 2, 3]
match('中文拼音', 'ongwpy'); // null
```

### 空格处理

使用 `space` 属性控制匹配时空格是否不参与匹配:

```js
import { match } from 'pinyin-pro';

// 默认不参与匹配
match('汉语拼音', 'han yupinyin'); // [0, 1, 2, 3]

match('汉语拼音', 'han yupinyin', { space: 'preserve' }); // null
```

### 最后一个字符精度

使用 `lastPrecision` 属性可以控制最后一个汉字和拼音匹配的精度。默认情况下，precision 为 `any` 时，lastPrecision 为 `any`; 否则 `lastPrecision` 为 `start`。

```js
import { match } from 'pinyin-pro';

// 默认情况下
match('汉语拼音', 'hanyupiny'); // [1, 2, 3, 4]

// 显式控制 lastPrecision
match('汉语拼音', 'hanyupiny', { lastPrecision: 'every' }); // null
```

### 多音字匹配

对于多音字，只要其中一个读音匹配上即算匹配成功:

```js
import { match } from 'pinyin-pro';

match('会计', 'kuaiji'); // [0, 1]
match('会计', 'huiji'); // [0, 1]
```

### 使用 `v` 匹配 `ü` <Badge type="tip" text="v3.25.0+" vertical="middle" />

通过指定 `v` 选项来使用 `v` 来匹配 `ü`：

```js
import { match } from 'pinyin-pro';

match('吕布', 'lvbu'); // [0, 1]
```

## 语法及参数

### 语法

```js
import { match } from 'pinyin-pro';

interface MatchOptions {
  precision?: 'first' | 'start' | 'every' | 'any';
  continuous?: boolean;
  space?: 'ignore' | 'preserve';
  lastPrecision?: 'first' | 'start' | 'every' | 'any';
  v?: boolean; // v3.25.0+
}

match(text, pinyin， options?: MatchOptions); // 匹配成功返回匹配汉字对应下标数组; 不成功返回 null
```

### 参数

- `text` (必传)：string 类型，要匹配的文本
- `pinyin` (必传)：string 类型，要匹配的拼音
- `options` (可选): object 类型，匹配规则的配置，详细见下表：

<table>
    <tr>
        <th>属性</th>
        <th>类型</th>
        <th>描述</th>
        <th>可选值</th>
        <th>说明</th>
        <th width="100">默认值</th>
    </tr>
    <tr>
        <td rowspan="4">precision</td>
        <td rowspan="4">string</td>
        <td rowspan="4">匹配的精度</td>
        <td>first</td>
        <td>首字母或者全拼和当前拼音相等即为匹配成功</td>
        <td rowspan="4">first</td>
    </tr>
    <tr>
        <td>start</td>
        <td>以当前拼音为开头即为匹配成功</td>
    </tr>
    <tr>
        <td>every</td>
        <td>全拼和当前拼音严格相等才算匹配成功</td>
    </tr>
    <tr>
        <td>any</td>
        <td>包含当前拼音的所有字符即为匹配成功</td>
    </tr>
    <tr>
        <td rowspan="2">continuous</td>
        <td rowspan="2">boolean</td>
        <td rowspan="2">匹配的汉字下标是否需要为连续的才算匹配成功</td>
        <td>true</td>
        <td>不需要</td>
        <td rowspan="2">false</td>
    </tr>
    <tr>
        <td>false</td>
        <td>需要</td>
    </tr>
    <tr>
        <td rowspan="2">space</td>
        <td rowspan="2">string</td>
        <td rowspan="2">匹配时对于汉字和拼音中空格的处理</td>
        <td>ignore</td>
        <td>忽略</td>
        <td rowspan="2">ignore</td>
    </tr>
    <tr>
        <td>preserve</td>
        <td>保留</td>
    </tr>
    <tr>
        <td rowspan="4">lastPrecision</td>
        <td rowspan="4">string</td>
        <td rowspan="4">最后一个字符匹配的精度</td>
        <td>first</td>
        <td>首字母或者全拼和当前拼音相等即为匹配成功</td>
        <td rowspan="4">当 <code>precision</code> 为 <code>any</code> 时，<code>lastPrecision</code> 默认为 <code>any</code>；其他情况下 <code>lastPrecision</code> 默认为 <code>start</code></td>
    </tr>
    <tr>
        <td>start</td>
        <td>以当前拼音为开头即为匹配成功</td>
    </tr>
    <tr>
        <td>every</td>
        <td>全拼和当前拼音严格相等才算匹配成功</td>
    </tr>
    <tr>
        <td>any</td>
        <td>包含当前拼音的所有字符即为匹配成功</td>
    </tr>
    <tr>
        <td rowspan="2">v</td>
        <td rowspan="2">boolean</td>
        <td rowspan="2">是否允许使用 <code>v</code> 匹配 <code>ü</code></td>
        <td>true</td>
        <td>允许使用 <code>v</code> 匹配 <code>ü</code></td>
        <td rowspan="2">false</td>
    </tr>
    <tr>
        <td>false</td>
        <td>不允许使用 <code>v</code> 匹配 <code>ü</code></td>
    </tr>
</table>
