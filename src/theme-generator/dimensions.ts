import { DIMENSIONS, SPACES } from "./constants";
import { toEntries, fixValue } from "./types";



const generate = () => {
    let groupedCSS = '';
    const properties = ['width', 'height', 'min-width', 'max-width', 'min-height', 'max-height'];

    properties.forEach((direction) => {
        for (const [key, value] of toEntries(DIMENSIONS)) {
            groupedCSS += `
            .${direction}-${fixValue(key)} {
                ${direction}: ${value};
            }
            `;
        }
    })

    properties.forEach((direction) => {
        for (const [key, value] of toEntries(SPACES)) {
            groupedCSS += `
            .${direction}-${fixValue(key)} {
                ${direction}: ${value}px;
            }
            `;
        }
    })
    return groupedCSS;
}

export default generate;