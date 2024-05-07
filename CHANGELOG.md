# 更新日志

## 3.20.4

- 【fix】修复 alias 导致的 ts 类型错误

## 3.20.3

- 【fix】修复 `convert` api 对于 `iu` 韵母声调转换不正确的问题
- 【patch】修复部分字词读音，详见 [#232](https://github.com/zh-lx/pinyin-pro/pull/232)

## 3.20.2

- 【fix】修复 `polyphonic` 和 `pinyin` 对非中文字符转换表现不一致的问题

## 3.20.1

- 【fix】更新词典依赖版本

## 3.20.0

- 【feat】支持通过 `addDict` api 自定义词典
- 【feat】增加 `一` 和 `不` 的变调智能识别，可通过 `toneSandhi` 参数控制开启和关闭,参考: [维基百科](https://zh.wiktionary.org/wiki/Appendix:%E2%80%9C%E4%B8%80%E2%80%9D%E5%8F%8A%E2%80%9C%E4%B8%8D%E2%80%9D%E7%9A%84%E5%8F%98%E8%B0%83)
- 【feat】增加 `行`、`斗`、`重` 前面跟数量词时的发音智能识别
- 【feat】增加 `了` 在起始的发音智能识别
- 【feat】html api 增加 `customClassMap` 选项用于对指定字增加自定义类名
- 【feat】应用了新的分词算法，支持传入词典，分词更加准确
- 【feat】`all` 模式新增 `polyphonic` 和 `inZhRange` 属性
- 【fix】修复了使用 `customPinyin` api 时的效率低下的问题
- 【fix】修复 `multiple` 和 `surname` 一同使用的部分问题
- 【fix】修复 `multiple` 模式只有一个非中文时丢失该字符的问题
- 【patch】校正部分词语的拼音

## 3.19.6

- 【patch】更新部分词库，详见：[2c2f57ad](https://github.com/zh-lx/pinyin-pro/commit/2c2f57ad039bf80de93e1156edaaa030a1d370a6)、[cd8bdba5](https://github.com/zh-lx/pinyin-pro/commit/cd8bdba5e6d918e68facec835be396e2c4608d61)、[e7a46dda](https://github.com/zh-lx/pinyin-pro/commit/e7a46dda4135da8b373aa72154c373951266e959)

## 3.19.5

- 【fix】修复非中文字符 `pattern: 'first` 模式下首字母获取失败的情况

## 3.19.4

- 【fix】修复非中文字符在 `toneType: none` 参数下转换错误的问题 [#156](https://github.com/zh-lx/pinyin-pro/issues/156)

## 3.19.3

- 【patch】词库修正：[434cf51cd](https://github.com/zh-lx/pinyin-pro/commit/434cf51cd7c7f2a50365bfbe142c70ca93bc2344)

## 3.19.2

```diff
+ 止咳: 'zhǐ ké',
+ 咳特灵: 'ké tè líng',
```

## 3.19.1

- 【patch】词库修正以下词语

```diff
- 那些: 'nèi xiē',
- 皇上: 'huáng shang',
- 太监: 'tài jiàn',
- 审查: 'shěn zhā',
- 只得: 'zhǐ de',
- 哪些: 'něi xiē',
- 一处: 'yī chǔ',
- 大夫: 'dài fū',
- 便宜: 'pián yí',
- 哪个: 'něi gè',
- 肚子: 'dǔ zi',
- 难得: 'nán de',
- 晓得: 'xiǎo de',
- 寻思: 'xín sī',
- 夺得: 'duó de',
- 巴结: 'bā jì',
- 了得: 'liǎo de',
- 行家: 'háng jia',
- 当夜: 'dàng yè',
+ 皇上: 'huáng shàng',
+ 太监: 'tài jian',
+ 审查: 'shěn chá',
+ 大夫: 'dài fu',
+ 便宜: 'pián yi',
+ 难得: 'nán dé',
+ 晓得: 'xiǎo dé',
+ 寻思: 'xún si ',
+ 夺得: 'duó dé',
+ 巴结: 'bā jié',
+ 了得: 'liǎo dé',
+ 行家: 'háng jiā',
```

## 3.19.0

- 【feat】`customPinyin`: `customPinyin` 支持对 `multiple` 和 `polyphonic` 生效

## 3.18.6

- 【patch】词库修正以下词语，详见 [#148](https://github.com/zh-lx/pinyin-pro/pull/148)
- 【fix】<b>convert</b>：支持 `v` 输入转换，例如：`lv4 se4` -> `lǜ sè`

## 3.18.5

- 【patch】词库修正以下词语

```diff
- 否极泰来: 'pǐ jí tài lái',
- 否往泰来: 'pǐ wǎng tài lái',
- 否去泰来: 'pǐ qù tài lái',
- 否极泰回: 'pǐ jí tài huí',
- 泰来否往: 'tài lái pǐ wǎng',
- 泰来否极: 'tai lái fǒu jí',
- 唯唯否否: 'wěi wěi fǒu fǒu',
+ 臧否: 'zāng pǐ',
+ 否泰: 'pǐ tài',
+ 否极泰: 'pǐ jí tài',
+ 泰来否: 'tài lái pǐ',
```

## 3.18.4

- 【patch】词库修正以下词语

  ```diff
  - 只争朝夕: 'zhǐ zhēng zhāo xī',
  - 娉婷婀娜: 'pīng tíng ē nà',
  - 鸣凤朝阳: 'míng fèng zhāo yáng',
  - 凤鸣朝阳: 'fèng míng zhāo yáng',
  - 朝阳鸣凤: 'zhāo yáng míng fèng',
  - 朝成暮徧: 'cháo chéng mù shí',
  + 朝霞: 'zhāo xiá',
  + 朝夕: 'zhāo xī',
  + 朝气: 'zhāo qì',
  + 翅膀: 'chì bǎng',
  + 省长: 'shěng zhǎng',
  + 一担水: 'yī dàn shuǐ',
  ```

## 3.18.3

- 【patch】词库修正及添加以下词语
  - 衒玉贾石: `zuì yù jiǎ shí` -> `zuì yù gǔ shí`
  - 了却: `liǎo què`
  - 力气: `lì qi`
  - 席子: `xí zi`
  - 林子: `lín zi`

## 3.18.2

- 【patch】词库修正及添加以下词语：
  - 瓶子: `shàn zi` -> `píng zi`
  - 镜子: `jìng zi`
  - 银子: `yín zi`
  - 盘子: `pán zi`

## 3.18.1

- 【fix】修复打包与部分 `vue-cli` 项目不兼容问题

## 3.18.0

- 【feat】<b>match</b>：`options` 参数新增 `insensitive` 选项用于指定匹配时是否大小写不敏感，默认为 `true`
- 【patch】词库添加以下词语：
  - 琵琶: `pí pa`
  - 蘑菇: `mó gu`
  - 葫芦: `hú lu`
  - 狐狸: `hú li`
  - 桔子: `jú zi`
  - 盒子: `hé zi`
  - 桌子: `zhuō zi`
  - 竹子: `zhú zi`
  - 师傅: `shī fu`
  - 衣服: `yī fu`
  - 袜子: `wà zi`
  - 杯子: `bēi zi`
  - 刺猬: `cì wei`
  - 麦子: `mài zi`
  - 队伍: `duì wu`
  - 知了: `zhī liao`
  - 鱼儿: `yú er`
  - 馄饨: `hún tun`
  - 灯笼: `dēng long`
  - 庄稼: `zhuāng jia`
  - 聪明: `cōng ming`

## 3.17.0

- 【feat】新增 `convert` API，用于拼音格式转换

## 3.16.7

- 【patch】词库添加以下词语：
  - 成都: `chéng dū`
  - 都城: `dū chéng`
  - 六安: `lù ān`
  - 蚌埠: `bèng bù`
  - 崆峒: `kōng tóng`
  - 都江堰: `dū jiāng yàn`

## 3.16.6

- 【patch】词库添加以下词语：
  - 嘴巴: 'zuǐ ba',
  - 耳朵: 'ěr duo',
  - 茄子: 'qié zi',

## 3.16.5

- 【patch】亲戚称谓及"子"相关读音校正

## 3.16.4

- 【patch】词库添加以下词语：
  - 重启: `chóng qǐ`

## 3.16.3

- 【optimize】优化初始化 AC 自动机的构建时间

## 3.16.2

- 【patch】姓氏模式增加读音：
  - 肖: `xiāo`

## 3.16.1

- 【patch】校正部分汉字及词汇的拼音以下汉字读音：
  - 苹: `pín` -> `píng`

## 3.16.0

- 【feature】`pinyin` api 新增 `separator` 参数，用于支持拼音之间自定义分隔符（仅当 `type: 'string'` 时生效）

## 3.15.4

- 【optimize】 `esm` eliminates compression confusion and solves the issue of ineffective use of tree shading

## 3.15.3

- 【fix】 Resolve the issue of retaining alias path in `.d.ts` file

## 3.15.2

- 【fix】 Optimize the `esm` build format to solve the issue of referencing errors in some node environments

## 3.15.1

- 【fix】修复 `package.json` 文件中类型指向错误问题

## 3.15.0

- 【feat】 新增 `html` API，用于获取带拼音汉字的 HTML 字符串
- 【feat】 新增 `polyphonic` API，用于汉字的全部读音
- 【feat】 重写 `match` API，增加参数控制匹配规则
- 【patch】校正部分汉字及词汇的拼音：
  - 屏: `bīng píng bǐng` -> `píng bǐng bīng`
  - 呒: `ḿ` -> `fǔ ḿ`
  - 吋: `cùn yīngcùn` -> `cùn dòu`
  - 呎: `chǐ yīngchǐ` -> `chǐ`
  - 蝊: `uu` -> `dìng`
  - 噷: `hm hěn xīn hèn` -> `xīn hěn hèn`
  - 唡: `liǎng yīngliǎng` -> `liǎng`
  - 曢: `uu` -> `liǎo`
  - 呣: `ḿ m̀` -> `ḿ m̀ móu`
  - 聁: `uu` -> `pàn`
  - 闧: `uu` -> `tā`
  - 屗: `uu` -> `wěi`
  - 虲: `uu` -> `xiā`
  - 屏气吞声: `píng qì tūn shēng` -> `bǐng qì tūn shēng`
  - 敛声屏息: `liǎn shēng píng xī` -> `liǎn shēng bǐng xī`
  - 删除以下字词：
    - 瓸: 'bǎiwǎ'
  - 增加以下词语：
    - 好好: `hǎo hǎo`

## 3.14.0

- 【refactor】使用 [AC 自动机算法](https://en.wikipedia.org/wiki/Aho–Corasick_algorithm)优化拼音匹配速度，性能提升近 50 倍！
- 【patch】校正部分汉字及词汇的拼音：
  - 种: `zhòng zhǒng chóng` -> `zhǒng zhòng chóng`
  - 去掉 `种(zhǒng)` 相关的多余词语
  - 增加以下词语：
    - 耕种: `gēng zhòng`
    - 种地: `zhòng dì`
    - 种菜: `zhòng cài`
    - 栽种: `zāi zhòng`
    - 接种: `jiē zhòng`
    - 垦种: `kěn zhòng`
    - 种殖: `zhòng zhí`
    - 种瓜: `zhòng guā`
    - 种豆: `zhòng dòu`
    - 种树: `zhòng shù`
    - 睡着: `shuì zháo`
    - 笼子: `lóng zi`
    - 厦门: `xià mén`
    - 东莞: `dōng guǎn`

## 3.13.2

- 【patch】修正部分读音
  - 皇甫: `huáng pǔ` -> `huáng fǔ`
  - 一丁点儿: `yī dīng diǎnr` -> `yī dīng diǎn er`

## 3.13.1

- 【fix】<b>pinyin</b>：修复 options 参数 `multiple` 与 `surname` 同时使用时冲突问题
- 【patch】修正部分儿化字读音

## 3.13.0

- 【fix】<b>pinyin</b>：修复 options 参数 `multiple: true` 和 `toneType: 'none'` 同时使用时，可能存在重复拼音的问题

## 3.12.0

- 【feat】<b>pinyin</b>：`options.pattern` 参数新增可选值获取韵头(`finalHead`)、韵腹(`finalBody`)、韵尾(`finalTail`)的功能。 [去看看](/use/pinyin.html#韵头-介音-韵腹-韵尾)
- 【feat】<b>pinyin</b>：`options.type` 参数新增可选值 `all` 获取拼音相关完整的信息。 [去看看](/use/pinyin.html#完整内容)
- 【fix】<b>pinyin</b>：修复 `text` 参数中包含空格且 `options.type` 参数为 `array` 时输出结果错误的问题

## 3.11.0

- 【perf】优化拼音词库，提升拼音识别准确率
- 【perf】包体积优化约 10%
- 【feat】<b>match</b>：新增支持中文匹配、中文及拼音混合匹配

## 3.10.2

- 【patch】修正部分读音:
  - 责: `zhài` -> `zé zhài`
  - 朝阳: `zhāo cháo yáng` -> `cháo yáng`
  - 假发: `jiǎ fā` -> `jiǎ fà`
- 【perf】优化 typescript 提示

## 3.10.1

- 【patch】修正部分读音:
  - 哼: `hng` -> `hēng hng`

## 3.10.0

- 【perf】包体积优化约 30%

## 3.9.0

- 【feat】<b>pinyin</b>：`options` 参数增加 `v` 可选属性，`options.v = true` 可将拼音中的 `ü` 替换为 `v`。[去看看](/use/pinyin.html#拼音-u-替换为-v)

## 3.8.3

- 【patch】修正部分读音:
  - 查岗: `zhā gǎng` -> `chá gǎng`
  - 查核: `zhā hé` -> `chá hé`
  - 查缉: `zhā jī` -> `chá jī`
  - 查检: `zhā jiǎn` -> `chá jiǎn`
  - 查看: `zhā kàn` -> `chá kàn`
  - 查勤: `zhā qín` -> `chá qín`
  - 查帐: `zhā zhàng` -> `chá zhàng`
  - 查照: `zhā zhào` -> `chá zhào`

## 3.8.2

- 【fix】<b>pinyin</b>：再次修复双字节 unicode 编码的文字返回默认值不正确的问题

## 3.8.1

- 【fix】<b>pinyin</b>：修复双字节 unicode 编码的文字返回默认值不正确的问题

## 3.8.0

- 【feat】<b>pinyin</b>：`options` 参数新增 `nonZh` 可选属性，用于配置非中文字符串的输出规则。[去看看](/use/pinyin.html#非汉字字符处理)

## 3.7.2

- 【patch】修正部分读音:
  - 物美价廉: `jià lián wù měi` -> `wù měi jià lián`

## 3.7.1

- 【fix】<b>pinyin</b>：修复 “嗯” 在 `options.toneType = none` 时拼音转换错误的问题

## 3.7.0

- 【perf】支持 esm 动态引入

## 3.6.2

- 【fix】<b>pinyin</b>：修复 `customPinyin` API 和 `options.mode = surname` 同时使用时没有优先匹配自定义拼音的问题
- 【fix】<b>pinyin</b>：修复部分姓氏拼音不正确的问题

## 3.6.1

- 【fix】<b>pinyin</b>：修复 `options.removeNonZh = true` 且输入字符串全部为非汉字时的内存溢出问题

## 3.6.0

- 【feat】<b>pinyin</b>：`options` 参数新增 `removeNonZh` 可选属性，为 `options.removeNonZh = true` 时移除非汉字的字符

## 3.5.0

- 【feat】新增 `match` api 以支持拼音文本匹配功能。[去看看](/user/match)

## 3.4.1

- 【fix】<b>pinyin</b>：修复 `options.pattern = 'first'` 或者 `options.pattern = 'initial'` 时，指定 `options.toneType = 'num'` 获取音调失效的问题

## 3.4.0

- 【feat】<b>pinyin</b>：`options` 参数新增 `mode` 可选属性，`options.mode = 'surname'` 模式支持姓氏模式拼音识别。[去看看](/use/pinyin.html#姓氏模式)
- 【feat】新增 `customPinyin` api，支持用户自定义拼音功能。[去看看](/use/customPinyin)
- 【fix】修复文本过长时堆栈溢出问题
- 【patch】修正部分读音：
  - 褚: `zhǔ` -> `chǔ zhǔ`
  - 俞: `yù` -> `yú yù`
  - 臧: `zàng` -> `zāng`
  - 贲: `bì` -> `bēn bì`
  - 莘: `xīn` -> `shēn xīn`
  - 郦: `zhí` -> `lì zhí`

## 3.3.1

- 【fix】修复文本过长时堆栈溢出问题

## 3.3.0

- 【perf】优化拼音转换速度，提升近 30 倍！

## 3.2.3

- 【perf】优化 typescript 提示
- 【perf】优化拼音转换算法，提高转换速度

## 3.2.2

- 【fix】<b>pinyin</b>：修复 options 为 `{ multiple: true, type: 'array' }` 时若未找到多音字结果的报错问题

## 3.2.1

- 【patch】修复部分读音
  - 艾: `yì` -> `ài yì`
  - 吽: `ōu` -> `hōng hǒu ōu`

## 3.2.0

- 【perf】根据单字的使用频率调整字典顺序以提升性能，长句的转换时间只需之前版本 50% 左右的时间
- 【patch】修复部分读音：
  - 啊: `ā` -> `a`
  - 阿: `ē` -> `ā`
- 【perf】支持 `<script />` 链接使用

## 3.1.0

- 【feat】<b>pinyin</b>：`options.pattern` 新增 `first` 可选值[获取拼音首字母](/use/pinyin.html#首字母)
- 【docs】修复 readme 中音调形式参数 toneType 错写成了 tone 的错误

## 3.0.7

- 【perf】package.json 中去掉 readme 选项

## 3.0.6

- 【docs】修复 readme 中版本更新文档链接错误问题

## 3.0.5

- 【docs】优化 README.md 文档二维码大小

## 3.0.4

- 【docs】README.md 增加二维码

## 3.0.3

- 【lint】增加 eslintrc 规范代码质量

## 3.0.2

- 【perf】优化 npm 包质量和 README.md

## 3.0.1

- 【fix】修复没有 index.d.ts 类型指向的问题

## 3.0.0

- 【refactor】使用 typescript + rollup 重构了项目
