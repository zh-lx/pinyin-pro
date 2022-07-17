[![pinyin-pro Logo](https://i.ibb.co/26fJ5vF/pinyin-logo.png)](https://github.com/zh-lx/pinyin-pro)

[![NPM version](https://img.shields.io/npm/v/pinyin-pro.svg)](https://www.npmjs.com/package/pinyin-pro)
[![GITHUB star](https://img.shields.io/github/stars/zh-lx/pinyin-pro.svg)](https://github.com/zh-lx/pinyin-pro)
[![travis-build](https://travis-ci.com/zh-lx/pinyin-pro.svg?branch=main)](https://travis-ci.com/github/zh-lx/pinyin-pro)
[![NPM Downloads](https://img.shields.io/npm/dm/pinyin-pro.svg)](https://npmcharts.com/compare/pinyin-pro?minimal=true)
[![Coverage Status](https://coveralls.io/repos/github/zh-lx/pinyin-pro/badge.svg?branch=main)](https://coveralls.io/github/zh-lx/pinyin-pro?branch=main)
[![MIT-license](https://img.shields.io/npm/l/pinyin-pro.svg)](https://opensource.org/licenses/MIT)
[![GITHUB-language](https://img.shields.io/github/languages/top/zh-lx/pinyin-pro.svg)](https://github.com/zh-lx/pinyin-pro)

## 特色功能

- [获取汉字、词语、句子等多种格式的拼音](#pinyin)
- [获取声母](#initial)
- [获取韵母](#final)
- [获取拼音首字母](#first)
- [获取音调](#num)
- [获取多音字的多种拼音](#multiple)
- [支持人名姓氏模式](#surname)
- [支持自定义拼音](#custom)
- [支持字符串和数组两种输出形式](#pinyin)
- [支持拼音文本匹配功能](#match)

## 版本更新

当前版本： 3.10.2 -> 3.11.0

- 优化拼音词库，提升拼音识别准确率
- 体积优化约 10%
- 增强 match 方法，支持中文匹配，中文及拼音混合匹配

点击查看 [版本更新文档](./CHANGELOG.md)

## 安装

npm 安装

```
npm install pinyin-pro
```

yarn 安装

```
yarn add pinyin-pro
```

## 引入

浏览器 script 引入:

```html
<!--引入某个版本，如3.5.0版本-->
<!-- <script src="https://cdn.jsdelivr.net/gh/zh-lx/pinyin-pro@3.5.0/dist/pinyin-pro.js"></script> -->
<!--引入最新版本-->
<script src="https://cdn.jsdelivr.net/gh/zh-lx/pinyin-pro@latest/dist/pinyin-pro.js"></script>
<script>
  var { pinyin } = pinyinPro;
  pinyin('汉语拼音'); // 'hàn yǔ pīn yīn'
</script>
```

commonjs 浏览器引入：

```javascript
import { pinyin } from 'pinyin-pro';
pinyin('汉语拼音'); // 'hàn yǔ pīn yīn'
```

commonjs node 引入：

```javascript
const { pinyin } = require('pinyin-pro');
pinyin('汉语拼音'); // 'hàn yǔ pīn yīn'
```

esm 引入：

```javascript
import('pinyin-pro').then((exports) => {
  exports.pinyin('汉语拼音'); // 'hàn yǔ pīn yīn'
});
```

## 参数

`pinyin(word, options)` 接收两个参数<br>

- <b>word：</b>必填。String 类型，需要转化为拼音的中文
- <b>options：</b>可选。Object 类型，用于配置各种输出形式，options 的键值配置如下：

| 参数        | 说明                                                          | 类型    | 可选值                                 | 默认值 |
| ----------- | ------------------------------------------------------------- | ------- | -------------------------------------- | ------ |
| pattern     | 输出的结果的信息（拼音 / 声母 / 韵母 / 音调 / 首字母）        | string  | pinyin / initial / final / num / first | pinyin |
| toneType    | 音调输出形式(拼音符号 / 数字 / 不加音调)                      | string  | symbol / num / none                    | symbol |
| type        | 输出结果类型（字符串/数组）                                   | string  | string / array                         | string |
| multiple    | 输出多音字全部拼音（仅在 word 为长度为 1 的汉字字符串时生效） | boolean | true / false                           | false  |
| mode        | 拼音查找的模式（常规模式 / 姓氏模式）                         | string  | normal / surname                       | normal |
| removeNonZh | 是否输入字符串中将非汉字的字符过滤掉                          | boolean | true / false                           | false  |
| nonZh       | 定义非汉字字符的输出形式                                      | string  | spaced / consecutive / removed         | spaced |
| v           | 是否将拼音 ü 替换为 v                                         | boolean | true / false                           | false  |

## 使用示例

### <a id="pinyin">获取拼音</a>

```js
import { pinyin } from 'pinyin-pro';

// 获取带音调拼音
pinyin('汉语拼音'); // 'hàn yǔ pīn yīn'
// 获取不带声调的拼音
pinyin('汉语拼音', { toneType: 'none' }); // 'han yu pin yin'
// 获取声调转换为数字后缀的拼音
pinyin('汉语拼音', { toneType: 'num' }); // 'han4 yu3 pin1 yin1'
// 获取数组形式带音调拼音
pinyin('汉语拼音', { type: 'array' }); // ["hàn", "yǔ", "pīn", "yīn"]
// 获取数组形式不带声调的拼音
pinyin('汉语拼音', { toneType: 'none', type: 'array' }); // ["han", "yu", "pin", "yin"]
// 获取数组形式声调转换为数字后缀的拼音
pinyin('汉语拼音', { toneType: 'num', type: 'array' }); // ["han4", "yu3", "pin1", "yin1"]
```

### <a id="initial">获取声母</a>

```js
import { pinyin } from 'pinyin-pro';

// 获取声母
pinyin('汉语拼音', { pattern: 'initial' }); // 'h y p y'
// 获取数组形式声母
pinyin('汉语拼音', { pattern: 'initial', type: 'array' }); // ["h", "y", "p", "y"]
```

### <a id="final">获取韵母</a>

```js
import { pinyin } from 'pinyin-pro';

// 获取带音调韵母
pinyin('汉语拼音', { pattern: 'final' }); // 'àn ǔ īn īn'
// 获取不带音调韵母
pinyin('汉语拼音', { pattern: 'final', toneType: 'none' }); // 'an u in in'
// 获取音调为数字的韵母
pinyin('汉语拼音', { pattern: 'final', toneType: 'num' }); // 'an4 u3 in1 in1'
// 获取数组形式带音调韵母
pinyin('汉语拼音', { pattern: 'final', type: 'array' }); // ["àn", "ǔ", "īn", "īn"]
// 获取数组形式不带音调韵母
pinyin('汉语拼音', { pattern: 'final', toneType: 'none', type: 'array' }); // ["an", "u", "in", "in"]
// 获取数组形式音调为数字的韵母
pinyin('汉语拼音', { pattern: 'final', toneType: 'num', type: 'array' }); // ['an4', 'u3', 'in1', 'in1']
```

### <a id="num">获取音调</a>

```js
import { pinyin } from 'pinyin-pro';

// 获取音调
pinyin('汉语拼音', { pattern: 'num' }); // '4 3 1 1'
// 获取数组形式音调
pinyin('汉语拼音', { pattern: 'num', type: 'array' }); // ["4", "3", "1", "1"]
```

### <a id="first">获取拼音首字母</a>

```js
import { pinyin } from 'pinyin-pro';

// 获取拼音首字母
pinyin('赵钱孙李额', { pattern: 'first' }); // 'z q s l é'
// 获取不带音调拼音首字母
pinyin('赵钱孙李额', { pattern: 'first', toneType: 'none' }); // 'z q s l e'
// 获取数组形式拼音首字母
pinyin('赵钱孙李额', { pattern: 'first', type: 'array' }); // ['z', 'q', 's', 'l', 'é']
// 获取数组形式不带音调拼音首字母
pinyin('赵钱孙李额', { pattern: 'first', toneType: 'none'， type: 'array' }); // ['z', 'q', 's', 'l', 'e']
```

### <a id="multiple">获取单个字的多音</a>

只有单字可以获取到多音模式, 词语、句子无效。同样可以通过配置 options 选项获取数组形式、韵母等格式

```javascript
import { pinyin } from 'pinyin-pro';

// 获取多音
pinyin('好', { multiple: true }); // 'hǎo hào'
// 获取数组形式多音
pinyin('好', { multiple: true, type: 'array' }); // ["hǎo", "hào"]
```

### <a id="surname">姓氏模式</a>

通过设置 `mode: 'surname'` 开启姓氏模式后，匹配到百家姓中的姓氏优先输出姓氏拼音

```javascript
import { pinyin } from 'pinyin-pro';

// 不开启姓氏模式
pinyin('我叫曾小贤'); // 'wǒ jiào céng xiǎo xián'

// 开启姓氏模式
pinyin('我叫曾小贤', { mode: 'surname' }); // 'wǒ jiào zēng xiǎo xián'
```

### <a id="removeNonZh">过滤非汉字字符</a>

通过设置 `removeNonZh: true` ，可以过滤输入字符串中的非汉字字符

<b>此参数已不推荐使用，建议使用</b> `nonZh: removed` <b>代替</b>

```javascript
import { pinyin } from 'pinyin-pro';

// 不开启过滤
pinyin('汉sa语2拼音'); // 'hàn s a yǔ 2 pīn yīn'

// 开启过滤
pinyin('汉sa语2拼音', { removeNonZh: true }); // 'hàn yǔ pīn yīn'
```

### <a id="nonZh">定义非汉字字符输出形式</a>

通过设置 `nonZh` ，可以设置非汉字字符的不同输出形式

```javascript
import { pinyin } from 'pinyin-pro';

pinyin('我very喜欢你'); // 'wǒ v e r y xǐ huān nǐ' 默认以空格间隔输出

pinyin('我very喜欢你', { nonZh: 'spaced' }); // 'wǒ v e r y xǐ huān nǐ' 以空格间隔输出

pinyin('我very喜欢你', { nonZh: 'consecutive' }); // 'wǒ very xǐ huān nǐ' 紧凑输出

pinyin('我very喜欢你', { nonZh: 'removed' }); // 'wǒ xǐ huān nǐ' 移除非汉字字符
```

### <a id="custom">自定义拼音</a>

包内部导出了 `customPinyin` 方法，支持用户自定义设置词句拼音，当中文中匹配用户自己定义的词句拼音时，优先使用用户自定义的词句拼音

```javascript
import { pinyin, customPinyin } from 'pinyin-pro';

customPinyin({
  干一行行一行: 'gàn yī háng xíng yī háng',
});
pinyin('干一行行一行'); // 'gàn yī háng xíng yī háng'
```

### <a id="match">拼音匹配</a>

包内含 `match` 方法，可以检测拼音和文本内容是否匹配，拼音支持缩写，且默认开启多音字所有读音匹配模式：

```javascript
import { match } from 'pinyin-pro';

const matches1 = match('汉语拼音', 'hanyupinyin'); // [0, 1, 2, 3] 拼音和文本匹配，返回匹配上的文本下标
const matches2 = match('汉语拼音', 'hanpin'); // [0, 2] 拼音和文本匹配，返回匹配上的文本下标
const matches3 = match('汉语拼音', 'hyupy'); // [0, 1, 2, 3] 支持各种格式的拼音缩写匹配
const matches4 = match('汉语拼音', 'hyu音'); // [0, 1, 3] 支持中文和拼音混合匹配
const matches5 = match('汉语拼音', 'lsaf'); // null，未匹配成功返回 null
const matches6 = match('汉语拼音', 'hanyupinle'); // null，最后的 le 和音不匹配，匹配不成功，返回 null
const matches7 = match('会计', 'kuaiji'); // [0, 1]，匹配成功，返回匹配上的文本下标
const matches8 = match('会计', 'huiji'); // [0, 1]，多音字只要其中一个读音匹配上即算匹配成功
```

### 将拼音 ü 替换为 v

设置可选配置项 `v: true` 之后，转换结果中的 ü 将会被替换为 v (带音调的 ü 不会被转换)：
：

```javascript
import { pinyin } from 'pinyin-pro';

const result1 = pinyin('吕布', { toneType: 'none' }); // lü bu
const result2 = pinyin('吕布', { toneType: 'none', v: true }); // lv bu
const result3 = pinyin('吕布', { v: true }); // lǚ bù
```

## 贡献与反馈

参与开源贡献请参照 [pinyin-pro 贡献](./docs/contribute.md)

使用遇到问题或者需要功能支持欢迎提 issue。

交流及参与贡献欢迎加微信：

![wechat](https://image-1300099782.cos.ap-beijing.myqcloud.com/author.jpg)
