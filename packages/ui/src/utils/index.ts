export * from "./concat-string";

export const breakAndMerge = (str: string): string => {
    str = str.replace(/\n/g, " ").split(" ").map(x => x.trim()).join(" ");
    return str;
}