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

const theme = {
    border: borderGenerator(),
    boxModel: boxModelGenerator(),
    boxShadow: boxShadowGenerator(),
    color: colorGenerator().css,
    coordinates: coordinatesGenerator(),
    dimensions: dimensionsGenerator(),
    display: displayGenerator(),
    flex: flexGenerator(),
    fontProperties: fontPropertiesGenerator(),
    listStyle: listStyleGenerator(),
    opacity: opacityGenerator(),
    overflow: overflowGenerator(),
    position: positionGenerator(),
    text: textGenerator(),
    visibility: visibilityGenerator(),
    zIndex: zIndexGenerator(),
    transform: transformGenerator(),
    image: imageGenerator(),
    interactivity: interactivityGenerator(),
}

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

export const getTheme = () => {
    return {
        ...theme,
        normalize: ''
    }
}

export default theme;