# polyphonic <Badge type="tip" text="v3.15.0+" vertical="middle" />

Use the `polyphonic` API to get all Pinyins of Chinese characters.

::: tip
In most cases, you only need to use the [pinyin](/use/pinyin.md) API, which automatically recognizes the correct pinyin of polyphonic Chinese characters in text. `polyphonic` is used to get all Pinyins of each Chinese characters, rather than the correct Pinyin of polyphonic Chinese words in a sentence.
:::

## Example

### Basic Use

Use the `type` attribute to control the format of the return value：

```js
import { polyphonic } from 'pinyin-pro';

const resultString = polyphonic('好好学习'); // ['hǎo hào', 'hǎo hào', 'xué', 'xí']

const resultArray = polyphonic('好好学习', { type: 'array' }); // [['hǎo', 'hào'], ['hǎo', 'hào'], ['xué'], ['xí']]

const resultAll = polyphonic('好好学习', { type: 'all' });
/*
[
  [
    {
      final: 'ǎo',
      finalBody: 'ǎ',
      finalHead: '',
      finalTail: 'o',
      first: 'h',
      initial: 'h',
      isZh: true,
      num: 3,
      origin: '好',
      pinyin: 'hǎo',
    },
    {
      final: 'ào',
      finalBody: 'à',
      finalHead: '',
      finalTail: 'o',
      first: 'h',
      initial: 'h',
      isZh: true,
      num: 4,
      origin: '好',
      pinyin: 'hào',
    },
  ],
  [
    {
      final: 'ǎo',
      finalBody: 'ǎ',
      finalHead: '',
      finalTail: 'o',
      first: 'h',
      initial: 'h',
      isZh: true,
      num: 3,
      origin: '好',
      pinyin: 'hǎo',
    },
    {
      final: 'ào',
      finalBody: 'à',
      finalHead: '',
      finalTail: 'o',
      first: 'h',
      initial: 'h',
      isZh: true,
      num: 4,
      origin: '好',
      pinyin: 'hào',
    },
  ],
  [
    {
      final: 'üé',
      finalBody: 'é',
      finalHead: 'ü',
      finalTail: '',
      first: 'x',
      initial: 'x',
      isZh: true,
      num: 2,
      origin: '学',
      pinyin: 'xué',
    },
  ],
  [
    {
      final: 'í',
      finalBody: 'í',
      finalHead: '',
      finalTail: '',
      first: 'x',
      initial: 'x',
      isZh: true,
      num: 2,
      origin: '习',
      pinyin: 'xí',
    },
  ],
];
*/
```

### Tone

Use the `toneType` attribute to control the display of tones:

```js
import { polyphonic } from 'pinyin-pro';

const resultNone = polyphonic('好好学习', { toneType: 'none' }); // ['hao', 'hao', 'xue', 'xi']

const resultNum = polyphonic('好好学习', { toneType: 'num' }); // ['hao3 hao4', 'hao3 hao4', 'xue2', 'xi2']
```

## API

The parameters of `polyphonic` are mostly the same as `pinyin`.

### Function

```js
import { polyphonic } from 'pinyin-pro';

interface BasicOptions {
    type: 'string' | 'array' | 'all';
    toneType?: 'symbol' | 'num' | 'none';
    pattern?: 'pinyin' | 'initial' | 'final' | 'num' | 'first' | 'finalHead' | 'finalBody' | 'finalTail';
    nonZh?: 'spaced' | 'consecutive' | 'removed';
    v?: boolean;
}

interface AllData {
    origin: string;
    pinyin: string;
    initial: string;
    final: string;
    num: number;
    first: string;
    finalHead: string;
    finalBody: string;
    finalTail: string;
    isZh: boolean;
}

 // 返回转换后的信息
function polyphonic(text: string, options?: BasicOptions): string[] | string[][] | AllData[][]
```

### Parameters

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
        <td rowspan="3">type</td>
        <td rowspan="3">string</td>
        <td rowspan="3">The format of returned value</td>
        <td>string</td>
        <td><code>string[]</code></td>
        <td rowspan="3">string</td>
    </tr>
    <tr>
        <td>array</td>
        <td><code>string[][]</code></td>
    </tr>
    <tr>
        <td>all</td>
        <td><code>AllData[][]</code></td>
    </tr>
    <tr>
        <td rowspan="3">toneType</td>
        <td rowspan="3">string</td>
        <td rowspan="3">The display of tone</td>
        <td>symbol</td>
        <td>Normal</td>
        <td rowspan="3">symbol</td>
    </tr>
    <tr>
        <td>none</td>
        <td>Hide</td>
    </tr>
    <tr>
        <td>num</td>
        <td>Display in numbers after Pinyin</td>
    </tr>
    <tr>
        <td rowspan="8">pattern</td>
        <td rowspan="8">string</td>
        <td rowspan="8">The content of returned value</td>
        <td>pinyin</td>
        <td>Full Pinyin</td>
        <td rowspan="8">pinyin</td>
    </tr>
    <tr>
        <td>initial</td>
        <td>initial of Pinyin</td>
    </tr>
    <tr>
        <td>final</td>
        <td>final of Pinyin</td>
    </tr>
    <tr>
        <td>num</td>
        <td>Numbers of tone</td>
    </tr>
    <tr>
        <td>first</td>
        <td>first character</td>
    </tr>
    <tr>
        <td>finalHead</td>
        <td>head of final</td>
    </tr>
    <tr>
        <td>finalBody</td>
        <td>body of final</td>
    </tr>
    <tr>
        <td>finalTail</td>
        <td>tail of final</td>
    </tr>
    <tr>
        <td rowspan="3">nonZh</td>
        <td rowspan="3">string</td>
        <td rowspan="3">Non Chinese Character Processing</td>
        <td>spaced</td>
        <td>Use spaces to separate</td>
        <td rowspan="3">spaced</td>
    </tr>
    <tr>
        <td>consecutive</td>
        <td>consecutive</td>
    </tr>
    <tr>
        <td>removed</td>
        <td>Remove them in returned value</td>
    </tr>
    <tr>
        <td rowspan="2">v</td>
        <td rowspan="2">boolean</td>
        <td rowspan="2">Whether using <code>v</code> to replace <code>ü</code> in returned value</td>
        <td>false</td>
        <td>not replace</td>
        <td rowspan="2">false</td>
    </tr>
    <tr>
        <td>true</td>
        <td>replace</td>
    </tr>
</table>
