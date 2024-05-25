import { generateNextBase62, media } from './utils';
import mainTheme from './theme';
import { breakpointType } from './types';

const localTransformer = (x: string) => x;

const defaultOptions = {
    theme: mainTheme,
    transformer: localTransformer,
    shouldHash: false,
};

type mainThemeType = {
    theme: {
        [key: string]: {
            base: {
                [key: string]: string;
            };
            responsive: {
                [key: string]: {
                    [key: string]: string;
                };
            };
            hash: string;
            others?: any;
        };
    },
    transformer: (x: string) => string,
    shouldHash: boolean,
}

const getGeneratedTheme = (options: mainThemeType) => {
    let css = '';
    const mapping: {
        [key: string]: string;
    } = {};

    const { theme, transformer, shouldHash } = {
        ...defaultOptions,
        ...options,
    };

    Object.keys(theme).forEach(key => {
        const property = theme[key];
        let nextHash = property.hash;

        Object.keys(property.base).forEach(key2 => {
            const value = property.base[key2];
            const keyName = transformer(shouldHash ? nextHash || key2 : key2);

            if (nextHash && shouldHash) {
                nextHash = generateNextBase62(nextHash);
            }

            const newProperty = `.${keyName}{${value}}\n`;
            css += newProperty;

            mapping[key2] = keyName;
        });

        if (property?.responsive) {
            let allMediaClasses = '';
            Object.keys(property.responsive).forEach((breakpoint: breakpointType) => {
                media(breakpoint, resolveMedia => {
                    let mediaClasses = `@media ${resolveMedia}{`;

                    Object.keys(property.responsive[breakpoint]).forEach(x => {
                        const cssMap = property.responsive[breakpoint][x];
                        const keyName = transformer(
                            shouldHash
                                ? nextHash || `${breakpoint}\\:${x}`
                                : `${breakpoint}\\:${x}`
                        );

                        if (nextHash && shouldHash) {
                            nextHash = generateNextBase62(nextHash);
                        }
                        const newProperty = `.${keyName}{${cssMap}}\n`;
                        mediaClasses += newProperty;

                        mapping[`${breakpoint}\\:${x}`] = keyName;
                    });

                    mediaClasses += '}';

                    if (!mediaClasses.includes('{}')) {
                        allMediaClasses += mediaClasses;
                    }
                });
            });
            css += allMediaClasses;
        }
    });
    return {
        css,
        mapping,
    };
};

console.log(
    getGeneratedTheme({
        theme: mainTheme,
        transformer: localTransformer,
        shouldHash: true,
    })
)

export default getGeneratedTheme;