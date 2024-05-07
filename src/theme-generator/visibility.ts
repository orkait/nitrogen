import { constructKeys, toEntries } from './types';

export const VISIBILITIES = {
    visible: 'visible',
    hidden: 'hidden',
} as const;

const REGEX_VISIBILITY_KEYS = constructKeys(Object.keys(VISIBILITIES));

const generate = () => {
    const visibilityMapping: Record<string, string> = {};

    for (const [key, value] of toEntries(VISIBILITIES)) {
        visibilityMapping[`visibility-${key}`] = `visibility: ${value};`;
    }
    
    return visibilityMapping;
}

const regexStrings = [
    `visibility-(${REGEX_VISIBILITY_KEYS})$\\b`
]

export const regexList = regexStrings.map((regex) => new RegExp(regex, 'g'));

export default generate;