const fs = require('fs');
const path= require('path');
const { parse } = require('node-html-parser');
const jieba = require('../data/complete.json')

const modernDictPath = path.resolve(__dirname, '../data/现代汉语词典.txt');
const modernDict = fs.readFileSync(modernDictPath, 'utf-8');

const mapData = new Set();

modernDict.split('\n').forEach((item, index) => {
  const root = parse(item);
  const mainData = root.querySelector('main');
  if (mainData) {
    const word = mainData.querySelector('.title')?.textContent;
    mapData.add(word)
  }
})

const usedData = {}

for (let key in jieba) {
  if (mapData.has(key)) {
    usedData[key] = jieba[key]
  }
}
fs.writeFileSync(path.resolve(__dirname, '../data/modern-dict.json'), JSON.stringify(usedData));