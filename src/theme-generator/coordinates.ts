import { SPACES, SPACES_REGEX_KEYS } from "./constants";
import { fixValue, toEntries } from "./types";

const generate = () => {
    let groupedCSS = '';
    ['top', 'left', 'bottom', 'right'].forEach((direction) => {
        for (const [key, value] of toEntries(SPACES)) {

            groupedCSS += `
            .${direction}-${fixValue(key)} {
                ${direction}: ${value}px;
            }
            `;
        }
    })
    return groupedCSS;
}

const regexStrings = [
    `top-(${SPACES_REGEX_KEYS})$(?![.\\d])\\b`,
    `left-(${SPACES_REGEX_KEYS})$(?![.\\d])\\b`,
    `bottom-(${SPACES_REGEX_KEYS})$(?![.\\d])\\b`,
    `right-(${SPACES_REGEX_KEYS})$(?![.\\d])\\b`,
]

export const regexList = regexStrings.map((regex) => new RegExp(regex, 'g'));

export default generate;