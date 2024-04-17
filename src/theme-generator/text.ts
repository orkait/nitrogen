import { fixValue } from "./types";

export const TEXT_ALIGNS = {
    left: 'left',
    right: 'right',
    center: 'center',
    justify: 'justify',
} as const;

export const LETTER_SPACING = {
    normal: 'normal',
    label: '1px',
} as const;

export const LINE_HEIGHT = {
    0: 0,
    1: 1,
    1.25: 1.25,
    1.5: 1.5,
    1.75: 1.75,
    2: 2,
} as const;

export const TEXT_TRANSFORM = {
    'uppercase': 'uppercase',
    'lowercase': 'lowercase',
    'capitalize': 'capitalize',
    'none': 'none',
}

export const TEXT_DECORATION = {
    'underline': 'underline',
    'line-through': 'line-through',
    'none': 'none',
}

export const TEXT_OVERFLOW = {
    'clip': 'clip',
    'ellipsis': 'ellipsis',
}

export const WHITE_SPACE = {
    'normal': 'normal',
    'nowrap': 'nowrap',
    'pre': 'pre',
    'pre-line': 'pre-line',
    'pre-wrap': 'pre-wrap',
}


const generate = () => {
    let groupedCSS = '';
    for (const [key, value] of Object.entries(LETTER_SPACING)) {
        groupedCSS += `
        .letter-spacing-${key} {
            letter-spacing: ${value};
        }
        `;
    }

    for (const [key, value] of Object.entries(LINE_HEIGHT)) {
        groupedCSS += `
        .line-height-${fixValue(key)} {
            line-height: ${value};
        }
        `;
    }

    for (const [key, value] of Object.entries(TEXT_ALIGNS)) {
        groupedCSS += `
        .text-align-${key} {
            text-align: ${value};
        }
        `;
    }

    for (const [key, value] of Object.entries(TEXT_TRANSFORM)) {
        groupedCSS += `
        .text-transform-${key} {
            text-transform: ${value};
        }
        `;
    }

    for (const [key, value] of Object.entries(TEXT_DECORATION)) {
        groupedCSS += `
        .text-decoration-${key} {
            text-decoration: ${value};
        }
        `;
    }

    for (const [key, value] of Object.entries(TEXT_OVERFLOW)) {
        groupedCSS += `
        .text-overflow-${key} {
            text-overflow: ${value};
        }
        `;
    }

    for (const [key, value] of Object.entries(WHITE_SPACE)) {
        groupedCSS += `
        .white-space-${key} {
            white-space: ${value};
        }
        `;
    }


    return groupedCSS;
}

export default generate;