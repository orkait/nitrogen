import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from "path";


function myPlugin() {
    return {
        name: 'transform-file',
        enforce: 'post',
        transform(src: string, id: string) {
            const ext = path.extname(id);
            if (ext === '.tsx') {
                // pass
            }
            return src;
        },
    }
}


const plugins = [
    myPlugin(),
    react()
];

export default defineConfig({
    plugins: plugins,
    build: {
        minify: false,
        cssMinify: false,
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src")
        }
    },
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: './src/vitest-setup.ts',
    }
});