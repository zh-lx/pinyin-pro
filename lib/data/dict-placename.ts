/**
 * @file dict-placename.ts
 * @description 地名字典
 * 
 */

import { Priority } from '@/common/constant';
import type { Pattern } from '../common/ac';
const PLACENAME: { [prop: string]: string } = {
    // 安徽省
    歙县: 'shè xiàn',
    蚌埠: 'bèng bù',
    // “六”本与“陆”同音，标准南京话至今读入声“lu5”。北京旧有“lù”、“liù”的文白异读，今“六”文读“lù”已淘汰（“陆”则是白读“liù”被淘汰）。《现代汉语词典》曾为六合区及安徽省六安市设“lù”的异读，自第六版不包括这个读音在词典的范围之内[4] 。当地民众仍习惯读作旧音。
    六安: 'lù ān',
    六合县: 'lù hé xiàn',
    六合区: 'lù hé qū',
    六合专区: 'lù hé zhuān qū', 
    六国: 'lù guó', 

    // 西藏
    川藏: 'chuān zàng',
    青藏: 'qīng zàng',
};

export default PLACENAME;
export const PatternPlaceNameDict: Pattern[] = Object.keys(PLACENAME).map((key) => ({
  zh: key,
  pinyin: PLACENAME[key],
  priority: Priority.PLACENAME + key.length,
  length: key.length,
}));
