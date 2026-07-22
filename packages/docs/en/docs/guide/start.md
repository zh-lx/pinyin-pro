# Get Started

## Environment

`pinyin-pro` can run in Browser and Nodejs.

## Installation

`pinyin-pro` can be installed by the package manager or imported through `<script />` tag.

### Package Managers

Recommend using package managers for installation：

```perl
# pick your favorite package manager

# NPM
$ npm install pinyin-pro --save

# Yarn
$ yarn add pinyin-pro

# pnpm
$ pnpm install pinyin-pro
```

### Script Link

You can also import CDN files through the `<script />` tag to use it, taking two CDN manufacturers [unpkg](https://unpkg.com) and [jsDelivr](https://jsdelivr.com) as examples:

#### unpkg

```html
<!-- import a fixed version -->
<head>
  <script src="https://unpkg.com/pinyin-pro@3.12.0/dist/index.js"></script>
</head>

<!-- automatically import the latest version -->
<head>
  <script src="https://unpkg.com/pinyin-pro"></script>
</head>
```

#### jsDelivr

```html
<!-- import a fixed version -->
<head>
  <script src="https://cdn.jsdelivr.net/npm/pinyin-pro@3.18.2/dist/index.js"></script>
</head>

<!-- automatically import the latest version -->
<head>
  <script src="https://cdn.jsdelivr.net/npm/pinyin-pro"></script>
</head>
```

::: tip
We suggest that users who use CDN to introduce `pinyin-pro` lock the version on the link address and introduce it as a fixed version to avoid being affected by incompatible updates during future `pinyin-pro` upgrades. If you have your own CDN, it is also recommended to download and host the `pinyin-pro` script on your own CDN to avoid the impact of third-party CDN instability.
:::

## Use

Support multiple environments and modular standardized usage methods.

### ESM

```js
import { pinyin } from 'pinyin-pro';

pinyin('汉语拼音'); // 'hàn yǔ pīn yīn'
```

### Dynamic Import

```js
import('pinyin-pro').then((exports) => {
  exports.pinyin('汉语拼音'); // 'hàn yǔ pīn yīn'
});
```

### Script Link

When you import `pinyin-pro` by `<script />`, the script will globally mount a variable named `pinyinPro`.

```html
<script src="https://unpkg.com/pinyin-pro"></script>

<script>
  var { pinyin } = pinyinPro;
  pinyin('汉语拼音'); // 'hàn yǔ pīn yīn'
</script>
```

### CommonJS

```js
const { pinyin } = require('pinyin-pro');

pinyin('汉语拼音'); // 'hàn yǔ pīn yīn'
```
