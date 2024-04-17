import { toEntries } from './types';

export const POSITION = {
    relative: 'relative',
    absolute: 'absolute',
    fixed: 'fixed',
    sticky: 'sticky',
} as const;


const generate = () => {
    let groupedCSS = '';
    for (const [key, value] of toEntries(POSITION)) {
        groupedCSS += `
        .position-${key} {
            position: ${value};
        }
        `;
    }
    return groupedCSS;
}

export default generate;