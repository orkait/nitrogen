import { MEDIA_QUERIES } from "./constants";

// Define a Color class to represent colors
class Color {
    constructor(public readonly r: number, public readonly g: number, public readonly b: number) { }

    // Create a Color instance from a hexadecimal color code
    static fromHex(hex: string): Color {
        // Remove '#' if present
        hex = hex.replace('#', '');

        // Parse hexadecimal color code
        const bigint = parseInt(hex, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;

        return new Color(r, g, b);
    }

    // Calculate the relative luminance of a color
    relativeLuminance(): number {
        const RsRGB = this.r / 255;
        const GsRGB = this.g / 255;
        const BsRGB = this.b / 255;

        const R = RsRGB <= 0.03928 ? RsRGB / 12.92 : Math.pow((RsRGB + 0.055) / 1.055, 2.4);
        const G = GsRGB <= 0.03928 ? GsRGB / 12.92 : Math.pow((GsRGB + 0.055) / 1.055, 2.4);
        const B = BsRGB <= 0.03928 ? BsRGB / 12.92 : Math.pow((BsRGB + 0.055) / 1.055, 2.4);

        return 0.2126 * R + 0.7152 * G + 0.0722 * B;
    }

    // Calculate the contrast ratio between two colors
    contrastRatio(foreground: Color, background: Color): number {
        const L1 = foreground.relativeLuminance();
        const L2 = background.relativeLuminance();
        return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
    }
}

// Define a function to check color contrast against WCAG standards
function checkContrast(foregroundHex: string, backgroundHex: string): number {
    const foregroundColor = Color.fromHex(foregroundHex || '');
    const backgroundColor = Color.fromHex(backgroundHex || '');
    return Number(foregroundColor.contrastRatio(foregroundColor, backgroundColor).toFixed(2));
}


export const djb2Hash = (str: string) => {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
        hash = (hash * 33) ^ str.charCodeAt(i);
    }
    return `o-${(hash >>> 0)}`;
}

export const toEntries = obj => Object.entries(obj);

export const fixValue = value =>
    value
        .toString()
        .replace('.', '\\.')
        .replace(':', '\\:')
        .replace('/', '\\/');

export const constructKeys = keys => {
    const concatString = keys
        .map(
            key =>
                `${key
                    .replace('.', '\\.')
                    .replace(':', '\\:')
                    .replace('/', '\\/')}`
        )
        .join('|');
    return concatString;
};


export const media = (breakpoint: 'sm' | 'md' | 'lg' | 'xl', callback: any) =>
    callback(MEDIA_QUERIES[breakpoint]);


export const generateNextBase62 = str => {
    const base62 =
        '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let carry = 1;
    let i = str.length;
    let result = '';

    while (i--) {
        let index = base62.indexOf(str[i]);
        index += carry;
        if (index >= 62) {
            carry = 1;
            index -= 62;
        } else {
            carry = 0;
        }
        result = base62[index] + result;
    }

    if (carry) {
        result = `1${result}`;
    }

    return result;
};

export function clone(obj) {
    let temp;
    if (obj === null || typeof (obj) !== 'object' || 'isActiveClone' in obj)
        return obj;

    if (obj instanceof Date)
        temp = new obj.constructor(); //or new Date(obj);
    else
        temp = obj.constructor();

    for (let key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            obj['isActiveClone'] = null;
            temp[key] = clone(obj[key]);
            delete obj['isActiveClone'];
        }
    }
    return temp;
}

export default checkContrast;