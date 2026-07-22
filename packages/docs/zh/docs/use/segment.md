# segment <Badge type="tip" text="v3.24.0+" vertical="middle" />

`pinyin-pro` 内部导出了 `segment` 函数，用于分词输出。

::: tip
为了保障分词的准确率，在使用 `segment` API 之前，需要先通过 `addDict` API 添加比较完备的词典如 `@pinyin-pro/data/complete` 或 `@pinyin-pro/data/modern`。
:::

## 示例

### 基础使用

```js
import { segment, addDict } from 'pinyin-pro';
import CompleteDict from '@pinyin-pro/data/complete';

addDict(CompleteDict);

const result = segment('小明硕士毕业于中国科学院计算所，后在日本京都大学深造');

// 转换结果：
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

### 不同输出格式

通过 `format` 参数指定不同的输出格式。

#### AllSegment

```js
import { segment, OutputFormat, addDict } from 'pinyin-pro';
import CompleteDict from '@pinyin-pro/data/complete';

addDict(CompleteDict);

const result = segment('小明硕士毕业于中国科学院计算所，后在日本京都大学深造', {
  format: OutputFormat.AllSegment,
});

// 转换结果：
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

// 转换结果：
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

// 转换结果：
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

// 转换结果：
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

// 转换结果：
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

// 转换结果：
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

// 转换结果：
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

// 转换结果：
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

// 转换结果：
('小 明 硕士 毕业 于 中国科学院 计算所 ， 后 在 日本京都大学 深造');
```

### 自定义分隔符

通过 `separator` 参数自定义分隔符。仅对于 `AllString`、`PinyinString`、`ZhString` 三种输出格式生效。

```js
import { segment, OutputFormat, addDict } from 'pinyin-pro';
import CompleteDict from '@pinyin-pro/data/complete';

addDict(CompleteDict);

const result = segment('小明硕士毕业于中国科学院计算所，后在日本京都大学深造', {
  format: OutputFormat.AllString,
  separator: '/',
});

// 转换结果：
{
  origin: "小/明/硕士/毕业/于/中国科学院/计算所/，/后/在/日本京都大学/深造",
  result:
    "xiǎo/míng/shuòshì/bìyè/yú/zhōngguókēxuéyuàn/jìsuànsuǒ/，/hòu/zài/rìběnjīngdūdàxué/shēnzào",
}
```

## 语法及参数

除 `format` 和 `separator` 参数外，其他参数的作用和 `pinyin` API 相同。

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
