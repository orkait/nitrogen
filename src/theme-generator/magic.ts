import { mainRegexList } from "./theme";
import { regexList } from "./colors";
import generate from "./colors";
import checkContrast from "./utils";

const djb2Hash = (str: string) => {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
        hash = (hash * 33) ^ str.charCodeAt(i);
    }
    return hash >>> 0;
}

const {
    bgMapping,
    colorMapping,
} = generate()

const css = (classNames: string) => {
    const splitNames = classNames.split(' ').map((name) => name.trim());
    const matchNames: { [key: string]: string } = {};
    let nonMatchNames: string[] = [];

    const colorRegexList = regexList.find((regex) => regex.toString().includes('color-')) || ''
    const backgroundColorRegexList = regexList.find((regex) => regex.toString().includes('bg-')) || ''


    for (const name of splitNames) {
        let found = false;

        for (const regex of mainRegexList) {
            const re = new RegExp(regex);
            const match = re.test(name);

            if (match) {
                matchNames[djb2Hash(regex.toString())] = name;
            }

            found = found || match;
        }

        if (!found) {
            nonMatchNames.push(name);
        }
    }

    const textHash = matchNames[djb2Hash(colorRegexList.toString())] || '';
    const bgHash = matchNames[djb2Hash(backgroundColorRegexList.toString())] || '';

    if (bgHash !== '' && textHash === '') {
        const textHex = colorMapping[textHash] || '';
        const bgHex = bgMapping[bgHash] || '';

        if (bgHex !== '') {
            // text can be empty or not empty
            if (textHex === '') {
                const withWhite = checkContrast('#FFFFFF', bgHex);
                const withBlack = checkContrast('#000000', bgHex);
                matchNames[textHash] = withWhite > withBlack ? 'color-white' : '';
            } else {
                if (checkContrast(textHex, bgHex) < 4.5) {
                    const withWhite = checkContrast('#FFFFFF', bgHex);
                    const withBlack = checkContrast('#000000', bgHex);
                    matchNames[textHash] = withWhite > withBlack ? 'color-white' : '';
                }
            }
        }
    }

    return Object.values(matchNames).join(' ').trim() + ' ' + nonMatchNames.join(' ').trim();
}

console.log(
    css('color-red-500 color-5 bg-blue-500 bg-red-500 border-green-500 border-t-2 border-l-2 border-r-2 border-b-2')
)

export default css;