# convert <Badge type="tip" text="v3.17.0+" vertical="middle" />

Using `convert` to convert the format of pinyin.

## Example

### Different formats

Support `numToSymbol`、`symbolToNum`、`toneNone` and so on:

```js
import { convert } from 'pinyin-pro';

// numToSymbol
convert('pin1 yin1'); // 'pīn yīn'

// symbolToNum
convert('pīn yīn', { format: 'symbolToNum' }); // 'pin1 yin1'

// toneNone
convert('pīn yīn', { format: 'toneNone' }); // 'pin yin'
convert('pin1 yin1', { format: 'toneNone' }); // 'pin yin'
```

### Array

Supports input in array format, and returns array format after conversion：

```js
import { convert } from 'pinyin-pro';

convert(['pin1', 'yin1']); // ['pīn', 'yīn']
```

### Specify separator

When the input is in `string` format, the separator can be specified through the `separator` parameter：

```js
import { convert } from 'pinyin-pro';

convert('pin1-yin1', { separator: '-' }); // 'pīn-yīn'
```

## API

### Function

```js
import { convert } from 'pinyin-pro';

interface ConvertOptions {
  /**
   * @description specify the separator
   */
  separator?: string;
  /**
   * @description format of conversation, default value is numToSymbol
   * @example numToSymbol: pin yin -> pīn yīn
   * @example symbolToNum: pīn yīn -> pin yin
   * @example toneNone: pīn yīn -> pin yin
   */
  format?: ConvertFormat;
}

function convert(pinyin: string | string[], options?: ConvertOptions): string | string[];
```

### Parameters

- `pinyin` (required)：<b>string | string[]</b>, the pinyin string or array of pinyin strings to convert
- `options` (optional): <b>object</b>, the configuration of conversion rules：

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
        <td>separator</td>
        <td>string</td>
        <td>the separator specified</td>
        <td>-</td>
        <td>convert function will split pinyin with this separator for conversion</td>
        <td><code>' '</code></td>
    </tr>
    <tr>
        <td rowspan="3">format</td>
        <td rowspan="3">string</td>
        <td rowspan="3">format of conversion</td>
        <td>numToSymbol</td>
        <td>convert number to symbol</td>
        <td rowspan="3">numToSymbol</td>
    </tr>
    <tr>
        <td>SymbolToNum</td>
        <td>convert symbol to number</td>
    </tr>
    <tr>
        <td>toneNone</td>
        <td>remove symbol in pinyin</td>
    </tr>
</table>
