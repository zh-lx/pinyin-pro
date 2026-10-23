# addDict <Badge type="tip" text="v3.20.0+" vertical="middle" />

`pinyin-pro` 内置了一些高频常用词的词典，想要保证高准确率，需要应用更完备的词典，可以通过 `addDict` 添加词典。详见 [@pinyin-pro/data](https://github.com/zh-lx/pinyin-pro/tree/main/packages/data)。

通过 `npm install @pinyin-pro/data` 进行安装。

## 示例

### 使用内置词典(默认)

默认词典词汇数量较少，例如不包含 `日本京都大学`，会导致 `都` 的读音识别错误：

```js
import { pinyin } from 'pinyin-pro';

const result1 = pinyin('小明硕士毕业于中国科学院计算所，后在日本京都大学深造');
// 结果: xiǎo míng shuò shì bì yè yú zhōng guó kē xué yuàn jì suàn suǒ ， hòu zài rì běn jīng dōu dà xué shēn zào
```

### 使用现代汉语词典

包含 `日本京都大学`，可以识别准确（gzip 压缩后大概 0.6MB，根据自己的需求决定是否使用）：

```js
import { pinyin, addDict } from 'pinyin-pro';
// 引入前需要先通过 `npm install @pinyin-pro/data` 进行安装
import ModernChineseDict from '@pinyin-pro/data/modern';

addDict(ModernChineseDict);

const result = pinyin('小明硕士毕业于中国科学院计算所，后在日本京都大学深造');
// 结果: 结果: xiǎo míng shuò shì bì yè yú zhōng guó kē xué yuàn jì suàn suǒ ， hòu zài rì běn jīng dū dà xué shēn zào
```

### 使用完整词典

包含词语更多，识别率更加准确（gzip 压缩后大概 3.99MB，根据自己的需求决定是否使用）：

```js
import { pinyin, addDict } from 'pinyin-pro';
// 引入前需要先通过 `npm install @pinyin-pro/data` 进行安装
import CompleteDict from '@pinyin-pro/data/complete';

addDict(CompleteDict);

const result = pinyin('小明硕士毕业于中国科学院计算所，后在日本京都大学深造');
// 结果: 结果: xiǎo míng shuò shì bì yè yú zhōng guó kē xué yuàn jì suàn suǒ ， hòu zài rì běn jīng dū dà xué shēn zào
```

## 语法及参数

### 语法

```ts
import { addDict } from 'pinyin-pro';

type DICT = {
  [key: string]:
    | string // 拼音
    | [string] // [拼音]
    | [string, number] // [拼音, 词频概率]
    | [string, number, string]; // [拼音, 词频概率, 词性]
};

type DictOptions = {
  name?: string;
  dict1?: 'add' | 'replace' | 'ignore';
};

function addDict(dict: DICT | {}, options?: string | DictOptions): void;
```

### 参数

- `dict` (必传)：词典。
- `options`（可选）：词典名称或配置对象。
- `options.name`（可选）：词典名称。
- `options.dict1`（可选）：单字词典的处理方式。默认值为 `add`。

### 单字词典的处理顺序

单字修改按 `addDict` 的调用顺序生效。`replace` 替换当前读音。`add` 追加尚未存在的读音。
`ignore` 不修改单字词典。

同名词典的多次添加保留各次修改的调用顺序。
`removeDict(name)` 删除该名称下的全部修改。
删除后，系统根据原始读音和剩余修改重新计算受影响汉字的读音。
删除最后一项修改后，系统恢复原始读音。
未命名的调用共用一个词典名称。`removeDict()` 删除这些调用的修改。
