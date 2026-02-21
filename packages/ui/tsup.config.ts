import { defineConfig } from "tsup";

export default defineConfig({
    entry: {
        placeholder: "src/placeholder.tsx",
        edgeviz: "src/edgeviz/edgeviz.tsx",
    },
    format: ["cjs", "esm"],
    dts: true,
    sourcemap: true,
    clean: true,
    external: ["react", "react-dom"],
});
