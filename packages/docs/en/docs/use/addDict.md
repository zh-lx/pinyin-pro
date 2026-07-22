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

function addDict(dict: DICT | {}, name?: string): void;
```

### Parameters

- `dict` (required): The dictionary.
- `name` (optional): The name of the dictionary.
