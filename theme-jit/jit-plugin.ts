import { execSync } from 'child_process';

const generateCSS = () => {
    try {
        execSync("jit.ts");
        console.log('CSS generated successfully.');
    } catch (error) {
        console.error('Error generating CSS:', error);
    }
}

export default function jitCSSPlugin() {
    return {
        name: 'vite-plugin-jitcss',
        apply: 'serve',
        buildStart() {
            generateCSS();
        },
        handleHotUpdate({ file, server }) {
            if (file.endsWith('.tsx')) {
                // Run jitCSS on .tsx file changes
                generateCSS();
                server.ws.send({
                    type: 'full-reload',
                });
            }
        },
    };
}
