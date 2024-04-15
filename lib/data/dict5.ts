import { Probability, Priority } from '@/common/constant';
import type { Pattern } from  '../common/segmentit';
const DICT5: { [prop: string]: string } = {
  巴尔干半岛: 'bā ěr gàn bàn dǎo',
  巴尔喀什湖: 'bā ěr kā shí hú',
  不幸而言中: 'bú xìng ér yán zhòng',
  布尔什维克: 'bù ěr shí wéi kè',
  何乐而不为: 'hé lè ér bù wéi',
  苛政猛于虎: 'kē zhèng měng yú hǔ',
  蒙得维的亚: 'méng dé wéi dì yà',
  民以食为天: 'mín yǐ shí wéi tiān',
  事后诸葛亮: 'shì hòu zhū gě liàng',
  物以稀为贵: 'wù yǐ xī wéi guì',
  先下手为强: 'xiān xià shǒu wéi qiáng',
  行行出状元: 'háng háng chū zhuàng yuan',
  亚得里亚海: 'yà dé lǐ yà hǎi',
  眼不见为净: 'yǎn bú jiàn wéi jìng',
  竹筒倒豆子: 'zhú tǒng dào dòu zi',
};
export default DICT5;
export const Pattern5: Pattern[] = Object.keys(DICT5).map((key) => ({
  zh: key,
  pinyin: DICT5[key],
  probability: Probability.DICT,
  length: 5,
  priority: Priority.Normal,
  dict: Symbol('dict5'),
}));
