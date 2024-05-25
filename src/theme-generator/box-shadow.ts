const boxShadowMapping = {
    xs: '1px 1px 4px 0px #cbd5e0',
    sm: '1px 1px 6px 0px #cbd5e0',
    md: '1px 1px 8px 0px #cbd5e0',
    lg: '1px 2px 10px 0px #cbd5e0',
    xl: '1px 2px 12px 0px #cbd5e0',
    '2xl': '1px 2px 14px 0px #cbd5e0',
}

const shadowList = Object.keys(boxShadowMapping);

const regexStrings = shadowList.map((shadow) => {
    return `^shadow-${shadow}$`;
})

const generateBoxShadow = (hash: string = "") => {
    const shadowMapping: Record<string, string> = {};

    for (const [key, value] of Object.entries(boxShadowMapping)) {
        shadowMapping[`shadow-${key}`] = `box-shadow: ${value};`;
    }

    return {
        base: {
            ...shadowMapping,
        },
        responsive: {},
        hash,
    };
}

export const regexList = regexStrings.map((regexString) => new RegExp(regexString, 'g'));

export default generateBoxShadow;
