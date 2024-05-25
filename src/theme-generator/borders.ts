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
    const roundedMap: Record<string, string> = {};
    const roundedTMap: Record<string, string> = {};
    const roundedRMap: Record<string, string> = {};
    const roundedBMap: Record<string, string> = {};
    const roundedLMap: Record<string, string> = {};

    for (const [key, value] of toEntries(BORDER_RADII)) {
        const newValue = typeof value === 'number' ? `${value}px` : value;
        roundedMap[`rounded-${key}`] = `border-radius: ${newValue};`;
    }

    // generate individual border radius
    for (const [key, value] of toEntries(BORDER_RADII)) {
        const newValue = typeof value === 'number' ? `${value}px` : value;

        roundedLMap[`rounded-l-${key}`] = `border-bottom-left-radius: ${newValue}; border-top-left-radius: ${newValue};`;
        roundedRMap[`rounded-r-${key}`] = `border-bottom-right-radius: ${newValue}; border-top-right-radius: ${newValue};`;
        roundedTMap[`rounded-t-${key}`] = `border-top-left-radius: ${newValue}; border-top-right-radius: ${newValue};`;
        roundedBMap[`rounded-b-${key}`] = `border-bottom-left-radius: ${newValue}; border-bottom-right-radius: ${newValue};`;
    }

    return {
        ...roundedMap,
        ...roundedTMap,
        ...roundedRMap,
        ...roundedBMap,
        ...roundedLMap,
    };
}

const generateBorderWidths = () => {
    const borderWidthMap: Record<string, string> = {};
    const borderWidthTMap: Record<string, string> = {};
    const borderWidthRMap: Record<string, string> = {};
    const borderWidthBMap: Record<string, string> = {};
    const borderWidthLMap: Record<string, string> = {};

    for (const [key, value] of toEntries(BORDER_WIDTHS)) {
        borderWidthMap[`border-${key}`] = `border-width: ${value}px`;
    }

    // generate individual border width
    for (const [key, value] of toEntries(BORDER_WIDTHS)) {
        direction.forEach((dir) => {
            if (dir === 'top') {
                borderWidthTMap[`border-t-${key}`] = `border-top-width: ${value}px`;
            }

            if (dir === 'right') {
                borderWidthRMap[`border-r-${key}`] = `border-right-width: ${value}px`;
            }

            if (dir === 'bottom') {
                borderWidthBMap[`border-b-${key}`] = `border-bottom-width: ${value}px`;
            }

            if (dir === 'left') {
                borderWidthLMap[`border-l-${key}`] = `border-left-width: ${value}px`;
            }

        })
    }

    return {
        ...borderWidthMap,
        ...borderWidthTMap,
        ...borderWidthRMap,
        ...borderWidthBMap,
        ...borderWidthLMap,
    };
}

const generateBorderStyles = () => {
    const borderStyleMap: Record<string, string> = {};
    const borderStyleTMap: Record<string, string> = {};
    const borderStyleRMap: Record<string, string> = {};
    const borderStyleBMap: Record<string, string> = {};
    const borderStyleLMap: Record<string, string> = {};

    for (const [key, value] of toEntries(BORDER_STYLES)) {
        borderStyleMap[`border-${key}`] = `border-style: ${value};`;

    }

    // generate individual border style
    for (const [key, value] of toEntries(BORDER_STYLES)) {
        direction.forEach((dir) => {
            if (dir === 'top') {
                borderStyleTMap[`border-t-${key}`] = `border-top-style: ${value};`;
            }

            if (dir === 'right') {
                borderStyleRMap[`border-r-${key}`] = `border-right-style: ${value};`;
            }

            if (dir === 'bottom') {
                borderStyleBMap[`border-b-${key}`] = `border-bottom-style: ${value};`;
            }

            if (dir === 'left') {
                borderStyleLMap[`border-l-${key}`] = `border-left-style: ${value};`;
            }
        })
    }

    return {
        ...borderStyleMap,
        ...borderStyleTMap,
        ...borderStyleRMap,
        ...borderStyleBMap,
        ...borderStyleLMap,
    };

}

const generateBorderProperties = (hash: string = "") => {
    return {
        base: {
            ...generateBorderRadii(),
            ...generateBorderWidths(),
            ...generateBorderStyles(),
        },
        responsive: {},
        hash,
    };
}

const regexStrings = [
    `^rounded-t-(${BORDER_RADII_REGEX_KEYS})(?![.\\d])$`,
    `^rounded-r-(${BORDER_RADII_REGEX_KEYS})(?![.\\d])$`,
    `^rounded-b-(${BORDER_RADII_REGEX_KEYS})(?![.\\d])$`,
    `^rounded-l-(${BORDER_RADII_REGEX_KEYS})(?![.\\d])$`,
    `^rounded-(${BORDER_RADII_REGEX_KEYS})(?![.\\d])$`,

    `^border-t-(${BORDER_STYLES_REGEX_KEYS})(?![.\\d])$`,
    `^border-r-(${BORDER_STYLES_REGEX_KEYS})(?![.\\d])$`,
    `^border-b-(${BORDER_STYLES_REGEX_KEYS})(?![.\\d])$`,
    `^border-l-(${BORDER_STYLES_REGEX_KEYS})(?![.\\d])$`,
    `^border-(${BORDER_STYLES_REGEX_KEYS})(?![.\\d])$`,

    `^border-t-(${BORDER_WIDTHS_REGEX_KEYS})(?![.\\d])$`,
    `^border-r-(${BORDER_WIDTHS_REGEX_KEYS})(?![.\\d])$`,
    `^border-b-(${BORDER_WIDTHS_REGEX_KEYS})(?![.\\d])$`,
    `^border-l-(${BORDER_WIDTHS_REGEX_KEYS})(?![.\\d])$`,
    `^border-(${BORDER_WIDTHS_REGEX_KEYS})(?![.\\d])$`,
]

export const regexList = regexStrings.map((str) => (new RegExp(str, 'g')));

export default generateBorderProperties;