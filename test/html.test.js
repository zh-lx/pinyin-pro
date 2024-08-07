import { html } from '../lib/index';
import { expect, describe, it } from 'vitest';

describe('html', () => {
  it('[html]正常拼音', () => {
    const result = html('汉语拼音');
    expect(result).to.be.equal(
      '<span class="py-result-item"><ruby><span class="py-chinese-item">汉</span><rp>(</rp><rt class="py-pinyin-item">hàn</rt><rp>)</rp></ruby></span><span class="py-result-item"><ruby><span class="py-chinese-item">语</span><rp>(</rp><rt class="py-pinyin-item">yǔ</rt><rp>)</rp></ruby></span><span class="py-result-item"><ruby><span class="py-chinese-item">拼</span><rp>(</rp><rt class="py-pinyin-item">pīn</rt><rp>)</rp></ruby></span><span class="py-result-item"><ruby><span class="py-chinese-item">音</span><rp>(</rp><rt class="py-pinyin-item">yīn</rt><rp>)</rp></ruby></span>'
    );
  });

  it('[html]不带音调', () => {
    const result = html('汉语拼音', { toneType: 'none' });
    expect(result).to.be.equal(
      '<span class="py-result-item"><ruby><span class="py-chinese-item">汉</span><rp>(</rp><rt class="py-pinyin-item">han</rt><rp>)</rp></ruby></span><span class="py-result-item"><ruby><span class="py-chinese-item">语</span><rp>(</rp><rt class="py-pinyin-item">yu</rt><rp>)</rp></ruby></span><span class="py-result-item"><ruby><span class="py-chinese-item">拼</span><rp>(</rp><rt class="py-pinyin-item">pin</rt><rp>)</rp></ruby></span><span class="py-result-item"><ruby><span class="py-chinese-item">音</span><rp>(</rp><rt class="py-pinyin-item">yin</rt><rp>)</rp></ruby></span>'
    );
  });

  it('[html-non-chinese]带标点', () => {
    const result = html('汉语，拼音');
    expect(result).to.be.equal(
      '<span class="py-result-item"><ruby><span class="py-chinese-item">汉</span><rp>(</rp><rt class="py-pinyin-item">hàn</rt><rp>)</rp></ruby></span><span class="py-result-item"><ruby><span class="py-chinese-item">语</span><rp>(</rp><rt class="py-pinyin-item">yǔ</rt><rp>)</rp></ruby></span>，<span class="py-result-item"><ruby><span class="py-chinese-item">拼</span><rp>(</rp><rt class="py-pinyin-item">pīn</rt><rp>)</rp></ruby></span><span class="py-result-item"><ruby><span class="py-chinese-item">音</span><rp>(</rp><rt class="py-pinyin-item">yīn</rt><rp>)</rp></ruby></span>'
    );
  });

  it('[html-wrap-non-chinese]带标点包裹', () => {
    const result = html('汉语，拼音', { wrapNonChinese: true });
    expect(result).to.be.equal(
      `<span class="py-result-item"><ruby><span class="py-chinese-item">汉</span><rp>(</rp><rt class="py-pinyin-item">hàn</rt><rp>)</rp></ruby></span><span class="py-result-item"><ruby><span class="py-chinese-item">语</span><rp>(</rp><rt class="py-pinyin-item">yǔ</rt><rp>)</rp></ruby></span><span class="py-non-chinese-item">，</span><span class="py-result-item"><ruby><span class="py-chinese-item">拼</span><rp>(</rp><rt class="py-pinyin-item">pīn</rt><rp>)</rp></ruby></span><span class="py-result-item"><ruby><span class="py-chinese-item">音</span><rp>(</rp><rt class="py-pinyin-item">yīn</rt><rp>)</rp></ruby></span>`
    );
  });

  it('[html-wrap-non-chinese]带标点包裹', () => {
    const result = html('汉语，拼音', {
      wrapNonChinese: true,
    });
    expect(result).to.be.equal(
      `<span class="py-result-item"><ruby><span class="py-chinese-item">汉</span><rp>(</rp><rt class="py-pinyin-item">hàn</rt><rp>)</rp></ruby></span><span class="py-result-item"><ruby><span class="py-chinese-item">语</span><rp>(</rp><rt class="py-pinyin-item">yǔ</rt><rp>)</rp></ruby></span><span class="py-non-chinese-item">，</span><span class="py-result-item"><ruby><span class="py-chinese-item">拼</span><rp>(</rp><rt class="py-pinyin-item">pīn</rt><rp>)</rp></ruby></span><span class="py-result-item"><ruby><span class="py-chinese-item">音</span><rp>(</rp><rt class="py-pinyin-item">yīn</rt><rp>)</rp></ruby></span>`
    );
  });

  it('[html-custom-class]自定义类名', () => {
    const result = html('汉语，拼音', {
      wrapNonChinese: true,
      resultClass: 'my-result',
      chineseClass: 'my-chinese',
      pinyinClass: 'my-pinyin',
      nonChineseClass: 'my-non-chinese',
    });
    expect(result).to.be.equal(
      `<span class="my-result"><ruby><span class="my-chinese">汉</span><rp>(</rp><rt class="my-pinyin">hàn</rt><rp>)</rp></ruby></span><span class="my-result"><ruby><span class="my-chinese">语</span><rp>(</rp><rt class="my-pinyin">yǔ</rt><rp>)</rp></ruby></span><span class="my-non-chinese">，</span><span class="my-result"><ruby><span class="my-chinese">拼</span><rp>(</rp><rt class="my-pinyin">pīn</rt><rp>)</rp></ruby></span><span class="my-result"><ruby><span class="my-chinese">音</span><rp>(</rp><rt class="my-pinyin">yīn</rt><rp>)</rp></ruby></span>`
    );
  });

  it('[html]正常拼音', () => {
    const result = html('汉语拼音', {
      customClassMap: {
        'hightlight': ['汉', '拼'],
        'bold': ['音'],
        'useless': ['你'],
      }
    });
    expect(result).to.be.equal(
      '<span class="py-result-item hightlight"><ruby><span class="py-chinese-item">汉</span><rp>(</rp><rt class="py-pinyin-item">hàn</rt><rp>)</rp></ruby></span><span class="py-result-item"><ruby><span class="py-chinese-item">语</span><rp>(</rp><rt class="py-pinyin-item">yǔ</rt><rp>)</rp></ruby></span><span class="py-result-item hightlight"><ruby><span class="py-chinese-item">拼</span><rp>(</rp><rt class="py-pinyin-item">pīn</rt><rp>)</rp></ruby></span><span class="py-result-item bold"><ruby><span class="py-chinese-item">音</span><rp>(</rp><rt class="py-pinyin-item">yīn</rt><rp>)</rp></ruby></span>'
    );
  });

  it('[html]非汉字：字母a', () => {
    const result = html('a');
    expect(result).to.be.equal('a');
  });

  it('[html]非中国汉字：𦒹', () => {
    const result = html('𦒹');
    expect(result).to.be.equal('𦒹');
  });

  it('[html]非中国汉字 + wrapNonChinese: true', () => {
    const result = html('𦒹', {
      wrapNonChinese: true,
    });
    expect(result).to.be.equal('<span class="py-non-chinese-item">𦒹</span>');
  });

  it('[html]非汉字和汉字混合', () => {
    const result = html('汉字abc');
    expect(result).to.be.equal('<span class="py-result-item"><ruby><span class="py-chinese-item">汉</span><rp>(</rp><rt class="py-pinyin-item">hàn</rt><rp>)</rp></ruby></span><span class="py-result-item"><ruby><span class="py-chinese-item">字</span><rp>(</rp><rt class="py-pinyin-item">zì</rt><rp>)</rp></ruby></span>abc');
  });

  it('[html-custom-class]自定义类名控制', () => {
    const result = html('汉语，拼音', {
      wrapNonChinese: true,
      // @ts-ignore
      resultClass: false,
      // @ts-ignore
      chineseClass: null,
      // @ts-ignore
      pinyinClass: false,
      // @ts-ignore
      nonChineseClass: null,
    });
    expect(result).to.be.equal(
      `<span class="py-result-item"><ruby><span class="py-chinese-item">汉</span><rp>(</rp><rt class="py-pinyin-item">hàn</rt><rp>)</rp></ruby></span><span class="py-result-item"><ruby><span class="py-chinese-item">语</span><rp>(</rp><rt class="py-pinyin-item">yǔ</rt><rp>)</rp></ruby></span><span class="py-non-chinese-item">，</span><span class="py-result-item"><ruby><span class="py-chinese-item">拼</span><rp>(</rp><rt class="py-pinyin-item">pīn</rt><rp>)</rp></ruby></span><span class="py-result-item"><ruby><span class="py-chinese-item">音</span><rp>(</rp><rt class="py-pinyin-item">yīn</rt><rp>)</rp></ruby></span>`
    );
  });

  it('[html-custom-class]remove rp', () => {
    const result = html('汉语，拼音', {
      rp: false,
    });
    expect(result).to.be.equal(
      `<span class="py-result-item"><ruby><span class="py-chinese-item">汉</span><rt class="py-pinyin-item">hàn</rt></ruby></span><span class="py-result-item"><ruby><span class="py-chinese-item">语</span><rt class="py-pinyin-item">yǔ</rt></ruby></span>，<span class="py-result-item"><ruby><span class="py-chinese-item">拼</span><rt class="py-pinyin-item">pīn</rt></ruby></span><span class="py-result-item"><ruby><span class="py-chinese-item">音</span><rt class="py-pinyin-item">yīn</rt></ruby></span>`
    );
  });
});
