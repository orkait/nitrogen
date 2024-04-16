import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from "path";
const plugins = [react()];

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