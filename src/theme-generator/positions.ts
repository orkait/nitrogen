import { constructKeys, toEntries } from './types';

export const POSITION = {
    relative: 'relative',
    absolute: 'absolute',
    fixed: 'fixed',
    sticky: 'sticky',
} as const;

const REGEX_POSITION_KEYS = constructKeys(Object.keys(POSITION));

const generate = () => {
    let groupedCSS = '';
    for (const [key, value] of toEntries(POSITION)) {
        groupedCSS += `
        .position-${key} {
            position: ${value};
        }
        `;
    }
    return groupedCSS;
}

const regexStrings = [
    `position-(${REGEX_POSITION_KEYS})$\\b`
]

export const regexList = regexStrings.map((regex) => new RegExp(regex, 'g'));

export default generate;