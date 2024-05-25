import { constructKeys, toEntries } from './types';

export const LIST_STYLE = {
    none: 'none',
    disc: 'disc',
    circle: 'circle',
    square: 'square',
    decimal: 'decimal',
    'decimal-leading-zero': 'decimal-leading-zero',
    'lower-roman': 'lower-roman',
} as const;

const REGEX_LIST_STYLE_KEYS = constructKeys(Object.keys(LIST_STYLE));

const generate = (hash: string = "") => {
    const listStyleMapping: Record<string, string> = {};

    for (const [key, value] of toEntries(LIST_STYLE)) {
        listStyleMapping[`list-style-${key}`] = `list-style: ${value};`;
    }
    return {
        base: listStyleMapping,
        responsive: {},
        hash
    };
}

const regexStrings = [
    `^list-style-(${REGEX_LIST_STYLE_KEYS})$`,
]

export const regexList = regexStrings.map((regex) => new RegExp(regex, 'g'));
export default generate;