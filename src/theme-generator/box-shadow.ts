import { fixValue } from './types';

const BOX_SHADOW_XOFFSETS = {
    'nx4': '-4px',
    'nx2': '-2px',
    'x0': '0px',
    'x2': '2px',
    'x4': '4px',
};

const BOX_SHADOW_YOFFSETS = {
    'ny4': '-4px',
    'ny2': '-2px',
    'y0': '0px',
    'y2': '2px',
    'y4': '4px',
};

const BOX_SHADOW_COLORS = {
    100: 'rgba(0, 0, 0, 0.05)',
    200: 'rgba(0, 0, 0, 0.1)',
    300: 'rgba(0, 0, 0, 0.3)',
    400: 'rgba(0, 0, 0, 0.5)',
};

const BLUR_RADII = {
    0: '0px',
    2: '2px',
    4: '4px',
    6: '6px',
    8: '8px',
};

const generateBoxShadow = () => {
    let groupedCSS = '';
    for (const [xOffsetKey, xOffsetValue] of Object.entries(BOX_SHADOW_XOFFSETS)) {
        for (const [yOffsetKey, yOffsetValue] of Object.entries(BOX_SHADOW_YOFFSETS)) {
            if (xOffsetKey === 'x0' || yOffsetKey === 'y0') {
                for (const [blurKey, blurValue] of Object.entries(BLUR_RADII)) {
                    for (const [colorKey, colorValue] of Object.entries(BOX_SHADOW_COLORS)) {
                        groupedCSS += `
                            .shadow-${xOffsetKey}-${yOffsetKey}-${fixValue(blurKey)}-${colorKey} {
                                box-shadow: ${xOffsetValue} ${yOffsetValue} ${fixValue(blurValue)} ${colorValue};
                            }
                        `;
                    }
                }
            }
        }
    }
    return groupedCSS;
}

export const regexList = [
    /shadow-(nx4|nx2|x0|x2|x4)-(ny4|ny2|y0|y2|y4)-(0|2|4|6|8)-(100|200|300|400)/g
]

export default generateBoxShadow;
