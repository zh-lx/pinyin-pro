# Introduction

`pinyin-pro` is a professional JavaScript library for converting Chinese to Pinyin, with high accuracy, lightweight size, excellent performance, and rich functionality.

Among similar products, `pinyin-pro` has achieved a leading position in terms of accuracy, size, performance, functional richness and so on. The following are specific comparative data on performance and accuracy with similar competitors `pinyin` and `@napi-rs/pinyin`.

## Test Environment

- Device:
  - Brand and model: Lenovo XiaoXinPro-13ARE 2020
  - System：Windows10
  - RAM：16 GB
  - CPU: AMD Ryzen 7 4800U 1.8GHz
- Runtime Environment: Nodejs v18.12.1

## Benchmark

<table>
    <tr>
        <th colspan="2">Comparison item</th>
        <th>pinyin</th>
        <th>@napi-rs/pinyin</th>
        <th>pinyin-pro</th>
    </tr>
    <tr>
        <td rowspan="2" colspan="2">Accuracy</td>
        <td>😕 Node 版: 94.097%</td>
        <td rowspan="2">😕 94.097%</td>
        <td rowspan="2">🤩 99.846%</td>
    </tr>
    <tr>
        <td>😕 Web 版: 91.170%	</td>
    </tr>
    <tr>
        <td rowspan="3">Performance</td>
        <td>5,000 Chinese characters</td>
        <td>🐢 749.111ms</td>
        <td>🚲 200.877ms</td>
        <td>🚀 5.958ms</td>
    </tr>
    <tr>
        <td>10,000 Chinese characters</td>
        <td>🐢 795.904s</td>
        <td>🚲 206.5ms</td>
        <td>🚀 15.260ms</td>
    </tr>
    <tr>
        <td>1,000,000 Chinese characters</td>
        <td>⛔ Out Of Memory</td>
        <td>🚀 638.888ms</td>
        <td>🚀 607.131ms</td>
    </tr>
    <tr>
        <td rowspan="3">Compatibility</td>
        <td>Browser</td>
        <td>✔️ Supported</td>
        <td>❌ Not Supported</td>
        <td>✔️ Supported</td>
    </tr>
    <tr>
        <td>Node</td>
        <td>✔️ Supported</td>
        <td>✔️ Supported</td>
        <td>✔️ Supported</td>
    </tr>
</table>

## Data Source

- More details on accuracy testing data: [accuracy](https://github.com/zh-lx/pinyin-pro/blob/main/packages/pinyin-pro/benchmark/accuracy.js)
- More details on performance testing data: [speed](https://github.com/zh-lx/pinyin-pro/blob/main/packages/pinyin-pro/benchmark/speed.js)
