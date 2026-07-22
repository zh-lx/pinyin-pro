# pinyin

Using `pinyin` api to convert Chinese into Pinyin and related content.

## Example

### Pinyin

The `options.type` parameter controls the format of the returned value, and the `options.toneType` parameter controls the display format of tones in Pinyin.

```js
import { pinyin } from 'pinyin-pro';

// Get Pinyin with Tones
pinyin('汉语拼音'); // 'hàn yǔ pīn yīn'
// Get Pinyin without Tones
pinyin('汉语拼音', { toneType: 'none' }); // 'han yu pin yin'
// Get Pinyin where the tone is converted to a numerical suffix
pinyin('汉语拼音', { toneType: 'num' }); // 'han4 yu3 pin1 yin1'
// Get Pinyin with Tones in array form
pinyin('汉语拼音', { type: 'array' }); // ["hàn", "yǔ", "pīn", "yīn"]
// Get Pinyin without Tones in array form
pinyin('汉语拼音', { toneType: 'none', type: 'array' }); // ["han", "yu", "pin", "yin"]
// Get Pinyin where the tone is converted to a numerical suffix in array form
pinyin('汉语拼音', { toneType: 'num', type: 'array' }); // ["han4", "yu3", "pin1", "yin1"]
```

### Initial consonants

When `options.pattern` is `initial`, the returned value is initials of Pinyin.

```js
import { pinyin } from 'pinyin-pro';

// Get initial consonants of Pinyin
pinyin('汉语拼音', { pattern: 'initial' }); // 'h y p y'
// Get initial consonants of Pinyin in array form
pinyin('汉语拼音', { pattern: 'initial', type: 'array' }); // ["h", "y", "p", "y"]
```

### Finals

When `options.pattern` is `final`, the returned value is finals of Pinyin.

```js
import { pinyin } from 'pinyin-pro';

// Get vowels of Pinyin with Tones
pinyin('汉语拼音', { pattern: 'final' }); // 'àn ǔ īn īn'
// Get vowels of Pinyin without Tones
pinyin('汉语拼音', { pattern: 'final', toneType: 'none' }); // 'an u in in'
// Get vowels of Pinyin where the tone is converted to a numerical suffix
pinyin('汉语拼音', { pattern: 'final', toneType: 'num' }); // 'an4 u3 in1 in1'
// Get vowels of Pinyin with Tones in array form
pinyin('汉语拼音', { pattern: 'final', type: 'array' }); // ["àn", "ǔ", "īn", "īn"]
// Get vowels of Pinyin without Tones in array form
pinyin('汉语拼音', { pattern: 'final', toneType: 'none', type: 'array' }); // ["an", "u", "in", "in"]
// Get vowels of Pinyin where the tone is converted to a numerical suffix in array form
pinyin('汉语拼音', { pattern: 'final', toneType: 'num', type: 'array' }); // ['an4', 'u3', 'in1', 'in1']
```

### Head/Essential/Tail Vowel <Badge type="tip" text="v3.12.0+" vertical="middle" />

When `options.pattern` is `finalHead/finalBody/finalTail`, the returned value is `head vowel/essential vowel/tail vowel`.

```js
import { pinyin } from 'pinyin-pro';

// Get the head vowel of pinyin in array form
pinyin('村庄', { pattern: 'finalHead', type: 'array' }); // [ '', 'u' ]

// Get the essential vowel of pinyin in array form
pinyin('村庄', { pattern: 'finalBody', type: 'array' }); // [ 'ū', 'ā' ]

// Get the tail vowel of pinyin in array form
pinyin('村庄', { pattern: 'finalTail', type: 'array' }); // [ 'n', 'ng' ]
```

### Tones

When `options.pattern` is `num`, the returned value is the tone of pinyin.

```js
import { pinyin } from 'pinyin-pro';

// Get the tone of pinyin
pinyin('汉语拼音', { pattern: 'num' }); // '4 3 1 1'
// Get the tone of pinyin in array form
pinyin('汉语拼音', { pattern: 'num', type: 'array' }); // ["4", "3", "1", "1"]
```

### First Character <Badge type="tip" text="v3.1.0+" vertical="middle" />

When `options.pattern` is `first`, the returned value is first character of pinyin.

```js
import { pinyin } from 'pinyin-pro';

// Get the first character of pinyin
pinyin('赵钱孙李额', { pattern: 'first' }); // 'z q s l é'
// Get the first character of pinyin without tones
pinyin('赵钱孙李额', { pattern: 'first', toneType: 'none' }); // 'z q s l e'
// Get the first character of pinyin in array form
pinyin('赵钱孙李额', { pattern: 'first', type: 'array' }); // ['z', 'q', 's', 'l', 'é']
// Get the first character of pinyin without tones in array forms
pinyin('赵钱孙李额', { pattern: 'first', toneType: 'none', type: 'array' }); // ['z', 'q', 's', 'l', 'e']
```

### All Content <Badge type="tip" text="v3.12.0+" vertical="middle" />

When `options.type` is `all`, the returned value is all content of pinyin in array form.

```js
const result = pinyin('汉语拼音', { type: 'all' });

/**
[
  {
    origin: '汉',
    pinyin: 'hàn',
    initial: 'h',
    final: 'àn',
    first: 'h',
    finalHead: '',
    finalBody: 'à',
    finalTail: 'n',
    num: 4,
    isZh: true,
    polyphonic: ['hàn'],
    inZhRange: 'true',
    result: 'hàn',
  },
  {
    origin: '语',
    pinyin: 'yǔ',
    initial: 'y',
    final: 'ǔ',
    first: 'y',
    finalHead: '',
    finalBody: 'ǔ',
    finalTail: '',
    num: 3,
    isZh: true,
    polyphonic: ['yǔ', 'yù'],
    inZhRange: 'true',
    result: 'yǔ',
  },
  {
    origin: '拼',
    pinyin: 'pīn',
    initial: 'p',
    final: 'īn',
    first: 'p',
    finalHead: '',
    finalBody: 'ī',
    finalTail: 'n',
    num: 1,
    isZh: true,
    polyphonic: ['pīn'],
    inZhRange: 'true',
    result: 'pīn',
  },
  {
    origin: '音',
    pinyin: 'yīn',
    initial: 'y',
    final: 'īn',
    first: 'y',
    finalHead: '',
    finalBody: 'ī',
    finalTail: 'n',
    num: 1,
    isZh: true,
    polyphonic: ['yīn'],
    inZhRange: 'true',
    result: 'yīn',
  },
];
 */
```

### Multiple

When `options.multiple` is `true`, the returned value is all Pinyins of the polyphonic character.

This only takes effect when the length of the `text` parameter equals `1`.

```javascript
import { pinyin } from 'pinyin-pro';

// Get all pinyins
pinyin('好', { multiple: true }); // 'hǎo hào'
// Get all pinyins in array
pinyin('好', { multiple: true, type: 'array' }); // ["hǎo", "hào"]
// It doesn't take effect when the length of `text` is not 1
pinyin('好学', { multiple: true }); // hào xué
```

### Surname Mode <Badge type="tip" text="v3.21.0+" vertical="middle" />

Set `options.surname` to `head` (to recognize surname characters only at the beginning of the string) or `all` (to recognize all surname characters in the string) to enable surname mode. When enabled, characters that match surnames from the "Hundred Family Surnames" will prioritize outputting the surname pinyin.

```javascript
import { pinyin } from 'pinyin-pro';

// Surname mode not enabled
pinyin('我叫曾乐乐'); // 'wǒ jiào céng lè lè'

// Enable head surname mode
pinyin('我叫曾乐乐', { surname: 'head' }); // 'wǒ jiào zēng lè lè'

// Enable all surname mode (will recognize “乐” as the surname yuè of 乐毅)
pinyin('我叫曾乐乐', { surname: 'all' }); // 'wǒ jiào zēng yuè yuè'
```

### Customize Separator <Badge type="tip" text="v3.16.0+" vertical="middle" />

Use `options.separator` to customize separator between pinyins, only effective when `type: 'string'`：

```javascript
import { pinyin } from 'pinyin-pro';

pinyin('汉语拼音', { separator: '-' }); // 'hàn-yǔ-pīn-yīn'
```

### NonZh Character <Badge type="tip" text="v3.8.0+" vertical="middle" />

`options.nonZh` can configure the returned value's format of non Chinese characters.

```javascript
import { pinyin } from 'pinyin-pro';

// Default non Chinese characters will be output with space intervals
pinyin('我very喜欢你'); // 'wǒ v e r y xǐ huān nǐ'

// When options.nonZh is removed, non Chinese characters in the output will be removed.
pinyin('我very喜欢你', { nonZh: 'removed' }); // 'wǒ xǐ huān nǐ'

// When options.nonZh is consecutive, non Chinese characters will be output compactly.
pinyin('我very喜欢你', { nonZh: 'consecutive' }); // 'wǒ very xǐ huān nǐ'
```

### Replace `ü` by `v` <Badge type="tip" text="v3.9.0+" vertical="middle" />

When `options.v` is `true`, the `ü` in returned value will be replaced by `v`. (`ǖ,ǘ,ǚ,ǜ` with tone won't be replaced)：

```javascript
import { pinyin } from 'pinyin-pro';

// ü
pinyin('吕布', { toneType: 'none' }); // lü bu
// v
pinyin('吕布', { toneType: 'none', v: true }); // lv bu
// ǖ,ǘ,ǚ,ǜ
pinyin('吕布', { v: true }); // lǚ bù
// v with tone
pinyin('吕布', { type: 'num', v: true }); // lv3 bu4
```

### Segmentation Algorithms <Badge type="tip" text="v3.20.0+" vertical="middle" />

Set `options.segmentit` to choose different segmentation algorithms. The default is the maximum probability algorithm:

```javascript
import { pinyin } from 'pinyin-pro';

// Reverse Maximum Matching Algorithm: Fastest Speed
pinyin('小明硕士毕业于中国科学院计算所，后在日本京都大学深造', {
  segmentit: 1,
});

// Maximum Probability Algorithm: Most Accurate Recognition
pinyin('小明硕士毕业于中国科学院计算所，后在日本京都大学深造', {
  segmentit: 2,
});

// Minimum Segmentation Algorithm
pinyin('小明硕士毕业于中国科学院计算所，后在日本京都大学深造', {
  segmentit: 3,
});
```

### Exclude `y` and `w` from Initial Consonants <Badge type="tip" text="v3.27.0+" vertical="middle" />

According to [wiki](https://zh.wikipedia.org/zh-cn/%E6%B1%89%E8%AF%AD%E6%8B%BC%E9%9F%B3#%E5%A3%B0%E6%AF%8D), `y` and `w` are not considered initial consonants, but for convenience, in `pinyin-pro`, `y` and `w` are considered initial consonants by default. Setting `options.initialPattern` to `standard` will exclude `y` and `w` from the initial consonants.

```javascript
import { pinyin } from 'pinyin-pro';

pinyin('汉语拼音', {
  pattern: 'initial',
  initialPattern: 'standard',
  type: 'array'
}); // ['h', '', 'p', '']
```

## API

### Function

```js
import { pinyin } from 'pinyin-pro';

interface BasicOptions {
    type: 'string' | 'array' | 'all';
    toneType?: 'symbol' | 'num' | 'none';
    pattern?: 'pinyin' | 'initial' | 'final' | 'num' | 'first' | 'finalHead' | 'finalBody' | 'finalTail';
    multiple?: boolean;
    removeNonZh?: boolean;
    nonZh?: 'spaced' | 'consecutive' | 'removed';
    v?: boolean;
    segmentit?: TokenizationAlgorithm; // v3.20.0+
    surname?: 'off' | 'head' | 'all'; // v3.21.0+
    mode?: 'normal' | 'surname'; // deprecated, use surname to replace
    toneSandhi?: boolean;
    nonZhScope?: RegExp; // 3.24.0+
    initialPattern?: 'standard' | 'yw'; // 3.27.0+
    traditional?: boolean; // 3.28.0+
}

enum TokenizationAlgorithm {
  ReverseMaxMatch = 1,
  MaxProbability = 2,
  MinTokenization = 3,
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
    polyphonic: string[]; // v3.20.0+
    inZhRange: boolean; // v3.20.0+
    result: string; // v3.24.0+
}

 // 返回转换后的信息
function pinyin(text: string, options?: BasicOptions): string | string[] | AllData[]
```

### Parameters

- `text` (required)：<b>string</b>, string that needs to be converted to pinyin
- `options` (optional)：<b>object</b>, content and format of the output. For more detailed information, please refer to the table below

<basic-params-table></basic-params-table>
