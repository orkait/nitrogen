import { toEntries, fixValue } from './types';
import { SPACES } from './constants';

export const FLEX_DIRECTIONS = {
    row: 'row',
    column: 'column',
    rowReverse: 'row-reverse',
    columnReverse: 'column-reverse',
} as const;

export const FLEX_WRAPS = {
    wrap: 'wrap',
    nowrap: 'nowrap',
    wrapReverse: 'wrap-reverse',
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

export default generate;