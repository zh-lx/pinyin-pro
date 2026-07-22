# convert <Badge type="tip" text="v3.17.0+" vertical="middle" />

`pinyin-pro` 内部导出了 `convert` 函数，可以将拼音的格式进行转换，并返回转换后的拼音。

## 示例

### 不同格式转换

支持 `numToSymbol`、`symbolToNum`、`toneNone` 等转换形式:

```js
import { convert } from 'pinyin-pro';

// 数组转符号(numToSymbol)
convert('pin1 yin1'); // 'pīn yīn'

// 符号转数字(symbolToNum)
convert('pīn yīn', { format: 'symbolToNum' }); // 'pin1 yin1'

// 消除符号(toneNone)
convert('pīn yīn', { format: 'toneNone' }); // 'pin yin'
convert('pin1 yin1', { format: 'toneNone' }); // 'pin yin'
```

### 数组格式

支持输入为数组格式，转换后也返回数组格式：

```js
import { convert } from 'pinyin-pro';

convert(['pin1', 'yin1']); // ['pīn', 'yīn']
```

### 自定义分隔符

输入为字符串格式时，可以通过 `separator` 参数指定分隔符：

```js
import { convert } from 'pinyin-pro';

convert('pin1-yin1', { separator: '-' }); // 'pīn-yīn'
```

## 语法及参数

### 语法

```js
import { convert } from 'pinyin-pro';

interface ConvertOptions {
  /**
   * @description 拼音之间的分隔符，默认为空格，convert方法会以该分隔符分割拼音进行转换
   */
  separator?: string;
  /**
   * @description 转换的格式， 默认为 numToSymbol
   * @example numToSymbol: pin yin -> pīn yīn
   * @example symbolToNum: pīn yīn -> pin yin
   * @example toneNone: pīn yīn -> pin yin
   */
  format?: ConvertFormat;
}

function convert(pinyin: string | string[], options?: ConvertOptions): string | string[];
```

### 参数

- `pinyin` (必传)：string 或 string[] 类型，要转换的拼音字符串或者拼音字符串数组
- `options` (可选): object 类型，转换规则的配置，详细见下表：

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
        <td>separator</td>
        <td>string</td>
        <td>指定的分隔符</td>
        <td>-</td>
        <td>convert 方法会以该分隔符分割拼音进行转换</td>
        <td><code>' '</code></td>
    </tr>
    <tr>
        <td rowspan="3">format</td>
        <td rowspan="3">string</td>
        <td rowspan="3">转换的格式</td>
        <td>numToSymbol</td>
        <td>将拼音数字转换为带符号的拼音</td>
        <td rowspan="3">numToSymbol</td>
    </tr>
    <tr>
        <td>SymbolToNum</td>
        <td>将带符号的拼音转换为拼音数字</td>
    </tr>
    <tr>
        <td>toneNone</td>
        <td>将带符号的拼音转换为无符号拼音</td>
    </tr>
</table>
