import { constructKeys, toEntries } from "./types";

export const OVERFLOWS = {
    auto: 'auto',
    hidden: 'hidden',
    visible: 'visible',
    scroll: 'scroll',
} as const;

const REGEX_OVERFLOW_KEYS = constructKeys(Object.keys(OVERFLOWS));

const generate = () => {
    let groupedCSS = '';
    for (const [key, value] of toEntries(OVERFLOWS)) {
        groupedCSS += `
        .overflow-${key} {
            overflow: ${value};
        }
        `;
    }

    return groupedCSS;
}

const regexStrings = [
    `overflow-(${REGEX_OVERFLOW_KEYS})$\\b`
]

export const regexList = regexStrings.map((regex) => new RegExp(regex, 'g'));

export default generate;