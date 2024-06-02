import { mainRegexList } from "./theme";

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
                matchNames[regex.toString()] = name;
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
    css('border-t-0 border-t-6 border-t-4 borss')
)

export default css;