# Segment <Badge type="tip" text="v3.24.0+" vertical="middle" />

The `pinyin-pro` library exports a `segment` function for word segmentation output.

::: tip
To ensure the accuracy of word segmentation, it is necessary to first add a comprehensive dictionary, such as `@pinyin-pro/data/complete` or `@pinyin-pro/data/modern`, using the `addDict` API before utilizing the `segment` API.
:::

## Example

### Basic Usage

```js
import { segment, addDict } from 'pinyin-pro';
import CompleteDict from '@pinyin-pro/data/complete';

addDict(CompleteDict);

const result = segment('小明硕士毕业于中国科学院计算所，后在日本京都大学深造');

// Conversion result:
[
  { origin: '小', result: 'xiǎo' },
  { origin: '明', result: 'míng' },
  { origin: '硕士', result: 'shuòshì' },
  { origin: '毕业', result: 'bìyè' },
  { origin: '于', result: 'yú' },
  { origin: '中国科学院', result: 'zhōngguókēxuéyuàn' },
  { origin: '计算所', result: 'jìsuànsuǒ' },
  { origin: '，', result: '，' },
  { origin: '后', result: 'hòu' },
  { origin: '在', result: 'zài' },
  { origin: '日本京都大学', result: 'rìběnjīngdūdàxué' },
  { origin: '深造', result: 'shēnzào' },
];
```

### Different Output Formats

Specify different output formats using the `format` parameter.

#### AllSegment

```js
import { segment, OutputFormat, addDict } from 'pinyin-pro';
import CompleteDict from '@pinyin-pro/data/complete';

addDict(CompleteDict);

const result = segment('小明硕士毕业于中国科学院计算所，后在日本京都大学深造', {
  format: OutputFormat.AllSegment,
});

// Conversion result:
[
  { origin: '小', result: 'xiǎo' },
  { origin: '明', result: 'míng' },
  { origin: '硕士', result: 'shuòshì' },
  { origin: '毕业', result: 'bìyè' },
  { origin: '于', result: 'yú' },
  { origin: '中国科学院', result: 'zhōngguókēxuéyuàn' },
  { origin: '计算所', result: 'jìsuànsuǒ' },
  { origin: '，', result: '，' },
  { origin: '后', result: 'hòu' },
  { origin: '在', result: 'zài' },
  { origin: '日本京都大学', result: 'rìběnjīngdūdàxué' },
  { origin: '深造', result: 'shēnzào' },
];
```

#### AllArray

```js
import { segment, OutputFormat, addDict } from 'pinyin-pro';
import CompleteDict from '@pinyin-pro/data/complete';

addDict(CompleteDict);

const result = segment('小明硕士毕业于中国科学院计算所，后在日本京都大学深造', {
  format: OutputFormat.AllArray,
});

// Conversion result:
[
  [{ origin: '小', result: 'xiǎo' }],
  [{ origin: '明', result: 'míng' }],
  [
    { origin: '硕', result: 'shuò' },
    { origin: '士', result: 'shì' },
  ],
  [
    { origin: '毕', result: 'bì' },
    { origin: '业', result: 'yè' },
  ],
  [{ origin: '于', result: 'yú' }],
  [
    { origin: '中', result: 'zhōng' },
    { origin: '国', result: 'guó' },
    { origin: '科', result: 'kē' },
    { origin: '学', result: 'xué' },
    { origin: '院', result: 'yuàn' },
  ],
  [
    { origin: '计', result: 'jì' },
    { origin: '算', result: 'suàn' },
    { origin: '所', result: 'suǒ' },
  ],
  [{ origin: '，', result: '，' }],
  [{ origin: '后', result: 'hòu' }],
  [{ origin: '在', result: 'zài' }],
  [
    { origin: '日', result: 'rì' },
    { origin: '本', result: 'běn' },
    { origin: '京', result: 'jīng' },
    { origin: '都', result: 'dū' },
    { origin: '大', result: 'dà' },
    { origin: '学', result: 'xué' },
  ],
  [
    { origin: '深', result: 'shēn' },
    { origin: '造', result: 'zào' },
  ],
];
```

#### AllString

```js
import { segment, OutputFormat, addDict } from 'pinyin-pro';
import CompleteDict from '@pinyin-pro/data/complete';

addDict(CompleteDict);

const result = segment('小明硕士毕业于中国科学院计算所，后在日本京都大学深造', {
  format: OutputFormat.AllString,
});

// Conversion result:
{
  origin: "小 明 硕士 毕业 于 中国科学院 计算所 ， 后 在 日本京都大学 深造",
  result: "xiǎo míng shuòshì bìyè yú zhōngguókēxuéyuàn jìsuànsuǒ ， hòu zài rìběnjīngdūdàxué shēnzào",
}
```

#### PinyinSegment

```js
import { segment, OutputFormat, addDict } from 'pinyin-pro';
import CompleteDict from '@pinyin-pro/data/complete';

addDict(CompleteDict);

const result = segment('小明硕士毕业于中国科学院计算所，后在日本京都大学深造', {
  format: OutputFormat.PinyinSegment,
});

// Conversion result:
[
  'xiǎo',
  'míng',
  'shuòshì',
  'bìyè',
  'yú',
  'zhōngguókēxuéyuàn',
  'jìsuànsuǒ',
  '，',
  'hòu',
  'zài',
  'rìběnjīngdūdàxué',
  'shēnzào',
];
```

#### PinyinArray

```js
import { segment, OutputFormat, addDict } from 'pinyin-pro';
import CompleteDict from '@pinyin-pro/data/complete';

addDict(CompleteDict);

const result = segment('小明硕士毕业于中国科学院计算所，后在日本京都大学深造', {
  format: OutputFormat.PinyinArray,
});

// Conversion result:
[
  ['xiǎo'],
  ['míng'],
  ['shuò', 'shì'],
  ['bì', 'yè'],
  ['yú'],
  ['zhōng', 'guó', 'kē', 'xué', 'yuàn'],
  ['jì', 'suàn', 'suǒ'],
  ['，'],
  ['hòu'],
  ['zài'],
  ['rì', 'běn', 'jīng', 'dū', 'dà', 'xué'],
  ['shēn', 'zào'],
];
```

#### PinyinString

```js
import { segment, OutputFormat, addDict } from 'pinyin-pro';
import CompleteDict from '@pinyin-pro/data/complete';

addDict(CompleteDict);

const result = segment('小明硕士毕业于中国科学院计算所，后在日本京都大学深造', {
  format: OutputFormat.PinyinString,
});

// Conversion result:
('xiǎo míng shuòshì bìyè yú zhōngguókēxuéyuàn jìsuànsuǒ ， hòu zài rìběnjīngdūdàxué shēnzào');
```

#### ZhSegment

```js
import { segment, OutputFormat, addDict } from 'pinyin-pro';
import CompleteDict from '@pinyin-pro/data/complete';

addDict(CompleteDict);

const result = segment('小明硕士毕业于中国科学院计算所，后在日本京都大学深造', {
  format: OutputFormat.ZhSegment,
});

// Conversion result:
[
  '小',
  '明',
  '硕士',
  '毕业',
  '于',
  '中国科学院',
  '计算所',
  '，',
  '后',
  '在',
  '日本京都大学',
  '深造',
];
```

#### ZhArray

```js
import { segment, OutputFormat, addDict } from 'pinyin-pro';
import CompleteDict from '@pinyin-pro/data/complete';

addDict(CompleteDict);

const result = segment('小明硕士毕业于中国科学院计算所，后在日本京都大学深造', {
  format: OutputFormat.ZhArray,
});

// Conversion result:
[
  ['小'],
  ['明'],
  ['硕', '士'],
  ['毕', '业'],
  ['于'],
  ['中', '国', '科', '学', '院'],
  ['计', '算', '所'],
  ['，'],
  ['后'],
  ['在'],
  ['日', '本', '京', '都', '大', '学'],
  ['深', '造'],
];
```

#### ZhString

```js
import { segment, OutputFormat, addDict } from 'pinyin-pro';
import CompleteDict from '@pinyin-pro/data/complete';

addDict(CompleteDict);

const result = segment('小明硕士毕业于中国科学院计算所，后在日本京都大学深造', {
  format: OutputFormat.ZhString,
});

// Conversion result:
('小 明 硕士 毕业 于 中国科学院 计算所 ， 后 在 日本京都大学 深造');
```

### Custom Separator

Customize the separator using the `separator` parameter. This only applies to the `AllString`, `PinyinString`, and `ZhString` output formats.

```js
import { segment, OutputFormat, addDict } from 'pinyin-pro';
import CompleteDict from '@pinyin-pro/data/complete';

addDict(CompleteDict);

const result = segment('小明硕士毕业于中国科学院计算所，后在日本京都大学深造', {
  format: OutputFormat.AllString,
  separator: '/',
});

// Conversion result:
{
  origin: "小/明/硕士/毕业/于/中国科学院/计算所/，/后/在/日本京都大学/深造",
  result:
    "xiǎo/míng/shuòshì/bìyè/yú/zhōngguókēxuéyuàn/jìsuànsuǒ/，/hòu/zài/rìběnjīngdūdàxué/shēnzào",
}
```

## Syntax and Parameters

Except for the `format` and `separator` parameters, the functions of the other parameters are the same as those in the `pinyin` API.

```ts
import { segment, OutputFormat } from 'pinyin-pro';

interface SegmentOptions {
  toneType?: 'symbol' | 'num' | 'none';
  removeNonZh?: boolean;
  nonZh?: 'spaced' | 'consecutive' | 'removed';
  v?: boolean;
  segmentit?: TokenizationAlgorithm;
  surname?: 'off' | 'head' | 'all';
  mode?: 'normal' | 'surname';
  toneSandhi?: boolean;
  nonZhScope?: RegExp;
  separator?: string;
  format?: OutputFormat;
  initialPattern?: 'standard' | 'yw'; // 3.27.0+
  traditional?: boolean; // 3.28.0+
}

function segment(text: string, options?: SegmentOptions);
```
