import { SPACES } from "./constants";
import { fixValue, toEntries } from "./types";

const generate = () => {
    let groupedCSS = '';
    ['top', 'left', 'bottom', 'right'].forEach((direction) => {
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