import { defineConfig } from "tsup";

export default defineConfig({
    entry: {
        placeholder: "src/placeholder.tsx",
        pointerviz: "src/pointerviz/pointerviz.tsx"
    },
    format: ["cjs", "esm"],
    dts: true,
    sourcemap: true,
    clean: true,
    external: ["react", "react-dom"],
});
