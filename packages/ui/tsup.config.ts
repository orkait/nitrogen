import { defineConfig } from "tsup";

export default defineConfig({
    entry: {
        placeholder: "src/placeholder.tsx",
        cellviz: "src/cellviz/cellviz.tsx"
    },
    format: ["cjs", "esm"],
    dts: true,
    sourcemap: true,
    clean: true,
    external: ["react", "react-dom"],
});
