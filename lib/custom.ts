let customDict: { [key: string]: string } = {};

/**
 * @description: 用户自定义拼音
 * @param {{ [key: string]: string }} config 用户自定义的拼音映射（支持汉字、词语、句子的映射），若匹配到该映射，优先将汉字转换为该映射
 */
export function customPinyin(config: { [key: string]: string } = {}) {
  customDict = {};
  const keys = Object.keys(config).sort(
    (key1, key2) => key2.length - key1.length
  );
  keys.forEach((key) => {
    customDict[key] = config[key];
  });
}

export const getCustomDict = () => {
  return customDict;
};

export function hasCustomConfig() {
  for (let key in customDict) {
    return true;
  }
  return false;
}
