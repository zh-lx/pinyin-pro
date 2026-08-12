import DICT1 from "@/data/dict1";
import { customMultipleDict } from "@/core/custom/state";
import Surnames from "@/data/surname";
import type { SurnameMode } from "../../common/type";

/** 获取单字的全部拼音，供 pinyin、polyphonic 和 match 复用。 */
export const getAllPinyin = (char: string, surname: SurnameMode = "off") => {
  let pinyin = DICT1.get(char) ? DICT1.get(char).split(" ") : [];
  if (customMultipleDict.get(char)) {
    pinyin = customMultipleDict.get(char).split(" ");
  } else if (surname !== "off") {
    const surnamePinyin = Surnames[char];
    if (surnamePinyin) {
      pinyin = [surnamePinyin].concat(pinyin.filter((py) => py !== surnamePinyin));
    }
  }
  return pinyin;
};
