import { generateThemeMapping, getGeneratedTheme, themeMapping } from './theme';

const mainTheme = getGeneratedTheme({
    theme: generateThemeMapping(themeMapping, (theme) => {
        theme.interactivity.hash = "zz"
        return theme
    }),
    transformer: (x) => `o-${x}-main`,
    shouldHash: true,
})

console.log(mainTheme)


export default getGeneratedTheme;