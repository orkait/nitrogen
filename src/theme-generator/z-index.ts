import { constructKeys, toEntries } from './types';

export const Z_INDEXES = {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
} as const;

const REGEX_Z_INDEXES = constructKeys(Object.keys(Z_INDEXES));

const generate = () => {
    const zIndexMapping: Record<string, string> = {};
    for (const [key, value] of toEntries(Z_INDEXES)) {
        zIndexMapping[`z-index-${key}`] = `z-index: ${value};`;
    }
    return zIndexMapping;
}

const regexStrings = [
    `z-index-(${REGEX_Z_INDEXES})$\\b`
]

export const regexList = regexStrings.map((regex) => new RegExp(regex, 'g'));

export default generate;