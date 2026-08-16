# API Size

以下数据由 `pnpm size` 自动生成。ESM 各 API 为独立打包并开启 Tree Shaking 后的压缩体积；UMD 不支持按 API Tree Shaking，展示完整产物体积。括号内为对应产物 gzip 后的体积。

<table>
    <thead>
        <tr>
            <th>API</th>
            <th>ESM</th>
            <th>UMD</th>
        </tr>
    </thead>
    <tbody>
    <tr><td>pinyin</td><td>306.19 KB (gzip 134.30 KB)</td><td rowspan="7">316.44 KB (gzip 137.73 KB)</td></tr>
    <tr><td>segment</td><td>304.94 KB (gzip 133.51 KB)</td></tr>
    <tr><td>match</td><td>185.44 KB (gzip 80.79 KB)</td></tr>
    <tr><td>convert</td><td>1.78 KB (gzip 0.98 KB)</td></tr>
    <tr><td>html</td><td>307.03 KB (gzip 134.60 KB)</td></tr>
    <tr><td>polyphonic</td><td>180.70 KB (gzip 78.81 KB)</td></tr>
    <tr><td>总体积</td><td>558.41 KB (gzip 157.29 KB)</td></tr>
    </tbody>
</table>
