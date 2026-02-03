import { defineConfig } from "tsup";

export default defineConfig({
    entry: {
        placeholder: "src/placeholder.tsx",
        "code-icon": "src/code-icon.tsx", // icon
        button: "src/button.tsx", // button
        "progress-bar": "src/progress-bar.tsx", // progress-bar
        "icon-box": "src/icon-box.tsx",

    },
    format: ["cjs", "esm"],
    dts: true,
    sourcemap: true,
    clean: true,
    external: ["react", "react-dom"],
});
