import { splitString } from "@/common/utils";
import { MatchPattern } from "../../common/segmentit";
import { SingleWordResult } from "../../common/type";

interface OriginSegment {
  segment: {
    origin: string;
    result: string;
  }[];
  isZh: boolean;
}

export enum OutputFormat {
  AllSegment = 1,
  AllArray = 2,
  AllString = 3,
  PinyinSegment = 4,
  PinyinArray = 5,
  PinyinString = 6,
  ZhSegment = 7,
  ZhArray = 8,
  ZhString = 9,
}

export interface Output {
  AllSegment: { origin: string, result: string, }[];
  AllArray: { origin: string, result: string, }[][];
  AllString: { origin: string, result: string, };
  PinyinSegment: string[];
  PinyinArray: string[][];
  PinyinString: string;
  ZhSegment: string[];
  ZhArray: string[][];
  ZhString: string;
}


export function middlewareSegment(list: SingleWordResult[], matches: MatchPattern[]): OriginSegment[] {
  const segments: OriginSegment[] = [];

  let i = 0;
  let j = 0;
  while (i < list.length && j < matches.length) {
    const match = matches[j];
    const item = list[i];

    if (match.zh.startsWith(item.origin)) {
      const start = i;
      const chars = splitString(match.zh);
      let cur = start + 1;
      while (cur < list.length && list[cur].origin === chars[cur - start]) {
        cur++;
      }
      const _segment = list.slice(start, cur);
      segments.push({
        segment: _segment.map((item) => ({
          origin: item.origin,
          result: item.result,
        })),
        isZh: true,
      });
      i += cur - start;
      j++;
    } else {
      segments.push({
        segment: [
          {
            origin: item.origin,
            result: item.result,
          }
        ],
        isZh: false,
      });
      i++;
    }
  }

  while (i < list.length) {
    const item = list[i];
    segments.push({
      segment: [
        {
          origin: item.origin,
          result: item.result,
        }
      ],
      isZh: false,
    });
    i++;
  }

  return segments;
}


export function middlewareOutputFormat(segments: OriginSegment[], options: { format?: OutputFormat, separator?: string } ) {
  const { format = OutputFormat.AllSegment, separator = ' ' } = options;
  if (format === OutputFormat.AllSegment) {
    return segments.map(item => {
      return {
        origin: item.segment.map(item => item.origin).join(''),
        result: item.segment.map(item => item.result).join(''),
      }
    });
  } else if (format === OutputFormat.AllArray) {
    return segments.map(item => item.segment);
  } else if (format === OutputFormat.AllString) {
    const list = segments.map(item => {
      return {
        origin: item.segment.map(item => item.origin).join(''),
        result: item.segment.map(item => item.result).join(''),
      }
    });
    return {
      origin: list.map(item => item.origin).join(separator),
      result: list.map(item => item.result).join(separator),
    };
  } else if (format === OutputFormat.PinyinSegment) {
    return segments.map(item => item.segment.map(item => item.result).join(''));
  } else if (format === OutputFormat.PinyinArray) {
    return segments.map(item => item.segment.map(item => item.result));
  } else if (format === OutputFormat.PinyinString) {
    return segments.map(item => item.segment.map(item => item.result).join('')).join(separator);
  } else if (format === OutputFormat.ZhSegment) {
    return segments.map(item => item.segment.map(item => item.origin).join(''));
  } else if (format === OutputFormat.ZhArray) {
    return segments.map(item => item.segment.map(item => item.origin));
  } else if (format === OutputFormat.ZhString) {
    return segments.map(item => item.segment.map(item => item.origin).join('')).join(separator);
  };
}