import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from "path";
import jitCSSPlugin from './jit-plugin';

export default defineConfig({
    plugins: [
        react(),
        jitCSSPlugin()
    ],
    build: {
        minify: false,
        cssMinify: false,
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src")
        }
    },
});