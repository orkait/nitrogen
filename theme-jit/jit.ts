import { regexList, themeMapping, breakPoints } from "../theme-generator/theme";
import { fixKV, listFiles, readLines } from './utils';
import fs from 'fs';

/**
 * Represents the available sizes for responsive configurations.
 */
type Sizes = 'default' | 'md' | 'sm' | 'lg' | 'xl';

/**
 * Represents the responsive configuration for each size.
 */
type ResponsiveConfig = Record<Sizes, {
    base: string[],
}>;

const COMPONENT_PATH = "../src/components";

/**
 * Recursively lists files in a directory.
 * @param dir - The directory path.
 * @param fileList - The list of files (optional).
 * @returns The list of files in the directory.
 */


const filteredFiles = listFiles(COMPONENT_PATH).filter(file => {
    const isJSXorTSX = file.endsWith('.jsx') || file.endsWith('.tsx');
    const isInTestFolder = file.includes('__tests__');
    const isInNodeModules = file.includes('node_modules');
    const isInDist = file.includes('dist');
    const isLog = file.endsWith('.log');
    const isIndex = file.endsWith('index.tsx');
    return (isJSXorTSX && !isInTestFolder && !isInNodeModules && !isInDist && !isLog && !isIndex);
});


/**
    * Segregates properties based on breakpoints.
    * @param strList - The set of strings to segregate.
    * @returns The responsive configuration object.
    */
function segregateProperties(strList: Set<string>): ResponsiveConfig {
    const breakPointRegex = /.*((md|sm|lg|xl):).*/;
    const segregator: ResponsiveConfig = {
        default: {
            base: [],
        },
        md: {
            base: [],
        },
        sm: {
            base: [],
        },
        lg: {
            base: [],
        },
        xl: {
            base: [],
        },
    };

    strList.forEach(str => {
        const parts = str.split(":");

        if (parts.length <= 1) {
            if (!segregator['default']['base']) {
                segregator['default']['base'] = [parts[0]];
            } else {
                segregator['default']['base'].push(parts[0]);
            }
        } else if (parts.length === 2) {
            const isBreakPoint = breakPointRegex.test(parts[0] + ":");

            if (isBreakPoint) {
                const breakPoint = parts[0] as Sizes;
                const property = parts[1];
                segregator[breakPoint]['base'].push(property);
            }
        }
    });

    return segregator;
}

/**
 * 
 * Generates the CSS string based on the responsive configuration and mapping.
 * @returns The generated CSS string.
 */
export function jitCSS() {
    const matchWordSet = new Set<string>();
    filteredFiles.map(file => readLines(file)).flat().map(line => {
        const allowedCharacters = /[^a-z0-9:-]/g;
        const wordInLines = line.trim().split(" ");
        const cleanedList = wordInLines.map(word => word.replace(allowedCharacters, ''));
        cleanedList.forEach(word => {
            const matchRex = regexList.some(regex => regex.test(word));

            if (matchRex) {
                matchWordSet.add(word);
            }
        });
        return cleanedList;
    });

    const generateCSS = (config: ResponsiveConfig, mapping: Record<string, string>): string => {
        let css = "";

        config.default.base.forEach(property => {
            css += `.${property}{${mapping[property]}}\n`;
        });

        Object.keys(config).filter(key => key !== 'default').forEach(breakPoint => {
            const breakPointConfig = config[breakPoint as Sizes];
            const mediaQuery = breakPoints[breakPoint as Sizes];
            let mediaCSS = `@media (${mediaQuery}){\n`;
            let containsAtLeastOneProperty = false;

            breakPointConfig.base.forEach(property => {
                mediaCSS += `.${fixKV(`${breakPoint}:${property}`)}{${mapping[property]}}\n`;
                containsAtLeastOneProperty = true;
            });

            mediaCSS += "}";

            if (containsAtLeastOneProperty) {
                css += mediaCSS + "\n\n";
            }
        });

        return css;
    }

    return generateCSS(
        segregateProperties(
            matchWordSet
        ),
        themeMapping
    );
}

const css = jitCSS();
fs.writeFileSync('./jit.css', css);