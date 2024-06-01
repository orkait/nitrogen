import { getGeneratedTheme } from "./theme";
import fs from 'fs';

const CSS_DESTINATION = 'css/theme.css';

const theme = getGeneratedTheme({
    transformer: (x) => x,
    shouldHash: true,
})

console.log(theme.mapping)

fs.writeFileSync(CSS_DESTINATION, theme.css, err => {
    if (err) {
        console.log('Error writing file:', err);
    } else {
        console.log('File written successfully');
    }
});
