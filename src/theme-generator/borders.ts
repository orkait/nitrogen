import { toEntries } from "./types";

export const BORDER_RADII = {
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
    12: 12,
    14: 14,
    'half': '50%',
    'full': '9999px',
} as const;

export const BORDER_WIDTHS = {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
} as const;

export const BORDER_STYLES = {
    solid: 'solid',
    dashed: 'dashed',
    dotted: 'dotted',
    double: 'double',
    none: 'none',
} as const;

// border-width
// border-top-width
// border-right-width
// border-bottom-width
// border-left-width
// border-width (aggregated)
// border-style
// border-top-style
// border-right-style
// border-bottom-style
// border-left-style
// border-color
// border-radius
// border-top-left-radius
// border-top-right-radius
// border-bottom-left-radius
// border-bottom-right-radius

const direction = ['top', 'right', 'bottom', 'left'];

const generateBorderRadii = () => {
    let groupedCSS = '';
    for (const [key, value] of toEntries(BORDER_RADII)) {
        const newValue = typeof value === 'number' ? `${value}px` : value;
        groupedCSS += `
        .rounded-${key} {
            border-radius: ${newValue};
        }
        `;
    }

    // generate individual border radius
    for (const [key, value] of toEntries(BORDER_RADII)) {
        const newValue = typeof value === 'number' ? `${value}px` : value;

        groupedCSS += `
        .rounded-t-${key} {
            border-top-left-radius: ${newValue};
            border-top-right-radius: ${newValue};
        }
        .rounded-r-${key} {
            border-top-right-radius: ${newValue};
            border-bottom-right-radius: ${newValue};
        }
        .rounded-b-${key} {
            border-bottom-right-radius: ${newValue};
            border-bottom-left-radius: ${newValue};
        }
        .rounded-l-${key} {
            border-top-left-radius: ${newValue};
            border-bottom-left-radius: ${newValue};
        }
        `;
    }

    return groupedCSS;
}

const generateBorderWidths = () => {
    let groupedCSS = '';
    for (const [key, value] of toEntries(BORDER_WIDTHS)) {
        groupedCSS += `
        .border-${key} {
            border-width: ${value}px;
        }
        `;
    }

    // generate individual border width
    for (const [key, value] of toEntries(BORDER_WIDTHS)) {
        direction.forEach((dir) => {
            groupedCSS += `
            .border-${dir}-${key} {
                border-${dir}-width: ${value}px;
            }
            `;
        })
    }

    return groupedCSS;
}

const generateBorderStyles = () => {
    let groupedCSS = '';
    for (const [key, value] of toEntries(BORDER_STYLES)) {
        groupedCSS += `
        .border-${key} {
            border-style: ${value};
        }
        `;
    }

    // generate individual border style
    for (const [key, value] of toEntries(BORDER_STYLES)) {
        direction.forEach((dir) => {
            groupedCSS += `
            .border-${dir}-${key} {
                border-${dir}-style: ${value};
            }
            `;
        })
    }

    return groupedCSS;

}

const generateBorderProperties = () => {
    return Object.values({
        borderRadii: generateBorderRadii(),
        borderWidths: generateBorderWidths(),
        borderStyles: generateBorderStyles(),
    }).join('\n');
}

export default generateBorderProperties;