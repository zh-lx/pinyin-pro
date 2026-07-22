# customPinyin <Badge type="tip" text="v3.4.0+" vertical="middle" />

`customPinyin` api allows users to customize the pinyin of words and sentences. When Chinese matches the user defined pinyin of words and sentences, the user defined pinyin is preferred.

## Example

### Without customPinyin

When it comes to polyphonic characters, some complex pinyin or person names may not be accurately recognized, for example, if you have a person named `张会(zhāng kuài)`

```js
import { pinyin } from 'pinyin-pro';

pinyin('他叫张会'); // 'tā jiào zhāng huì'
```

### With customPinyin

Using the `customPinyin` api, you can supplement this section with inaccurate pinyin recognition yourself.

```js
import { pinyin, customPinyin } from 'pinyin-pro';

customPinyin({
  张会: 'zhāng kuài',
});

pinyin('他叫张会'); // 'tā jiào zhāng kuài'
```

### Apply to `multiple` and `polyphonic` <Badge type="tip" text="v3.19.0+" vertical="middle" />

By appending `multiple` and `polyphonic` in the second parameter of `customPinyin`, you can make it effective for `multiple` and `polyphonic`.

When the values of `multiple` or `polyphonic` are `add`, the pinyin of the characters will be appended on the original base. When it is `replace`, it will directly overwrite the original base.

```js
// Example of appending
customPinyin({
  张会: 'zhāng huài',
}, {
  multiple: 'add',
  polyphonic: 'add',
});

pinyin('张', { multiple: true }); // 'zhāng' (Zhang was already present, no need to append additionally)
pinyin('会', { multiple: true }); // 'huì kuài huài' (Append huài to the existing data)

polyphonic('张会'); // ["zhāng", "huì kuài huài"]
```

```js
// Example of replacing
customPinyin({
  张会: 'zhāng huài',
}, {
  multiple: 'replace',
  polyphonic: 'replace',
});

pinyin('张', { multiple: true }); // 'zhāng' (Replace with zhāng)
pinyin('会', { multiple: true }); // 'huài' (Replace with huài)

polyphonic('张会'); // ["zhāng", "huài"]
```

### Clearing Original Custom Data <Badge type="tip" text="v3.19.0+" vertical="middle" />

By default, the data supplemented by multiple calls to `customPinyin` accumulates. You can use `clearCustomDict` to clear the original data.

```js
import { clearCustomDict } from 'pinyin-pro';

// Clear custom data for pinyin api
clearCustomDict('pinyin');
// Clear custom data for pinyin api in multiple pattern
clearCustomDict('multiple');
// Clear custom data for polyphonic api
clearCustomDict('polyphonic');
// Clear all custom data
clearCustomDict(['pinyin', 'multiple', 'polyphonic']);
```

## API

### Function

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

### Parameters

- `map` (required): <b>object</b>, customized pinyin mapping, where key is a Chinese character and value is pinyin.
- `options` (optional): <b>object</b>, specifying whether to enable and how to apply `multiple` and `polyphonic`.