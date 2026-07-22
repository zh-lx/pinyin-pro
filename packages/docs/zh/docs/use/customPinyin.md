# customPinyin <Badge type="tip" text="v3.4.0+" vertical="middle" />

`pinyin-pro` 内部导出了 `customPinyin` 方法，支持用户自定义设置词句拼音，当中文中匹配用户自己定义的词句拼音时，优先使用用户自定义的拼音。

## 示例

### 不使用自定义拼音

涉及到多音字时，部分复杂拼音或者人名等，可能识别不准确，例如你有个人名叫 `张会(zhāng kuài)`

```js
import { pinyin } from 'pinyin-pro';

pinyin('他叫张会'); // 'tā jiào zhāng huì'
```

### 使用自定义拼音

使用 `customPinyin` 方法，可以让你自己补充这部分识别不准确的拼音。

```js
import { pinyin, customPinyin } from 'pinyin-pro';

customPinyin({
  张会: 'zhāng kuài',
});

pinyin('他叫张会'); // 'tā jiào zhāng kuài'
```

### 对 multiple 和 polyphonic 生效 <Badge type="tip" text="v3.19.0+" vertical="middle" />

通过在 `customPinyin` 的第二个参数中追加 `multiple` 和 `polyphonic`，可以使其对 `multiple` 和 `polyphonic` 生效。

当 `multiple` 或 `polyphonic` 的值为 `add` 时，字的拼音会在原基础上追加；为 `replace` 时，会直接覆盖掉原基础。

```js
// 追加的示例
customPinyin({
  张会: 'zhāng huài',
}, {
  multiple: 'add',
  polyphonic: 'add',
});

pinyin('张', { multiple: true }); // 'zhāng' (原先就有张，无需额外追加)
pinyin('会', { multiple: true }); // 'huì kuài huài' (将 huài 追加进去)

polyphonic('张会'); // ["zhāng", "huì kuài huài"]
```

```js
// 替换的示例
customPinyin({
  张会: 'zhāng huài',
}, {
  multiple: 'replace',
  polyphonic: 'replace',
});

pinyin('张', { multiple: true }); // 'zhāng' (替换为 zhāng)
pinyin('会', { multiple: true }); // 'huài' (替换为 huài)

polyphonic('张会'); // ["zhāng", "huài"]
```

### 清除原自定义的数据 <Badge type="tip" text="v3.19.0+" vertical="middle" />

默认情况下，多次调用 `customPinyin` 补充的数据会累积叠加，可以调用 `clearCustomDict` 对原数据进行清除。


```js
import { clearCustomDict } from 'pinyin-pro';

// 清除 pinyin api 自定义的数据
clearCustomDict('pinyin');
// 清除 pinyin api multiple 模式自定义的数据
clearCustomDict('multiple');
// 清除 polyphonic api 自定义的数据
clearCustomDict('polyphonic');
// 全部清除
clearCustomDict(['pinyin', 'multiple', 'polyphonic']);
```

## 语法及参数

### 语法

```ts
import { customPinyin, clearCustomDict } from 'pinyin-pro';

interface PinyinMap {
  [key: string]: string;
}

type CustomHandleType = 'add' | 'replace';

type CustomDictType = 'pinyin' | 'multiple' | 'polyphonic';

interface CustomPinyinOptions {
  multiple?: CustomHandleType;
  polyphonic?: CustomHandleType;
}

function customPinyin(map: PinyinMap, options?: CustomPinyinOptions);

function clearCustomDict(dict: CustomDictType | CustomDictType[]);
```

### 参数

- `map` (必传)：object 类型，自定义的拼音映射，key 为汉字字符串，value 为拼音。
- `options` (可选)：object 类型，设置是否对 multiple 和 polyphonic 生效以及生效方式。
