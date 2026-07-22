type Pinyin = string;
type Rate = number;
type Property = string;
export type SimpleDict = {
    [word: string]: Pinyin;
};
export type ComplexDict = {
    [word: string]: [Pinyin, Rate, Property];
};
export {};
