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
        <td rowspan="5">性能</td>
        <td>首次使用字典初始化时长</td>
        <td>🚀 14.261ms</td>
        <td>🐢 160.769ms</td>
        <td>🚀 8.412ms</td>
    </tr>
    <tr>
        <td>10k字转换耗时</td>
        <td>🚲 74.442ms</td>
        <td>🚀 4.298ms</td>
        <td>🚀 7.216ms</td>
    </tr>
    <tr>
        <td>100k字转换耗时</td>
        <td>🐢 6287.332s</td>
        <td>🚀 29.32ms</td>
        <td>🚀 45.471ms</td>
    </tr>
    <tr>
        <td>1m字转换耗时</td>
        <td>⛔ 内存溢出转换失败</td>
        <td>🚀 297.41ms</td>
        <td>🚀 328.338ms</td>
    </tr>
    <tr>
        <td>10m字转换耗时</td>
        <td>⛔ 内存溢出转换失败</td>
        <td>🚀 3907.278ms</td>
        <td>🚀 3375.192</td>
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

- 准确率测试数据可见: [accuracy](https://github.com/zh-lx/pinyin-pro/blob/main/packages/pinyin-pro/scripts/benchmark/accuracy.ts)
- 性能测试数据可见：[speed](https://github.com/zh-lx/pinyin-pro/blob/main/packages/pinyin-pro/scripts/benchmark/speed.ts)
