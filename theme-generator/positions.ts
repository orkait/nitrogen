import { constructKeys, toEntries } from './types';

export const POSITION = {
    relative: 'relative',
    absolute: 'absolute',
    fixed: 'fixed',
    sticky: 'sticky',
} as const;

const REGEX_POSITION_KEYS = constructKeys(Object.keys(POSITION));

const generate = () => {
    const positionMapping: Record<string, string> = {};
    for (const [key, value] of toEntries(POSITION)) {
        positionMapping[`position-${key}`] = `position: ${value};`;
    }
    return positionMapping;
}

const regexStrings = [
    `^position-(${REGEX_POSITION_KEYS})$`
]

export const regexList = regexStrings.map((regex) => new RegExp(regex, 'g'));

export default generate;