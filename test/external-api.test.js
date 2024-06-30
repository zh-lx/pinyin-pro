import { getInitialAndFinal, getFinalParts, getNumOfTone } from "../lib/index";
import { expect, describe, it } from "vitest";

describe("final", () => {
  it("[external]initial and final", () => {
    const result = getInitialAndFinal("guang");
    expect(result).to.deep.equal({
      final: "uang",
      initial: "g",
    });
  });

  it("[external]getFinalParts", () => {
    const result = getFinalParts("guang");
    expect(result).to.deep.equal({
      body: "a",
      head: "u",
      tail: "ng",
    });
  });

  it("[external]getNumOfTone", () => {
    const result = getNumOfTone("hàn yǔ pīn yīn");
    expect(result).to.deep.equal("4 3 1 1");
  });
});
