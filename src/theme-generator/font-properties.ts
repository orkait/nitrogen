import { toEntries, fixValue, constructKeys } from "./types";

export const FONT_SIZE = {
    0: 0,
    4: 8,
    4.5: 9,
    5: 10,
    5.5: 11,
    6: 12,
    6.5: 13,
    7: 14,
    7.5: 15,
    8: 16,
    8.5: 17,
    9: 18,
    9.5: 19,
    10: 20,
    10.5: 21,
    11: 22,
    11.5: 23,
    12: 24,
    12.5: 25,
    13: 26,
} as const;

export const FONT_WEIGHT = {
    'regular': 400,
    'semibold': 600,
    'bold': 700,
    'extrabold': 800,
} as const;


const REGEX_FONT_KEYS = constructKeys(Object.keys(FONT_SIZE));
const REGEX_FONT_WEIGHT_KEYS = constructKeys(Object.keys(FONT_WEIGHT));


const generate = () => {
    const fontSizeMapping: Record<string, string> = {};
    const fontWeightMapping: Record<string, string> = {};

    for (const [key, value] of toEntries(FONT_SIZE)) {
        fontSizeMapping[`font-${fixValue(key)}`] = `font-size: ${value}px;`;
    }

    for (const [key, value] of toEntries(FONT_WEIGHT)) {
        fontWeightMapping[`font-${key}`] = `font-weight: ${value};`;
    }

    return {
        ...fontSizeMapping,
        ...fontWeightMapping,
    };
}

const regexStrings = [
    `font-(${REGEX_FONT_KEYS})$\\b`,
    `font-(${REGEX_FONT_WEIGHT_KEYS})$\\b`,
]

export const regexList = regexStrings.map((regex) => new RegExp(regex, 'g'));


export default generate;