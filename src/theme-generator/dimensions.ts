import { DIMENSIONS, SPACES, DIMENSIONS_REGEX_KEYS, SPACES_REGEX_KEYS } from "./constants";
import { toEntries, fixValue } from "./types";


const generate = () => {
    const widthMapping: Record<string, string> = {};
    const heightMapping: Record<string, string> = {};
    const minHeightMapping: Record<string, string> = {};
    const minWidthMapping: Record<string, string> = {};
    const maxWidthMapping: Record<string, string> = {};
    const maxHeightMapping: Record<string, string> = {};


    for (const [key, value] of toEntries(SPACES)) {
        widthMapping[`w-${fixValue(key)}`] = `width: ${value};`
        minWidthMapping[`min-w-${fixValue(key)}`] = `min-width: ${value}px;`
        maxWidthMapping[`max-w-${fixValue(key)}`] = `max-width: ${value}px;`

        heightMapping[`h-${fixValue(key)}`] = `height: ${value}px;`;
        minHeightMapping[`min-h-${fixValue(key)}`] = `min-height: ${value}px;`
        maxHeightMapping[`max-h-${fixValue(key)}`] = `max-height: ${value}px;`
    }

    for (const [key, value] of toEntries(DIMENSIONS)) {
        widthMapping[`w-${fixValue(key)}`] = `width: ${value};`
        minWidthMapping[`min-w-${fixValue(key)}`] = `min-width: ${value};`
        maxWidthMapping[`max-w-${fixValue(key)}`] = `max-width: ${value};`

        heightMapping[`h-${fixValue(key)}`] = `height: ${value};`;
        minHeightMapping[`min-h-${fixValue(key)}`] = `min-height: ${value};`
        maxHeightMapping[`max-h-${fixValue(key)}`] = `max-height: ${value};`
    }
    return {
        widthMapping,
        maxWidthMapping,
        minWidthMapping,
        heightMapping,
        minHeightMapping,
        maxHeightMapping
    }
}


const regexStrings = [
    `w-((${SPACES_REGEX_KEYS})|(${DIMENSIONS_REGEX_KEYS}))$(?![.\\d])\\b`,
    `h-((${SPACES_REGEX_KEYS})|(${DIMENSIONS_REGEX_KEYS}))$(?![.\\d])\\b`,
    `min-w-((${SPACES_REGEX_KEYS})|(${DIMENSIONS_REGEX_KEYS}))$(?![.\\d])\\b`,
    `max-w-((${SPACES_REGEX_KEYS})|(${DIMENSIONS_REGEX_KEYS}))$(?![.\\d])\\b`,
    `min-h-((${SPACES_REGEX_KEYS})|(${DIMENSIONS_REGEX_KEYS}))$(?![.\\d])\\b`,
    `max-h-((${SPACES_REGEX_KEYS})|(${DIMENSIONS_REGEX_KEYS}))$(?![.\\d])\\b`,
]


export const regexList = regexStrings.map((regex) => new RegExp(regex, 'g'));

export default generate;