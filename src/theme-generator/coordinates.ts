import { SPACES, SPACES_REGEX_KEYS } from "./constants";
import { toEntries } from "./types";
import { fixValue } from "./utils";

const generate = (hash: string = "") => {
    const topMapping: Record<string, string> = {};
    const leftMapping: Record<string, string> = {};
    const bottomMapping: Record<string, string> = {};
    const rightMapping: Record<string, string> = {};

    for (const [key, value] of toEntries(SPACES)) {
        topMapping[`top-${fixValue(key)}`] = `top: ${value}px;`;
        leftMapping[`left-${fixValue(key)}`] = `left: ${value}px;`;
        bottomMapping[`bottom-${fixValue(key)}`] = `bottom: ${value}px;`;
        rightMapping[`right-${fixValue(key)}`] = `right: ${value}px;`;
    }
    return {
        base: {
            ...topMapping,
            ...leftMapping,
            ...bottomMapping,
            ...rightMapping,
        },
        responsive: {},
        hash
    }
}

const regexStrings = [
    `^top-(${SPACES_REGEX_KEYS})(?![.\\d])$`,
    `^left-(${SPACES_REGEX_KEYS})(?![.\\d])$`,
    `^bottom-(${SPACES_REGEX_KEYS})(?![.\\d])$`,
    `^right-(${SPACES_REGEX_KEYS})(?![.\\d])$`,
]

export const regexList = regexStrings.map((regex) => new RegExp(regex, 'g'));

export default generate;