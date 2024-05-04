import { constructKeys, fixValue } from './types';

const BOX_SHADOW_XOFFSETS = {
    'neg-x4': '-4px',
    'neg-x2': '-2px',
    'x0': '0px',
    'x2': '2px',
    'x4': '4px',
};

const BOX_SHADOW_YOFFSETS = {
    'neg-y4': '-4px',
    'neg-y2': '-2px',
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

const REGEX_BOX_SHADOW_XOFFSETS = constructKeys(Object.keys(BOX_SHADOW_XOFFSETS));
const REGEX_BOX_SHADOW_YOFFSETS = constructKeys(Object.keys(BOX_SHADOW_YOFFSETS));
const REGEX_BOX_SHADOW_COLORS = constructKeys(Object.keys(BOX_SHADOW_COLORS));
const REGEX_BLUR_RADII = constructKeys(Object.keys(BLUR_RADII));

const regexStrings = [
    `shadow-(${REGEX_BOX_SHADOW_XOFFSETS})-(${REGEX_BOX_SHADOW_YOFFSETS})-(${REGEX_BLUR_RADII})-(${REGEX_BOX_SHADOW_COLORS})`,
]

export const regexList = regexStrings.map((regexString) => new RegExp(regexString, 'g'));

export default generateBoxShadow;
