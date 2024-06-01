import { toEntries } from "./types";

const imageFit = {
    cover: 'cover',
    contain: 'contain',
    fill: 'fill',
    none: 'none',
    'scale-down': 'scale-down',
};

const generateImageFit = (hash: string = "") => {
    const objectFitMapping: Record<string, string> = {};

    for (const [key, value] of toEntries(imageFit)) {
        objectFitMapping[`object-${key}`] = `object-fit: ${value};`;
    }

    return {
        base: objectFitMapping,
        responsive: {},
        hash,
    };
}

const regexStrings = Object.keys(imageFit).map((imageFit) => {
    return `^object-${imageFit}$`;
})

export const regexList = regexStrings.map((regexString) => new RegExp(regexString, 'g'));

export default generateImageFit;