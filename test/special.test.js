const { pinyin } = require("../");
const expect = require("chai").expect;

describe("number", () => {
  it("[number]数字发音 一行", () => {
    const result = pinyin("一行");
    expect(result).to.be.equal("yì háng");
  });

  it("[number]数字发音 两行", () => {
    const result = pinyin("两行");
    expect(result).to.be.equal("liǎng háng");
  });

  it("[number]数字发音 多重", () => {
    const result = pinyin("多重");
    expect(result).to.be.equal("duō chóng");
  });

  it("[number]数字发音 一行人", () => {
    const result = pinyin("一行人");
    expect(result).to.be.equal("yì xíng rén");
  });

  it("[number]数字发音 二百零一行", () => {
    const result = pinyin("二百零一行");
    expect(result).to.be.equal("èr bǎi líng yī háng");
  });

  it('[number]数字发音（年份） 一九一零年', () => {
    const result = pinyin('一九一零年');
    expect(result).to.be.equal('yī jiǔ yī líng nián');
  });

  it('[number]数字发音（年份） 一九一〇年', () => {
    const result = pinyin('一九一〇年');
    expect(result).to.be.equal('yī jiǔ yī líng nián');
  });

  it('[number]数字发音（年份） 二〇一〇年', () => {
    const result = pinyin('二〇一〇年');
    expect(result).to.be.equal('èr líng yī líng nián');
  });

  it('[number]数字发音（年份） 二〇〇一年', () => {
    const result = pinyin('二〇〇一年');
    expect(result).to.be.equal('èr líng líng yī nián');
  });
});

// 连续变调
describe("tone sandhi for “一”", () => {
  it("[special tone sandhi]一", () => {
    const result = pinyin("一");
    expect(result).to.be.equal("yī");
  });

  it("[special tone sandhi]不", () => {
    const result = pinyin("不");
    expect(result).to.be.equal("bù");
  });

  it("[special tone sandhi]一面", () => {
    const result = pinyin("一面");
    expect(result).to.be.equal("yí miàn");
  });

  it("[special tone sandhi]一枕黄粱", () => {
    const result = pinyin("一枕黄粱");
    expect(result).to.be.equal("yì zhěn huáng liáng");
  });

  it("[special tone sandhi]说一说", () => {
    const result = pinyin("说一说");
    expect(result).to.be.equal("shuō yi shuō");
  });

  it("[special tone sandhi]一会儿", () => {
    const result = pinyin("一会儿");
    expect(result).to.be.equal("yí huì er");
  });

  it("[special tone sandhi for toneSandhi false]一会儿", () => {
    const result = pinyin("一会儿", { toneSandhi: false });
    expect(result).to.be.equal("yī huì er");
  });

  it("[special tone sandhi]一地鸡毛", () => {
    const result = pinyin("一地鸡毛", { toneSandhi: true });
    expect(result).to.be.equal("yí dì jī máo");
  });

  it("[special tone sandhi]一地", () => {
    const result = pinyin("一地", { toneSandhi: false });
    expect(result).to.be.equal("yī dì");
  });

  // 连读数字（只有开头的「一」变调）
  it("[special tone sandhi]一千一百一十一", () => {
    const result = pinyin("一千一百一十一", { toneSandhi: true });
    expect(result).to.be.equal("yì qiān yī bǎi yī shí yī");
  });

  // 文言文中的时间不变调
  it.skip("[special tone sandhi]十有一年而弃", () => {
    const result = pinyin("十有一年而弃", { toneSandhi: true });
    expect(result).to.be.equal("shí yòu yī nián ér qì");
  });

  it("[special tone sandhi]山一重水一重", () => {
    const result = pinyin("山一重水一重", { toneSandhi: true });
    expect(result).to.be.equal("shān yì chóng shuǐ yì chóng");
  });

  it("[special tone sandhi]一重山水", () => {
    const result = pinyin("一重山水", { toneSandhi: true });
    expect(result).to.be.equal("yì chóng shān shuǐ");
  });

  it.skip("[special tone sandhi]一重集团", () => {
    const result = pinyin("一重集团", { toneSandhi: true });
    expect(result).to.be.equal("yī zhòng jí tuán");
  });

  it.skip("[special tone sandhi]中央一台", () => {
    const result = pinyin("中央一台", { toneSandhi: true });
    expect(result).to.be.equal("zhōng yāng yī tái");
  });

  it.skip("[special tone sandhi]上海一中", () => {
    const result = pinyin("上海一中", { toneSandhi: true });
    expect(result).to.be.equal("shàng hǎi yī zhōng");
  });

  // 连续数字不变调
  it("[special tone sandhi]一二三四五", () => {
    const result = pinyin("一二三四五", { toneSandhi: true });
    expect(result).to.be.equal("yī èr sān sì wǔ");
  });

  // 作为时间（年份）时不变调
  it("[special tone sandhi]九一年", () => {
    const result = pinyin("九一年", { toneSandhi: true });
    expect(result).to.be.equal("jiǔ yī nián");
  });

  // 作为时间（日期）时不变调
  it("[special tone sandhi]五月一号", () => {
    const result = pinyin("五月一号", { toneSandhi: true });
    expect(result).to.be.equal("wǔ yuè yī hào");
  });

  // 当月和前面的连成一个词时就产生了歧义
  it.skip("[special tone sandhi]小月一口吃完了", () => {
    const result = pinyin("小月一口吃完了", { toneSandhi: true });
    expect(result).to.be.equal("xiǎo yuè yì kǒu chī wán le");
  });

  // 作为序数时不变调
  it("[special tone sandhi]一路公交", () => {
    const result = pinyin("一路公交", { toneSandhi: true });
    expect(result).to.be.equal("yī lù gōng jiāo");
  });

  // 但同样的词「一路」作为非序数时却要变调
  it("[special tone sandhi]一路顺风", () => {
    const result = pinyin("一路顺风", { toneSandhi: true });
    expect(result).to.be.equal("yí lù shùn fēng");
  });

  // 通过选项关闭变调
  it("[special tone sandhi]一路", () => {
    const result = pinyin("一路", { toneSandhi: false });
    expect(result).to.be.equal("yī lù");
  });

  // 「一、更」连用时根据上下文变调
  it("[special tone sandhi]一更天", () => {
    const result = pinyin("一更天", { toneSandhi: true });
    expect(result).to.be.equal("yī gēng tiān");
  });

  it("[special tone sandhi]一声声一更更", () => {
    const result = pinyin("一声声一更更", { toneSandhi: true });
    expect(result).to.be.equal("yì shēng shēng yì gēng gēng");
  });

  it("[special tone sandhi]风一更雪一更", () => {
    const result = pinyin("风一更雪一更", { toneSandhi: true });
    expect(result).to.be.equal("fēng yì gēng xuě yì gēng");
  });

  // 通过选项关闭变调
  it("[special tone sandhi]一更", () => {
    const result = pinyin("一更", { toneSandhi: false });
    expect(result).to.be.equal("yī gēng");
  });

  it("[special tone sandhi]风一更一声声", () => {
    const result = pinyin("风一更一声声", { toneSandhi: false });
    expect(result).to.be.equal("fēng yī gēng yī shēng shēng");
  });

  // 成语中的序数也不变调
  it("[special tone sandhi]有一说一", () => {
    const result = pinyin("有一说一", { toneSandhi: true });
    expect(result).to.be.equal("yǒu yī shuō yī");
  });

  // 测试「之一」与「得之一寸光中」的「一寸」冲突时的处理
  it("[special tone sandhi]得之一寸光", () => {
    const result = pinyin("得之一寸光", { toneSandhi: true });
    expect(result).to.be.equal("dé zhī yí cùn guāng");
  });
});

describe("tone sandhi for “不”", () => {
  // 不变调
  it("[special tone sandhi]不甘", () => {
    const result = pinyin("不甘");
    expect(result).to.be.equal("bù gān");
  });

  it("[special tone sandhi]他说不！", () => {
    const result = pinyin("他说不！");
    expect(result).to.be.equal("tā shuō bù ！");
  });

  it("[special tone sandhi]要不你走", () => {
    const result = pinyin("要不你走");
    expect(result).to.be.equal("yào bù nǐ zǒu");
  });

  // 变调为二声
  it("[special tone sandhi]不悦", () => {
    const result = pinyin("不悦");
    expect(result).to.be.equal("bú yuè");
  });

  // 变调为轻声
  it("[special tone sandhi]说不说", () => {
    const result = pinyin("说不说");
    expect(result).to.be.equal("shuō bu shuō");
  });
});

describe("交叉词语测试", () => {
  it("[special tone sandhi]难为", () => {
    const result = pinyin("难为");
    expect(result).to.be.equal("nán wéi");
  });

  it("[special tone sandhi]曾经沧海难为水", () => {
    const result = pinyin("曾经沧海难为水");
    expect(result).to.be.equal("céng jīng cāng hǎi nán wéi shuǐ");
  });

  it("[special tone sandhi]以那次空难为例", () => {
    const result = pinyin("以那次空难为例");
    expect(result).to.be.equal("yǐ nà cì kōng nàn wéi lì");
  });

  it("[special tone sandhi]空难为何发生", () => {
    const result = pinyin("空难为何发生");
    expect(result).to.be.equal("kōng nàn wèi hé fā shēng");
  });
});


describe('[special tone sandhi]绕口令', () => {
  it('[special tone sandhi]绕口令1', () => {
    const result = pinyin('校服上除了校徽别别别的，让你们别别别的别别别的你非得别别的');
    expect(result).to.be.equal('xiào fú shàng chú le xiào huī bié biè bié de ， ràng nǐ men bié biè bié de bié biè bié de nǐ fēi děi biè bié de');
  });

  it('[special tone sandhi]绕口令2', () => {
    const result = pinyin('人要是行干一行行一行，一行行行行行，行行行干哪行都行');
    expect(result).to.be.equal('rén yào shi xíng gàn yì háng xíng yì háng ， yì háng xíng háng háng xíng ， háng háng xíng gàn nǎ háng dōu xíng');
  });

  it('[special tone sandhi]绕口令3', () => {
    const result = pinyin('要是不行，干一行不行一行，一行不行行行不行，行行不行，干哪行都不行');
    expect(result).to.be.equal('yào shi bù xíng ， gàn yì háng bù xíng yì háng ， yì háng bù xíng háng háng bù xíng ， háng háng bù xíng ， gàn nǎ háng dōu bù xíng');
  });

  it('[special tone sandhi]了', () => {
    const result = pinyin('了吧');
    expect(result).to.be.equal('liǎo ba');
  });
});
