
const OPACITIES = {
    0: 0,
    10: 0.1,
    20: 0.2,
    30: 0.3,
    40: 0.4,
    50: 0.5,
    60: 0.6,
    70: 0.7,
    80: 0.8,
    90: 0.9,
    100: 1,
}

const generateOpacity = () => {
    let groupedCSS = '';
    for (const [key, value] of Object.entries(OPACITIES)) {
        groupedCSS += `
            .opacity-${key} {
                opacity: ${value};
            }
        `;
    }
    return groupedCSS;
}


export default generateOpacity;
