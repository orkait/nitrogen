import { constructKeys, toEntries } from "./types";

const BORDER_RADII = {
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

const BORDER_RADII_REGEX_KEYS = constructKeys(Object.keys(BORDER_RADII));
const BORDER_WIDTHS_REGEX_KEYS = constructKeys(Object.keys(BORDER_WIDTHS));
const BORDER_STYLES_REGEX_KEYS = constructKeys(Object.keys(BORDER_STYLES));


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
            .border-${dir[0]}-${key} {
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
            .border-${dir[0]}-${key} {
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

const regexStrings = [
    `rounded-t-(${BORDER_RADII_REGEX_KEYS})$(?![.\\d])\\b`,
    `rounded-r-(${BORDER_RADII_REGEX_KEYS})$(?![.\\d])\\b`,
    `rounded-b-(${BORDER_RADII_REGEX_KEYS})$(?![.\\d])\\b`,
    `rounded-l-(${BORDER_RADII_REGEX_KEYS})$(?![.\\d])\\b`,
    `rounded-(${BORDER_RADII_REGEX_KEYS})$(?![.\\d])\\b`,

    `border-t-(${BORDER_STYLES_REGEX_KEYS})$(?![.\\d])\\b`,
    `border-r-(${BORDER_STYLES_REGEX_KEYS})$(?![.\\d])\\b`,
    `border-b-(${BORDER_STYLES_REGEX_KEYS})$(?![.\\d])\\b`,
    `border-l-(${BORDER_STYLES_REGEX_KEYS})$(?![.\\d])\\b`,
    `border-(${BORDER_STYLES_REGEX_KEYS})$(?![.\\d])\\b`,

    `border-t-(${BORDER_WIDTHS_REGEX_KEYS})$(?![.\\d])\\b`,
    `border-r-(${BORDER_WIDTHS_REGEX_KEYS})$(?![.\\d])\\b`,
    `border-b-(${BORDER_WIDTHS_REGEX_KEYS})$(?![.\\d])\\b`,
    `border-l-(${BORDER_WIDTHS_REGEX_KEYS})$(?![.\\d])\\b`,
    `border-(${BORDER_WIDTHS_REGEX_KEYS})$(?![.\\d])\\b`,
]

export const regexList = regexStrings.map((str) => (new RegExp(str, 'g')));

export default generateBorderProperties;