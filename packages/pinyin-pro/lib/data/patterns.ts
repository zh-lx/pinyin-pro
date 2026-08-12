import { PatternNumberDict } from "@/data/special";
import { Pattern2 } from "@/data/dict2";
import { Pattern3 } from "@/data/dict3";
import { Pattern4 } from "@/data/dict4";
import { Pattern5 } from "@/data/dict5";
import { PatternSurname } from "@/data/surname";

export const PatternsNormal = [
  ...Pattern5,
  ...Pattern4,
  ...Pattern3,
  ...Pattern2,
  ...PatternNumberDict,
  ...PatternSurname,
];
