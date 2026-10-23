import { pinyin, addDict, removeDict } from '../lib/index';
import { afterEach, expect, describe, it } from 'vitest';

describe("addDict", () => {
  it("[addDict]string dict", () => {
    const stringDict = {
      汉语拼音: 'hàn yǔ pīn yīn'
    }
    addDict(stringDict);
    const result = pinyin("汉语拼音");
    expect(result).to.be.equal("hàn yǔ pīn yīn");
  });

  it("[addDict]array dict", () => {
    const stringDict = {
      汉语拼音: ['hàn yǔ pīn yīn']
    }
    addDict(stringDict, "arrayDict");
    removeDict('arrayDict');
    const result = pinyin("汉语拼音");
    expect(result).to.be.equal("hàn yǔ pīn yīn");
  });

  it("[addDict]array dict with probability and part of speech", () => {
    addDict({ 拼音: ['pīn yīn', 1, 'noun'] }, "arrayDictWithMetadata");
    const result = pinyin("拼音");
    expect(result).to.be.equal("pīn yīn");
    removeDict('arrayDictWithMetadata');
  });

  it("[addDict]dict handle add", () => {
    const stringDict = {
      汉: ['yīn']
    }
    addDict(stringDict, { name: "handle-add", dict1: 'add' });
    const result = pinyin("汉", { multiple: true });
    expect(result).to.be.equal("hàn yīn");
    removeDict('handle-add');
  });

  it("[addDict]dict handle replace", () => {
    const stringDict = {
      汉: ['yīn']
    }
    addDict(stringDict, { name: "handle-replace", dict1: 'replace' });
    const result = pinyin("汉", { multiple: true });
    expect(result).to.be.equal("yīn");
    removeDict('handle-replace');
  });

  it("[addDict]undefined dict", () => {
    const stringDict = {
      䃜: 'yī'
    }
    addDict(stringDict, { name: "handle-new" });
    const result = pinyin("䃜");
    expect(result).to.be.equal("yī");
    removeDict('handle-new');
  });

  it("[addDict]unnamed dict", () => {
    const stringDict = {
      䃜: 'yī'
    }
    addDict(stringDict);
    const result = pinyin("䃜");
    expect(result).to.be.equal("yī");
    removeDict();
  });

  it("[addDict]2 unicode dict", () => {
    const stringDict = {
      𧒽: 'lei'
    }
    addDict(stringDict, { name: 'double-unicode-dict' });
    const result = pinyin("𧒽");
    expect(result).to.be.equal("lei");
    removeDict('double-unicode-dict');
  });
});

describe("single-character dictionary ownership", () => {
  const read = (char = "汉") => pinyin(char, { multiple: true });

  afterEach(() => {
    removeDict("owner-A");
    removeDict("owner-B");
    removeDict();
  });

  it.each([
    ["replace", "replace", "yīn", "yǔ", "yīn"],
    ["add", "add", "hàn yǔ yīn", "hàn yǔ", "hàn yīn"],
    ["replace", "add", "yǔ yīn", "yǔ", "hàn yīn"],
    ["add", "replace", "yīn", "hàn yǔ", "yīn"],
  ])("replays %s then %s in either removal order", (first, second, both, onlyA, onlyB) => {
    const original = read();
    for (const removed of ["owner-A", "owner-B"]) {
      addDict({ 汉: "yǔ" }, { name: "owner-A", dict1: first });
      addDict({ 汉: "yīn" }, { name: "owner-B", dict1: second });
      expect(read()).to.equal(both);
      removeDict(removed);
      expect(read()).to.equal(removed === "owner-A" ? onlyB : onlyA);
      removeDict(removed);
      expect(read()).to.equal(removed === "owner-A" ? onlyB : onlyA);
      removeDict(removed === "owner-A" ? "owner-B" : "owner-A");
      expect(read()).to.equal(original);
    }
  });

  it.each(["owner-A", "owner-B"])("keeps repeated names in call order when removing %s", (removed) => {
    const original = read();
    addDict({ 汉: "yǔ" }, { name: "owner-A", dict1: "replace" });
    addDict({ 汉: "yīn" }, { name: "owner-B", dict1: "replace" });
    addDict({ 汉: "hàn" }, { name: "owner-A", dict1: "add" });
    expect(read()).to.equal("yīn hàn");
    removeDict(removed);
    expect(read()).to.equal(removed === "owner-A" ? "yīn" : "yǔ hàn");
    removeDict(removed === "owner-A" ? "owner-B" : "owner-A");
    expect(read()).to.equal(original);
  });

  it("retains duplicate additions owned by another dictionary", () => {
    addDict({ 汉: "yīn" }, { name: "owner-A" });
    addDict({ 汉: "yīn" }, { name: "owner-B" });
    expect(read()).to.equal("hàn yīn");
    removeDict("owner-A");
    expect(read()).to.equal("hàn yīn");
    removeDict("owner-B");
    expect(read()).to.equal("hàn");
  });

  it.each(["owner-A", "owner-B"])("ignores entries when removing %s", (removed) => {
    addDict({ 汉: "yīn" }, { name: "owner-A", dict1: "ignore" });
    addDict({ 汉: "yǔ" }, { name: "owner-B", dict1: "replace" });
    removeDict(removed);
    expect(read()).to.equal(removed === "owner-A" ? "yǔ" : "hàn");
    removeDict(removed === "owner-A" ? "owner-B" : "owner-A");
    expect(read()).to.equal("hàn");
  });

  it.each(["䃜", "𧒽"])("restores the original value for %s after name reuse", (char) => {
    const original = read(char);
    for (let cycle = 0; cycle < 2; cycle++) {
      addDict({ [char]: "yīn" }, { name: "owner-A", dict1: "replace" });
      addDict({ [char]: "yǔ" }, { name: "owner-A", dict1: "replace" });
      addDict({ [char]: "hàn" }, { name: "owner-B", dict1: "add" });
      removeDict("owner-A");
      expect(read(char)).to.equal(original === char ? "hàn" : `${original} hàn`);
      removeDict("owner-B");
      expect(read(char)).to.equal(original);
    }
  });

  it("keeps named entries when removing the unnamed dictionary", () => {
    addDict({ 汉: "yǔ" }, { dict1: "replace" });
    addDict({ 汉: "yīn" }, { name: "owner-B", dict1: "replace" });
    removeDict();
    expect(read()).to.equal("yīn");
    removeDict("owner-B");
    expect(read()).to.equal("hàn");
  });
});
