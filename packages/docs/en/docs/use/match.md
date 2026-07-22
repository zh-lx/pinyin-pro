# match <Badge type="tip" text="v3.15.0+" vertical="middle" />

Using `match` api to match Chinese text string with pinyin string.

## Example

### Basic Use

If Pinyin matches text, return the indexes of the matching text.

```js
import { match } from 'pinyin-pro';

match('汉语拼音', 'hanyupinyin'); // [0, 1, 2, 3]
```

### Continuous

Using the `continuous` attribute to specify whether the matching Chinese indexes are continuous is considered a successful match (the default value is false, which means continuous matching is not required):

```js
import { match } from 'pinyin-pro';

match('汉语拼音', 'hanpin'); // [0, 2]

match('汉语拼音', 'hanpin', { continuous: true }); // null
```

### Precision

The `precision` attribute can be used to control the accuracy of Chinese character and Pinyin matching：

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

### Space

Use the `space` attribute to control whether the spaces don't participate in matching:

```js
import { match } from 'pinyin-pro';

// 默认不参与匹配
match('汉语拼音', 'han yupinyin'); // [0, 1, 2, 3]

match('汉语拼音', 'han yupinyin', { space: 'preserve' }); // null
```

### lastPrecision

The `lastPrecision` attribute can be used to control the accuracy of matching the last Chinese character with Pinyin. By default, when the precision is `any` the lastPrecision is `any`; Otherwise, `lastPrecision` is `start`'.

```js
import { match } from 'pinyin-pro';

// default
match('汉语拼音', 'hanyupiny'); // [1, 2, 3, 4]

// specify lastPrecision
match('汉语拼音', 'hanyupiny', { lastPrecision: 'every' }); // null
```

### Polyphonic Matching

For polyphonic characters, as long as one of the Pinyins matches, the matching is considered successful:

```js
import { match } from 'pinyin-pro';

match('会计', 'kuaiji'); // [0, 1]
match('会计', 'huiji'); // [0, 1]
```

### v match ü <Badge type="tip" text="v3.25.0+" vertical="middle" />

The `v` attribute can be used to allow using `v` to match `ü`:

```js
import { match } from 'pinyin-pro';

match('吕布', 'lvbu'); // [0, 1]
```

## API

### Function

```js
import { match } from 'pinyin-pro';

interface MatchOptions {
  precision?: 'first' | 'start' | 'every' | 'any';
  continuous?: boolean;
  space?: 'ignore' | 'preserve';
  lastPrecision?: 'first' | 'start' | 'every' | 'any';
  v?: boolean; // v3.25.0+
}

function match(text: string, pinyin: string， options?: MatchOptions): number[] | null; // 匹配成功返回匹配汉字对应下标数组; 不成功返回 null
```

### Parameters

- `text` (required)：<b>string</b>, Chinese text to match
- `pinyin` (required)：<b>string</b>, Pinyin to match
- `options` (optional): <b>object</b>, the configuration of matching rules, more specific information is shown in the table below：

<table>
    <tr>
        <th>Attribute</th>
        <th>Type</th>
        <th>Description</th>
        <th>Optional Values</th>
        <th>Detail</th>
        <th width="100">Default Value</th>
    </tr>
    <tr>
        <td rowspan="4">precision</td>
        <td rowspan="4">string</td>
        <td rowspan="4">matching accuracy</td>
        <td>first</td>
        <td>matching is considered successful when the initial letter or full pinyin is equal to the current pinyin</td>
        <td rowspan="4">first</td>
    </tr>
    <tr>
        <td>start</td>
        <td>starting with the current pinyin is considered a successful match</td>
    </tr>
    <tr>
        <td>every</td>
        <td>full Pinyin and current Pinyin are strictly equal in order to be considered a successful match</td>
    </tr>
    <tr>
        <td>any</td>
        <td>containing all characters of the current pinyin are considered as successful matches</td>
    </tr>
    <tr>
        <td rowspan="2">continuous</td>
        <td rowspan="2">boolean</td>
        <td rowspan="2">Whether the matching Chinese indexes need to be continuous in order to be considered successful</td>
        <td>true</td>
        <td>not required</td>
        <td rowspan="2">false</td>
    </tr>
    <tr>
        <td>false</td>
        <td>required</td>
    </tr>
    <tr>
        <td rowspan="2">space</td>
        <td rowspan="2">string</td>
        <td rowspan="2">handling of spaces in Chinese characters and pinyin during matching</td>
        <td>ignore</td>
        <td>ignore</td>
        <td rowspan="2">ignore</td>
    </tr>
    <tr>
        <td>preserve</td>
        <td>preserve</td>
    </tr>
    <tr>
        <td rowspan="4">lastPrecision</td>
        <td rowspan="4">string</td>
        <td rowspan="4">the accuracy of the last character matching</td>
        <td>first</td>
        <td>Matching is considered successful when the initial letter or full pinyin is equal to the current pinyin</td>
        <td rowspan="4">By default, when the <code>precision</code> is <code>any</code>, <code>lastPrecision</code> is <code>any</code>; Otherwise <code>lastPrecision</code> is <code>start</code></td>
    </tr>
    <tr>
        <td>start</td>
        <td>starting with the current pinyin is considered a successful match</td>
    </tr>
    <tr>
        <td>every</td>
        <td>full Pinyin and current Pinyin are strictly equal in order to be considered a successful match</td>
    </tr>
    <tr>
        <td>any</td>
        <td>containing all characters of the current pinyin are considered as successful matches</td>
    </tr>
    <tr>
        <td rowspan="2">v</td>
        <td rowspan="2">boolean</td>
        <td rowspan="2">Whether to allow using <code>v</code> to match <code>ü</code></td>
        <td>true</td>
        <td>allow using <code>v</code> to match <code>ü</code></td>
        <td rowspan="2">false</td>
    </tr>
    <tr>
        <td>false</td>
        <td>not allow using <code>v</code> to match <code>ü</code></td>
    </tr>
</table>
