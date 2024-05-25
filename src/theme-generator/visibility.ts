import { constructKeys, toEntries } from './types';

export const VISIBILITIES = {
    visible: 'visible',
    hidden: 'hidden',
} as const;

const REGEX_VISIBILITY_KEYS = constructKeys(Object.keys(VISIBILITIES));

const generate = (hash: string = "") => {
    const visibilityMapping: Record<string, string> = {};

    for (const [key, value] of toEntries(VISIBILITIES)) {
        visibilityMapping[`visibility-${key}`] = `visibility: ${value};`;
    }

    return {
        base: visibilityMapping,
        responsive: {},
        hash
    }
}

const regexStrings = [
    `^visibility-(${REGEX_VISIBILITY_KEYS})$`
]

export const regexList = regexStrings.map((regex) => new RegExp(regex, 'g'));

export default generate;