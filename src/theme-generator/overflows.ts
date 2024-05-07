import { constructKeys, toEntries } from "./types";

export const OVERFLOWS = {
    auto: 'auto',
    hidden: 'hidden',
    visible: 'visible',
    scroll: 'scroll',
} as const;

const REGEX_OVERFLOW_KEYS = constructKeys(Object.keys(OVERFLOWS));

const generate = () => {
    const overflowMapping: Record<string, string> = {};
    for (const [key, value] of toEntries(OVERFLOWS)) {
        overflowMapping[`overflow-${key}`] = `overflow: ${value};`;
    }
    return overflowMapping;
}

const regexStrings = [
    `overflow-(${REGEX_OVERFLOW_KEYS})$\\b`
]

export const regexList = regexStrings.map((regex) => new RegExp(regex, 'g'));

export default generate;