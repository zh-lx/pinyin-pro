const { pinyin, customPinyin, match } = require('../dist/index.cjs.js');
const expect = require('chai').expect;

describe('aggregate', () => {
  it('test1', () => {
    const result = pinyin('汉语拼音', { pattern: 'num', toneType: 'num' });
    expect(result).to.be.equal('4 3 1 1');
  });

  it('test2', () => {
    const result = pinyin('汉语拼音', {
      pattern: 'num',
      toneType: 'num',
      type: 'array',
    });
    expect(result).to.deep.equal(['4', '3', '1', '1']);
  });

  it('test3', () => {
    const result = pinyin('汉语拼音', { pattern: 'num', toneType: 'none' });
    expect(result).to.be.equal('4 3 1 1');
  });

  it('test4', () => {
    const result = pinyin('汉语拼音', {
      pattern: 'num',
      toneType: 'none',
      type: 'array',
    });
    expect(result).to.deep.equal(['4', '3', '1', '1']);
  });

  it('test5', () => {
    const result = pinyin('汉语拼音', { pattern: 'initial', toneType: 'num' });
    expect(result).to.be.equal('h4 y3 p1 y1');
  });

  it('test6', () => {
    const result = pinyin('汉语拼音', {
      pattern: 'initial',
      toneType: 'num',
      type: 'array',
    });
    expect(result).to.deep.equal(['h4', 'y3', 'p1', 'y1']);
  });

  it('test7', () => {
    const result = pinyin('汉语拼音', { pattern: 'final', toneType: 'num' });
    expect(result).to.be.equal('an4 u3 in1 in1');
  });

  it('test8', () => {
    const result = pinyin('汉语拼音', {
      pattern: 'final',
      toneType: 'num',
      type: 'array',
    });
    expect(result).to.deep.equal(['an4', 'u3', 'in1', 'in1']);
  });

  it('test9', () => {
    const result = pinyin('好', {
      pattern: 'final',
      toneType: 'num',
      multiple: true,
    });
    expect(result).to.be.equal('ao3 ao4');
  });

  it('test10', () => {
    const result = pinyin('好', {
      pattern: 'final',
      toneType: 'num',
      multiple: true,
      type: 'array',
    });
    expect(result).to.deep.equal(['ao3', 'ao4']);
  });
});

describe('boundary', () => {
  it('test1', () => {
    const result = pinyin('汉语拼音');
    expect(result).to.be.equal('hàn yǔ pīn yīn');
  });

  it('test2', () => {
    const result = pinyin('汉语拼音xxx.,');
    expect(result).to.be.equal('hàn yǔ pīn yīn x x x . ,');
  });

  it('test3', () => {
    const result = pinyin('汉语拼音', { type: 'array' });
    expect(result).to.deep.equal(['hàn', 'yǔ', 'pīn', 'yīn']);
  });

  it('test4', () => {
    const result = pinyin('汉语拼音xxx.,', { type: 'array' });
    expect(result).to.deep.equal([
      'hàn',
      'yǔ',
      'pīn',
      'yīn',
      'x',
      'x',
      'x',
      '.',
      ',',
    ]);
  });

  it('test5', () => {
    const result = pinyin('');
    expect(result).to.be.equal('');
  });

  it('test6', () => {
    const result = pinyin('', { type: 'array' });
    expect(result).to.deep.equal([]);
  });

  it('test7', () => {
    const result = pinyin('哈发生你看三零四');
    expect(result).to.be.equal('hā fā shēng nǐ kàn sān líng sì');
  });

  it('test8', () => {
    const result = pinyin('哈发生你看三零四', { type: 'array' });
    expect(result).to.deep.equal([
      'hā',
      'fā',
      'shēng',
      'nǐ',
      'kàn',
      'sān',
      'líng',
      'sì',
    ]);
  });

  it('test行不行', () => {
    const result = pinyin('行不行');
    expect(result).to.be.equal('xíng bù xíng');
  });
});

describe('multiple', () => {
  it('word', () => {
    const result = pinyin('汉语拼音', { multiple: true });
    expect(result).to.be.equal('hàn yǔ pīn yīn');
  });

  it('single', () => {
    const result = pinyin('好', { multiple: true });
    expect(result).to.be.equal('hǎo hào');
  });

  it('word-array', () => {
    const result = pinyin('汉语拼音', { multiple: true, type: 'array' });
    expect(result).to.deep.equal(['hàn', 'yǔ', 'pīn', 'yīn']);
  });

  it('single-array', () => {
    const result = pinyin('好', { multiple: true, type: 'array' });
    expect(result).to.deep.equal(['hǎo', 'hào']);
  });

  it('none-find', () => {
    const result = pinyin('a', { multiple: true, type: 'array' });
    expect(result).to.deep.equal(['a']);
  });
});

describe('pattern', () => {
  it('num', () => {
    const result = pinyin('汉语拼音', { pattern: 'num' });
    expect(result).to.be.equal('4 3 1 1');
  });

  it('num-array', () => {
    const result = pinyin('汉语拼音', { pattern: 'num', type: 'array' });
    expect(result).to.deep.equal(['4', '3', '1', '1']);
  });

  it('final', () => {
    const result = pinyin('汉语拼音', { pattern: 'final' });
    expect(result).to.be.equal('àn ǔ īn īn');
  });

  it('final-array', () => {
    const result = pinyin('汉语拼音', { pattern: 'final', type: 'array' });
    expect(result).to.deep.equal(['àn', 'ǔ', 'īn', 'īn']);
  });

  it('initial', () => {
    const result = pinyin('汉语拼音', { pattern: 'initial' });
    expect(result).to.be.equal('h y p y');
  });

  it('initial-array', () => {
    const result = pinyin('汉语拼音', { pattern: 'initial', type: 'array' });
    expect(result).to.deep.equal(['h', 'y', 'p', 'y']);
  });
});

describe('toneType', () => {
  it('num', () => {
    const result = pinyin('汉语拼音', { toneType: 'num' });
    expect(result).to.be.equal('han4 yu3 pin1 yin1');
  });

  it('num-array', () => {
    const result = pinyin('汉语拼音', { toneType: 'num', type: 'array' });
    expect(result).to.deep.equal(['han4', 'yu3', 'pin1', 'yin1']);
  });

  it('none', () => {
    const result = pinyin('汉语拼音', { toneType: 'none' });
    expect(result).to.be.equal('han yu pin yin');
  });

  it('none-嗯', () => {
    const result = pinyin('阿斯蒂芬嗯', { pattern: 'first', toneType: 'none' });
    expect(result).to.be.equal('a s d f n');
  });

  it('specials', () => {
    expect(pinyin('嗯')).to.be.equal('ǹg');
    expect(pinyin('哼')).to.be.equal('hēng', 'hng');
  });

  it('none-array', () => {
    const result = pinyin('汉语拼音', { toneType: 'none', type: 'array' });
    expect(result).to.deep.equal(['han', 'yu', 'pin', 'yin']);
  });

  it('symbol', () => {
    const result = pinyin('汉语拼音', { toneType: 'symbol' });
    expect(result).to.be.equal('hàn yǔ pīn yīn');
  });

  it('symbol-array', () => {
    const result = pinyin('汉语拼音', { toneType: 'symbol', type: 'array' });
    expect(result).to.deep.equal(['hàn', 'yǔ', 'pīn', 'yīn']);
  });

  it('first with num', () => {
    const result = pinyin('山西', { pattern: 'first', toneType: 'num' });
    expect(result).to.be.equal('s1 x1');
  });
});

describe('getPinyin', () => {
  it('double symbol', () => {
    const result = pinyin('aaaa');
    expect(result).to.be.equal('a a a a');
  });

  it('length greater than 5', () => {
    const result = pinyin('赵钱孙李吧你');
    expect(result).to.be.equal('zhào qián sūn lǐ ba nǐ');
  });

  it('dict2', () => {
    const result = pinyin('阿比让');
    expect(result).to.be.equal('ā bǐ ràng');
  });
});

describe('getNumOfTone', () => {
  it('no tone', () => {
    const result = pinyin('赵钱孙李吧你b', { pattern: 'num' });
    expect(result).to.be.equal('4 2 1 3 0 3 ');
  });
});

describe('surname', () => {
  it('multiple surname1', () => {
    const result = pinyin('万俟', { mode: 'surname' });
    expect(result).to.be.equal('mò qí');
  });

  it('multiple surname2', () => {
    const result = pinyin('我叫令狐冲', { mode: 'surname' });
    expect(result).to.be.equal('wǒ jiào líng hú chōng');
  });

  it('multiple surname2', () => {
    const result = pinyin('曾令狐冲', { mode: 'surname' });
    expect(result).to.be.equal('zēng líng hú chōng');
  });
});

describe('pinyinFn', () => {
  it('not string type', () => {
    const result = pinyin(2222);
    expect(result).to.be.equal(2222);
  });

  it('empty string', () => {
    const resultStr = pinyin('');
    const resultArr = pinyin('', { type: 'array' });
    expect(resultStr).to.be.equal('');
    expect(resultArr).to.deep.equal([]);
  });

  it('origin', () => {
    const result = pinyin('赵钱孙李吧');
    expect(result).to.be.equal('zhào qián sūn lǐ ba');
  });

  it('multiple', () => {
    const result = pinyin('好', { multiple: true });
    expect(result).to.be.equal('hǎo hào');
  });

  it('pattern', () => {
    const resultNumStr = pinyin('赵钱孙李吧', { pattern: 'num' });
    expect(resultNumStr).to.be.equal('4 2 1 3 0');

    const resultNumArr = pinyin('赵钱孙李吧', {
      pattern: 'num',
      type: 'array',
    });
    expect(resultNumArr).to.deep.equal(['4', '2', '1', '3', '0']);

    const resultInitial = pinyin('赵钱孙李吧', {
      pattern: 'initial',
    });
    expect(resultInitial).to.be.equal('zh q s l b');

    const resultFinal = pinyin('赵钱孙李吧', {
      pattern: 'final',
    });
    expect(resultFinal).to.be.equal('ào ián ūn ǐ a');

    const resultFirst = pinyin('赵钱孙李额', {
      pattern: 'first',
    });
    expect(resultFirst).to.be.equal('z q s l é');

    const resultFirst2 = pinyin('赵钱孙李额', {
      pattern: 'first',
      toneType: 'none',
    });
    expect(resultFirst2).to.be.equal('z q s l e');
  });

  it('toneType', () => {
    const resultNone = pinyin('赵钱孙李吧', { toneType: 'none' });
    expect(resultNone).to.be.equal('zhao qian sun li ba');

    const resultNum = pinyin('赵钱孙李吧', { toneType: 'num' });
    expect(resultNum).to.be.equal('zhao4 qian2 sun1 li3 ba0');
  });

  it('array', () => {
    const result = pinyin('赵钱孙李吧', { type: 'array' });
    expect(result).to.deep.equal(['zhào', 'qián', 'sūn', 'lǐ', 'ba']);
  });

  it('right_pinyin', () => {
    const result = pinyin('手下败将');
    expect(result).to.be.equal('shǒu xià bài jiàng');
  });

  it('left_pinyin', () => {
    const result = pinyin('避难所');
    expect(result).to.be.equal('bì nàn suǒ');
  });

  it('long_text', () => {
    const result = pinyin(
      `大海深处的一条美人鱼一直对大海之外的世界充满了好奇，她一直想要出去看看海之外的世界，她的父母兄弟姐妹们却告诉她海以外的世界非常险恶，人心非常险恶，如果人类发现她美人鱼的身份她就会陷入非常危险的境地，他们劝告她不要出去。她不相信，她觉得自己有能力保护好自己，等她玩一段时间她就回来，否则这始终会是她心里的一个遗憾，她不想在大海里局限的过完这一生。一天，她趁家里不注意偷偷溜上岸，幻化成人型，向离海越来越远的地方走去，美人鱼的美貌所到之处皆换来一阵惊叹，但她不知道的是她的身后一直跟着一个人，从她上岸的那刻开始。身后跟着的男人越来越接近她，在她毫无防备的情况下走向她，他打着想要跟她做朋友的名义与美人鱼交谈，美人鱼告诉他自己在家里是最小的所以自己叫小小，和家里闹了别扭就独自一人跑了出来，男人说：“我叫李浩博，你很有趣，我们可以做个朋友吗？”美人鱼心里非常高兴，没想到自己刚上岸这么快就有了朋友，单纯的美人鱼想也不想就答应了，天色渐晚，考虑到小小无处可去，李浩博问她是否愿意去自己家里先将就住着，小小想既然是朋友而且自己也没有去处就点了点头，等小小睡着后，李浩博走向一个偏僻的地方对着电话说了句又来了单生意，准备下，便挂了电话。第二天，李浩博问小小有没有工作，他可以给她介绍，小小好奇的问：“什么工作呀？”浩博对她说：“是可以让很多人知道你并且喜欢你的工作。”小小兴奋的答应了。吃过饭，浩博带她去了工作室签了协议，便将她交给了老师带她训练，每天唱歌，舞蹈的练习从未停止，虽然辛苦但为了让更多人认识她，她从不抱怨，浩博也每天忙完自己的事后就会来接她回家，会问她累不累，会给她做饭，一年之后她出道了，浩博帮她接了很多电视剧，电影，广告代言，小小的名气越来越大，粉丝越来越多，小小非常开心，浩博也一直担任着她的经纪人，慢慢的她越来越喜欢现在的生活，她甚至快忘了自己是条美人鱼，她觉得自己和其他人没有任何不同，也忘了要回到海里和海里的父母兄弟姐妹。她对浩博非常信任，他让自己做什么小小就会去做什么。虽然是一个新人，但她单纯，善良，娱乐圈里很多人都喜欢她，她的朋友也从开始的只有浩博变得越来越多，但她发现她对浩博却不再像是开始的朋友的情感，她好喜欢他，浩博对她也一直很好，小小觉得他应该也是喜欢自己的，她喝醉后他会照顾她，拍完戏累到不行的时候他会背她回家，她每天过的充实而又快乐，她好喜欢现在的生活，她希望一直像现在一样。每次接受采访，问到她与浩博是不是有不一样的关系，是不是已经在一起了，她总是笑笑，浩博跟她说对外必须说自己单身不然会影响她的发展，虽然她不在乎这些但是是浩博说的她只好答应，她觉得浩博这样做是为了保护她，十年过去，她已不再是当初刚出道的新人，手上的资源也越来越少，她想要安稳，想要浩博一直陪着她，可浩博和她在一起的时间越来越少，她对自己认为浩博也喜欢自己的想法动摇了，她问了好几次浩博喜不喜欢自己，他总是沉默或者找其他话题回避了这个问题，她想起之前一位前辈对她说的“期待所带来的满足感，最美好的，不是别人满足了自己的期待，而是我们满足了别人的期待。”“现在的我应该满足了他的期待了吧，我成为了他当初想让我成为的那种人，有了名气，可以给他带来财富，我不哭不闹，所有事情都听从他的安排，顺从他的心意，在他心里自己还有什么不好呢？”小小看着浩博想着。她觉得好累，每天不停的工作，完成他给她的每个任务，她想让自己好好休息一段时间，多一些和他相处的时间，她跟浩博说自己想休息一段时间，浩博想了想同意了，第二天她便宣布了自己将暂时退出娱乐圈，浩博送她回了家，他对她说明天带她去个地方就走了，她不知道他要带她去哪，但她相信他，她不知道他是什么时候回来的，他叫醒她的时候已经是第二天早晨了，一如既往地，他们一起吃过早餐，她跟在他身后来到一个从未来过的地方，这个地方好冷，他们一起走进去，她想要拉浩博，但他却突然跑开了，她愣在原地。一个铁制的笼子从天而降困住了她，她呆呆的望着浩博那张冷漠的脸，“我以为自己满足了你的期待，我以为我在你心里是不同的，我以为你起码对我是有一点喜欢的，我以为我们会一直在一起，我以为你会一直对我好的，原来，一切都只是我以为。为什么这么对我？”他冷冷地说：“因为你已经没有价值了，从一开始接近你就是为了利用你，就是为了让你给我赚钱，如果不是因为你对我来说是一笔巨大的财富，我怎么可能会去讨好你，说到底还是你太天真了，我说什么你都信。”小小现在才明白当初父母不让她上岸说的话，“你一开始就知道我的身份是不是？”“对，从你上岸的那一刻我就知道了，现在是你最后能发挥的价值了，也不枉我对你费心了这么多年。”“原来十几年的陪伴我在你眼里终究抵不过钱。”看着浩博决绝的转身离开的那刻小小哭的撕心裂肺，她后悔自己当初不管不顾的上岸了。她不知道自己要被带去哪，只从那些人的话语中知道他们要用自己做实验，研究东西。被运送去另一个地方的路上她被救了，是她的哥哥们将那些人打晕将她带回海里，看着哥哥们身上的血她好恨浩博，更恨自己，海里等着她的是父母兄弟姐妹，她才明白会一直在自己身后的只有家人，她发誓再不上岸，此后再不见人类。海底深处才是她的家，这些人鱼和每一条鱼才是她该依赖信任的，原来它们在这里，它们一直都在这里守着她。`
    );
    expect(result).to.be.equal(result);
  });
});

describe('match', () => {
  it('match1', () => {
    const result = match('欢迎使用汉语拼音', 'hy');
    expect(result).to.deep.equal([0, 1]);
  });

  it('match2', () => {
    const result = match('欢迎使用汉语拼音', 'yingshy');
    expect(result).to.deep.equal([1, 2, 3]);
  });

  it('match3', () => {
    const result = match('会计', 'kj');
    expect(result).to.deep.equal([0, 1]);
  });

  it('match4', () => {
    const result = match('会计', 'huij');
    expect(result).to.deep.equal([0, 1]);
  });

  it('match5', () => {
    const result = match('开会', 'kaiui');
    expect(result).to.deep.equal([0, 1]);
  });

  it('match6', () => {
    const result = match('开会', 'kaig');
    expect(result).to.deep.equal(null);
  });

  it('match7', () => {
    const result = match('开会', 'l');
    expect(result).to.deep.equal(null);
  });

  it('match8', () => {
    const result = match('汉语拼音', 'hanpin');
    expect(result).to.deep.equal([0, 2]);
  });

  it('match9', () => {
    const result = match('汉语拼音', 'hyupy');
    expect(result).to.deep.equal([0, 1, 2, 3]);
  });

  it('match9', () => {
    const result = match('𧒽测试', 'cs');
    expect(result).to.deep.equal([2, 3]);
  });

  it('match10', () => {
    const result = match('欢迎使用汉语拼音', '欢yingshy拼');
    expect(result).to.deep.equal([0, 1, 2, 3, 6]);
  });
});

describe('removeNonZh', () => {
  it('removeNonZh', () => {
    const result = pinyin('汉sa语2拼音', { removeNonZh: true });
    expect(result).to.be.equal('hàn yǔ pīn yīn');
  });

  it('removeNonZh', () => {
    const result = pinyin('saf21a', { removeNonZh: true });
    expect(result).to.be.equal('');
  });
});

describe('customConfig', () => {
  it('custom none', () => {
    customPinyin();
    const result = pinyin('干一行行一行');
    expect(result).to.be.equal('gān yī xíng xíng yī xíng');
  });

  it('custom1', () => {
    customPinyin({
      能: 'nài',
    });
    const result = pinyin('我姓能');
    expect(result).to.be.equal('wǒ xìng nài');
  });

  it('custom2', () => {
    customPinyin({
      好好: 'hào hǎo',
    });
    const result = pinyin('爱好好多');
    expect(result).to.be.equal('ài hào hǎo duō');
  });

  it('custom3', () => {
    customPinyin({
      哈什玛: 'hà shén mǎ',
    });
    const result = pinyin('哈什玛');
    expect(result).to.be.equal('hà shén mǎ');
  });

  it('custom4', () => {
    customPinyin({
      暴虎冯河: 'bào hǔ píng hé',
    });
    const result = pinyin('暴虎冯河');
    expect(result).to.be.equal('bào hǔ píng hé');
  });

  it('custom>5', () => {
    customPinyin({
      干一行行一行: 'gàn yī háng xíng yī háng',
    });
    const result = pinyin('干一行行一行');
    expect(result).to.be.equal('gàn yī háng xíng yī háng');
  });

  it('custom with surname', () => {
    customPinyin({
      乐嘉: 'lè jiā',
    });
    const result = pinyin('乐嘉啊', { mode: 'surname' });
    expect(result).to.be.equal('lè jiā a');

    const result1 = pinyin('啊乐嘉', { mode: 'surname' });
    expect(result1).to.be.equal('a lè jiā');

    const result2 = pinyin('啊乐嘉是', { mode: 'surname' });
    expect(result2).to.be.equal('a lè jiā shì');
  });

  it('customs', () => {
    customPinyin({
      好: 'hào',
      好好: 'hào hǎo',
    });
    const result = pinyin('好好');
    expect(result).to.be.equal('hào hǎo');
  });

  it('nonZh', () => {
    const result1 = pinyin('我very喜欢你');
    expect(result1).to.be.equal('wǒ v e r y xǐ huān nǐ');

    const result2 = pinyin('我very喜欢你', { nonZh: 'spaced' });
    expect(result2).to.be.equal('wǒ v e r y xǐ huān nǐ');

    const result3 = pinyin('我very喜欢你', { nonZh: 'consecutive' });
    expect(result3).to.be.equal('wǒ very xǐ huān nǐ');

    const result4 = pinyin('我very喜欢你', { nonZh: 'removed' });
    expect(result4).to.be.equal('wǒ xǐ huān nǐ');
  });

  it('double unicode', () => {
    const result1 = pinyin('𧒽');
    expect(result1).to.be.equal('𧒽');

    const result2 = pinyin('𧒽测试');
    expect(result2).to.be.equal('𧒽 cè shì');

    const result3 = pinyin('𧒽测试𧒽测试', {});
    expect(result3).to.be.equal('𧒽 cè shì 𧒽 cè shì');

    const result4 = pinyin('𧒽测试', { nonZh: 'consecutive' });
    expect(result4).to.be.equal('𧒽 cè shì');

    const result6 = pinyin('测试a𧒽𧒽a测试a𧒽𧒽a测试', {
      nonZh: 'consecutive',
    });
    expect(result6).to.be.equal('cè shì a𧒽𧒽a cè shì a𧒽𧒽a cè shì');
  });

  it('v', () => {
    const result1 = pinyin('吕布');
    expect(result1).to.be.equal('lǚ bù');

    const result2 = pinyin('吕布', { toneType: 'none' });
    expect(result2).to.be.equal('lü bu');

    const result3 = pinyin('吕布', { toneType: 'none', v: true });
    expect(result3).to.be.equal('lv bu');

    const result4 = pinyin('吕布', { v: true });
    expect(result4).to.be.equal('lǚ bù');

    // const result2 = pinyin('𧒽测试');
    // expect(result2).to.be.equal('𧒽 cè shì');
  });
});
