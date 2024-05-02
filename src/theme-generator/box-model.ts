/* eslint-disable @typescript-eslint/no-explicit-any */
import { fixValue } from './types';
import { SPACES } from "./constants";

const directions_extended: any = {
    t: 'top',
    r: 'right',
    b: 'bottom',
    l: 'left',
    x: 'x',
    y: 'y',
}

const generate = () => {
    let groupedCSS = '';
    ['p', 'm'].forEach((type) => {
        ['t', 'r', 'b', 'l', 'x', 'y'].forEach((direction) => {
            for (const [key, value] of Object.entries(SPACES)) {

                if (direction === 'x' || direction === 'y') {
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

export const regexList = [
    /p(t|r|b|l|x|y)-(15|14|13|12|11|10|9|8|7|6|5|4|3|2|1|0|half|1.5|0.5)/g,
]

export default generate;