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
import { clone } from "./utils";
import { generateNextBase62, media } from "./utils";
import { breakpointType, mainThemeType } from './types';

export const themeMapping = {
    border: {
        hash: "a0",
        generator: borderGenerator
    },
    boxModel: {
        hash: "c0",
        generator: boxModelGenerator
    },
    boxShadow: {
        hash: "e0",
        generator: boxShadowGenerator
    },
    color: {
        hash: "g0",
        generator: colorGenerator
    },
    coordinates: {
        hash: "i0",
        generator: coordinatesGenerator
    },
    dimensions: {
        hash: "k0",
        generator: dimensionsGenerator
    },
    display: {
        hash: "m0",
        generator: displayGenerator
    },
    flex: {
        hash: "o0",
        generator: flexGenerator
    },
    fontProperties: {
        hash: "q0",
        generator: fontPropertiesGenerator
    },
    listStyle: {
        hash: "s0",
        generator: listStyleGenerator
    },
    opacity: {
        hash: "u0",
        generator: opacityGenerator
    },
    overflow: {
        hash: "w0",
        generator: overflowGenerator
    },
    position: {
        hash: "y0",
        generator: positionGenerator
    },
    text: {
        hash: "aa",
        generator: textGenerator
    },
    visibility: {
        hash: "ac",
        generator: visibilityGenerator
    },
    zIndex: {
        hash: "ae",
        generator: zIndexGenerator
    },
    transform: {
        hash: "ag",
        generator: transformGenerator
    },
    image: {
        hash: "ai",
        generator: imageGenerator
    },
    interactivity: {
        hash: "ak",
        generator: interactivityGenerator
    }
}

type themeMappingType = {
    [key in keyof typeof themeMapping]: {
        hash: string;
        generator: (hash: string) => {
            base: Record<string, string>;
            responsive: Record<string, Record<string, string>>;
            hash: string;
        };
    };
};

type mappingModifierType = (theme: themeMappingType) => themeMappingType;



export const generateThemeMapping = (theme: themeMappingType, callback: mappingModifierType) => {
    let computedMapping;

    if (callback) {
        computedMapping = callback(clone(theme))
    }

    let nextHash = "a0"
    const autoHashMapping = {};

    for (const key in computedMapping) {
        if (computedMapping[key].hash !== themeMapping[key].hash) {
            autoHashMapping[key] = computedMapping[key].generator(computedMapping[key].hash);
        } else {
            computedMapping[key].hash = themeMapping[key].hash
            const preCache = computedMapping[key].generator(nextHash);
            let estimatedLength = Object.keys(preCache.base).length + Object.keys(preCache.responsive).length
            autoHashMapping[key] = computedMapping[key].generator(nextHash);

            while (estimatedLength > 0) {
                nextHash = generateNextBase62(nextHash);
                estimatedLength--;
            }
        }
    }

    return autoHashMapping as {
        [key: string]: string
    };
}

const deafultOptions = {
    theme: generateThemeMapping(themeMapping, (theme) => theme),
    transformer: (x) => x,
    shouldHash: true,
}

type themeConfig = {
    theme?: {
        [key: string]: string
    },
    transformer?: (x: string) => string,
    shouldHash?: boolean
}

export const getGeneratedTheme = (options: themeConfig) => {
    let css = '';
    const mapping: {
        [key: string]: string;
    } = {};

    const { theme, transformer, shouldHash } = {
        ...deafultOptions,
        ...options
    };

    Object.keys(theme).forEach(key => {
        const property = theme[key];
        let nextHash = property.hash;

        Object.keys(property.base).forEach(key2 => {
            const value = property.base[key2];
            const keyName = transformer(shouldHash ? nextHash || key2 : key2);

            if (nextHash && shouldHash) {
                nextHash = generateNextBase62(nextHash);
            }

            const newProperty = `.${keyName}{${value}}\n`;
            css += newProperty;

            mapping[key2] = keyName;
        });

        if (property?.responsive) {
            let allMediaClasses = '';
            Object.keys(property.responsive).forEach((breakpoint: breakpointType) => {
                media(breakpoint, resolveMedia => {
                    let mediaClasses = `@media ${resolveMedia}{`;

                    Object.keys(property.responsive[breakpoint]).forEach(x => {
                        const cssMap = property.responsive[breakpoint][x];
                        const keyName = transformer(
                            shouldHash
                                ? nextHash || `${breakpoint}\\:${x}`
                                : `${breakpoint}\\:${x}`
                        );

                        if (nextHash && shouldHash) {
                            nextHash = generateNextBase62(nextHash);
                        }
                        const newProperty = `.${keyName}{${cssMap}}\n`;
                        mediaClasses += newProperty;

                        mapping[`${breakpoint}\\:${x}`] = keyName;
                    });

                    mediaClasses += '}';

                    if (!mediaClasses.includes('{}')) {
                        allMediaClasses += mediaClasses;
                    }
                });
            });
            css += allMediaClasses;
        }
    });
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


export default generateThemeMapping;