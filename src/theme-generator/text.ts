import { constructKeys } from "./types";
import { fixValue } from "./utils";

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


const generate = (hash: string = "") => {
    const letterSpacingMapping: Record<string, string> = {};
    const lineHeightMapping: Record<string, string> = {};
    const textAlignMapping: Record<string, string> = {};
    const textTransformMapping: Record<string, string> = {};
    const textDecorationMapping: Record<string, string> = {};
    const textOverflowMapping: Record<string, string> = {};
    const whiteSpaceMapping: Record<string, string> = {};


    for (const [key, value] of Object.entries(LETTER_SPACING)) {
        letterSpacingMapping[`letter-spacing-${key}`] = `letter-spacing: ${value};`;
    }

    for (const [key, value] of Object.entries(LINE_HEIGHT)) {
        lineHeightMapping[`line-height-${fixValue(key)}`] = `line-height: ${value};`;
    }

    for (const [key, value] of Object.entries(TEXT_ALIGNS)) {
        textAlignMapping[`text-align-${key}`] = `text-align: ${value};`;
    }

    for (const [key, value] of Object.entries(TEXT_TRANSFORM)) {
        textTransformMapping[`text-transform-${key}`] = `text-transform: ${value};`;
    }

    for (const [key, value] of Object.entries(TEXT_DECORATION)) {
        textDecorationMapping[`text-decoration-${key}`] = `text-decoration: ${value};`;
    }

    for (const [key, value] of Object.entries(TEXT_OVERFLOW)) {
        textOverflowMapping[`text-overflow-${key}`] = `text-overflow: ${value};`;
    }

    for (const [key, value] of Object.entries(WHITE_SPACE)) {
        whiteSpaceMapping[`white-space-${key}`] = `white-space: ${value};`;
    }

    return {
        base: {
            ...letterSpacingMapping,
            ...lineHeightMapping,
            ...textAlignMapping,
            ...textTransformMapping,
            ...textDecorationMapping,
            ...textOverflowMapping,
            ...whiteSpaceMapping,
        },
        responsive: {},
        hash
    }
}

const REGEX_LETTER_SPACING = constructKeys(Object.keys(LETTER_SPACING));
const REGEX_LINE_HEIGHT = constructKeys(Object.keys(LINE_HEIGHT));
const REGEX_TEXT_ALIGNS = constructKeys(Object.keys(TEXT_ALIGNS));
const REGEX_TEXT_TRANSFORM = constructKeys(Object.keys(TEXT_TRANSFORM));
const REGEX_TEXT_DECORATION = constructKeys(Object.keys(TEXT_DECORATION));
const REGEX_TEXT_OVERFLOW = constructKeys(Object.keys(TEXT_OVERFLOW));
const REGEX_WHITE_SPACE = constructKeys(Object.keys(WHITE_SPACE));


const regexStrings = [
    `^letter-spacing-(${REGEX_LETTER_SPACING})$`,
    `^line-height-(${REGEX_LINE_HEIGHT})$`,
    `^text-align-(${REGEX_TEXT_ALIGNS})$`,
    `^text-transform-(${REGEX_TEXT_TRANSFORM})$`,
    `^text-decoration-(${REGEX_TEXT_DECORATION})$`,
    `^text-overflow-(${REGEX_TEXT_OVERFLOW})$`,
    `^white-space-(${REGEX_WHITE_SPACE})$`,
]

export const regexList = regexStrings.map((regex) => new RegExp(regex, 'g'));

export default generate;