import { defineConfig } from "tsup";

export default defineConfig({
    entry: {
        "placeholder-card": "src/placeholder-card.tsx",
    },
    format: ["cjs", "esm"],
    dts: true,
    sourcemap: true,
    clean: true,
    external: ["react", "react-dom"],
});
