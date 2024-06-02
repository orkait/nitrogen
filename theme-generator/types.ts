type InferKey<T> = T extends Partial<Record<infer K, unknown>> ? K : never;
type InferValue<T> = T extends Partial<Record<string | number | symbol, infer V>> ? V : never;
export const toEntries = <T extends Partial<Record<string, unknown>>>(obj: T) => {
    return Object.entries(obj) as [InferKey<T>, InferValue<T>][];
};

export const constructKeys = (keys: string[]) => {
    let concatString = "";
    for (const key of keys) {
        concatString += key.replace(".", "\\.") + '|';
    }
    return concatString.slice(0, -1);
}

export type breakpointType = 'sm' | 'md' | 'lg' | 'xl';

export type mainThemeType = {
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
        };
    },
    transformer: (x: string) => string,
    shouldHash: boolean,
}