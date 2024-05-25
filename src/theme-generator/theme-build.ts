import theme from "./theme";
import fs from "fs";
import { djb2Hash } from "./utils";

type themeKeysType = keyof typeof theme;

type themeType = {
    [key in themeKeysType]: Record<string, string>;
}

let css = '';
let hashcss = ''
for (const key in (theme as themeType)) {
    // iterate over each key value pair in the object
    for (const key2 in theme[key]) {
        css += `.${key2}{${theme[key][key2]}}\n`;
        hashcss += `.${djb2Hash(key2)}{${theme[key][key2]}}\n`;
    }
}



fs.writeFileSync('./src/theme-generator/theme.css', css);
fs.writeFileSync('./src/theme-generator/theme-hash.css', hashcss);
