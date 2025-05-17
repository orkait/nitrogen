import type { ConfigSchema, CVAType, ConfigVariants } from "./types";
import { twMerge } from "tailwind-merge";

class LOGIC<T extends ConfigSchema> {
    config: CVAType<T>;
    classMap: Record<string, string> = {};
    defaultClasses: string[] = [];
    classNames: string = '';

    constructor(config: CVAType<T>) {
        this.config = config;

        const defaultCls = config.default;
        if (typeof defaultCls === 'string') {
            this.defaultClasses = [defaultCls];
        } else if (Array.isArray(defaultCls)) {
            this.defaultClasses = defaultCls;
        }
    }

    applyDefault() {
        if (this.defaultClasses.length) {
            this.classMap['default'] = this.defaultClasses.join(' ');
        }
    }

    applySimple(conditions: ConfigVariants<T>) {
        const variantMap = this.config.simple?.(conditions);
        if (!variantMap) return;


        for (const key in conditions) {
            const value = conditions[key];
            const options = variantMap[key];

            if (options && value !== undefined) {
                const result = options[value as keyof typeof options];

                if (result) {
                    this.classMap[key] = Array.isArray(result) ? result.join(' ') : result;
                }
            }
        }
    }

    applyComplex(callableObject: ConfigVariants<T>) {
        const complexSearchSpace = this.config.complex ? this.config.complex(callableObject) : [];

        complexSearchSpace.forEach((complexObject) => {
            let isMatched = true;
            Object.entries(callableObject).forEach(([propName, propValue]) => {
                if (complexObject[propName] === undefined) {
                    isMatched = false;
                } else if (Array.isArray(complexObject[propName])) {
                    if (!complexObject[propName].includes(propValue as string)) {
                        isMatched = false;
                    }
                } else if (complexObject[propName] !== propValue) {
                    isMatched = false;
                }
            });
            if (isMatched) {
                if (Array.isArray(complexObject.className)) {
                    this.classMap['resolved'] = complexObject.className.join(' ');
                } else {
                    this.classMap['resolved'] = complexObject.className || '';
                }
            }
        });
    }

    check(props: ConfigVariants<T>) {
        this.classMap = {}; // reset previous state
        this.applyDefault();

        const merged: ConfigVariants<T> = {
            ...this.config.defaultProps,
            ...props,
        };

        this.applySimple(merged);
        this.applyComplex(merged);
        this.classNames = Object.values(this.classMap).join(' ').trim();
        return twMerge(this.classNames);
    }
}


function cva<T extends ConfigSchema>(config: CVAType<T>) {
    return new LOGIC<T>(config);
}

export default cva;