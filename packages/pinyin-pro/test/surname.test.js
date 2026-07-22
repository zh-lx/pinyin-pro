import { pinyin } from "../lib/index";
import { expect, describe, it } from "vitest";

describe("surname", () => {
  it("[surname]multiple surname1", () => {
    const result = pinyin("万俟", { mode: "surname" });
    expect(result).to.be.equal("mò qí");
  });

  it("[surname]multiple surname2", () => {
    const result = pinyin("我叫令狐冲", { mode: "surname" });
    expect(result).to.be.equal("wǒ jiào líng hú chōng");
  });

  it("[surname]multiple surname3", () => {
    const result = pinyin("曾令狐冲", { mode: "surname" });
    expect(result).to.be.equal("zēng líng hú chōng");
  });

  it("[surname]multiple surname4", () => {
    const result = pinyin("我叫区中青", { mode: "surname" });
    expect(result).to.be.equal("wǒ jiào ōu zhōng qīng");
  });

  it("[surname]multiple surname5", () => {
    const result = pinyin("我叫覃晓旭", { mode: "surname" });
    expect(result).to.be.equal("wǒ jiào qín xiǎo xù");
  });

  it("[surname]multiple surname6", () => {
    const result = pinyin("我叫朴岁植", { mode: "surname" });
    expect(result).to.be.equal("wǒ jiào piáo suì zhí");
  });

  it("[surname]multiple surname head", () => {
    const result = pinyin("曾乐乐", { mode: "surname", surname: "head" });
    expect(result).to.be.equal("zēng lè lè");
  });

  it("[surname]multiple surname head2", () => {
    const result = pinyin("曾经沧海难为水好好学习乐", {
      mode: "surname",
      surname: "head",
    });
    expect(result).to.be.equal(
      "zēng jīng cāng hǎi nán wèi shuǐ hǎo hǎo xué xí lè"
    );
  });

  it("[surname]surname head double", () => {
    const result = pinyin("令狐冲", { surname: "head" });
    expect(result).to.be.equal("líng hú chōng");

    const result1 = pinyin("万俟英", { surname: "head" });
    expect(result1).to.be.equal("mò qí yīng");
  });
});
