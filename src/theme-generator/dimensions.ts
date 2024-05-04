import { DIMENSIONS, SPACES, DIMENSIONS_REGEX_KEYS, SPACES_REGEX_KEYS } from "./constants";
import { toEntries, fixValue } from "./types";


const generate = () => {
    let groupedCSS = '';
    const mapping: {
        [key: string]: string
    } = {
        'w': 'width',
        'h': 'height',
        'min-w': 'min-width',
        'max-w': 'max-width',
        'min-h': 'min-height',
        'max-h': 'max-height'
    }

    Object.keys(mapping).forEach((direction) => {
        for (const [key, value] of toEntries(DIMENSIONS)) {
            groupedCSS += `
            .${direction}-${fixValue(key)} {
                ${mapping[direction]}: ${value};
            }
            `;
        }
    })

    Object.keys(mapping).forEach((direction) => {
        for (const [key, value] of toEntries(SPACES)) {
            groupedCSS += `
            .${direction}-${fixValue(key)} {
                ${mapping[direction]}: ${value}px;
            }
            `;
        }
    })
    return groupedCSS;
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