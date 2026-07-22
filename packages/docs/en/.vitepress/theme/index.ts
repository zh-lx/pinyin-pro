// https://vitepress.dev/guide/custom-theme
import { h } from 'vue';
import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import './style.less';

import BasicParamsTable from './components/basic-params-table.vue';
import HTMLBasicDemo from './components/html-basic-demo.vue';
import HTMLStyleDemo from './components/html-style-demo.vue';
import HTMLNoToneDemo from './components/html-no-tone-demo.vue';
import htmlCustomClassDemo from './components/html-custom-class-demo.vue';

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    });
  },
  enhanceApp({ app, router, siteData }) {
    // ...
    app.component('basic-params-table', BasicParamsTable);
    app.component('html-basic-demo', HTMLBasicDemo);
    app.component('html-style-demo', HTMLStyleDemo);
    app.component('html-no-tone-demo', HTMLNoToneDemo);
    app.component('html-custom-class-demo', htmlCustomClassDemo);
  },
} satisfies Theme;
