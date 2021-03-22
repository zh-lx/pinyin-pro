# pinyin-pro 汉字拼音转换工具(支持获取汉字、词语、句子的拼音、音调、声母、韵母多种形式)

[![NPM version](https://img.shields.io/npm/v/pinyin-pro.svg)](https://www.npmjs.com/package/pinyin-pro)
[![NPM Downloads][downloads-image]][downloads-url]
[![Linux Build][travis-image]][travis-url]
[![Windows Build][appveyor-image]][appveyor-url]
[![Test Coverage][coveralls-image]][coveralls-url]

汉字拼音转换工具，支持获取汉字、词语、句子等多种内容的拼音、音调、声母、韵母等，支持繁体和简体字。通过高效的算法和丰富的字词库，保证体积轻量的同时识别准确率很高。

## 版本更新文档

当前版本： 3.0.1 -> 3.0.2

- 优化 npm 包质量

[版本更新文档](./docs/versions.md)

## 安装

npm 安装

```
npm install pinyin-pro
```

yarn 安装

```
yarn add pinyin-pro
```

## 使用

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

- <b>word：</b>必填。String 类型，需要转化为拼音的中文
- <b>options：</b>可选。Object 类型，用于配置各种输出形式，相关配置在后面有所介绍

### 基本用法

```javascript
import { pinyin } from 'pinyin-pro'; // 若为node环境请用require形式引入

// 获取带音调拼音
pinyin('汉语拼音'); // 'hàn yǔ pīn yīn'
// 获取不带声调的拼音
pinyin('汉语拼音', { toneType: 'none' }); // 'han yu pin yin'
// 获取声调转换为数字后缀的拼音
pinyin('汉语拼音', { toneType: 'num' }); // 'han4 yu3 pin1 yin1'
// 获取声母
pinyin('汉语拼音', { pattern: 'initial' }); // 'h y p y'
// 获取带音调韵母
pinyin('汉语拼音', { pattern: 'final' }); // 'àn ǔ īn īn'
// 获取不带音调韵母
pinyin('汉语拼音', { pattern: 'final', toneType: 'none' }); // 'an u in in'
// 获取音调为数字的韵母
pinyin('汉语拼音', { pattern: 'final', toneType: 'num' }); // 'an4 u3 in1 in1'
// 获取音调
pinyin('汉语拼音', { pattern: 'num' }); // '4 3 1 1'
```

### 结果输出为数组格式

通过在 options 参数中加入`type: 'array'`，可以以数组形式输出基本用法中的示例:

```javascript
// 获取带音调拼音
pinyin('汉语拼音', { type: 'array' }); // ["hàn", "yǔ", "pīn", "yīn"]
// 获取不带声调的拼音
pinyin('汉语拼音', { toneType: 'none', type: 'array' }); // ["han", "yu", "pin", "yin"]
// 获取声调转换为数字后缀的拼音
pinyin('汉语拼音', { toneType: 'num', type: 'array' }); // ["han4", "yu3", "pin1", "yin1"]
// 获取声母
pinyin('汉语拼音', { pattern: 'initial', type: 'array' }); // ["h", "y", "p", "y"]
// 获取带音调韵母
pinyin('汉语拼音', { pattern: 'final', type: 'array' }); // ["àn", "ǔ", "īn", "īn"]
// 获取不带音调韵母
pinyin('汉语拼音', { pattern: 'final', toneType: 'none', type: 'array' }); // ["an", "u", "in", "in"]
// 获取音调
pinyin('汉语拼音', { pattern: 'num', type: 'array' }); // ["4", "3", "1", "1"]
```

### 获取单个字的多音

只有单字可以获取到多音模式, 词语、句子无效。同样可以通过配置 options 选项获取数组形式、韵母等格式

```javascript
pinyin('好', { multiple: true }); // 'hǎo hào'
pinyin('好', { multiple: true, type: 'array' }); // ["hǎo", "hào"]
```

## options 配置

| 参数     | 说明                                                          | 类型    | 可选值                         | 默认值 |
| -------- | ------------------------------------------------------------- | ------- | ------------------------------ | ------ |
| pattern  | 输出的结果的信息（拼音 / 声母 / 韵母 / 音调）                 | string  | pinyin / initial / final / num | pinyin |
| tone     | 音调输出形式(拼音符号 / 数字 / 不加音调)                      | string  | symbol / num / none            | symbol |
| type     | 输出结果类型（字符串/数组）                                   | string  | string / array                 | string |
| multiple | 输出多音字全部拼音（仅在 word 为长度为 1 的汉字字符串时生效） | boolean | true / false                   | false  |

## 交流与反馈

有问题或者功能需求支持欢迎提 issue
