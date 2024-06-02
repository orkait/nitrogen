import { toEntries, constructKeys } from './types';
import { SPACES } from './constants';
import { fixValue } from './utils';

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
    const flexDirectionMapping: Record<string, string> = {};
    const flexWrapMapping: Record<string, string> = {};
    const alignItemsMapping: Record<string, string> = {};
    const justifyContentMapping: Record<string, string> = {};
    const flexGrowMapping: Record<string, string> = {};
    const alignSelfMapping: Record<string, string> = {};
    const justifySelfMapping: Record<string, string> = {};
    const verticalAlignMapping: Record<string, string> = {};
    const flexShrinkMapping: Record<string, string> = {};
    const flexBasisMapping: Record<string, string> = {};
    const gapMapping: Record<string, string> = {};

    for (const [key, value] of toEntries(FLEX_DIRECTIONS)) {
        flexDirectionMapping[`flex-direction-${key}`] = `flex-direction: ${value}`;
    }

    for (const [key, value] of toEntries(FLEX_WRAPS)) {
        flexWrapMapping[`flex-wrap-${key}`] = `flex-wrap: ${value}`;
    }

    for (const [key, value] of toEntries(JUSTIFY_CONTENTS)) {
        justifyContentMapping[`justify-content-${key}`] = `justify-content: ${value}`;
    }

    for (const [key, value] of toEntries(ALIGN_ITEMS)) {
        alignItemsMapping[`align-items-${key}`] = `align-items: ${value}`;
    }

    for (const [key, value] of toEntries(ALIGN_SELF)) {
        alignSelfMapping[`align-self-${key}`] = `align-self: ${value}`;
    }

    for (const [key, value] of toEntries(JUSTIFY_SELF)) {
        justifySelfMapping[`justify-self-${key}`] = `justify-self: ${value}`;
    }

    for (const [key, value] of toEntries(VERTICAL_ALIGNS)) {
        verticalAlignMapping[`vertical-align-${key}`] = `vertical-align: ${value}`;
    }

    for (const [key, value] of toEntries(FLEX_GROWS)) {
        flexGrowMapping[`flex-grow-${key}`] = `flex-grow: ${value}`;
    }

    for (const [key, value] of toEntries(FLEX_SHRINKS)) {
        flexShrinkMapping[`flex-shrink-${key}`] = `flex-shrink: ${value}`;
    }

    for (const [key, value] of toEntries(FLEX_BASIS)) {
        flexBasisMapping[`flex-basis-${key}`] = `flex-basis: ${value}`;
    }

    // gap -> SPACES
    for (const [key, value] of toEntries(SPACES)) {
        gapMapping[`gap-${fixValue(key)}`] = `gap: ${value}`;
    }


    return {
        ...flexDirectionMapping,
        ...flexWrapMapping,
        ...justifyContentMapping,
        ...alignItemsMapping,
        ...alignSelfMapping,
        ...justifySelfMapping,
        ...verticalAlignMapping,
        ...flexGrowMapping,
        ...flexShrinkMapping,
        ...flexBasisMapping,
        ...gapMapping,
    }
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
    `^flex-direction-(${REGEX_FLEX_DIRECTION_KEYS})(?![.\\d])$`,
    `^flex-wrap-(${REGEX_FLEX_WRAP_KEYS})(?![.\\d])$`,
    `^justify-content-(${REGEX_JUSTIFY_CONTENT_KEYS})(?![.\\d])$`,
    `^align-items-(${REGEX_ALIGN_ITEMS_KEYS})(?![.\\d])$`,
    `^align-self-(${REGEX_ALIGN_SELF_KEYS})(?![.\\d])$`,
    `^justify-self-(${REGEX_JUSTIFY_SELF_KEYS})(?![.\\d])$`,
    `^vertical-align-(${REGEX_VERTICAL_ALIGN_KEYS})(?![.\\d])$`,
    `^flex-grow-(${REGEX_FLEX_GROW_KEYS})(?![.\\d])$`,
    `^flex-shrink-(${REGEX_FLEX_SHRINK_KEYS})(?![.\\d])$`,
    `^flex-basis-(${REGEX_FLEX_BASIS_KEYS})(?![.\\d])$`,
    `^gap-(${REGEX_GAP_KEYS})(?![.\\d])$`,
]

export const regexList = regexStrings.map((regex) => {
    return new RegExp(regex, 'g');
});

export default generate;