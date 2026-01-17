const fs = require('fs');
const https = require('https');
const path = require('path');

// 检测是否在 CI 环境中
const isCI = process.env.CI === 'true' || process.env.GITHUB_ACTIONS === 'true';

// ANSI 颜色代码（仅在非 CI 环境中使用）
const colors = isCI ? {
  reset: '',
  bright: '',
  green: '',
  red: '',
  yellow: '',
  cyan: '',
} : {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
};

/**
 * 格式化文件大小
 * @param {number} bytes - 字节数
 * @returns {string} 格式化后的文件大小
 */
function formatSize(bytes) {
  if (bytes < 1024) {
    return bytes + ' B';
  } else if (bytes < 1024 * 1024) {
    return (bytes / 1024).toFixed(2) + ' KB';
  } else {
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  }
}

/**
 * 获取本地文件大小
 * @param {string} filePath - 文件路径
 * @returns {number} 文件大小（字节）
 */
function getLocalFileSize(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return stats.size;
  } catch (error) {
    console.error(`${colors.red}读取本地文件失败: ${error.message}${colors.reset}`);
    return null;
  }
}

/**
 * 获取 CDN 文件大小
 * @param {string} url - CDN URL
 * @returns {Promise<number>} 文件大小（字节）
 */
function getCDNFileSize(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        const contentLength = response.headers['content-length'];
        if (contentLength) {
          resolve(parseInt(contentLength, 10));
        } else {
          // 如果没有 content-length，需要下载整个文件来计算大小
          let data = '';
          response.on('data', (chunk) => {
            data += chunk;
          });
          response.on('end', () => {
            resolve(Buffer.byteLength(data));
          });
        }
      } else if (response.statusCode === 301 || response.statusCode === 302) {
        // 处理重定向
        const redirectUrl = response.headers.location;
        console.log(`${colors.yellow}重定向到: ${redirectUrl}${colors.reset}`);
        getCDNFileSize(redirectUrl).then(resolve).catch(reject);
      } else {
        reject(new Error(`HTTP 状态码: ${response.statusCode}`));
      }
    }).on('error', (error) => {
      reject(error);
    });
  });
}

/**
 * 比较文件大小
 */
async function compareSizes() {
  const separator = isCI ? '========================================' : `${colors.bright}${colors.cyan}========================================${colors.reset}`;
  const title = isCI ? '   文件体积对比工具' : `${colors.bright}${colors.cyan}   文件体积对比工具${colors.reset}`;

  console.log(`\n${separator}`);
  console.log(title);
  console.log(`${separator}\n`);

  // 本地文件路径
  const localFilePath = path.resolve(__dirname, '../dist/index.js');

  // CDN URL
  const cdnUrl = 'https://cdn.jsdelivr.net/npm/pinyin-pro/dist/index.js';

  const fileLabel = isCI ? '本地文件:' : `${colors.bright}本地文件:${colors.reset}`;
  const cdnLabel = isCI ? 'CDN 地址:' : `${colors.bright}CDN 地址:${colors.reset}`;

  console.log(`${fileLabel} ${localFilePath}`);
  console.log(`${cdnLabel} ${cdnUrl}\n`);

  // 获取本地文件大小
  console.log(`${colors.yellow}正在读取本地文件...${colors.reset}`);
  const localSize = getLocalFileSize(localFilePath);

  if (localSize === null) {
    return;
  }

  console.log(`${colors.green}本地文件大小: ${formatSize(localSize)}${colors.reset}\n`);

  // 获取 CDN 文件大小
  console.log(`${colors.yellow}正在获取 CDN 文件信息...${colors.reset}`);
  try {
    const cdnSize = await getCDNFileSize(cdnUrl);
    console.log(`${colors.green}CDN 文件大小:  ${formatSize(cdnSize)}${colors.reset}\n`);

    // 计算差异
    const diff = localSize - cdnSize;
    const diffPercent = ((diff / cdnSize) * 100).toFixed(2);

    const resultSeparator = isCI ? '----------------------------------------' : `${colors.bright}${colors.cyan}----------------------------------------${colors.reset}`;
    const resultTitle = isCI ? '对比结果:' : `${colors.bright}对比结果:${colors.reset}`;

    console.log(resultSeparator);
    console.log(`${resultTitle}\n`);

    if (diff > 0) {
      const message = `本地文件比 CDN 文件大 ${formatSize(diff)} (${diffPercent > 0 ? '+' : ''}${diffPercent}%)`;
      console.log(isCI ? `⬆️  ${message}` : `${colors.red}${message}${colors.reset}`);
      if (isCI && Math.abs(parseFloat(diffPercent)) > 5) {
        console.log(`\n⚠️  警告: 文件体积增长超过 5%`);
      }
    } else if (diff < 0) {
      const message = `本地文件比 CDN 文件小 ${formatSize(Math.abs(diff))} (${diffPercent}%)`;
      console.log(isCI ? `⬇️  ${message}` : `${colors.green}${message}${colors.reset}`);
      if (isCI && Math.abs(parseFloat(diffPercent)) > 5) {
        console.log(`\n✅ 太棒了! 文件体积减少了 ${Math.abs(parseFloat(diffPercent))}%`);
      }
    } else {
      const message = '本地文件与 CDN 文件大小相同';
      console.log(isCI ? `✅ ${message}` : `${colors.green}${message}${colors.reset}`);
    }

    console.log(`\n${separator}\n`);

    // 在 CI 环境中输出 GitHub Actions 的注释
    if (isCI && process.env.GITHUB_ACTIONS === 'true') {
      const emoji = diff > 0 ? '📈' : diff < 0 ? '📉' : '✅';
      const changeText = diff === 0 ? '无变化' :
        diff > 0 ? `增加 ${formatSize(diff)} (+${diffPercent}%)` :
        `减少 ${formatSize(Math.abs(diff))} (${diffPercent}%)`;

      console.log(`::notice title=Bundle Size ${emoji}::${changeText} - Local: ${formatSize(localSize)}, CDN: ${formatSize(cdnSize)}`);
    }
  } catch (error) {
    console.error(`${colors.red}获取 CDN 文件失败: ${error.message}${colors.reset}`);
    process.exit(1);
  }
}

// 执行比较
compareSizes();
