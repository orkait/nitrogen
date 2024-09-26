export const concatString = (str1: string, str2: string): string => {
    if (!str1) {
        return str2 || "";
    }
    if (!str2 && str2 !== "") {
        throw new Error("str2 is required");
    }
    return str1 + (str2 !== '' ? "-" + str2 : '');
}

export const makeDTI = (componentName: string, dataTestId: string) => {
    const callable = function (dti?: string): string {
        return concatString(componentName, concatString(dataTestId, dti || ''));
    }
    return callable;
}
