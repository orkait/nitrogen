type InferKey<T> = T extends Partial<Record<infer K, unknown>> ? K : never;
type InferValue<T> = T extends Partial<Record<string | number | symbol, infer V>> ? V : never;
export const toEntries = <T extends Partial<Record<string, unknown>>>(obj: T) => {
    return Object.entries(obj) as [InferKey<T>, InferValue<T>][];
};

export const fixValue = (value: string | number) => {
    return value.toString().replace('.', '\\.');
}