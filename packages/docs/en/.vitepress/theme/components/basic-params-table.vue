<template>
  <div>
    <table>
      <tbody>
        <tr>
          <th width="80">parameter</th>
          <th width="70">type</th>
          <th width="100">description</th>
          <th width="92">optional</th>
          <th><div>example</div></th>
          <th width="70">default</th>
        </tr>
        <tr v-for="(row, index) in data" :key="index">
          <td
            width="80"
            :rowspan="row.rowspan"
            v-if="row.rowspan"
            v-html="row.name"
          ></td>
          <td width="70" :rowspan="row.rowspan" v-if="row.rowspan">
            {{ row.type }}
          </td>
          <td
            width="100"
            :rowspan="row.rowspan"
            v-if="row.rowspan"
            v-html="row.optionDesc"
          ></td>
          <td width="92">{{ row.value }}</td>
          <td>
            <div>
              {{ row.desc }}
              <button
                class="my-button"
                size="mini"
                @click="() => handleViewDemo(row)"
              >
                view example
              </button>
            </div>
          </td>
          <td width="70" :rowspan="row.rowspan" v-if="row.rowspan">
            {{ row.default }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <Modal v-model:visible="dialogVisible" :title="title">
    <pre v-html="highlight(demo, javascript, 'javascript')"></pre>
  </Modal>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import Modal from './modal.vue';

const dialogVisible = ref(false);
const demo = ref('');
const title = ref('');
const highlight = Prism.highlight;
const { javascript } = Prism.languages;

const options = [
  {
    option: 'pattern',
    type: 'string',
    description: 'output result information',
    default: 'pinyin',
    children: [
      {
        value: 'pinyin',
        desc: 'return pinyin full',
        example: `// return pinyin full
pinyin('汉语拼音', { pattern: 'pinyin' }); // 'hàn yǔ pīn yīn'
pinyin('汉语拼音', { pattern: 'pinyin', toneType: 'none' }); // 'han yu pin yin'
pinyin('汉语拼音', { pattern: 'pinyin', toneType: 'num' }); // 'han4 yu3 pin1 yin1'
pinyin('汉语拼音', { pattern: 'pinyin', type: 'array' }); // ["hàn", "yǔ", "pīn", "yīn"]
pinyin('汉语拼音', { pattern: 'pinyin', toneType: 'none', type: 'array' }); // ["han", "yu", "pin", "yin"]
`,
      },
      {
        value: 'initial',
        desc: 'return initial',
        example: `// return initial
pinyin('汉语拼音', { pattern: 'initial' }); // 'h y p y'
pinyin('汉语拼音', { pattern: 'initial', type: 'array' }); // ["h", "y", "p", "y"]
`,
      },
      {
        value: 'final',
        desc: 'return final',
        example: `// return final
pinyin('汉语拼音', { pattern: 'final' }); // 'àn ǔ īn īn'
pinyin('汉语拼音', { pattern: 'final', toneType: 'none' }); // 'an u in in'
pinyin('汉语拼音', { pattern: 'final', type: 'array' }); // ["àn", "ǔ", "īn", "īn"]
pinyin('汉语拼音', { pattern: 'final', toneType: 'none', type: 'array' }); // ["an", "u", "in", "in"]
`,
      },
      {
        value: 'finalHead',
        desc: 'return final head',
        example: `// return final head
pinyin('村庄', { pattern: 'finalHead', type: 'array' }); // [ '', 'u' ]
`,
      },
      {
        value: 'finalBody',
        desc: 'return final body',
        example: `// return final body
pinyin('村庄', { pattern: 'finalBody', type: 'array' }); // [ 'ū', 'ā' ]
`,
      },
      {
        value: 'finalTail',
        desc: 'return final tail',
        example: `// return final tail
pinyin('村庄', { pattern: 'finalTail', type: 'array' }); // [ 'n', 'ng' ]
`,
      },
      {
        value: 'num',
        desc: 'return tone number (return 0 for light tone)',
        example: `// return tone number
pinyin('汉语拼音', { pattern: 'num' }); // '4 3 1 1'
pinyin('汉语拼音', { pattern: 'num', type: 'array' }); // ["4", "3", "1", "1"]
`,
      },
      {
        value: 'first',
        desc: 'return first letter',
        example: `// return first letter
pinyin('赵钱孙李额', { pattern: 'first' }); // 'z q s l é'
pinyin('赵钱孙李额', { pattern: 'first', toneType: 'none' }); // 'z q s l e'
pinyin('赵钱孙李额', { pattern: 'first', toneType: 'none', type: 'array' }); // ['z', 'q', 's', 'l', 'e']`,
      },
    ],
  },
  {
    option: 'toneType',
    type: 'string',
    description: 'tone output format',
    default: 'symbol',
    children: [
      {
        value: 'symbol',
        desc: 'as tone symbol on pinyin letter',
        example: `pinyin('汉语拼音', { toneType: 'symbol' }); // 'hàn yǔ pīn yīn'`,
      },
      {
        value: 'num',
        desc: 'as number after pinyin',
        example: `pinyin('汉语拼音', { toneType: 'num' }); // 'han4 yu3 pin1 yin1'`,
      },
      {
        value: 'none',
        desc: 'no tone',
        example: `pinyin('汉语拼音', { toneType: 'none' }); // 'han yu pin yin'`,
      },
    ],
  },
  {
    option: 'type',
    type: 'string',
    description: 'output result type',
    default: 'string',
    children: [
      {
        value: 'string',
        desc: 'output string, pinyin separated by space',
        example: `pinyin('汉语拼音', { type: 'string' }); // 'hàn yǔ pīn yīn'`,
      },
      {
        value: 'array',
        desc: 'output array',
        example: `pinyin('汉语拼音', { type: 'array' }); // ["hàn", "yǔ", "pīn", "yīn"]`,
      },
      {
        value: 'all',
        desc: 'output all information object array',
        example: `pinyin('汉语拼音', { type: 'all' });
/** result:
[
  {
    origin: '汉',
    pinyin: 'hàn',
    initial: 'h',
    final: 'àn',
    first: 'h',
    finalHead: '',
    finalBody: 'à',
    finalTail: 'n',
    num: 4,
    isZh: true,
    polyphonic: ['hàn'],
    inZhRange: 'true',
  },
  {
    origin: '语',
    pinyin: 'yǔ',
    initial: 'y',
    final: 'ǔ',
    first: 'y',
    finalHead: '',
    finalBody: 'ǔ',
    finalTail: '',
    num: 3,
    isZh: true,
    polyphonic: ['yǔ', 'yù'],
    inZhRange: 'true',
  },
  {
    origin: '拼',
    pinyin: 'pīn',
    initial: 'p',
    final: 'īn',
    first: 'p',
    finalHead: '',
    finalBody: 'ī',
    finalTail: 'n',
    num: 1,
    isZh: true,
    polyphonic: ['pīn'],
    inZhRange: 'true',
  },
  {
    origin: '音',
    pinyin: 'yīn',
    initial: 'y',
    final: 'īn',
    first: 'y',
    finalHead: '',
    finalBody: 'ī',
    finalTail: 'n',
    num: 1,
    isZh: true,
    polyphonic: ['yīn'],
    inZhRange: 'true',
  },
];
*/`,
      },
    ],
  },
  {
    option: 'multiple',
    type: 'boolean',
    description:
      'output multiple pinyin (only effective when text is a single character)',
    default: 'false',
    children: [
      {
        value: 'false',
        desc: 'output the most common pinyin of the character',
        example: `pinyin('好', { multiple: false }); // 'hǎo'`,
      },
      {
        value: 'true',
        desc: 'output all pinyin of the character',
        example: `pinyin('好', { multiple: true }); // 'hǎo hào'`,
      },
    ],
  },
  {
    option: 'separator',
    type: 'string',
    description: 'pinyin separator',
    default: 'space',
    children: [
      {
        value: '-',
        desc: 'pinyin separator',
        example: `pinyin('汉语拼音', { separator: '-' }); // 'hàn-yǔ-pīn-yīn'`,
      },
    ],
  },
  {
    option: 'mode <code>deprecated, 使用 surname 代替</code>',
    type: 'string',
    description: 'pinyin matching mode',
    default: 'normal',
    children: [
      {
        value: 'normal',
        desc: 'normal mode',
        example: `pinyin('我叫曾小贤', { mode: 'normal' }); // 'wǒ jiào céng xiǎo xián'`,
      },
    ],
  },
  {
    option: 'nonZh',
    type: 'string',
    description: 'non-Chinese character processing form',
    default: 'spaced',
    children: [
      {
        value: 'spaced',
        desc: 'non-Chinese character output in result with space',
        example: `pinyin('我very喜欢你', { nonZh: 'spaced' }); // 'wǒ v e r y xǐ huān nǐ'`,
      },
      {
        value: 'consecutive ',
        desc: 'non-Chinese character output in result with consecutive',
        example: `pinyin('我very喜欢你', { nonZh: 'consecutive' }); // 'wǒ very xǐ huān nǐ'`,
      },
      {
        value: 'removed ',
        desc: 'non-Chinese character removed in result',
        example: `pinyin('我very喜欢你', { nonZh: 'removed' }); // 'wǒ xǐ huān nǐ'`,
      },
    ],
  },
  {
    option: 'nonZhScope',
    type: 'RegExp',
    description: 'regular expression for nonZh scope',
    default: 'null',
    children: [
      {
        value: '/[a-zA-Z]/',
        desc: 'only output English characters in consecutive',
        example: `pinyin('我very喜欢你，真的', { nonZh: 'consecutive', nonZhScope: /[a-zA-Z]/ }); // 'wǒ very xǐ huan nǐ ， zhēn de'`,
      },
    ],
  },
  {
    option: 'v',
    type: 'boolean',
    description:
      'whether to replace ü with v in the result (ü with tone ǖ,ǘ,ǚ,ǜ will not be converted)',
    default: 'false',
    children: [
      {
        value: 'true',
        desc: 'replace ü with v in the result',
        example: `pinyin('吕布', { toneType: 'none', v: true }); // lv bu`,
      },
      {
        value: 'false ',
        desc: 'keep ü in the result',
        example: `pinyin('吕布', { toneType: 'none', v: false }); // lü bu`,
      },
    ],
  },
  {
    option: 'toneSandhi',
    type: 'boolean',
    description:
      'whether to apply smart tone change to <code>一</code> and <code>不</code>, reference <a href=https://zh.wiktionary.org/wiki/Appendix:%E2%80%9C%E4%B8%80%E2%80%9D%E5%8F%8A%E2%80%9C%E4%B8%8D%E2%80%9D%E7%9A%84%E5%8F%98%E8%B0%83 target="_blank">维基百科</a>',
    default: 'true',
    children: [
      {
        value: 'true',
        desc: 'apply',
        example: `pinyin('一旦被发现', { toneSandhi: true }); // 'yí dàn bèi fā xiàn'`,
      },
      {
        value: 'false',
        desc: 'not apply',
        example: `pinyin('一旦被发现', { toneSandhi: false }); // 'yī dàn bèi fā xiàn'`,
      },
    ],
  },
  {
    option: 'surname <code>3.21.0+</code>',
    type: 'string',
    description: 'whether to enable surname mode',
    default: 'off',
    children: [
      {
        value: 'off',
        desc: 'not enable surname mode',
        example: `pinyin('我叫曾乐乐'); // wǒ jiào céng lè lè`,
      },
      {
        value: 'head',
        desc: 'recognize surname at the beginning of the string',
        example: `pinyin('我叫曾乐乐', { surname: 'head' }); // wǒ jiào zēng lè lè`,
      },
      {
        value: 'all ',
        desc: 'recognize all surnames in the string',
        example: `pinyin('我叫曾乐乐', { surname: 'all' }); // wǒ jiào zēng yuè yuè`,
      },
    ],
  },
  {
    option: 'initialPattern',
    type: 'string',
    description: 'exclude y and w from initial consonants',
    default: 'yw',
    children: [
      {
        value: 'yw',
        desc: 'exclude y and w',
        example: `pinyin('汉语拼音', { pattern: 'initial', initialPattern: 'yw', type: 'array' });
// ['h', 'y', 'p', 'y']`,
      },
      {
        value: 'standard',
        desc: 'exclude y and w',
        example: `pinyin('汉语拼音', { pattern: 'initial', initialPattern: 'standard', type: 'array' });
// ['h', '', 'p', '']`,
      },
    ],
  },
];

const getOptionsTable = () => {
  const data: any[] = [];
  options.forEach((option) => {
    option.children.forEach((child, index) => {
      data.push({
        id: option.option + child.value,
        name: option.option,
        siblingCount: option.children.length,
        siblingIndex: index,
        type: option.type,
        optionDesc: option.description,
        default: option.default,
        value: child.value,
        desc: child.desc,
        example: child.example || '',
        rowspan: index === 0 ? option.children.length : 0,
      });
    });
  });
  return data;
};

const data = getOptionsTable();

const handleViewDemo = (row) => {
  demo.value = row.example;
  title.value = `options.${row.name} = ${row.value}`;
  dialogVisible.value = true;
};
</script>

<style lang="less">
table {
  margin: 0;
  margin-top: 16px;
}

td,
th {
  border: none;
  text-align: left;
  padding: 12px 8px;
  border-top: none;
}

.vxe-modal--wrapper .vxe-modal--box {
  max-height: 70vh;
  overflow: scroll;
  width: 800px !important;
  * {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace !important;
  }
}

.my-button {
  background-color: transparent;
  font-family: 'PingFang SC';
  height: 24px;
  display: flex;
  align-items: center;
  padding: 0 8px;
  border: 1px solid #2688ff;
  font-size: 14px;
  cursor: pointer;
  border-radius: 2px;
  color: #2688ff;
  &:hover {
    color: #57a8ff;
    border-color: #57a8ff;
  }
  &:active {
    color: #1f7cff;
    border-color: #1f7cff;
  }
}
</style>
<style>
.token.operator {
  background-color: transparent;
}
</style>
