import { toEntries } from "./types";

export const DISPLAYS = {
    flex: 'flex',
    block: 'block',
    inline: 'inline',
    grid: 'grid',
    none: 'none',
} as const;

const generate = () => {
    let groupedCSS = '';
    for (const [key, value] of toEntries(DISPLAYS)) {
        groupedCSS += `
        .display-${key} {
            display: ${value};
        }
        `;
    }
    return groupedCSS;
}

export default generate;