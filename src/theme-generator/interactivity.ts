const INTERACTIVITY = {
    'appearance-none': 'appearance: none',
    'cursor-pointer': 'cursor: pointer',
    'cursor-not-allowed': 'cursor: not-allowed',
    'cursor-default': 'cursor: default',
    'outline-none': 'outline: none',
    'pointer-events-none': 'pointer-events: none',
    'user-select-none': 'user-select: none',
    'tap-highlight-color-transparent': '-webkit-tap-highlight-color: rgba(0,0,0,0)',
}

const generate = () => {
    const interactivityMapping: Record<string, string> = {};

    for (const [key, value] of Object.entries(INTERACTIVITY)) {
        interactivityMapping[key] = value;
    }

    return interactivityMapping;
}


const regexStrings = [
    `appearance-none`,
    `cursor-(pointer|not-allowed|default)$`,
    `outline-none`,
    `pointer-events-none`,
    `user-select-none`,
    `tap-highlight-color-transparent`,
]

export const regexList = regexStrings.map((str) => new RegExp(str, 'g'));

export default generate;