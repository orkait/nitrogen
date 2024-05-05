import { toEntries, constructKeys } from "./types";

export const DISPLAYS = {
    flex: 'flex',
    block: 'block',
    'inline-flex': 'inline-flex',
    'inline-block': 'inline-block',
    grid: 'grid',
    none: 'none',
} as const;

const REGEX_DISPLAY_KEYS = constructKeys(Object.keys(DISPLAYS));

const generate = () => {
    let groupedCSS = '';
    for (const [key, value] of toEntries(DISPLAYS)) {
        groupedCSS += `
        .display-${key} {
            display: ${value};
        }
        `;
    }
    return groupedCSS;
}

const regexStrings = [
    `display-(${REGEX_DISPLAY_KEYS})$\\b`,
]

export const regexList = regexStrings.map((regex) => new RegExp(regex, 'g'));

export default generate;