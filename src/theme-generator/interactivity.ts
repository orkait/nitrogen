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
    let groupedCSS = '';
    for (const [key, value] of Object.entries(INTERACTIVITY)) {
        groupedCSS += `
        .${key} {
            ${value};
        }
        `;
    }
    return groupedCSS;
}

export default generate;