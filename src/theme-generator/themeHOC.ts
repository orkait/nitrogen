import { getGeneratedTheme } from './theme';

getGeneratedTheme({
    transformer: (x) => x,
    shouldHash: true,
})


export default getGeneratedTheme;