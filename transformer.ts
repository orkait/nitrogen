const getThemeClasses = (theme: string) => {
    return theme;
}
const getCustomClasses = (n: number) => getThemeClasses(`
    ${n % 2 === 0 ? 'bg-red-500' : 'bg-blue-500'}
`)


const hashMapping = new Map<string, string>();

function classnameToHash(theme: string) {
    if (hashMapping.has(theme)) {
        return hashMapping.get(theme);
    }

    const hash = djb2(theme);
    hashMapping.set(theme, hash.toString());
    return hash.toString();
}