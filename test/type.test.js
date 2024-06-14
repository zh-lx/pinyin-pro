import { pinyin } from "../lib/index";
import { expect, describe, it } from "vitest";
import path from 'path';
import fs from 'fs';

describe("types", () => {
  it("[types]no alias", () => {
    const typesDir = path.join(__dirname, '../types');
    let hasAlias = false;

    function checkFilesRecursively(dir) {
      const files = fs.readdirSync(dir);
    
      files.forEach((file) => {
        const filePath = path.join(dir, file);
        const stats = fs.statSync(filePath);
    
        if (stats.isDirectory()) {
          // 如果是文件夹，递归检查
          checkFilesRecursively(filePath);
        } else if (stats.isFile()) {
          // 如果是文件，检查内容是否包含 '@/'
          const data = fs.readFileSync(filePath, 'utf8');
          if (data.includes('@/')) {
            console.error('There are alias in .d.ts: ' + filePath);
            hasAlias = true;
          }
        }
      });
    }
    
    // 开始检查
    checkFilesRecursively(typesDir);

    expect(hasAlias).to.be.equal(false);
  });
});
