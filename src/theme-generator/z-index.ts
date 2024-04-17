import { toEntries } from './types';

export const Z_INDEXES = {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
} as const;

const generate = () => {
    let groupedCSS = '';
    for (const [key, value] of toEntries(Z_INDEXES)) {
        groupedCSS += `
        .z-index-${key} {
            z-index: ${value};
        }
        `;
    }
    return groupedCSS;
}

export default generate;