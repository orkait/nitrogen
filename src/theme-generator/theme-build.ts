import theme from "./theme";
import fs from 'fs';

let css = Object.values(theme).join('\n');

console.log(css);

// remove all spaces from css string and replace with empty string
// remove all new lines from css string and replace with empty string
// remove all tabs from css string and replace with empty string

// css = css.replace(/\s/g, '').replace(/\n/g, '').replace(/\t/g, '');

// write css to file
fs.writeFileSync('./src/theme-generator/theme.css', css);

