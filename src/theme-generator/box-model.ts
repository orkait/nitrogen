/* eslint-disable @typescript-eslint/no-explicit-any */
import { fixValue } from './types';
import { SPACES, SPACES_REGEX_KEYS } from "./constants";

const directions_extended: any = {
    t: 'top',
    r: 'right',
    b: 'bottom',
    l: 'left',
    x: 'x',
    y: 'y',
    '': ''
}

const generate = () => {
    let groupedCSS = '';
    ['p', 'm'].forEach((type) => {
        Object.keys(directions_extended).forEach((direction) => {
            for (const [key, value] of Object.entries(SPACES)) {
                if (direction === '') {
                    groupedCSS += `.${type}-${fixValue(key)} {
                        ${type === 'p' ? 'padding' : 'margin'}: ${value + 'px'};
                    }
                    `;
                    continue;
                }
                else if (direction === 'x' || direction === 'y') {
                    if (direction === 'x') {
                        groupedCSS += `
                        .${type}${direction}-${fixValue(key)} {
                            ${type === 'p' ? 'padding-left' : 'margin-left'}: ${value + 'px'};
                            ${type === 'p' ? 'padding-right' : 'margin-right'}: ${value + 'px'};
                        }
                        `;
                    } else {
                        groupedCSS += `
                        .${type}${direction}-${fixValue(key)} {
                            ${type === 'p' ? 'padding-top' : 'margin-top'}: ${value + 'px'};
                            ${type === 'p' ? 'padding-bottom' : 'margin-bottom'}: ${value + 'px'}
                        }
                        `;
                    }
                    continue;
                }

                groupedCSS += `
                .${type}${direction}-${fixValue(key)} {
                    ${type === 'p' ? 'padding-' : 'margin-'}${directions_extended[direction]}: ${value + 'px'};
                }
                `;

            }
        })
    })
    return groupedCSS;
}

const regexStrings = [
    `pt-(${SPACES_REGEX_KEYS})$(?![.\\d])\\b`,
    `pr-(${SPACES_REGEX_KEYS})$(?![.\\d])\\b`,
    `pb-(${SPACES_REGEX_KEYS})$(?![.\\d])\\b`,
    `pl-(${SPACES_REGEX_KEYS})$(?![.\\d])\\b`,
    `px-(${SPACES_REGEX_KEYS})$(?![.\\d])\\b`,
    `py-(${SPACES_REGEX_KEYS})$(?![.\\d])\\b`,

    `mt-(${SPACES_REGEX_KEYS})$(?![.\\d])\\b`,
    `mr-(${SPACES_REGEX_KEYS})$(?![.\\d])\\b`,
    `mb-(${SPACES_REGEX_KEYS})$(?![.\\d])\\b`,
    `ml-(${SPACES_REGEX_KEYS})$(?![.\\d])\\b`,
    `mx-(${SPACES_REGEX_KEYS})$(?![.\\d])\\b`,
    `my-(${SPACES_REGEX_KEYS})$(?![.\\d])\\b`,
]

export const regexList = regexStrings.map((str) => (new RegExp(str, 'g')));


export default generate;