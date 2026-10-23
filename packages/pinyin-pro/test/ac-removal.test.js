import { describe, expect, it, vi } from 'vitest';
import { AC } from '../lib/common/segmentit';

const pattern = (zh, dict, pinyin = zh) => ({
  zh, dict, pinyin, length: [...zh].length, priority: 1, probability: 1,
});

function nodes(ac) {
  const reachable = new Set();
  const pending = [ac.root, ...ac.queues.flat()];
  for (const patterns of ac.dictMap.values()) {
    for (const item of patterns) pending.push(item.node);
  }
  while (pending.length) {
    const node = pending.pop();
    if (!node || reachable.has(node)) continue;
    reachable.add(node);
    pending.push(node.parent, node.fail, ...node.children.values());
  }
  return reachable;
}

const matches = (ac, text) => ac.match(text, 'off').map(({ pinyin }) => pinyin);

describe('AC dictionary removal', () => {
  it('reclaims different words across repeated removal cycles', () => {
    const ac = new AC();
    for (let i = 0; i < 20; i++) {
      const item = pattern(String.fromCharCode(0x4e00 + i) + '测试', 'temporary');
      ac.build([item]);
      ac.removeDict('temporary');
      expect(nodes(ac)).toEqual(new Set([ac.root]));
      expect(ac.dictMap.size).toBe(0);
      expect(ac.queues).toEqual([]);
      expect(item.node).toBeUndefined();
      expect(matches(ac, item.zh)).toEqual([]);
    }
  });

  it('keeps shared prefixes and equal-priority pattern order', () => {
    const ac = new AC();
    const first = pattern('甲乙', 'keep-A', 'first');
    const second = pattern('甲乙', 'keep-B', 'second');
    ac.build([first, pattern('甲丙', 'remove'), second]);
    const node = second.node;
    ac.removeDict('remove');
    expect(second.node).toBe(node);
    expect(matches(ac, '甲乙')).toEqual(['second']);
    expect(nodes(ac).size).toBe(3);
    ac.removeDict('keep-B');
    expect(matches(ac, '甲乙')).toEqual(['first']);
    expect(nodes(ac).size).toBe(3);
    ac.removeDict('keep-A');
    expect(nodes(ac).size).toBe(1);
  });

  it('keeps a prefix node while a longer word still needs it', () => {
    const ac = new AC();
    ac.build([pattern('甲', 'remove'), pattern('甲乙', 'keep')]);
    ac.removeDict('remove');
    expect(nodes(ac).size).toBe(3);
    expect(matches(ac, '甲乙')).toEqual(['甲乙']);
  });

  it('repairs failure chains and supports adding a removed suffix again', () => {
    const ac = new AC();
    const keep = pattern('甲乙丙', 'keep');
    const suffix = pattern('丙', 'suffix');
    const removed = pattern('乙丙', 'remove');
    ac.build([keep, suffix, removed]);
    const oldNode = removed.node;
    expect(keep.node.fail).toBe(oldNode);
    ac.removeDict('remove');
    expect(nodes(ac).has(oldNode)).toBe(false);
    expect(keep.node.fail).toBe(suffix.node);
    expect(oldNode.parent).toBe(null);
    expect(oldNode.fail).toBe(null);
    expect(matches(ac, '甲乙丙')).toEqual(['甲乙丙', '丙']);
    ac.build([pattern('乙丙', 'remove')]);
    expect(matches(ac, '甲乙丙')).toEqual(['甲乙丙', '乙丙', '丙']);
  });

  it('filters repeated patterns once and retains another dictionary at the same node', () => {
    const ac = new AC();
    const kept = pattern('甲乙', 'keep');
    ac.build([kept]);
    for (let i = 0; i < 10; i++) ac.build([pattern('甲乙', 'remove')]);
    ac.removeDict('remove');
    expect(kept.node.patterns).toEqual([kept]);
    expect(matches(ac, '甲乙')).toEqual(['甲乙']);
    ac.removeDict('remove');
    expect(nodes(ac).size).toBe(3);
  });

  it('removes queued nodes before matching the surviving dictionary', () => {
    const ac = new AC();
    ac.buildTrie([pattern('甲乙', 'remove'), pattern('乙丙', 'keep')]);
    ac.removeDict('remove');
    expect(ac.queues).toEqual([]);
    expect(nodes(ac).size).toBe(3);
    expect(matches(ac, '乙丙')).toEqual(['乙丙']);
  });

  it('preserves pending builds during removal', () => {
    const ac = new AC();
    ac.build([pattern('甲乙', 'remove')]);
    const pending = vi.fn(() => ac.build([pattern('乙丙', 'keep')]));
    ac.setPendingBuild(pending);
    ac.removeDict('remove');
    expect(pending).not.toHaveBeenCalled();
    expect(nodes(ac).size).toBe(1);
    expect(matches(ac, '乙丙')).toEqual(['乙丙']);
    expect(pending).toHaveBeenCalledTimes(1);
  });

  it('reclaims supplementary Unicode words', () => {
    const ac = new AC();
    const dict = Symbol('temporary');
    ac.build([pattern('𧒽测试', dict)]);
    ac.removeDict(dict);
    expect(nodes(ac).size).toBe(1);
  });
});
