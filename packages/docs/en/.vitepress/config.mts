import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/en/',
  title: 'pinyin-pro',
  description:
    'Excellent performance and accurate conversion of JS Chinese Pinyin tool',
  srcDir: './docs',
  themeConfig: {
    search: {
      provider: 'local',
    },
    logo: '/images/logo-circle.svg',
    footer: {
      message:
        '<a href="https://beian.miit.gov.cn/" target="_blank">鲁ICP备20023182号-2</a>',
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      {
        text: 'Try Online',
        items: [
          {
            text: 'pinyin',
            link: 'https://play.fe-dev.cn/?entry=index.html&activeFile=main.ts&openConsole=true#eNpVUU1vEzEQ/SvGl22l7BpuKOxWQqFInOihlUDyxV0PWSN/sZ6kRFF+AEKcuCEEEmcQqnps+3fS9tS/UHt3mzYn22/ee34zs6TKSvhcNGg0HdPyyau3k8P3B/skAXvclukkWthpxSlYTiNGSNmAkN0t3g2gIHUj2gAYSUeHr/PnnBK2VW8QfQ6fZmoeKe/yo5f5xBkvUB1riOTaWQSb5G/2K5DThG0bWGEglucKTrxrcUtzoiQ2lYS5qiHvHiOirEIldB5qoaF6Vjx97IgKNexNnIQDLRbQlqxHut7Yprny2MnFvUaqOVEy/ia8j2MoWQQGwYZWhrpVHgkufAprnJyl9gYLZVJykhXMCGULDNmLXt+r0rRZN3Y6ogMjrmRQLYlXdqEsWZEPrTMk65+5b12y4TaOIyBpIcw0kmpg72Tr0y/X//+tv17c/D7LdjdMp6HQbrqTXV/+XX/7c3X+ff3r5+3Fj2w0WOzGEP3XuRG++BicjWGWKTAfCoHTMemQhD3kSTCnaeNhzBgEU4SGPS4nyYrbFV3dAUvx3Zo=',
          },
          {
            text: 'match',
            link: 'https://play.fe-dev.cn/?entry=index.html&activeFile=main.ts&openConsole=true#eNqFUstu1DAU/RXjTTrSJGFmNmhIKqGhSKyoUCuBlI0bXyZGfhE7U6JRliwQsGKHEHwBQogVor/D0K76C7WTtJ1Rq+nK9rn3nGOf6yVmksLbqLCC4ylO7j1+Njt4ub+HPLCbycSviBM5TzMMMsMOQygpgNB25/YCLEF5QUoD1jUdHjwJH2QYxRv1wlodwpuKLVzLi/DwUThTQhPLjji45lxJC9LTn+6lQOce2xSQRIArLxgca1XaDc4xo7ZIKSxYDmF7GCImmWWEhyYnHNJRdH9d0TLLYXemKOxzUkOZxB3Svi2+elxypGh9yaFsgRh1bkRrF0MSO6AnXLUlJi+ZtsjW2l9WKFr55/USTPiboyCKBWEysiZ42PE7lk87bmPHQ9x3uJH0rCUSxOYFatCrUgkUaCZrJkNdKq+SSZeGsV3PczAVtyOUdsedYPXr/enPH6sPJ2fffwdDFBRE1lUnEAwc23MVh4ir+U7w7+Ofs3ef/v/9vPr2dXR+8sUR1lUHt5qNt5o5q+0+4xs+49t9Jnf6DF1S/mcwWanKTJEtK0DNVvfJDffJwI2gCz4UREevjZJuFEs/rqwvmAxPUYt47HocHs6w/+9mGsdgRGSKeL3sKU0mG9xcAEEaSJU=',
          },
          {
            text: 'convert',
            link: 'https://play.fe-dev.cn/?entry=index.html&activeFile=main.ts&openConsole=true#eNqNU79v00AU/leOW5xIsU02FJxKKBSJpVSQSiDdcolf40P3w/guKVaUjYGNCSGYEQtFYoIB2PhX2sLEv8A720mdpkOHxOfvvu9733t3XlKhU3gZZU5JOqDJrfuPRuNnh/vEA3tMJ/5JJNezIaOgGUWMkCQDnlYrXCtwnEwzXlhwSDoaPwjvMErirf3MuTyEF3OxQMrT8OheODIq505MJCB5arQD7eUP94eQzjy2baC5AtxeCDjJTeG2NCciddkwhYWYQli99IjQwgkuQzvlEob96Hbb0QknYW9kUjiUvIQiiWuk6i3eNJdMTFquNalYEJFiNZ7nOIYkRqARbGiJnRYid8SVuQ+rTDr37TUWQvnkJIhixYWOnA3u1vpa5acdV2OnPdow8Ega1dL3uwBcrchxYRQJcqFLocO8MN6H6Tgm52+/Xvx49efX6cXpp7M33zt6rsbmSakmRnaZRgPrSAt7DHYuHRmurTves0/QtR900dMLjIRImlmHUTQ/+/JuY/7v5wdGe7t2WKjKUrOQXus6tuKMzcFcbbK0sGuy/P6sSYl/QQ+7PzaF4m5AgpYmIKvdmFfqNjF3Kq1jnn97/ff9x2Zezmg4wN8m4Bq4cbq14Npo7VpNru0CXTz5+rxDxfPouTUab8DS3xLWbFhGB6RCPHZ5BzzMqP/M7CCOwarIZnF720tWTK/o6j+bTX46',
          },
          {
            text: 'customPinyin',
            link: 'https://play.fe-dev.cn/?entry=index.html&activeFile=main.ts&openConsole=true#eNpVUj2P00AQ/SvLNs5JsQ0dCvZJKBwSFSnuJJC22fMO8cJ+4V3nCFEKKoQQokCiiBCcKAHRUKELFfyUJBwVf4Fd29wllXffvPdm3nhnmCsGT5LSSYEHOLty6+7w8P7oAAVgn6gsfJGgapwTDIpgjyGUlUBZc/JnCY6ioqSVBedJR4e34+sEo3SnXjpnYnhc84mn3IuPbsZDLQ11/FiAJxdaOVBBfucgBzYO2K6BohJ8ecLhxOjK7WhOOHNlzmDCC4ibSx9xxR2nIrYFFZBfS65uOzruBOwPNYORoFOosrRFmmzpRbjsWLPpfw3jE8SZ70aN8WvIUg90ggtaZouKG4fc1IRhpWZ1iNdZcBkmR1GSSspV4mx0o9W3qrDttFk77uOO4X9Jp5ohw9WUqz4qauu0HDU3NEcPKi1R1BZjU+lgStQ2qTcLbdbL09VyMUDR0/LXMzVGj+qfpzzqEzXfaxVaWYcqsLVwKO+69aLV2dv168+tOArMwNMCEqHHPYLPn39af12svr/YvFz++fDt/MeXzauPv8/ebN6/+7tcENzvHPd8pjZJLKlJHlqtfLZmMNIVLMED1CABuwwUYILDA7KDNAUrE1um2+UgmfsceP4POgcC1w==',
          },
          {
            text: 'html',
            link: 'https://play.fe-dev.cn/?entry=index.html&activeFile=main.ts&openConsole=true#eNpVUUtuFDEQvYrxpkFKt2GHJt2R0BAEEohITCSQvHHaxXSh9od2zYTRaA6A4A6cACHENueJyCpXiO3ufGZl+9V75Vevthythm9VR6bnM14/evl+vvh0cswScCRtnU7WK7tsJAcrecQYqztQOt/i3QAp1nZqCECRdLp4VT6XnIm9ekfkS/i6wnWkfCxPX5RzZ7wiPOshkltnCWySvzluQC8Ttt/AKgOxvEY4926gPc05auoaDWtsocyPA4YWCVVfhlb10Dyrnj7sSEg9HM2dhpNebWCoxYjk2cTdcPWZ05tbjcY1Qx1/U97HGGoRgUlwR6tDO6AnRhufzBqnV2m8qQWa5JwVlTAKbUWhOBz1oyqlLXLs/IBPjLiSSbXNG2E79nlwhhUe7QZt6QeXmkgbwwiUKR9oQLtkTX48Li7/fv//5/f1xc/LHxdXv/4VTzJdu3ZlYnhVsl6htTC8Xrx7O6nGFofRxvh5aZSvvgRno51tsiynQpB8xjKSsHtPCZY87TzMhIBgqtCJh+Uk2Um747sbM9jaSw==',
          },
          {
            text: 'polyphonic',
            link: 'https://play.fe-dev.cn/?entry=index.html&activeFile=main.ts&openConsole=true#eNqNUs1u1DAQfhXjS1ppk8ANbZNK1VIkTlSilUDyxY2HzSD/YXu3RKu8Cxe48QAceBt4DzzZUHalgipFivPN930z88U7jlbBp6pPRvMlb568eL26fnd1yQg4F7ahN9PSrlvBwQqeMcaaHqSaTvlsIEnW9TJESJl0c/2yfC44q4/qfUq+hI8b3GbK2/Lmolw542XCWw2Z3DmbwJL81WULak3YsYGVBnJ5i3DnXUhHmjtUqW8VbLGDcvpYMLSYUOoydlJD+6x6euiYMGk4XzkFV1oOEJp6j0y71ffLNbdODX80CrcMVe4mvc8xNHUGZsE9rYldQJ9YGjwNa5za0HqzBRqanBVVbSTaKsXibK/fqyjteoqdL/jMyL9kVu2Yd3rwvbPYsZG9D86wwqMd0JY+OLISNkcSEwsQNzq9SQHtmrUHupPi15cf9Hz7+vP75+I0a0jhNFTarU8OdVQ79rsIQQ7/s1vkGWnxJSskcQs2PtxhcnqggdaPtdf63+Zan57lAPexlUb66kN0Nge5o7DFXIiCL9mEEPY3R4IFp9sal3UN0VSxrw/LJBmFHfn4G5P7Jkc=',
          },
          {
            text: 'addDict',
            link: 'https://play.fe-dev.cn/?entry=index.html&activeFile=main.ts&openConsole=true#eNp1Uk9v0zAc/Soml2xSE8MNlXQCdUPixA6bBFIuXmwaI8cOsdtRVZUmcUKCAkLTYFSIjT9DohtwYhrrt2nS9bSvgJ1kayvgFOf93nv+vZd0LMoxeeyGKmJW1fKuLN+tr91fXQEGWPK5Z56AId6o+RbhvqUxALyQIJyf9DkiCoEgRIkkSpPW1247130LwLl5qFTskEdN2tKUe876LacuohgpusGIJgeCK8KN/M5KjeCGweYNOIqIHrco2YxFouY0mxSrsIZJiwbEyV8qgHKqKGKODBAjtWvu1VlHRRUjS3WBySpDbZJ4sEDybPAynLchcPtCg2kLUKxvQ3Gsa/CgBkrBJc2TQUJjBVQ7NstGAjdNvNKCRmZzYLswQpS7Sto3Cn2hMm3DvHarYpUM/UlKVQfElLcprwCE8TINFOiCB4mIgF3gTpwI41fSTbuMKJIzC97NKRFipBAMSo6R+by0XZhVLuYTXbRUICGyyRSolXss2OmPF9mb3nhvO/34Lfu+PTreHZ30RseH6bvh+OBVevhl8nb/7GhvfLSTPd06P32Wvuyl/a/ZzuesPxidDCZPhumnA03Lfv2cbH2wp3cJRlwmGgv22XCQPd8f/36dve+fn+7alXKJRV1QkdOJUOw+lILrojqmTL8cSN+qghwx2DS5gX3L/I2yCiGRkStDODuuXGj+W9c/Lf5iYyrVjMS4dn3etbp/AHmWTEg='
          },
          {
            text: 'addTraditionalDict',
            link: 'https://play.fe-dev.cn/?entry=index.html&activeFile=main.ts&openConsole=true#eNptUstuEzEU/RXjzaRSZgw7FGYqUFokVnSRSiDNxh1fMkZ+Mb5JiaJIbFmwYgeIBWKF+IBK0L+p2u74BeyZaZM0Xdk+95zje669pNIIeJ/VqBUd0fzBwcvx5PXRIYnAfmnyuBLFzbQoKZiSBoyQvAYu2l3Ya0BOqpo3HjCQjifP08clJWyrXiO6FN7N5DxQXqXHz9Kx1Y6jPFEQyJU1CCbKXxwWIKYR2zYwXEMozyWcOtvgluZUCqwLAXNZQdoehkQaiZKr1FdcQfEoe7jpiBIV7I+tgCPFF9DkrEPabOw2XH5ixeJGI+ScSBFu486FMeQsAL3glpb7qpEOCS5cbFZbMYvxegupY+ckyZjm0mTokyedvlPFabN27HRIe0Z4kl61JE6ahTRDwoWYNFyEeNZwdSArJCvyprGaJB0ldY2N1r3yLrmjPl1zmeDIGa5pUVya3XsGd857LS+8g0fSgJ8pJEXf5iC5OPtwcfbr+vzj1defyZppFWTKTgfJ9fnvy08/rv58vvz+7d/fL8mwt9gL6bvOU81d9tZbE6awjJMq+4Iv6Yi0SMTWQSJc0vjV/Igx8DrzNdssD280O+mr8BsVYHiseyx22EJ63JBE11VpVnT1HwqoKXY='
          },
          {
            text: 'segment',
            link: 'https://play.fe-dev.cn/?entry=index.html&activeFile=main.ts&openConsole=true#eNp1Us1u00AYfJXFF6dSbMMNBacCpUXiRA+tBJIvW+9HvMjeNd5NShRFqsQJCQIIVYUSIVp+ikRa4ERVmreJnebUV2DXcZpEwMnr+WZmvxm7bVBG4LEdyCg0KoZ7ZeVubf3+2irSwLLHXP1EIWb1qmcA8wyFIeQGgEl+UucIJEZ+gBMBUpE21m9b1z0DOQvzQMrYgkcN2lSUe9bGLavGoxhLuhmCIvucSWBafme1CqSusUUDhiNQ4yaFrZgnckGzRYkMqgSa1AcrfykjyqikOLSEj0OoXrOvzjtKKkNYrnECayFuQeI6EyTP5lyGczc5aU01hDYRJeo2HMeqBtdRQCG4pLnCT2gskWzFetmIk4aOV1jQSG+OTNuJMGW2FOaNiX6i0m07ee1G2SgY6pMUqjYSUI9U3jLChKxQX6IOepDwCJkxZS3KrDjh2rDg63pDkJAzJ7ybM6JDsMSOX3C0zGOFbWleuZRPVNNCogREI5SoOl2kZKY/XmRvuqP9nfTjt+z7zvBkb3jaHZ4cpe8Go8NX6dGX8duD8+P90fFu9nT74uxZ+rKb9r5mu5+zXn942h8/GaSfDhUt+/VzvP3BnF3GQ7BDXi+Z54N+9vxg9Pt19r53cbZnlostllRFk6BWhGP7oeBMVdXWdXrFQHhGBeWIxmbRNewZ+n8UFccBEdkicObH5anmv3390+IvNqFCzkm0a8djHaPzB9enTQA='
          },
        ],
      },
    ],
    outline: {
      level: [2, 6],
    },

    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Introduction', link: '/guide/compare.md' },
          { text: 'Get Started', link: '/guide/start.md' },
          { text: 'ChangeLog', link: '/guide/changelog.md' },
        ],
      },
      {
        text: 'API and Example',
        items: [
          { text: 'pinyin', link: '/use/pinyin.md' },
          { text: 'segment', link: '/use/segment.md' },
          { text: 'match', link: '/use/match.md' },
          { text: 'convert', link: '/use/convert.md' },
          { text: 'customPinyin', link: '/use/customPinyin.md' },
          { text: 'html', link: '/use/html.md' },
          { text: 'polyphonic', link: '/use/polyphonic.md' },
          { text: 'addDict', link: '/use/addDict.md' },
          { text: 'addTraditionalDict', link: '/use/traditional.md' },
          { text: 'others', link: '/use/others.md' },
        ],
      },
      {
        text: 'More',
        items: [{ text: 'Contact', link: '/more/contact.md' }],
      },
    ],

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/zh-lx/pinyin-pro',
      },
    ],
  },
  locales: {
    root: {
      label: 'English',
      lang: 'en',
    },
    en: {
      label: '简体中文',
      lang: 'zh',
      link: 'https://pinyin-pro.cn', // default /fr/ -- shows on navbar translations menu, can be external
    },
  },
});
