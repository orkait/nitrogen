import { toEntries } from "./types";

export const OVERFLOWS = {
    auto: 'auto',
    hidden: 'hidden',
    visible: 'visible',
    scroll: 'scroll',
} as const;

const generate = () => {
    let groupedCSS = '';
    for (const [key, value] of toEntries(OVERFLOWS)) {
        groupedCSS += `
        .overflow-${key} {
            overflow: ${value};
        }
        `;
    }

    return groupedCSS;
}

export default generate;