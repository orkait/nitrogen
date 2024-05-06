import { toEntries } from "./types";

const imageFit = {
    cover: 'cover',
    contain: 'contain',
    fill: 'fill',
    none: 'none',
    scaleDown: 'scale-down',
};

const generateImageFit = () => {
    let groupedCSS = '';
    for (const [key, value] of toEntries(imageFit)) {
        groupedCSS += `
        .object-${key} {
            object-fit: ${value};
        }
        `;
    }

    return groupedCSS;
}

const regexStrings = Object.keys(imageFit).map((imageFit) => {
    return `object-${imageFit}`;
})

export const regexList = regexStrings.map((regexString) => new RegExp(regexString, 'g'));

export default generateImageFit;