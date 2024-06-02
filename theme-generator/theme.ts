import borderGenerator, { regexList as borderRegexList } from "./borders";
import boxModelGenerator, { regexList as boxModelRegexList } from "./box-model";
import boxShadowGenerator, { regexList as boxShadowRegexList } from "./box-shadow";
import colorGenerator, { regexList as colorRegexList } from "./colors";
import coordinatesGenerator, { regexList as coordinatesRegexList } from "./coordinates";
import dimensionsGenerator, { regexList as dimensionsRegexList } from "./dimensions";
import displayGenerator, { regexList as displayRegexList } from "./displays";
import flexGenerator, { regexList as flexRegexList } from "./flex";
import fontPropertiesGenerator, { regexList as fontPropertiesRegexList } from "./font-properties";
import listStyleGenerator, { regexList as listStyleRegexList } from "./list-style";
import opacityGenerator, { regexList as opacityRegexList } from "./opacity";
import overflowGenerator, { regexList as overflowRegexList } from "./overflows";
import positionGenerator, { regexList as positionRegexList } from "./positions";
import textGenerator, { regexList as textRegexList } from "./text";
import visibilityGenerator, { regexList as visibilityRegexList } from "./visibility";
import zIndexGenerator, { regexList as zIndexRegexList } from "./z-index";
import interactivityGenerator, { regexList as interactivityRegexList } from "./interactivity";
import transformGenerator, { regexList as transformRegexList } from "./transform";
import imageGenerator, { regexList as imageRegexList } from "./image";
import { fixValue } from "./utils";
import { breakpointType } from './types';

export const breakPoints = {
    sm: "min-width: 640px",
    md: "min-width: 768px",
    lg: "min-width: 1024px",
    xl: "min-width: 1280px",
}

export const themeMapping = {
    ...borderGenerator(),
    ...boxModelGenerator(),
    ...boxShadowGenerator(),
    ...colorGenerator(),
    ...coordinatesGenerator(),
    ...dimensionsGenerator(),
    ...displayGenerator(),
    ...flexGenerator(),
    ...fontPropertiesGenerator(),
    ...listStyleGenerator(),
    ...opacityGenerator(),
    ...overflowGenerator(),
    ...positionGenerator(),
    ...textGenerator(),
    ...visibilityGenerator(),
    ...zIndexGenerator(),
    ...transformGenerator(),
    ...imageGenerator(),
    ...interactivityGenerator(),
}

export const themeObject = Object.values(themeMapping);

const deafultOptions = {
    theme: themeMapping,
    transformer: (x: string) => x,
    breakpoints: {
        sm: "min-width: 640px",
        md: "min-width: 768px",
        lg: "min-width: 1024px",
        xl: "min-width: 1280px",
    }
}

type themeConfig = {
    theme?: {
        [key: string]: string
    },
    breakpoints?: {
        [key in breakpointType]: string
    },
    transformer?: (x: string) => string,
    shouldHash?: boolean
}

export const getGeneratedTheme = (options: themeConfig) => {
    let css = '';
    const mapping: {
        [key: string]: string;
    } = {};

    const propertyMapping: Record<string, string> = {};

    const { theme, transformer, breakpoints } = {
        ...deafultOptions,
        ...options,
    };

    Object.keys(theme).forEach(key => {
        const property = theme[key];

        Object.keys(property.base).forEach(key => {
            const value = property.base[key];
            const keyName = transformer(key);
            css += `.${keyName}{${value}}\n`;
            propertyMapping[key] = `.${keyName}{${value}}\n`;
            mapping[key] = keyName;
        });
    });

    Object.entries(breakpoints).forEach(([breakpointKey, breakpointValue]) => {
        let breakPointCSS = `@media (${breakpointValue}){`;

        Object.keys(theme).forEach(key => {
            const property = theme[key];

            Object.keys(property.base).forEach(key => {
                const value = property.base[key];
                const keyName = transformer(key);

                const finalKeyName = fixValue(`${breakpointKey}:${keyName}`);
                const finalValue = fixValue(`.${breakpointKey}:${keyName}{${value}}`);

                breakPointCSS += finalValue
                mapping[finalKeyName] = finalValue
            });
        });

        breakPointCSS += `}`;
        css += breakPointCSS;
    })

    return {
        css,
        mapping,
    };
};

export const mainRegexList = [
    ...borderRegexList,
    ...boxModelRegexList,
    ...boxShadowRegexList,
    ...colorRegexList,
    ...coordinatesRegexList,
    ...dimensionsRegexList,
    ...displayRegexList,
    ...flexRegexList,
    ...fontPropertiesRegexList,
    ...listStyleRegexList,
    ...opacityRegexList,
    ...overflowRegexList,
    ...positionRegexList,
    ...textRegexList,
    ...visibilityRegexList,
    ...zIndexRegexList,
    ...transformRegexList,
    ...imageRegexList,
    ...interactivityRegexList
]

export const regexList = mainRegexList.map((regex) => {
    const breakPoint = Object.keys(breakPoints).join('|').trim();
    const s = regex.source.split("");
    const injectString = `(((${breakPoint})\\:)?)?`;
    s.splice(1, 0, injectString);
    return new RegExp(s.join(""), 'g');
});
