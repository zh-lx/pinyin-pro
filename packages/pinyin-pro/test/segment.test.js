import { addDict, segment, OutputFormat } from "../lib/index";
import { expect, describe, it } from "vitest";

const completeDict = require("@pinyin-pro/data/complete.json");

addDict(completeDict);

describe("segment format", () => {
  it("[format]AllSegment", () => {
    const result = segment(
      "小明硕士毕业于中国科学院计算所，后在日本京都大学深造"
    );
    expect(result).to.deep.equal([
      {
        origin: "小",
        result: "xiǎo",
      },
      {
        origin: "明",
        result: "míng",
      },
      {
        origin: "硕士",
        result: "shuòshì",
      },
      {
        origin: "毕业",
        result: "bìyè",
      },
      {
        origin: "于",
        result: "yú",
      },
      {
        origin: "中国科学院",
        result: "zhōngguókēxuéyuàn",
      },
      {
        origin: "计算所",
        result: "jìsuànsuǒ",
      },
      {
        origin: "，",
        result: "，",
      },
      {
        origin: "后",
        result: "hòu",
      },
      {
        origin: "在",
        result: "zài",
      },
      {
        origin: "日本京都大学",
        result: "rìběnjīngdūdàxué",
      },
      {
        origin: "深造",
        result: "shēnzào",
      },
    ]);
  });

  it("[format]AllArray", () => {
    const result = segment(
      "小明硕士毕业于中国科学院计算所，后在日本京都大学深造",
      { format: OutputFormat.AllArray }
    );
    expect(result).to.deep.equal([
      [
        {
          origin: "小",
          result: "xiǎo",
        },
      ],
      [
        {
          origin: "明",
          result: "míng",
        },
      ],
      [
        {
          origin: "硕",
          result: "shuò",
        },
        {
          origin: "士",
          result: "shì",
        },
      ],
      [
        {
          origin: "毕",
          result: "bì",
        },
        {
          origin: "业",
          result: "yè",
        },
      ],
      [
        {
          origin: "于",
          result: "yú",
        },
      ],
      [
        {
          origin: "中",
          result: "zhōng",
        },
        {
          origin: "国",
          result: "guó",
        },
        {
          origin: "科",
          result: "kē",
        },
        {
          origin: "学",
          result: "xué",
        },
        {
          origin: "院",
          result: "yuàn",
        },
      ],
      [
        {
          origin: "计",
          result: "jì",
        },
        {
          origin: "算",
          result: "suàn",
        },
        {
          origin: "所",
          result: "suǒ",
        },
      ],
      [
        {
          origin: "，",
          result: "，",
        },
      ],
      [
        {
          origin: "后",
          result: "hòu",
        },
      ],
      [
        {
          origin: "在",
          result: "zài",
        },
      ],
      [
        {
          origin: "日",
          result: "rì",
        },
        {
          origin: "本",
          result: "běn",
        },
        {
          origin: "京",
          result: "jīng",
        },
        {
          origin: "都",
          result: "dū",
        },
        {
          origin: "大",
          result: "dà",
        },
        {
          origin: "学",
          result: "xué",
        },
      ],
      [
        {
          origin: "深",
          result: "shēn",
        },
        {
          origin: "造",
          result: "zào",
        },
      ],
    ]);
  });

  it("[format]AllString", () => {
    const result = segment(
      "小明硕士毕业于中国科学院计算所，后在日本京都大学深造",
      {
        format: OutputFormat.AllString,
      }
    );
    expect(result).to.deep.equal({
      origin: "小 明 硕士 毕业 于 中国科学院 计算所 ， 后 在 日本京都大学 深造",
      result:
        "xiǎo míng shuòshì bìyè yú zhōngguókēxuéyuàn jìsuànsuǒ ， hòu zài rìběnjīngdūdàxué shēnzào",
    });
  });

  it("[format]PinyinSegment", () => {
    const result = segment(
      "小明硕士毕业于中国科学院计算所，后在日本京都大学深造",
      {
        format: OutputFormat.PinyinSegment,
      }
    );
    expect(result).to.deep.equal([
      "xiǎo",
      "míng",
      "shuòshì",
      "bìyè",
      "yú",
      "zhōngguókēxuéyuàn",
      "jìsuànsuǒ",
      "，",
      "hòu",
      "zài",
      "rìběnjīngdūdàxué",
      "shēnzào",
    ]);
  });

  it("[format]PinyinArray", () => {
    const result = segment(
      "小明硕士毕业于中国科学院计算所，后在日本京都大学深造",
      { format: OutputFormat.PinyinArray }
    );
    expect(result).to.deep.equal([
      ["xiǎo"],
      ["míng"],
      ["shuò", "shì"],
      ["bì", "yè"],
      ["yú"],
      ["zhōng", "guó", "kē", "xué", "yuàn"],
      ["jì", "suàn", "suǒ"],
      ["，"],
      ["hòu"],
      ["zài"],
      ["rì", "běn", "jīng", "dū", "dà", "xué"],
      ["shēn", "zào"],
    ]);
  });

  it("[format]PinyinString", () => {
    const result = segment(
      "小明硕士毕业于中国科学院计算所，后在日本京都大学深造",
      {
        format: OutputFormat.PinyinString,
      }
    );
    expect(result).to.deep.equal(
      "xiǎo míng shuòshì bìyè yú zhōngguókēxuéyuàn jìsuànsuǒ ， hòu zài rìběnjīngdūdàxué shēnzào"
    );
  });

  it("[format]ZhSegment", () => {
    const result = segment(
      "小明硕士毕业于中国科学院计算所，后在日本京都大学深造",
      {
        format: OutputFormat.ZhSegment,
      }
    );
    expect(result).to.deep.equal([
      "小",
      "明",
      "硕士",
      "毕业",
      "于",
      "中国科学院",
      "计算所",
      "，",
      "后",
      "在",
      "日本京都大学",
      "深造",
    ]);
  });

  it("[format]ZhArray", () => {
    const result = segment(
      "小明硕士毕业于中国科学院计算所，后在日本京都大学深造",
      { format: OutputFormat.ZhArray }
    );
    expect(result).to.deep.equal([
      ["小"],
      ["明"],
      ["硕", "士"],
      ["毕", "业"],
      ["于"],
      ["中", "国", "科", "学", "院"],
      ["计", "算", "所"],
      ["，"],
      ["后"],
      ["在"],
      ["日", "本", "京", "都", "大", "学"],
      ["深", "造"],
    ]);
  });

  it("[format]ZhString", () => {
    const result = segment(
      "小明硕士毕业于中国科学院计算所，后在日本京都大学深造",
      {
        format: OutputFormat.ZhString,
      }
    );
    expect(result).to.deep.equal(
      "小 明 硕士 毕业 于 中国科学院 计算所 ， 后 在 日本京都大学 深造"
    );
  });
});


describe("segment unexpected type", () => {
  it("segment unexpected type", () => {
    const result = segment(
      // @ts-ignore
      123
    );
    expect(result).to.be.equal(123)
  });
});

describe("segment surname mode", () => {
  it("segment surname mode", () => {
    const result = segment(
      "曾小贤你好",
      {
        mode: 'surname',
        format: OutputFormat.PinyinString
      }
    );
    expect(result).to.be.equal("zēng xiǎo xián nǐhǎo")
  });
});

describe("segment separator", () => {
  it("[format]separator", () => {
    const result = segment(
      "小明硕士毕业于中国科学院计算所，后在日本京都大学深造",
      {
        format: OutputFormat.AllString,
        separator: '/',
      }
    );
    expect(result).to.deep.equal({
      origin: "小/明/硕士/毕业/于/中国科学院/计算所/，/后/在/日本京都大学/深造",
      result:
        "xiǎo/míng/shuòshì/bìyè/yú/zhōngguókēxuéyuàn/jìsuànsuǒ/，/hòu/zài/rìběnjīngdūdàxué/shēnzào",
    });
  });
});

describe("segment final nonZh", () => {
  it("[separator]final nonZh", () => {
    const result = segment(
      "小明硕士毕业于中国科学院计算所，后在日本京都大学深造。",
      {
        format: OutputFormat.PinyinString,
      }
    );
    expect(result).to.deep.equal(
      "xiǎo míng shuòshì bìyè yú zhōngguókēxuéyuàn jìsuànsuǒ ， hòu zài rìběnjīngdūdàxué shēnzào 。"
    );
  });
});