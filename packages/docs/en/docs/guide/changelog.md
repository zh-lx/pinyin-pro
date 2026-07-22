# ChangeLog

## 3.28.2

- 【patch】Correct the following words in directory:

  ```diff
  行长: 'háng cháng', // [!code --]
  行长: 'háng zhǎng', // [!code ++]
  ```
  
## 3.28.1

- 【feat】Added support for recognizing abbreviated forms of rhotic final sounds in the `convert` API [#306](https://github.com/zh-lx/pinyin-pro/pull/306)

## 3.28.0

- 【feat】Added `addTraditionalDict` API to better recognize traditional Chinese characters [#303](https://github.com/zh-lx/pinyin-pro/pull/303)

## 3.27.0

- 【feat】Added `initialPattern` option to the `pinyin` API to exclude `y` and `w` from the initial consonants [#295](https://github.com/zh-lx/pinyin-pro/pull/295)

## 3.26.0

- 【feat】Fixed the inconsistency in return values of `first` in `pattern: 'first'` mode and `type: 'all'`: Modify it to consistently return the original non-Chinese characters for non-Chinese inputs. [#278](https://github.com/zh-lx/pinyin-pro/pull/278)

## 3.25.0

- 【feat】Added `v` option to the `match` API to allow using `v` to match `ü` [#276](https://github.com/zh-lx/pinyin-pro/pull/276)

## 3.24.2

- 【feat】Added `rp` option to the `html` API to remove `<rp>(</rp>` and `<rp>)</rp>` from the output [#272](https://github.com/zh-lx/pinyin-pro/pull/272)
- 【feat】When the custom class name in the `html` API is set to `false` or `null`, the default class name is retained [#271](https://github.com/zh-lx/pinyin-pro/pull/271)

## 3.24.1

- 【fix】Fixed the issue where the `segment` function would discard the last punctuation mark [#268](https://github.com/zh-lx/pinyin-pro/pull/268)

## 3.24.0

- 【feat】Added `segment` API for word segmentation [#265](https://github.com/zh-lx/pinyin-pro/pull/265)
- 【feat】Added `nonZhScope` property to the `pinyin` API to specify the scope of `nonZh` [#266](https://github.com/zh-lx/pinyin-pro/pull/266)

## 3.23.1

- **patch**: Corrected some pronunciations [#260](https://github.com/zh-lx/pinyin-pro/pull/260)

## 3.23.0

- 【feat】Support for external calls to `getInitialAndFinal`, `getFinalParts`, `getNumOfTone`, and other APIs [#255](https://github.com/zh-lx/pinyin-pro/pull/255)

## 3.22.2

- 【fix】Fixed `.d.ts` file errors caused by alias [#253](https://github.com/zh-lx/pinyin-pro/pull/253)

## 3.22.1

- 【patch】Corrected some entries in the word library [#252](https://github.com/zh-lx/pinyin-pro/pull/252)
- 【perf】Slight performance optimization [#251](https://github.com/zh-lx/pinyin-pro/pull/251)

## 3.22.0

- 【feat】Comprehensive adaptation of all APIs to support double Unicode encoded Chinese characters [#242](https://github.com/zh-lx/pinyin-pro/pull/242), [#243](https://github.com/zh-lx/pinyin-pro/pull/243), [#247](https://github.com/zh-lx/pinyin-pro/pull/247)
- 【feat】Support for all characters in the [General Standard Chinese Character Table](https://zh.wiktionary.org/wiki/Appendix:%E6%B1%89%E8%AF%AD%E6%8B%BC%E9%9F%B3%E7%B4%A2%E5%BC%95/%E9%80%9A%E7%94%A8%E8%A7%84%E8%8C%83%E6%B1%89%E5%AD%97%E8%A1%A8) [#244](https://github.com/zh-lx/pinyin-pro/pull/244)
- 【feat】Support for the pronunciation of the repeated character 々 [#245](https://github.com/zh-lx/pinyin-pro/pull/245)
- 【feat】Support for pinyin characters like `êê̄ếê̌ề` [#248](https://github.com/zh-lx/pinyin-pro/pull/248)
- 【patch】Correct the default pronunciation of `曲`: [#249](https://github.com/zh-lx/pinyin-pro/pull/249)

## 3.21.1

- 【fix】Fixed the issue where `surname: 'head'` did not work for compound surnames

## 3.21.0

- 【feat】Added a `surname` option to the `pinyin` API, which supports recognizing surnames at the beginning of strings.

## 3.20.4

- 【fix】Fixed TypeScript type errors caused by alias.

## 3.20.3

- 【fix】Fixed an issue where the `convert` API incorrectly handled tone conversion for the `iu` finals.
- 【patch】Corrected pronunciation for certain words, see details in [#232](https://github.com/zh-lx/pinyin-pro/pull/232).

## 3.20.2

- 【fix】Addressed inconsistency in conversion behavior of `polyphonic` and `pinyin` for non-Chinese characters.

## 3.20.1

- 【fix】Updated dictionary dependency versions.

## 3.20.0

- 【feat】Support for customizing dictionaries through the `addDict` API.
- 【feat】Added intelligent recognition of tone changes for `一` and `不`, which can be controlled by the `toneSandhi` parameter to toggle on and off. Reference: [Wikipedia](https://zh.wiktionary.org/wiki/Appendix:%E2%80%9C%E4%B8%80%E2%80%9D%E5%8F%8A%E2%80%9C%E4%B8%8D%E2%80%9D%E7%9A%84%E5%8F%98%E8%B0%83)
- 【feat】Enhanced pronunciation recognition for `行`, `斗`, and `重` when preceded by numerical quantifiers.
- 【feat】Added intelligent recognition of the pronunciation of `了` at the beginning of words.
- 【feat】HTML API now includes the `customClassMap` option to add custom class names to specified characters.
- 【feat】Implemented a new word segmentation algorithm, supporting dictionary input for more accurate segmentation.
- 【feat】Added `polyphonic` and `inZhRange` properties to the `all` mode.
- 【fix】Improved efficiency issue when using the `customPinyin` API.
- 【fix】Resolved issues when using `multiple` and `surname` modes simultaneously.
- 【fix】Addressed the problem in `multiple` mode where a non-Chinese character was lost when only one was present.
- 【patch】Corrected the pronunciation of certain words.

## 3.19.6

- 【patch】Updated some word libraries, see details: [2c2f57ad](https://github.com/zh-lx/pinyin-pro/commit/2c2f57ad039bf80de93e1156edaaa030a1d370a6), [cd8bdba5](https://github.com/zh-lx/pinyin-pro/commit/cd8bdba5e6d918e68facec835be396e2c4608d61), [e7a46dda](https://github.com/zh-lx/pinyin-pro/commit/e7a46dda4135da8b373aa72154c373951266e959)

## 3.19.5

- 【fix】Fixed the issue where the first letter was not retrieved correctly in the `pattern: 'first'` mode for non-Chinese characters

## 3.19.4

- 【fix】Fixed the issue of incorrect conversion of non-Chinese characters under the `toneType: none` parameter. [#156](https://github.com/zh-lx/pinyin-pro/issues/156)

## 3.19.3

- 【patch】Correct the directory：[434cf51cd](https://github.com/zh-lx/pinyin-pro/commit/434cf51cd7c7f2a50365bfbe142c70ca93bc2344)

## 3.19.2

- 【patch】Correct the following words in directory:

  ```diff
  止咳: 'zhǐ ké',  // [!code ++]
  咳特灵: 'ké tè líng',  // [!code ++]
  ```

## 3.19.1

- 【patch】Correct the following words in directory:

  ```diff
  那些: 'nèi xiē', // [!code --]
  皇上: 'huáng shang', // [!code --]
  太监: 'tài jiàn', // [!code --]
  审查: 'shěn zhā', // [!code --]
  只得: 'zhǐ de', // [!code --]
  哪些: 'něi xiē', // [!code --]
  一处: 'yī chǔ', // [!code --]
  大夫: 'dài fū', // [!code --]
  便宜: 'pián yí', // [!code --]
  哪个: 'něi gè', // [!code --]
  肚子: 'dǔ zi', // [!code --]
  难得: 'nán de', // [!code --]
  晓得: 'xiǎo de', // [!code --]
  寻思: 'xín sī', // [!code --]
  夺得: 'duó de', // [!code --]
  巴结: 'bā jì', // [!code --]
  了得: 'liǎo de', // [!code --]
  行家: 'háng jia', // [!code --]
  当夜: 'dàng yè', // [!code --]
  皇上: 'huáng shàng', // [!code ++]
  太监: 'tài jian', // [!code ++]
  审查: 'shěn chá', // [!code ++]
  大夫: 'dài fu', // [!code ++]
  便宜: 'pián yi', // [!code ++]
  难得: 'nán dé', // [!code ++]
  晓得: 'xiǎo dé', // [!code ++]
  寻思: 'xún si ', // [!code ++]
  夺得: 'duó dé', // [!code ++]
  巴结: 'bā jié', // [!code ++]
  了得: 'liǎo dé', // [!code ++]
  行家: 'háng jiā', // [!code ++]
  ```

## 3.19.0

- 【Feature】: `customPinyin`: `customPinyin` now supports applying to `multiple` and `polyphonic`.

## 3.18.6

- 【patch】Correct the following words in directory, for more details please see [#148](https://github.com/zh-lx/pinyin-pro/pull/148)
- 【fix】<b>convert</b>: support input `v`, for example: `lv4 se4` -> `lǜ sè`

## 3.18.5

- 【patch】Correct the following words in directory：

  ```diff
  否极泰来: 'pǐ jí tài lái', // [!code --]
  否往泰来: 'pǐ wǎng tài lái', // [!code --]
  否去泰来: 'pǐ qù tài lái', // [!code --]
  否极泰回: 'pǐ jí tài huí', // [!code --]
  泰来否往: 'tài lái pǐ wǎng', // [!code --]
  泰来否极: 'tai lái fǒu jí', // [!code --]
  唯唯否否: 'wěi wěi fǒu fǒu', // [!code --]
  臧否: 'zāng pǐ', // [!code ++]
  否泰: 'pǐ tài', // [!code ++]
  否极泰: 'pǐ jí tài', // [!code ++]
  泰来否: 'tài lái pǐ', // [!code ++]
  ```

## 3.18.4

- 【patch】Correct the following words in directory：

  ```
  只争朝夕: 'zhǐ zhēng zhāo xī', // [!code --]
  娉婷婀娜: 'pīng tíng ē nà', // [!code --]
  鸣凤朝阳: 'míng fèng zhāo yáng', // [!code --]
  凤鸣朝阳: 'fèng míng zhāo yáng', // [!code --]
  朝阳鸣凤: 'zhāo yáng míng fèng', // [!code --]
  朝成暮徧: 'cháo chéng mù shí', // [!code --]
  朝霞: 'zhāo xiá', // [!code ++]
  朝夕: 'zhāo xī', // [!code ++]
  朝气: 'zhāo qì', // [!code ++]
  翅膀: 'chì bǎng', // [!code ++]
  省长: 'shěng zhǎng', // [!code ++]
  一担水: 'yī dàn shuǐ', // [!code ++]
  ```

## 3.18.3

- 【patch】Correct and add the following words to directory：
  - 衒玉贾石: `zuì yù jiǎ shí` -> `zuì yù gǔ shí`
  - 了却: `liǎo què`
  - 力气: `lì qi`
  - 席子: `xí zi`
  - 林子: `lín zi`

## 3.18.2

- 【patch】Correct and add the following words to directory：
  - 瓶子: `shàn zi`-> `píng zi`
  - 镜子: `jìng zi`
  - 银子: `yín zi`
  - 盘子: `pán zi`

## 3.18.1

- 【fix】Fix the issue of build failure in some Vue cli projects caused by bundler migration in `3.18.0`

## 3.18.0

- 【feat】<b>match</b>：An `insensitive` option has been added to set case-insensitive, default value is `true`
- 【patch】Add the following words to directory：
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

- 【feat】Add `convert` API to convert the format of pinyin

## 3.16.7

- 【patch】Add the following words to directory：
  - 成都: `chéng dū`
  - 都城: `dū chéng`
  - 六安: `lù ān`
  - 蚌埠: `bèng bù`
  - 崆峒: `kōng tóng`
  - 都江堰: `dū jiāng yàn`

## 3.16.6

- 【patch】Add the following words to directory：
  - 嘴巴: 'zuǐ ba',
  - 耳朵: 'ěr duo',
  - 茄子: 'qié zi',

## 3.16.5

- 【patch】Correct pronunciation related to relatives and '子'. For details, please refer to[863c2e9](https://github.com/zh-lx/pinyin-pro/commit/863c2e99e89a40fbf4d17d5b0449b1d7e7f309ec)

## 3.16.4

- 【patch】Add the following words to directory：
  - 重启: `chóng qǐ`

## 3.16.3

- 【optimize】Optimize the construction time of initializing AC automata

## 3.16.2

- 【patch】Add following Chinese characters and Pinyin in surname mode:
  - 肖: `xiāo`

## 3.16.1

- 【patch】Correct the Pinyin of following Chinese characters:

  - 苹: `pín` -> `píng`

## 3.16.0

- 【feature】Add parameter `separator` of `pinyin` api to customize separator between pinyins, only effective when `type: 'string'`.

## 3.15.4

- 【optimize】 `esm` eliminates compression confusion and solves the issue of ineffective use of tree shading

## 3.15.3

- 【fix】 Resolve the issue of retaining alias path in `.d.ts` file

## 3.15.2

- 【fix】 Optimize the `esm` build format to solve the issue of referencing errors in some node environments

## 3.15.1

- 【fix】 Fix the `types` references in `package.json`

## 3.15.0

- 【feat】 Add `html` API to get a HTML string of Chinese characters and Pinyin
- 【feat】 Add `polyphonic` API to get all Pinyins of Chinese characters
- 【feat】 Rewrite `match` API, add parameter to control matching rules
- 【patch】Correct the Pinyin of Some Chinese characters and words:
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
  - Remove the following Chinese characters:
    - 瓸: 'bǎiwǎ'
  - Add the following Chinese words:
    - 好好: `hǎo hǎo`

## 3.14.0

- 【refactor】Using [Aho–Corasick_algorithm](https://en.wikipedia.org/wiki/Aho–Corasick_algorithm) to optimize pinyin matching speed and improve performance by nearly 50 times!
- 【patch】Correct the Pinyin of Some Chinese characters and words:
  - 种: `zhòng zhǒng chóng` -> `zhǒng zhòng chóng`
  - Remove unnecessary Chinese words related to `种(zhǒng)`
  - Add the following Chinese words：
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

- 【patch】Correct the Pinyin of Some Chinese characters and words:
  - 皇甫: `huáng pǔ` -> `huáng fǔ`
  - 一丁点儿: `yī dīng diǎnr` -> `yī dīng diǎn er`

## 3.13.1

- 【fix】<b>pinyin</b>：Fix conflicts when using both `multiple` and `name` in the `options` parameter
- 【patch】Correct the Pinyin of Some Chinese characters and words

## 3.13.0

- 【fix】<b>pinyin</b>：Fix the issue of duplicate pinyin when using `multiple: true` and `toneType: none` simultaneously in the `options` parameter

## 3.12.0

- 【feat】<b>pinyin</b>：`options.pattern` parameter adds optional values `finalHead`、`finalBody` and `finalTail`.
- 【feat】<b>pinyin</b>：`options.type` parameter adds optional value `all` to get all the data of Pinyin
- 【fix】<b>pinyin</b>：Fix the issue of incorrect output results when the `text` parameter contains spaces and `options.type` is `array`

## 3.11.0

- 【perf】Optimize the Pinyin vocabulary to improve the accuracy
- 【perf】Reduce the size of package by approximately 10%
- 【feat】<b>match</b>：New support for Chinese matching and mixed Chinese and Pinyin matching

## 3.10.2

- 【patch】Correct the Pinyin of Some Chinese characters and words:
  - 责: `zhài` -> `zé zhài`
  - 朝阳: `zhāo cháo yáng` -> `cháo yáng`
  - 假发: `jiǎ fā` -> `jiǎ fà`
- 【perf】Optimize prompts of typescript

## 3.10.1

- 【patch】Correct the Pinyin of Some Chinese characters and words:
  - 哼: `hng` -> `hēng hng`

## 3.10.0

- 【perf】Reduce the size of package by approximately 30%

## 3.9.0

- 【feat】<b>pinyin</b>：The `options` parameter adds an optional attribute of `v`. When `options.v` is `true`, the `ü` in Pinyin will ebe replaced by `v`.

## 3.8.3

- 【patch】Correct the Pinyin of Some Chinese characters and words:
  - 查岗: `zhā gǎng` -> `chá gǎng`
  - 查核: `zhā hé` -> `chá hé`
  - 查缉: `zhā jī` -> `chá jī`
  - 查检: `zhā jiǎn` -> `chá jiǎn`
  - 查看: `zhā kàn` -> `chá kàn`
  - 查勤: `zhā qín` -> `chá qín`
  - 查帐: `zhā zhàng` -> `chá zhàng`
  - 查照: `zhā zhào` -> `chá zhào`

## 3.8.2

- 【fix】<b>pinyin</b>：Fix again the issue of incorrect default values returned by double byte unicode encoded text

## 3.8.1

- 【fix】<b>pinyin</b>：Fix the issue of incorrect default values returned by double byte unicode encoded text

## 3.8.0

- 【feat】<b>pinyin</b>：The `options` parameter adds an optional attribute `nonZh` to configure the output for non Chinese Characters.

## 3.7.2

- 【patch】Correct the Pinyin of Some Chinese characters and words:
  - 物美价廉: `jià lián wù měi` -> `wù měi jià lián`

## 3.7.1

- 【fix】<b>pinyin</b>：Fix the issue of pinyin conversion errors when `options.toneType` is `none` for `嗯`

## 3.7.0

- 【perf】Support for dynamic introduction of ESM

## 3.6.2

- 【fix】<b>pinyin</b>：Fix the issue of not prioritizing matching custom pinyin when using both the `customPinyin` API and `options.mode` is `surname` simultaneously.
- 【fix】<b>pinyin</b>：Fix the issue of incorrect pinyin for some surnames.

## 3.6.1

- 【fix】<b>pinyin</b>：Fix memory overflow when `options.removeNonZh` is `true` and all input strings are non Chinese Characters.

## 3.6.0

- 【feat】<b>pinyin</b>：The `options` parameter adds an optional attribute of `removeNonZh`, when `options.removeNonZh` is `true`， output of non Chinese characters will be removed.

## 3.5.0

- 【feat】Add the `match` API to support pinyin text matching.

## 3.4.1

- 【fix】<b>pinyin</b>：Fix the issue of invalid tone acquisition when `options.toneType` is `num` and `options.pattern` is `first` or `options.pattern` is `initial`.

## 3.4.0

- 【feat】<b>pinyin</b>：The `options` parameter adds an optional attribute `mode`. When `options.mode` is `surname`, support Pinyin recognition with surname pattern.
- 【feat】Add `customPinyin` api，Support user customize pinyin.
- 【fix】Fix memory overflow issue when text is too long.
- 【patch】Correct the Pinyin of Some Chinese characters and words:
  - 褚: `zhǔ` -> `chǔ zhǔ`
  - 俞: `yù` -> `yú yù`
  - 臧: `zàng` -> `zāng`
  - 贲: `bì` -> `bēn bì`
  - 莘: `xīn` -> `shēn xīn`
  - 郦: `zhí` -> `lì zhí`

## 3.3.1

- 【fix】Fix memory overflow issue when text is too long.

## 3.3.0

- 【perf】Optimize the pinyin conversion speed, it has increased by nearly 30 times!

## 3.2.3

- 【perf】Optimize prompts of typescript.
- 【perf】Optimize pinyin conversion algorithm to improve conversion speed.

## 3.2.2

- 【fix】<b>pinyin</b>：Fix the error issue of not finding polyphonic results when options is `{ multiple: true, type: 'array ' }`

## 3.2.1

- 【patch】Correct the Pinyin of Some Chinese characters and words:
  - 艾: `yì` -> `ài yì`
  - 吽: `ōu` -> `hōng hǒu ōu`

## 3.2.0

- 【perf】Adjust the dictionary order based on the frequency of single word usage to improve performance, and increase the conversion speed of long sentences by 100%.
- 【patch】Correct the Pinyin of Some Chinese characters and words:
  - 啊: `ā` -> `a`
  - 阿: `ē` -> `ā`
- 【perf】Support the use of `<script />`

## 3.1.0

- 【feat】<b>pinyin</b>：`options.pattern` adds an optional value `first` to get the first character of Pinyin.
- 【docs】Fix the typo in Readme.

## 3.0.7

- 【perf】Remove the readme option from `package.json`

## 3.0.6

- 【docs】Fix version update document link error in Readme

## 3.0.5

- 【docs】Optimize the QR code size of `README.md` documents

## 3.0.4

- 【docs】`README.md` add QR Code

## 3.0.3

- 【lint】Add `eslintrc` specification code quality.

## 3.0.2

- 【perf】Optimize npm package quality and `README.md`

## 3.0.1

- 【fix】Fix issue with no `index.d.ts`

## 3.0.0

- 【refactor】Refactored the project using typescript + rollup
