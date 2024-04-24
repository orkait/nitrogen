import { fixValue, toEntries } from "./types";

const TRANFORM_ROTATE = {
    'neg-rotate-90': 'rotate(-90deg)',
    'neg-rotate-45': 'rotate(-45deg)',
    'rotate-45': 'rotate(45deg)',
    'rotate-90': 'rotate(90deg)',
    'rotate-180': 'rotate(180deg)',
    'rotate-x-180': 'rotateX(180deg)',
    'rotate-y-180': 'rotateY(180deg)',
} as const;

const TRANFORM_SCALE = {
    'scale-0.5': 'scale(0.5)',
    'scale-1.1': 'scale(1.1)',
    'scale-1.25': 'scale(1.25)',
    'scale-1.5': 'scale(1.5)',
    'scale-2': 'scale(2)',
} as const;

const TRANFORM_TRANSLATE = {
    'translate-half': 'translate(-50%, -50%)',
    'translate-x-half': 'translateX(-50%)',
    'translate-y-half': 'translateY(-50%)',
    'translate-0': 'translate(0, 0)',
}

const generate = () => {
    let groupedCSS = '';
    for (const [key, value] of toEntries(TRANFORM_ROTATE)) {
        groupedCSS += `
        .transform-${fixValue(key)} {
            transform: ${value};
        }
        `;
    }

    for (const [key, value] of toEntries(TRANFORM_SCALE)) {
        groupedCSS += `
        .transform-${fixValue(key)} {
            transform: ${value};
        }
        `;
    }

    for (const [key, value] of toEntries(TRANFORM_TRANSLATE)) {
        groupedCSS += `
        .transform-${fixValue(key)} {
            transform: ${value};
        }
        `;
    }

    return groupedCSS;
}

export default generate;