export type NormalizeKey<K> = K extends "true" | "false" ? boolean : K;

export type VariantValue<T> = T extends Record<string, any> ? keyof T : never;

export type ConfigSchema = Record<string, Record<string, string | string[]>>;

export type ConfigVariants<T extends ConfigSchema> = {
    [K in keyof T]?: NormalizeKey<VariantValue<T[K]>>;
};

export type complexType<T extends ConfigSchema> = (args: ConfigVariants<T>) => ({
    [K in keyof T]?: string | string[] | boolean;
} & { className: string | string[] })[];

export type CVAType<T extends ConfigSchema> = {
    simple: (args: ConfigVariants<T>) => T;
    complex?: complexType<T>;
    default?: string | string[];
    defaultProps: ConfigVariants<T>;
};
