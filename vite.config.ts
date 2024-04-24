import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

import path from "path";

const djb2 = (str: string) => {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
        hash = (hash * 33) ^ str.charCodeAt(i);
    }
    return hash >>> 0;
}

function myPlugin() {
    return {
        name: 'transform-file',
        enforce: 'post',
        transform(src, id) {
            const ext = path.extname(id);
            if (ext === '.tsx') {
                // check if the file is under the components folder
                if (id.includes('components')) {

                    // if the file is index.tsx, we don't want to transform it
                    if (id.includes('index.tsx')) {
                        return src;
                    }

                    console.log(src);
                }
            }
        },
    }
}


const plugins = [
    myPlugin(),
    react()
];



export default defineConfig({
    plugins: plugins,
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src")
        }
    },
    test: {
        // 👋 add the line below to add jsdom to vite
        environment: 'jsdom',
        // hey! 👋 over here
        globals: true,
        setupFiles: './src/vitest-setup.ts', // assuming the test folder is in the root of our project
    }
});