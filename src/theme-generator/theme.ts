import borderGenerator from "./borders";
import boxModelGenerator from "./box-model";
import boxShadowGenerator from "./box-shadow";
import colorGenerator from "./colors";
import coordinatesGenerator from "./coordinates";
import dimensionsGenerator from "./dimensions";
import displayGenerator from "./displays";
import flexGenerator from "./flex";
import fontPropertiesGenerator from "./font-properties";
import listStyleGenerator from "./list-style";
import opacityGenerator from "./opacity";
import overflowGenerator from "./overflows";
import positionGenerator from "./positions";
import textGenerator from "./text";
import visibilityGenerator from "./visibility";
import zIndexGenerator from "./z-index";
import fs from 'fs';

const theme = {
    border: borderGenerator(),
    boxModel: boxModelGenerator(),
    boxShadow: boxShadowGenerator(),
    color: colorGenerator(),
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
}

const css = Object.values(theme).join('\n');

// write css to file
fs.writeFileSync('theme.css', css);
console.log(css);

export default theme;