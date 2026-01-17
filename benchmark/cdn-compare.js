const https = require('https');
const fs = require('fs');
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
  blue: '',
} : {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  blue: '\x1b[34m',
};

// 测试文本（使用 accuracy.js 中的部分文本）
const testText = `大海深处的一条美人鱼一直对大海之外的世界充满了好奇，她一直想要出去看看海之外的世界，她的父母兄弟姐妹们却告诉她海以外的世界非常险恶，人心非常险恶，如果人类发现她美人鱼的身份她就会陷入非常危险的境地，他们劝告她不要出去。她不相信，她觉得自己有能力保护好自己，等她玩一段时间她就回来，否则这始终会是她心里的一个遗憾，她不想在大海里局限的过完这一生。`;

// 正确的拼音结果
const correctPinyin = `dà hǎi shēn chù de yì tiáo měi rén yú yì zhí duì dà hǎi zhī wài de shì jiè chōng mǎn le hào qí ， tā yì zhí xiǎng yào chū qù kàn kàn hǎi zhī wài de shì jiè ， tā de fù mǔ xiōng dì jiě mèi men què gào sù tā hǎi yǐ wài de shì jiè fēi cháng xiǎn è ， rén xīn fēi cháng xiǎn è ， rú guǒ rén lèi fā xiàn tā měi rén yú de shēn fèn tā jiù huì xiàn rù fēi cháng wēi xiǎn de jìng dì ， tā men quàn gào tā bú yào chū qù 。 tā bù xiāng xìn ， tā jué de zì jǐ yǒu néng lì bǎo hù hǎo zì jǐ ， děng tā wán yí duàn shí jiān tā jiù huí lái ， fǒu zé zhè shǐ zhōng huì shì tā xīn lǐ de yí gè yí hàn ， tā bù xiǎng zài dà hǎi lǐ jú xiàn de guò wán zhè yì shēng 。`;

/**
 * 下载 CDN 文件
 */
function downloadCDNFile(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        let data = '';
        response.on('data', (chunk) => {
          data += chunk;
        });
        response.on('end', () => {
          resolve(data);
        });
      } else if (response.statusCode === 301 || response.statusCode === 302) {
        const redirectUrl = response.headers.location;
        downloadCDNFile(redirectUrl).then(resolve).catch(reject);
      } else {
        reject(new Error(`HTTP 状态码: ${response.statusCode}`));
      }
    }).on('error', (error) => {
      reject(error);
    });
  });
}

/**
 * 测试准确率
 */
function testAccuracy(pinyinFunc, name) {
  const corrects = correctPinyin.split(' ');
  const result = pinyinFunc(testText, { nonZh: 'consecutive' });
  const results = result.split(' ');

  let errors = 0;
  corrects.forEach((item, i) => {
    if (item !== results[i]) {
      errors++;
    }
  });

  const accuracy = ((1 - errors / corrects.length) * 100).toFixed(2);
  return { accuracy, errors, total: corrects.length };
}

/**
 * 测试速度（运行多次取平均值）
 */
function testSpeed(pinyinFunc, iterations = 100) {
  const start = Date.now();
  for (let i = 0; i < iterations; i++) {
    pinyinFunc(testText, { nonZh: 'consecutive' });
  }
  const end = Date.now();
  return (end - start) / iterations;
}

/**
 * 主函数
 */
async function compare() {
  const separator = isCI ? '========================================' : `${colors.bright}${colors.cyan}========================================${colors.reset}`;
  const title = isCI ? '   CDN vs Local 对比测试' : `${colors.bright}${colors.cyan}   CDN vs Local 对比测试${colors.reset}`;

  console.log(`\n${separator}`);
  console.log(title);
  console.log(`${separator}\n`);

  try {
    // 加载本地版本
    console.log(`${colors.yellow}正在加载本地版本...${colors.reset}`);
    const localPath = path.resolve(__dirname, '../dist/index.js');
    delete require.cache[require.resolve(localPath)];
    const { pinyin: localPinyin } = require(localPath);
    console.log(`${colors.green}✓ 本地版本加载成功${colors.reset}\n`);

    // 下载并加载 CDN 版本
    console.log(`${colors.yellow}正在下载 CDN 版本...${colors.reset}`);
    const cdnUrl = 'https://cdn.jsdelivr.net/npm/pinyin-pro/dist/index.js';
    const cdnCode = await downloadCDNFile(cdnUrl);

    // 创建临时文件保存 CDN 代码
    const tempPath = path.resolve(__dirname, '../dist/cdn-temp.js');
    fs.writeFileSync(tempPath, cdnCode);
    delete require.cache[require.resolve(tempPath)];
    const { pinyin: cdnPinyin } = require(tempPath);
    console.log(`${colors.green}✓ CDN 版本下载并加载成功${colors.reset}\n`);

    // 准确率测试
    console.log(`${colors.bright}${colors.blue}📊 准确率测试${colors.reset}`);
    console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);

    const localAccuracy = testAccuracy(localPinyin, '本地版本');
    const cdnAccuracy = testAccuracy(cdnPinyin, 'CDN 版本');

    console.log(`本地版本准确率: ${colors.green}${localAccuracy.accuracy}%${colors.reset} (错误: ${localAccuracy.errors}/${localAccuracy.total})`);
    console.log(`CDN 版本准确率:  ${colors.green}${cdnAccuracy.accuracy}%${colors.reset} (错误: ${cdnAccuracy.errors}/${cdnAccuracy.total})`);

    if (localAccuracy.accuracy === cdnAccuracy.accuracy) {
      console.log(`\n${isCI ? '✅' : colors.green + '✅' + colors.reset} 准确率相同`);
    } else {
      const diff = (parseFloat(localAccuracy.accuracy) - parseFloat(cdnAccuracy.accuracy)).toFixed(2);
      const diffText = diff > 0 ? `本地版本高 ${diff}%` : `CDN 版本高 ${Math.abs(diff)}%`;
      console.log(`\n${isCI ? '⚠️' : colors.yellow + '⚠️' + colors.reset} 准确率差异: ${diffText}`);
    }

    // 速度测试
    console.log(`\n${colors.bright}${colors.blue}⚡ 速度测试${colors.reset} (100次运行平均值)`);
    console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);

    const localSpeed = testSpeed(localPinyin);
    const cdnSpeed = testSpeed(cdnPinyin);

    console.log(`本地版本: ${colors.green}${localSpeed.toFixed(2)}ms${colors.reset} /次`);
    console.log(`CDN 版本:  ${colors.green}${cdnSpeed.toFixed(2)}ms${colors.reset} /次`);

    const speedDiff = ((localSpeed - cdnSpeed) / cdnSpeed * 100).toFixed(2);
    if (Math.abs(speedDiff) < 5) {
      console.log(`\n${isCI ? '✅' : colors.green + '✅' + colors.reset} 速度基本相同 (差异 < 5%)`);
    } else if (speedDiff < 0) {
      console.log(`\n${isCI ? '🚀' : colors.green + '🚀' + colors.reset} 本地版本更快 ${Math.abs(speedDiff)}%`);
    } else {
      console.log(`\n${isCI ? '⚠️' : colors.yellow + '⚠️' + colors.reset} CDN 版本更快 ${speedDiff}%`);
    }

    // 清理临时文件
    fs.unlinkSync(tempPath);

    console.log(`\n${separator}\n`);

    // 在 CI 环境中输出总结
    if (isCI && process.env.GITHUB_ACTIONS === 'true') {
      const accuracyStatus = localAccuracy.accuracy === cdnAccuracy.accuracy ? '✅' : '⚠️';
      const speedStatus = Math.abs(speedDiff) < 5 ? '✅' : (speedDiff < 0 ? '🚀' : '⚠️');
      console.log(`::notice title=CDN Comparison ${accuracyStatus}${speedStatus}::Accuracy: ${localAccuracy.accuracy}% (Local) vs ${cdnAccuracy.accuracy}% (CDN) | Speed: ${localSpeed.toFixed(2)}ms vs ${cdnSpeed.toFixed(2)}ms`);
    }

  } catch (error) {
    console.error(`${colors.red}❌ 测试失败: ${error.message}${colors.reset}`);
    process.exit(1);
  }
}

// 执行对比
compare();
