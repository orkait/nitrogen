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

export default checkContrast;