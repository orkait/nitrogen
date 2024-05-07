import { toEntries } from "./types";

const imageFit = {
    cover: 'cover',
    contain: 'contain',
    fill: 'fill',
    none: 'none',
    scaleDown: 'scale-down',
};

const generateImageFit = () => {
    const objectFitMapping: Record<string, string> = {};

    for (const [key, value] of toEntries(imageFit)) {
        objectFitMapping[`object-${key}`] = `object-fit: ${value};`;
    }

    return objectFitMapping;
}

const regexStrings = Object.keys(imageFit).map((imageFit) => {
    return `object-${imageFit}`;
})

export const regexList = regexStrings.map((regexString) => new RegExp(regexString, 'g'));

export default generateImageFit;