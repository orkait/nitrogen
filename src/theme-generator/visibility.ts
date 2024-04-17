import { toEntries } from './types';

export const VISIBILITIES = {
    visible: 'visible',
    hidden: 'hidden',
} as const;

const generate = () => {
    let groupedCSS = '';
    for (const [key, value] of toEntries(VISIBILITIES)) {
        groupedCSS += `
        .visibility-${key} {
            visibility: ${value};
        }
        `;
    }
    return groupedCSS;
}

export default generate;