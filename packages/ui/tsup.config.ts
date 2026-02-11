import { defineConfig } from "tsup";

export default defineConfig({
    entry: {
        placeholder: "src/placeholder.tsx",
        nodeviz: "src/nodeviz/index.ts",

    },
    format: ["cjs", "esm"],
    dts: true,
    sourcemap: true,
    clean: true,
    external: ["react", "react-dom"],
});
