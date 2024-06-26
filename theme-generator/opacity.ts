import { constructKeys } from "./types";

const OPACITIES = {
    0: 0,
    10: 0.1,
    20: 0.2,
    30: 0.3,
    40: 0.4,
    50: 0.5,
    60: 0.6,
    70: 0.7,
    80: 0.8,
    90: 0.9,
    100: 1,
} as const;

const REGEX_OPACITIES = constructKeys(Object.keys(OPACITIES));

const generateOpacity = () => {
    const opacityMapping: Record<string, string> = {};

    for (const [key, value] of Object.entries(OPACITIES)) {
        opacityMapping[`opacity-${key}`] = `opacity: ${value};`;
    }
    return opacityMapping;
}

const regexStrings = [
    `^opacity-(${REGEX_OPACITIES})$`
]

export const regexList = regexStrings.map((regex) => new RegExp(regex, 'g'));

export default generateOpacity;
