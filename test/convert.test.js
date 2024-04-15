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

  it('[convert]format noen', () => {
    // @ts-ignore
    const result = convert('lv4 se4', { format: 'none' });
    expect(result).to.be.equal('lv4 se4');
  });

  it('[convert]numToSymbol abnormal', () => {
    const result = convert('l2', { format: 'numToSymbol' });
    expect(result).to.be.equal('l2');
  });
});
