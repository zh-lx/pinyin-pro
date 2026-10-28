import { convert } from '../lib/index';
import { expect, describe, it } from 'vitest';

describe('convert', () => {
  it('[convert]default', () => {
    const result = convert('pin1 yin1');
    expect(result).to.be.equal('pīn yīn');
  });

  it('[convert]separator', () => {
    const result = convert('pin1-yin1', { separator: '-' });
    expect(result).to.be.equal('pīn-yīn');
  });

  it('[convert]numToSymbol', () => {
    const result = convert('pin1 yin1', { format: 'numToSymbol' });
    expect(result).to.be.equal('pīn yīn');
  });

  it('[convert]symbolToNum', () => {
    const result = convert('pīn yīn', { format: 'symbolToNum' });
    expect(result).to.be.equal('pin1 yin1');
  });

  it('[convert]toneNone', () => {
    const result = convert('pīn yīn', { format: 'toneNone' });
    expect(result).to.be.equal('pin yin');
  });

  it('[convert]array', () => {
    const result = convert(['pin1', 'yin1']);
    expect(result).to.deep.equal(['pīn', 'yīn']);
  });

  it('[convert]array others', () => {
    const result = convert(['pin1', 'a', 'yin1']);
    expect(result).to.deep.equal(['pīn', 'a', 'yīn']);
  });

  it('[convert]string others', () => {
    const result = convert('pin1 a   yin1');
    expect(result).to.be.equal('pīn a   yīn');
  });

  it('[convert]v', () => {
    const result = convert('lv4 se4');
    expect(result).to.be.equal('lǜ sè');
  });

  it('[convert]v before e', () => {
    const result = convert('lve4 nve4 lve0');
    expect(result).to.be.equal('lüè nüè lüe');
  });

  it('[convert]format noen', () => {
    // @ts-ignore
    const result = convert('lv4 se4', { format: 'none' });
    expect(result).to.be.equal('lv4 se4');
  });

  it('[convert]numToSymbol abnormal', () => {
    const result = convert('l2', { format: 'numToSymbol' });
    expect(result).to.be.equal('l2');
  });

  it('[convert]numToSymbol iu', () => {
    const result = convert('liu2', { format: 'numToSymbol' });
    expect(result).to.be.equal('liú');
  });

  it('[convert]special tone', () => {
    const result = convert('m̄ hm ê̄ ế ê̌ ề', { format: 'symbolToNum' });
    expect(result).to.be.equal('m1 hm0 ê1 ê2 ê3 ê4');
  });

  // 儿化音 (erhua) tests
  it('[convert]erhua numToSymbol', () => {
    const result = convert('yi4 dian3r', { format: 'numToSymbol' });
    expect(result).to.be.equal('yì diǎnr');
  });

  it('[convert]erhua symbolToNum', () => {
    const result = convert('yì diǎnr', { format: 'symbolToNum' });
    expect(result).to.be.equal('yi4 dian3r');
  });

  it('[convert]erhua toneNone', () => {
    const result = convert('yì diǎnr', { format: 'toneNone' });
    expect(result).to.be.equal('yi dianr');
  });

  it('[convert]erhua numToSymbol hua1r', () => {
    const result = convert('hua1r', { format: 'numToSymbol' });
    expect(result).to.be.equal('huār');
  });

  it('[convert]erhua symbolToNum huār', () => {
    const result = convert('huār', { format: 'symbolToNum' });
    expect(result).to.be.equal('hua1r');
  });

  it('[convert]erhua does not affect er', () => {
    const result = convert('ér', { format: 'symbolToNum' });
    expect(result).to.be.equal('er2');
  });

  it('[convert]erhua numToSymbol does not affect er', () => {
    const result = convert('er2', { format: 'numToSymbol' });
    expect(result).to.be.equal('ér');
  });

  it('[convert]erhua numToSymbol array', () => {
    const result = convert(['dian3r', 'hua1r']);
    expect(result).to.deep.equal(['diǎnr', 'huār']);
  });
});
