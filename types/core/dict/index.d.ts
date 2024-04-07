type DICT = {
    [key: string]: string | [string] | [string, number] | [string, number, string];
};
export declare function addDict(dict: DICT | {}, name?: string): void;
export declare function removeDict(dictName: string): void;
export {};
