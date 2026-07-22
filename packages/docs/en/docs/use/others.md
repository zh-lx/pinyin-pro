# pinyin

The `pinyin-pro` package also exports some intermediate processing functions for users to utilize.

### getInitialAndFinal

You can use `getInitialAndFinal` to obtain the initial (consonant) and final (vowel) parts of a specified pinyin:

```js
import { getInitialAndFinal } from 'pinyin-pro';

const result = getInitialAndFinal('guang');
/* The result is:
{
  final: 'uang',
  initial: 'g',
}
*/
```

### getFinalParts

You can use `getFinalParts` to obtain the medial, nucleus, and coda of a specified pinyin:

```js
import { getFinalParts } from 'pinyin-pro';

const result = getFinalParts('guang');
/* The result is:
{
  head: "u",
  body: "a",
  tail: "ng",
}
*/
```

### getNumOfTone

You can use `getNumOfTone` to obtain the numerical representation of the tones for a specified pinyin:

```js
import { getNumOfTone } from 'pinyin-pro';

const result = getNumOfTone('hàn yǔ de pīn yīn');
/* The result is:
"4 3 0 1 1"
*/
```
