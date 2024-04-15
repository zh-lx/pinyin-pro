const { pinyin } = require("../");
const expect = require("chai").expect;

describe("toneSandhi", () => {
  it("[toneSandhi]不", () => {
    const result = pinyin("不是", { toneSandhi: false });
    expect(result).to.be.equal("bù shì");
  });

});
