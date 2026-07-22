const traditionalDict: string[] = [];

export function addTraditionalDict(dict: Record<string, string>) {
  for (let key in dict) {
    const value = dict[key];
    const code = key.charCodeAt(0);
    traditionalDict[code] = value;
  }
}

export function getTraditionalDict() {
  return traditionalDict;
}
