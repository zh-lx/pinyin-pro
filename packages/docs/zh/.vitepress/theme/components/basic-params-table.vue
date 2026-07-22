<template>
  <div>
    <table>
      <tbody>
        <tr>
          <th width="80">属性</th>
          <th width="70">类型</th>
          <th width="100">描述</th>
          <th width="92">可选值</th>
          <th><div>说明</div></th>
          <th width="70">默认值</th>
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
                查看示例
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
    description: '输出的结果信息',
    default: 'pinyin',
    children: [
      {
        value: 'pinyin',
        desc: '返回拼音全拼',
        example: `// 返回拼音全拼
pinyin('汉语拼音', { pattern: 'pinyin' }); // 'hàn yǔ pīn yīn'
pinyin('汉语拼音', { pattern: 'pinyin', toneType: 'none' }); // 'han yu pin yin'
pinyin('汉语拼音', { pattern: 'pinyin', toneType: 'num' }); // 'han4 yu3 pin1 yin1'
pinyin('汉语拼音', { pattern: 'pinyin', type: 'array' }); // ["hàn", "yǔ", "pīn", "yīn"]
pinyin('汉语拼音', { pattern: 'pinyin', toneType: 'none', type: 'array' }); // ["han", "yu", "pin", "yin"]
`,
      },
      {
        value: 'initial',
        desc: '返回声母',
        example: `// 返回声母
pinyin('汉语拼音', { pattern: 'initial' }); // 'h y p y'
pinyin('汉语拼音', { pattern: 'initial', type: 'array' }); // ["h", "y", "p", "y"]
`,
      },
      {
        value: 'final',
        desc: '返回韵母',
        example: `// 返回韵母
pinyin('汉语拼音', { pattern: 'final' }); // 'àn ǔ īn īn'
pinyin('汉语拼音', { pattern: 'final', toneType: 'none' }); // 'an u in in'
pinyin('汉语拼音', { pattern: 'final', type: 'array' }); // ["àn", "ǔ", "īn", "īn"]
pinyin('汉语拼音', { pattern: 'final', toneType: 'none', type: 'array' }); // ["an", "u", "in", "in"]
`,
      },
      {
        value: 'finalHead',
        desc: '返回韵头（介音）',
        example: `// 返回韵头（介音）
pinyin('村庄', { pattern: 'finalHead', type: 'array' }); // [ '', 'u' ]
`,
      },
      {
        value: 'finalBody',
        desc: '返回韵腹',
        example: `// 返回韵腹
pinyin('村庄', { pattern: 'finalBody', type: 'array' }); // [ 'ū', 'ā' ]
`,
      },
      {
        value: 'finalTail',
        desc: '返回韵尾',
        example: `// 返回韵尾
pinyin('村庄', { pattern: 'finalTail', type: 'array' }); // [ 'n', 'ng' ]
`,
      },
      {
        value: 'num',
        desc: '返回音调对应数字(轻声返回 0)',
        example: `// 返回音调
pinyin('汉语拼音', { pattern: 'num' }); // '4 3 1 1'
pinyin('汉语拼音', { pattern: 'num', type: 'array' }); // ["4", "3", "1", "1"]
`,
      },
      {
        value: 'first',
        desc: '返回拼音首字母',
        example: `// 返回首字母
pinyin('赵钱孙李额', { pattern: 'first' }); // 'z q s l é'
pinyin('赵钱孙李额', { pattern: 'first', toneType: 'none' }); // 'z q s l e'
pinyin('赵钱孙李额', { pattern: 'first', toneType: 'none', type: 'array' }); // ['z', 'q', 's', 'l', 'e']`,
      },
    ],
  },
  {
    option: 'toneType',
    type: 'string',
    description: '音调输出形式',
    default: 'symbol',
    children: [
      {
        value: 'symbol',
        desc: '作为音调符号带在拼音字母上',
        example: `pinyin('汉语拼音', { toneType: 'symbol' }); // 'hàn yǔ pīn yīn'`,
      },
      {
        value: 'num',
        desc: '作为数字跟在拼音后',
        example: `pinyin('汉语拼音', { toneType: 'num' }); // 'han4 yu3 pin1 yin1'`,
      },
      {
        value: 'none',
        desc: '不加音调',
        example: `pinyin('汉语拼音', { toneType: 'none' }); // 'han yu pin yin'`,
      },
    ],
  },
  {
    option: 'type',
    type: 'string',
    description: '输出结果的类型',
    default: 'string',
    children: [
      {
        value: 'string',
        desc: '输出字符串，拼音之间以空格隔开',
        example: `pinyin('汉语拼音', { type: 'string' }); // 'hàn yǔ pīn yīn'`,
      },
      {
        value: 'array',
        desc: '输出为数组',
        example: `pinyin('汉语拼音', { type: 'array' }); // ["hàn", "yǔ", "pīn", "yīn"]`,
      },
      {
        value: 'all',
        desc: '输出完整信息的对象数组',
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
    description: '是否输出多音字(仅在 text 为单字时生效)',
    default: 'false',
    children: [
      {
        value: 'false',
        desc: '输出汉字最常用的拼音',
        example: `pinyin('好', { multiple: false }); // 'hǎo'`,
      },
      {
        value: 'true',
        desc: '输出汉字的所有拼音',
        example: `pinyin('好', { multiple: true }); // 'hǎo hào'`,
      },
    ],
  },
  {
    option: 'separator',
    type: 'string',
    description: '拼音之间的分隔符',
    default: '空格',
    children: [
      {
        value: '-',
        desc: '拼音之间的分隔符',
        example: `pinyin('汉语拼音', { separator: '-' }); // 'hàn-yǔ-pīn-yīn'`,
      },
    ],
  },
  {
    option: 'mode <code>deprecated, 使用 surname 代替</code>',
    type: 'string',
    description: '拼音优先匹配的库模式',
    default: 'normal',
    children: [
      {
        value: 'normal',
        desc: '常规模式',
        example: `pinyin('我叫曾小贤', { mode: 'normal' }); // 'wǒ jiào céng xiǎo xián'`,
      },
    ],
  },
  {
    option: 'nonZh',
    type: 'string',
    description: '非汉字字符的处理形式',
    default: 'spaced',
    children: [
      {
        value: 'spaced',
        desc: '非汉字在结果中空格隔开输出',
        example: `pinyin('我very喜欢你', { nonZh: 'spaced' }); // 'wǒ v e r y xǐ huān nǐ'`,
      },
      {
        value: 'consecutive ',
        desc: '非汉字在结果中紧凑输出',
        example: `pinyin('我very喜欢你', { nonZh: 'consecutive' }); // 'wǒ very xǐ huān nǐ'`,
      },
      {
        value: 'removed ',
        desc: '非汉字在结果中移除',
        example: `pinyin('我very喜欢你', { nonZh: 'removed' }); // 'wǒ xǐ huān nǐ'`,
      },
    ],
  },
  {
    option: 'nonZhScope',
    type: 'RegExp',
    description: '指定 nonZh 范围的正则表达式',
    default: 'null',
    children: [
      {
        value: '/[a-zA-Z]/',
        desc: '只将英文字符紧凑输出',
        example: `pinyin('我very喜欢你，真的', { nonZh: 'consecutive', nonZhScope: /[a-zA-Z]/ }); // 'wǒ very xǐ huan nǐ ， zhēn de'`,
      },
    ],
  },
  {
    option: 'v',
    type: 'boolean',
    description: '是否将结果中的 ü 替换为 v(带音调的 ǖ,ǘ,ǚ,ǜ 不会被转换)',
    default: 'false',
    children: [
      {
        value: 'true',
        desc: '将结果中的 ü 替换为 v',
        example: `pinyin('吕布', { toneType: 'none', v: true }); // lv bu`,
      },
      {
        value: 'false ',
        desc: '结果中的 ü 保留',
        example: `pinyin('吕布', { toneType: 'none', v: false }); // lü bu`,
      },
    ],
  },
  {
    option: 'toneSandhi',
    type: 'boolean',
    description:
      '是否对<code>一</code>和<code>不</code>应用智能变调，参考<a href=https://zh.wiktionary.org/wiki/Appendix:%E2%80%9C%E4%B8%80%E2%80%9D%E5%8F%8A%E2%80%9C%E4%B8%8D%E2%80%9D%E7%9A%84%E5%8F%98%E8%B0%83 target="_blank">维基百科</a>',
    default: 'true',
    children: [
      {
        value: 'true',
        desc: '应用',
        example: `pinyin('一旦被发现', { toneSandhi: true }); // 'yí dàn bèi fā xiàn'`,
      },
      {
        value: 'false',
        desc: '不应用',
        example: `pinyin('一旦被发现', { toneSandhi: false }); // 'yī dàn bèi fā xiàn'`,
      },
    ],
  },
  {
    option: 'surname <code>3.21.0+</code>',
    type: 'string',
    description: '是否启用姓氏模式',
    default: 'off',
    children: [
      {
        value: 'off',
        desc: '不启用姓氏模式',
        example: `pinyin('我叫曾乐乐'); // wǒ jiào céng lè lè`,
      },
      {
        value: 'head',
        desc: '识别字符串开头的姓氏',
        example: `pinyin('我叫曾乐乐', { surname: 'head' }); // wǒ jiào zēng lè lè`,
      },
      {
        value: 'all ',
        desc: '识别字符串中全部的姓氏',
        example: `pinyin('我叫曾乐乐', { surname: 'all' }); // wǒ jiào zēng yuè yuè`,
      },
    ],
  },
  {
    option: 'initialPattern',
    type: 'string',
    description: '声母排除 y 和 w',
    default: 'yw',
    children: [
      {
        value: 'yw',
        desc: '不排除 y 和 w',
        example: `pinyin('汉语拼音', { pattern: 'initial', initialPattern: 'yw', type: 'array' });
// ['h', 'y', 'p', 'y']`,
      },
      {
        value: 'standard',
        desc: '排除 y 和 w',
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
