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
        ['t', 'r', 'b', 'l'].forEach((direction) => {
            for (const [key, value] of Object.entries(SPACES)) {
                groupedCSS += `
                .${type}${direction}-${fixValue(key)} {
                    ${type === 'p' ? 'padding' : 'margin'}-${directions[direction]}: ${value};
                }
                `;
            }
        })
    })
    return groupedCSS;
}

export default generate;