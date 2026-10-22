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
    <tr><td>pinyin</td><td>307.69 KB (gzip 135.02 KB)</td><td rowspan="7">318.47 KB (gzip 138.72 KB)</td></tr>
    <tr><td>segment</td><td>306.44 KB (gzip 134.24 KB)</td></tr>
    <tr><td>match</td><td>185.93 KB (gzip 80.99 KB)</td></tr>
    <tr><td>convert</td><td>1.78 KB (gzip 0.98 KB)</td></tr>
    <tr><td>html</td><td>308.52 KB (gzip 135.33 KB)</td></tr>
    <tr><td>polyphonic</td><td>180.75 KB (gzip 78.83 KB)</td></tr>
    <tr><td>总体积</td><td>564.42 KB (gzip 158.86 KB)</td></tr>
    </tbody>
</table>
