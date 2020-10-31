# pinyin-pro

专业的、功能最丰富的中文汉字与拼音的转化库

## 安装

```
npm install pinyin-pro
```

## 引入

```javascript
const { pinyin } = require('pinyin-pro')
```

## 环境

同时支持浏览器和 node 环境

## 基本用法

`pinyin(word, options)` 接收两个参数<br>

- <b>word：</b>string 类型，需要转化为拼音的词语
- <b>options：</b>object 类型，用于配置各种输出形式

### 获取各种格式的拼音

```javascript
const { pinyin } = require('pinyin-pro')

// 获取带音调拼音
pinyin('汉语拼音') // 'hàn yǔ pīn yīn'

// 将声调转换为数字后缀
pinyin('汉语拼音', { pattern: 'pinyinNum' }) // 'han4 yu3 pin1 yin1'

// 获取声母
pinyin('汉语拼音', { pattern: 'initial' }) // 'h y p y'

// 获取韵母
pinyin('汉语拼音', { pattern: 'final' }) // 'àn ǔ īn īn'

// 获取音调
pinyin('汉语拼音', { pattern: 'num' }) // '4 3 1 1'
```

### 获取不带声调的拼音

```javascript
pinyin('汉语拼音', { tone: false }) // 'han yu pin yin'
```

### 结果输出为数组格式

```javascript
pinyin('汉语拼音', { type: 'array' }) // [ 'hàn', 'yǔ', 'pīn', 'yīn' ]
```

### 获取单个字的多音

```javascript
pinyin('好', { multitone: true }) // 'hǎo hào'
```

### 混用

```javascript
pinyin('汉语拼音', { type: 'array', pattern: 'pinyinNum' }) // [ 'han4', 'yu3', 'pin1', 'yin1' ]
```

## options 配置

| 参数      | 说明                                                               | 类型    | 可选值                             | 默认值 |
| --------- | ------------------------------------------------------------------ | ------- | ---------------------------------- | ------ |
| pattern   | 输出的结果的信息（带音调全拼/音调为数字后缀的全拼/声母/韵母/音调） | string  | pinyin/pinyinNum/initial/final/num | pinyin |
| tone      | 是否开启音调（为 true 时会覆盖 pattern 中的音调）                  | boolean | true/false                         | true   |
| type      | 输出结果类型（字符串/数组）                                        | string  | string/array                       | string |
| multitone | 输出多音字全部拼音（仅在词 word 长度为 1 时生效）                  | boolean | true/false                         | false  |

## 交流与反馈

有问题或者功能需求支持欢迎提 issue，紧急可联系微信：zhoulx1688888
