# 介绍

`pinyin-pro` 是一个专业的 JavaScript 中文转拼音的库，具备多音字识别准确、体积轻量、性能优异、功能丰富等特点。

在同类产品中，`pinyin-pro` 无论是多音字识别准确率、体积、性能还是功能的支持度上，都做到了全网领先。以下是关于性能及准确率方面和同类竞品 `pinyin`、`@napi-rs/pinyin` 的具体对比数据。

## 测试环境

- 设备:
  - 品牌及型号：联想小新 Pro 13 ARE 2020
  - 系统：Windows10
  - RAM：16 GB
  - CPU: AMD Ryzen 7 4800U 1.8GHz
- 运行环境: Nodejs v18.12.1

## 对比结果

<table>
    <tr>
        <th colspan="2">对比项</th>
        <th>pinyin</th>
        <th>@napi-rs/pinyin</th>
        <th>pinyin-pro</th>
    </tr>
    <tr>
        <td rowspan="2" colspan="2">准确率</td>
        <td>😕 Node 版: 94.097%</td>
        <td rowspan="2">😕 94.097%</td>
        <td rowspan="2">🤩 99.846%</td>
    </tr>
    <tr>
        <td>😕 Web 版: 91.170%	</td>
    </tr>
    <tr>
        <td rowspan="3">性能</td>
        <td>5k字转换耗时</td>
        <td>🐢 749.111ms</td>
        <td>🚲 200.877ms</td>
        <td>🚀 5.958ms</td>
    </tr>
    <tr>
        <td>1w字转换耗时</td>
        <td>🐢 795.904ms</td>
        <td>🚲 206.5ms</td>
        <td>🚀 15.260ms</td>
    </tr>
    <tr>
        <td>100w字转换耗时</td>
        <td>⛔ 内存溢出转换失败</td>
        <td>🚀 638.888ms</td>
        <td>🚀 820.131ms</td>
    </tr>
    <tr>
        <td rowspan="2">兼容性</td>
        <td>Web 环境</td>
        <td>✔️ 支持</td>
        <td>❌ 不支持</td>
        <td>✔️ 支持</td>
    </tr>
    <tr>
        <td>Node 环境</td>
        <td>✔️ 支持</td>
        <td>✔️ 支持</td>
        <td>✔️ 支持</td>
    </tr>
</table>

## 基准数据

- 准确率测试数据可见: [accuracy](https://github.com/zh-lx/pinyin-pro/blob/main/packages/pinyin-pro/benchmark/accuracy.js)
- 性能测试数据可见：[speed](https://github.com/zh-lx/pinyin-pro/blob/main/packages/pinyin-pro/benchmark/speed.js)
