/* eslint-disable @typescript-eslint/no-explicit-any */
import { fixValue } from './types';
import { SPACES } from "./constants";

const directions: any = {
    x: 'x',
    y: 'y',
    t: 'top',
    r: 'right',
    b: 'bottom',
    l: 'left',
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
                            ${type === 'p' ? 'padding-left' : 'margin-left'}: ${value};
                            ${type === 'p' ? 'padding-right' : 'margin-right'}: ${value};
                        }
                        `;
                    } else {
                        groupedCSS += `
                        .${type}${direction}-${fixValue(key)} {
                            ${type === 'p' ? 'padding-top' : 'margin-top'}: ${value};
                            ${type === 'p' ? 'padding-bottom' : 'margin-bottom'}: ${value};
                        }
                        `;
                    }
                    continue;
                }

                groupedCSS += `
                .${type}${directions[direction]}-${fixValue(key)} {
                    ${type === 'p' ? 'padding-' : 'margin-'}${directions[direction]}: ${value};
                }
                `;

            }
        })
    })
    return groupedCSS;
}

export default generate;