import { toEntries, fixValue, constructKeys } from './types';
import { SPACES } from './constants';

export const FLEX_DIRECTIONS = {
    row: 'row',
    column: 'column',
    'row-reverse': 'row-reverse',
    'column-reverse': 'column-reverse',
} as const;

export const FLEX_WRAPS = {
    wrap: 'wrap',
    nowrap: 'nowrap',
    'wrap-reverse': 'wrap-reverse',
} as const;

export const JUSTIFY_CONTENTS = {
    start: 'flex-start',
    end: 'flex-end',
    center: 'center',
    between: 'space-between',
    around: 'space-around',
} as const;

export const ALIGN_ITEMS = {
    start: 'flex-start',
    end: 'flex-end',
    center: 'center',
    baseline: 'baseline',
    stretch: 'stretch',
} as const;

export const ALIGN_SELF = {
    start: 'flex-start',
    end: 'flex-end',
    center: 'center',
    baseline: 'baseline',
    stretch: 'stretch',
} as const;

export const JUSTIFY_SELF = {
    start: 'flex-start',
    end: 'flex-end',
    center: 'center',
    between: 'space-between',
    around: 'space-around',
} as const;


export const FLEX_GROWS = {
    0: 0,
    1: 1,
} as const;

export const FLEX_SHRINKS = {
    0: 0,
    1: 1,
} as const;

export const FLEX_BASIS = {
    0: 0,
    auto: 'auto',
} as const;

export const VERTICAL_ALIGNS = {
    start: 'flex-start',
    end: 'flex-end',
    center: 'center',
    baseline: 'baseline',
    stretch: 'stretch',
} as const;

const generate = () => {
    let groupedCSS = '';

    for (const [key, value] of toEntries(FLEX_DIRECTIONS)) {
        groupedCSS += `
        .flex-direction-${key} {
            flex-direction: ${value};
        }
        `;
    }

    for (const [key, value] of toEntries(FLEX_WRAPS)) {
        groupedCSS += `
        .flex-wrap-${key} {
            flex-wrap: ${value};
        }
        `;
    }

    for (const [key, value] of toEntries(JUSTIFY_CONTENTS)) {
        groupedCSS += `
        .justify-content-${key} {
            justify-content: ${value};
        }
        `;
    }

    for (const [key, value] of toEntries(ALIGN_ITEMS)) {
        groupedCSS += `
        .align-items-${key} {
            align-items: ${value};
        }
        `;
    }

    for (const [key, value] of toEntries(ALIGN_SELF)) {
        groupedCSS += `
        .align-self-${key} {
            align-self: ${value};
        }
        `;
    }

    for (const [key, value] of toEntries(JUSTIFY_SELF)) {
        groupedCSS += `
        .justify-self-${key} {
            justify-self: ${value};
        }
        `;
    }

    for (const [key, value] of toEntries(VERTICAL_ALIGNS)) {
        groupedCSS += `
        .vertical-align-${key} {
            vertical-align: ${value};
        }
        `;
    }

    for (const [key, value] of toEntries(FLEX_GROWS)) {
        groupedCSS += `
        .flex-grow-${key} {
            flex-grow: ${value};
        }
        `;
    }

    for (const [key, value] of toEntries(FLEX_SHRINKS)) {
        groupedCSS += `
        .flex-shrink-${key} {
            flex-shrink: ${value};
        }
        `;
    }

    for (const [key, value] of toEntries(FLEX_BASIS)) {
        groupedCSS += `
        .flex-basis-${key} {
            flex-basis: ${value};
        }
        `;
    }

    // gap -> SPACES
    for (const [key, value] of toEntries(SPACES)) {
        groupedCSS += `
        .gap-${fixValue(key)} {
            gap: ${value};
        }
        `;
    }


    groupedCSS += `
        .center{
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .center-x{
            display: flex;
            justify-content: center;
        }
        .center-y{
            display: flex;
            align-items: center;
        }
    
    `
    return groupedCSS;
}

const REGEX_FLEX_DIRECTION_KEYS = constructKeys(Object.keys(FLEX_DIRECTIONS));
const REGEX_FLEX_WRAP_KEYS = constructKeys(Object.keys(FLEX_WRAPS));
const REGEX_JUSTIFY_CONTENT_KEYS = constructKeys(Object.keys(JUSTIFY_CONTENTS));
const REGEX_ALIGN_ITEMS_KEYS = constructKeys(Object.keys(ALIGN_ITEMS));
const REGEX_ALIGN_SELF_KEYS = constructKeys(Object.keys(ALIGN_SELF));
const REGEX_JUSTIFY_SELF_KEYS = constructKeys(Object.keys(JUSTIFY_SELF));
const REGEX_VERTICAL_ALIGN_KEYS = constructKeys(Object.keys(VERTICAL_ALIGNS));
const REGEX_FLEX_GROW_KEYS = constructKeys(Object.keys(FLEX_GROWS));
const REGEX_FLEX_SHRINK_KEYS = constructKeys(Object.keys(FLEX_SHRINKS));
const REGEX_FLEX_BASIS_KEYS = constructKeys(Object.keys(FLEX_BASIS));
const REGEX_GAP_KEYS = constructKeys(Object.keys(SPACES));


const regexStrings = [
    `flex-direction-(${REGEX_FLEX_DIRECTION_KEYS})$(?![.\\d])\\b`,
    `flex-wrap-(${REGEX_FLEX_WRAP_KEYS})$(?![.\\d])\\b`,
    `justify-content-(${REGEX_JUSTIFY_CONTENT_KEYS})$(?![.\\d])\\b`,
    `align-items-(${REGEX_ALIGN_ITEMS_KEYS})$(?![.\\d])\\b`,
    `align-self-(${REGEX_ALIGN_SELF_KEYS})$(?![.\\d])\\b`,
    `justify-self-(${REGEX_JUSTIFY_SELF_KEYS})$(?![.\\d])\\b`,
    `vertical-align-(${REGEX_VERTICAL_ALIGN_KEYS})$(?![.\\d])\\b`,
    `flex-grow-(${REGEX_FLEX_GROW_KEYS})$(?![.\\d])\\b`,
    `flex-shrink-(${REGEX_FLEX_SHRINK_KEYS})$(?![.\\d])\\b`,
    `flex-basis-(${REGEX_FLEX_BASIS_KEYS})$(?![.\\d])\\b`,
    `gap-(${REGEX_GAP_KEYS})$(?![.\\d])\\b`,
]

export const regexList = regexStrings.map((regex) => {
    return new RegExp(regex, 'g');
});

export default generate;