# addDict <Badge type="tip" text="v3.20.0+" vertical="middle" />

`pinyin-pro` has built-in dictionaries for some commonly used high-frequency words. To ensure high accuracy, you may need to apply more comprehensive dictionaries using the `addDict` function. For more detail, see [@pinyin-pro/data](https://github.com/zh-lx/pinyin-pro/tree/main/packages/data).

Install via `npm install @pinyin-pro/data`.

## Examples

### Using the Built-in Dictionary (Default)

The default dictionary has fewer vocabulary entries, for example, it does not include `日本京都大学`, which may result in incorrect pronunciation recognition for `都`:

```js
import { pinyin } from 'pinyin-pro';

const result1 = pinyin('小明硕士毕业于中国科学院计算所，后在日本京都大学深造');
// Result: xiǎo míng shuò shì bì yè yú zhōng guó kē xué yuàn jì suàn suǒ ， hòu zài rì běn jīng dōu dà xué shēn zào
```

### Using the Modern Chinese Dictionary

Includes `日本京都大学`, enabling accurate recognition (approximately 0.6MB after gzip compression, decide based on your needs whether to use it):

```js
import { pinyin, addDict } from 'pinyin-pro';
// Import after installing via `npm install @pinyin-pro/data`
import ModernChineseDict from '@pinyin-pro/data/modern';

addDict(ModernChineseDict);

const result = pinyin('小明硕士毕业于中国科学院计算所，后在日本京都大学深造');
// Result: xiǎo míng shuò shì bì yè yú zhōng guó kē xué yuàn jì suàn suǒ ， hòu zài rì běn jīng dū dà xué shēn zào
```

### Using the Complete Dictionary

Includes more words for higher recognition accuracy (approximately 3.99MB after gzip compression, decide based on your needs whether to use it):

```js
import { pinyin, addDict } from 'pinyin-pro';
// Import after installing via `npm install @pinyin-pro/data`
import CompleteDict from '@pinyin-pro/data/complete';

addDict(CompleteDict);

const result = pinyin('小明硕士毕业于中国科学院计算所，后在日本京都大学深造');
// Result: xiǎo míng shuò shì bì yè yú zhōng guó kē xué yuàn jì suàn suǒ ， hòu zài rì běn jīng dū dà xué shēn zào
```

## Syntax and Parameters

### Syntax

```ts
import { addDict } from 'pinyin-pro';

type DICT = {
  [key: string]:
    | string // Pinyin
    | [string] // [Pinyin]
    | [string, number] // [Pinyin, Frequency Probability]
    | [string, number, string]; // [Pinyin, Frequency Probability, Part of Speech]
};

type DictOptions = {
  name?: string;
  dict1?: 'add' | 'replace' | 'ignore';
};

function addDict(dict: DICT | {}, options?: string | DictOptions): void;
```

### Parameters

- `dict` (required): The dictionary.
- `options` (optional): A dictionary name or an options object.
- `options.name` (optional): The dictionary name.
- `options.dict1` (optional): Controls changes to the single-character dictionary. The default is `add`.

### Single-character dictionary order

Changes apply in `addDict` call order. `replace` replaces the current readings. `add` appends a reading unless it already exists.
`ignore` leaves the single-character dictionary unchanged.

Repeated calls with the same name retain their changes in call order.
`removeDict(name)` removes all changes for that name.
It rebuilds affected characters from their original readings and the remaining changes.
Removing the final change restores the original readings.
Unnamed calls share one dictionary name. `removeDict()` removes their changes.
