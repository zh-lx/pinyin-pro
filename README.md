# 获取汉字、词语、句子的拼音(可选带音调)、韵母、声母等功能。是一个体积最小但功能最丰富的汉字转换拼音 npm 包。

可以获取汉字、词语、句子等中文的带声调拼音、不带声调拼音、韵母、声母等。是专业的、功能最丰富的中文汉字转换拼音库。

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

浏览器端：

```javascript
import { pinyin } from 'pinyin-pro';
```

node 端：

```javascript
const { pinyin } = require('pinyin-pro');
```

## 参数

`pinyin(word, options)` 接收两个参数<br>

- <b>word：</b>String 类型，需要转化为拼音的词语
- <b>options：</b>Object 类型，用于配置各种输出形式，相关配置在后面

### 基本用法

```javascript
import { pinyin } from 'pinyin-pro'; // 若为node环境请用require形式引入

// 获取带音调拼音
pinyin('汉语拼音'); // 'hàn yǔ pīn yīn'

// 获取不带声调的拼音
pinyin('汉语拼音', { tone: false }); // 'han yu pin yin'

// 获取声调转换为数字后缀的拼音
pinyin('汉语拼音', { pattern: 'pinyinNum' }); // 'han4 yu3 pin1 yin1'

// 获取声母
pinyin('汉语拼音', { pattern: 'initial' }); // 'h y p y'

// 获取带音调韵母
pinyin('汉语拼音', { pattern: 'final' }); // 'àn ǔ īn īn'

// 获取不带音调韵母
pinyin('汉语拼音', { pattern: 'final', tone: false }); // 'an u in in'

// 获取音调
pinyin('汉语拼音', { pattern: 'num' }); // '4 3 1 1'
```

### 结果输出为数组格式

上方基本用法中的示例都可以以数组形式输出。可以通过配置 options 选项获取其他的词语音调

```javascript
// 获取数组形式的带音调拼音
pinyin('汉语拼音', { type: 'array' }); // [ 'hàn', 'yǔ', 'pīn', 'yīn' ]

// 获取数组形式的不带音调韵母
pinyin('汉语拼音', { pattern: 'final', tone: false }); // ['an', 'u', 'in', 'in']
```

### 获取单个字的多音

只有单字可以获取到多音模式, 词语、句子无效。同样可以通过配置 options 选项获取数组形式、韵母等格式

```javascript
pinyin('好', { multitone: true }); // 'hǎo hào'
```

## options 配置

| 参数     | 说明                                                                       | 类型    | 可选值                                     | 默认值 |
| -------- | -------------------------------------------------------------------------- | ------- | ------------------------------------------ | ------ |
| pattern  | 输出的结果的信息（带音调全拼 / 音调为数字后缀的全拼 / 声母 / 韵母 / 音调） | string  | pinyin / pinyinNum / initial / final / num | pinyin |
| tone     | 是否开启音调（为 true 时会覆盖 pattern 中的音调）                          | boolean | true / false                               | true   |
| type     | 输出结果类型（字符串/数组）                                                | string  | string / array                             | string |
| multiple | 输出多音字全部拼音（仅在 word 为单字时生效）                               | boolean | true / false                               | false  |

## 交流与反馈

有问题或者功能需求支持欢迎提 issue
