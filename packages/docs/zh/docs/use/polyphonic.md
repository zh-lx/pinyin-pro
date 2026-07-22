# polyphonic <Badge type="tip" text="v3.15.0+" vertical="middle" />

使用 `polyphonic` api 来获取多音字的全部读音。

::: tip
大多数情况下你只需要使用 [pinyin](/use/pinyin.md) api，它会自动识别文本中多音字的正确读音。`polyphonic` 是用来获取每个字的所有读音的而不是多音字在句子中的正确读音。
:::

## 示例

### 常规使用

使用 `type` 属性控制返回值的格式：

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

### 不带音调

使用 `toneType` 属性控制音调的展示形式：

```js
import { polyphonic } from 'pinyin-pro';

const resultNone = polyphonic('好好学习', { toneType: 'none' }); // ['hao', 'hao', 'xue', 'xi']

const resultNum = polyphonic('好好学习', { toneType: 'num' }); // ['hao3 hao4', 'hao3 hao4', 'xue2', 'xi2']
```

## 语法及参数

`polyphonic` 的参数大部分和 `pinyin` 是相同的。

### 语法

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

### 参数

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
        <td rowspan="3">type</td>
        <td rowspan="3">string</td>
        <td rowspan="3">返回的格式</td>
        <td>string</td>
        <td>string 数组</td>
        <td rowspan="3">string</td>
    </tr>
    <tr>
        <td>array</td>
        <td>string 二维数组</td>
    </tr>
    <tr>
        <td>all</td>
        <td>AllData 类型二维数组</td>
    </tr>
    <tr>
        <td rowspan="3">toneType</td>
        <td rowspan="3">string</td>
        <td rowspan="3">音调展示的形式</td>
        <td>symbol</td>
        <td>正常拼音音调</td>
        <td rowspan="3">symbol</td>
    </tr>
    <tr>
        <td>none</td>
        <td>不展示</td>
    </tr>
    <tr>
        <td>num</td>
        <td>跟在拼音后以数字展示</td>
    </tr>
    <tr>
        <td rowspan="8">pattern</td>
        <td rowspan="8">string</td>
        <td rowspan="8">展示的内容</td>
        <td>pinyin</td>
        <td>拼音全拼</td>
        <td rowspan="8">pinyin</td>
    </tr>
    <tr>
        <td>initial</td>
        <td>声母</td>
    </tr>
    <tr>
        <td>final</td>
        <td>韵母</td>
    </tr>
    <tr>
        <td>num</td>
        <td>音调对应数字</td>
    </tr>
    <tr>
        <td>first</td>
        <td>首字母</td>
    </tr>
    <tr>
        <td>finalHead</td>
        <td>韵头</td>
    </tr>
    <tr>
        <td>finalBody</td>
        <td>韵腹</td>
    </tr>
    <tr>
        <td>finalTail</td>
        <td>韵尾</td>
    </tr>
    <tr>
        <td rowspan="3">nonZh</td>
        <td rowspan="3">string</td>
        <td rowspan="3">非中文字符处理</td>
        <td>spaced</td>
        <td>空格间隔开</td>
        <td rowspan="3">spaced</td>
    </tr>
    <tr>
        <td>consecutive</td>
        <td>连续</td>
    </tr>
    <tr>
        <td>removed</td>
        <td>从返回值中移除</td>
    </tr>
    <tr>
        <td rowspan="2">v</td>
        <td rowspan="2">boolean</td>
        <td rowspan="2">是否使用<code>v</code>替换返回值中的<code>ü</code></td>
        <td>false</td>
        <td>不替换</td>
        <td rowspan="2">false</td>
    </tr>
    <tr>
        <td>true</td>
        <td>替换</td>
    </tr>
</table>
