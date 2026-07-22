# pinyin

`pinyin-pro` 内部还导出了一些中间态处理函数供大家使用。

### getInitialAndFinal

可以使用 `getInitialAndFinal` 获取指定拼音的声母和韵母:

```js
import { getInitialAndFinal } from 'pinyin-pro';

const result = getInitialAndFinal('guang');
/* 结果为：
{
  final: 'uang',
  initial: 'g',
}
*/
```

### getFinalParts

可以使用 `getFinalParts` 获取指定拼音的韵头/韵腹/韵尾:

```js
import { getFinalParts } from 'pinyin-pro';

const result = getFinalParts('guang');
/* 结果为：
{
  head: "u",
  body: "a",
  tail: "ng",
}
*/
```

### getNumOfTone

可以使用 `getNumOfTone` 获取指定拼音的声调对应的数字:

```js
import { getNumOfTone } from 'pinyin-pro';

const result = getNumOfTone('hàn yǔ de pīn yīn');
/* 结果为：
"4 3 0 1 1"
*/
```
