/* eslint-disable @typescript-eslint/no-explicit-any */
import { fixValue } from './types';
import { SPACES, SPACES_REGEX_KEYS } from "./constants";

const generate = () => {
    const paddingMap: Record<string, string> = {};
    const marginMap: Record<string, string> = {};

    const paddingXMap: Record<string, string> = {};
    const paddingYMap: Record<string, string> = {};
    const paddingLMap: Record<string, string> = {};
    const paddingRMap: Record<string, string> = {};
    const paddingBMap: Record<string, string> = {};
    const paddingTMap: Record<string, string> = {};

    const marginXMap: Record<string, string> = {};
    const marginYMap: Record<string, string> = {};
    const marginLMap: Record<string, string> = {};
    const marginRMap: Record<string, string> = {};
    const marginBMap: Record<string, string> = {};
    const marginTMap: Record<string, string> = {};

    for (const [key, value] of Object.entries(SPACES)) {
        paddingMap[`p-${fixValue(key)}`] = `padding: ${value + 'px'};`;
        paddingXMap[`px-${fixValue(key)}`] = ` padding-left: ${value + 'px'};padding-right: ${value + 'px'};`;
        paddingYMap[`py-${fixValue(key)}`] = ` padding-top: ${value + 'px'};padding-bottom: ${value + 'px'};`;
        paddingLMap[`pl-${fixValue(key)}`] = ` padding-left: ${value + 'px'};`;
        paddingRMap[`pr-${fixValue(key)}`] = ` padding-right: ${value + 'px'};`;
        paddingBMap[`pb-${fixValue(key)}`] = ` padding-bottom: ${value + 'px'};`;
        paddingTMap[`pt-${fixValue(key)}`] = ` padding-top: ${value + 'px'};`;


        marginMap[`m-${fixValue(key)}`] = `margin: ${value + 'px'};`;
        marginXMap[`mx-${fixValue(key)}`] = ` margin-left: ${value + 'px'};margin-right: ${value + 'px'};`;
        marginYMap[`my-${fixValue(key)}`] = ` margin-top: ${value + 'px'};margin-bottom: ${value + 'px'};`;
        marginLMap[`ml-${fixValue(key)}`] = ` margin-left: ${value + 'px'};`;
        marginRMap[`mr-${fixValue(key)}`] = ` margin-right: ${value + 'px'};`;
        marginBMap[`mb-${fixValue(key)}`] = ` margin-bottom: ${value + 'px'};`;
        marginTMap[`mt-${fixValue(key)}`] = ` margin-top: ${value + 'px'};`;
    }

    return {
        ...paddingMap,
        ...paddingXMap,
        ...paddingYMap,
        ...paddingLMap,
        ...paddingRMap,
        ...paddingBMap,
        ...paddingTMap,

        ...marginMap,
        ...marginXMap,
        ...marginYMap,
        ...marginLMap,
        ...marginRMap,
        ...marginBMap,
        ...marginTMap,
    };
}

console.log(generate())

const regexStrings = [
    `pt-(${SPACES_REGEX_KEYS})$(?![.\\d])\\b`,
    `pr-(${SPACES_REGEX_KEYS})$(?![.\\d])\\b`,
    `pb-(${SPACES_REGEX_KEYS})$(?![.\\d])\\b`,
    `pl-(${SPACES_REGEX_KEYS})$(?![.\\d])\\b`,
    `px-(${SPACES_REGEX_KEYS})$(?![.\\d])\\b`,
    `py-(${SPACES_REGEX_KEYS})$(?![.\\d])\\b`,

    `mt-(${SPACES_REGEX_KEYS})$(?![.\\d])\\b`,
    `mr-(${SPACES_REGEX_KEYS})$(?![.\\d])\\b`,
    `mb-(${SPACES_REGEX_KEYS})$(?![.\\d])\\b`,
    `ml-(${SPACES_REGEX_KEYS})$(?![.\\d])\\b`,
    `mx-(${SPACES_REGEX_KEYS})$(?![.\\d])\\b`,
    `my-(${SPACES_REGEX_KEYS})$(?![.\\d])\\b`,
]

export const regexList = regexStrings.map((str) => (new RegExp(str, 'g')));


export default generate;