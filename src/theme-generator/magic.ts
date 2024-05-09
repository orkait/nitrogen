import { mainRegexList } from "./theme";
import { djb2Hash } from "./utils"


const css = (classNames: string) => {
    const splitNames = classNames.split(' ').map((name) => name.trim());
    const matchNames: { [key: string]: string } = {};
    const nonMatchNames: string[] = [];

    for (const name of splitNames) {
        let found = false;

        for (const regex of mainRegexList) {
            const re = new RegExp(regex);
            const match = re.test(name);

            if (match) {
                matchNames[djb2Hash(regex.toString())] = name;
            }

            found = found || match;
        }

        if (!found) {
            nonMatchNames.push(name);
        }
    }

    return Object.values(matchNames).join(' ').trim() + ' ' + nonMatchNames.join(' ').trim();
}

console.log(
    css('color-red-500 color-5 bg-blue-500 bg-red-500 border-green-500 border-t-2 border-l-2 border-r-2 border-b-2')
)

export default css;