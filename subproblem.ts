export const DISPLAYS = {
    flex: 'flex',
    block: 'block',
    'inline-flex': 'inline-flex',
    'inline-block': 'inline-block',
    grid: 'grid',
    none: 'none',
} as const;

export const OVERFLOWS = {
    auto: 'auto',
    hidden: 'hidden',
    visible: 'visible',
    scroll: 'scroll',
} as const;

const displayGenerator = () => {
    const groupMapping: { [key: string]: string } = {};
    for (const [key, value] of Object.entries(DISPLAYS)) {
        groupMapping[`display-${key}`] = `display: ${value}`;
    }
    return {
        base: groupMapping,
        responsive: {},
        hash
    };
};

const overflowGenerator = () => {
    const groupMapping: { [key: string]: string } = {};
    for (const [key, value] of Object.entries(OVERFLOWS)) {
        groupMapping[`display-${key}`] = `display: ${value}`;
    }
    return {
        base: groupMapping,
        responsive: {},
        hash
    };
};

const themeMapping = {
    display: {
        hash: "aa",
        generator: displayGenerator
    },
    overflow: {
        hash: "ee",
        generator: overflowGenerator
    }
};

type themeMappingType = {
    [key in keyof typeof themeMapping]: {
        hash: string;
        generator: (hash: string) => {
            base: Record<string, string>;
            responsive: Record<string, Record<string, string>>;
            hash: string;
        };
    };
};


function clone(obj) {
    if (obj === null || typeof (obj) !== 'object' || 'isActiveClone' in obj)
        return obj;

    let temp;

    if (obj instanceof Date)
        temp = new obj.constructor(); //or new Date(obj);
    else
        temp = obj.constructor();

    for (let key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            obj['isActiveClone'] = null;
            temp[key] = clone(obj[key]);
            delete obj['isActiveClone'];
        }
    }
    return temp;
}


const mappingModifier = (theme: themeMappingType) => {
    return theme;
};

type mappingModifierType = (theme: themeMappingType) => themeMappingType;

export const generateThemeMapping = (theme: themeMappingType, mappingModifier: mappingModifierType): themeMappingType => {
    const precomputedMapping = clone(theme);
    const computedMapping: themeMappingType = clone(mappingModifier(theme));

    for (const key in computedMapping) {
        console.log({
            a: precomputedMapping[key].hash,
            b: computedMapping[key].hash
        })
    }

    return mappingModifier(computedMapping);
};

console.log({
    before: themeMapping,
    after: generateThemeMapping(themeMapping, (themeMapping) => {
        themeMapping.display.hash = "bb";
        return mappingModifier(themeMapping);
    })
});
