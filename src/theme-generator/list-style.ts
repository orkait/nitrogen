import { toEntries } from './types';

export const LIST_STYLE = {
    none: 'none',
    disc: 'disc',
    circle: 'circle',
    square: 'square',
    decimal: 'decimal',
    decimalLeadingZero: 'decimal-leading-zero',
    lowerRoman: 'lower-roman',
} as const;

const generate = () => {
    let groupedCSS = '';
    for (const [key, value] of toEntries(LIST_STYLE)) {
        groupedCSS += `
        .list-style-${key} {
            list-style: ${value};
        }
        `;
    }
    return groupedCSS;
}

export default generate;