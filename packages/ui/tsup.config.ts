import { defineConfig } from "tsup";

export default defineConfig((options) => ({
    entryPoints: [
        "src/*/**.tsx",
    ],
    format: ["cjs", "esm"],
    dts: true,
    sourcemap: true,
    external: ["react"],
    ...options,
}));
