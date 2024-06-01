import { getGeneratedTheme } from "./theme";
import fs from 'fs';

const CSS_DESTINATION = 'css/theme.css';
const HASH_CSS_DESTINATION = 'css/theme-hash.css';

function themeBuilder() {
    const themeWithoutHash = getGeneratedTheme({
        transformer: (x) => `o-${x}-main`,
        shouldHash: false,
    })

    const themeWithHash = getGeneratedTheme({
        transformer: (x) => `o-${x}-main`,
        shouldHash: true,
    })

    return {
        themeWithoutHash,
        themeWithHash,
    }
}

const { themeWithoutHash, themeWithHash } = themeBuilder();

console.log(themeWithoutHash);


// check if destination file exists
// if (fs.existsSync(CSS_DESTINATION)) {
//     fs.unlinkSync(CSS_DESTINATION);
// }

// fs.mkdirSync('css', { recursive: true });
// fs.mkdirSync('js', { recursive: true });

// fs.writeFileSync(CSS_DESTINATION, JSON.stringify(themeWithoutHash), { flag: 'w' }, err => {
//     if (err) {
//         console.log('Error writing file:', err);
//     } else {
//         console.log('File written successfully');
//     }
// });

// fs.writeFileSync(hashCssDestination, hashCSS.css, { flag: 'w' }, err => {
//     if (err) {
//         console.log('Error writing file:', err);
//     } else {
//         console.log('File written successfully');
//     }
// });

// fs.writeFileSync(mappingDestination, mapping, { flag: 'w' }, err => {
//     if (err) {
//         console.log('Error writing file:', err);
//     } else {
//         console.log('File written successfully');
//     }
// });


// // check if the src/theme-generator folder exists
// if (!fs.existsSync('./src/theme-generator')) {
//     fs.mkdirSync('./src/theme-generator');

//     // check if the src/theme-generator/theme.css file exists
//     if (!fs.existsSync('./src/theme-generator/theme.css')) {
//         fs.writeFileSync('./src/theme-generator/theme.css', '');
//     }

// }


// fs.writeFileSync('./src/theme-generator/theme.css', css);
// fs.writeFileSync('./src/theme-generator/theme-hash.css', hashcss);
