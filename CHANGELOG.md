## 3.3.0

当前版本： 3.2.3 -> 3.3.0

- 优化
  优化拼音转换速度，经测试拼音转换速度提升近 30 倍！

点击查看 [版本更新文档](./CHANGELOG.md)

## 3.2.3

- 优化
  - typescript 环境下根据 `options` 中 type 传入的值为 `'string'` 或者 `'array'`，自动提示结果为 `'string'` 还是 `'string[]'`
  - 优化拼音转换算法，提高转换速度

## 3.2.2

- 修复 options 为 `{ multiple: true, type: 'array' }` 时若未找到多音字结果的报错问题

## 3.2.1

- 修复部分单字的常用读音<br>
  - 艾: 'yì' -> 'ài yì'
  - 吽: 'ōu' -> 'hōng hǒu ōu'

## 3.2.0

- 根据单字的使用频率调整字典顺序，性能大幅提升，长句的转换时间只需之前版本 50% 左右的时间
- 修复部分单字的常用读音
  啊: ā -> a
  阿: ē -> ā
- 增加浏览器中 script 的引入方式

## 3.1.0

- 增加获取拼音首字母功能
- 修复 readme 中音调形式参数 toneType 错写成了 tone 的错误

## 3.0.7

- package.json 中去掉 readme 选项

## 3.0.6

- 修复 readme 中版本更新文档链接错误问题

## 3.0.5

- 优化 README.md 文档二维码大小

## 3.0.4

- README.md 增加二维码

## 3.0.3

- 增加 eslintrc

## 3.0.2

- 优化 npm 包质量和 README.md

## 3.0.1

- 修复没有 index.d.ts 类型指向的问题

## 3.0.0

- 使用 typescript + rollup 打包重构了项目，api 使用上没有发生变化

## 2.0.9

- 修复了 options 中 pattern 参数没有`num`可选项提示的问题

## 2.0.8

- 修复了连续的字母和符号输入报错问题

## 2.0.0

- options 参数使用规则进行了修改

## 1.2.4

- 修改 README.md 中获取多音字汉字全部拼音的参数 multitone 的错误，修正为 multiple。
- 完善 README.md 文档

## 1.2.3

- 支持 typescript 版
