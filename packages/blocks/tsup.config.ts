import { defineConfig } from "tsup";

export default defineConfig({
    entry: {
        "placeholder-card": "src/placeholder-card.tsx",
        "language-toggle": "src/language-toggle.tsx", // for header toggle (C++,java, python)
        "profile-card": "src/profile-card.tsx",
        "pricing-card": "src/pricing-card.tsx",
        "code-window": "src/code-window.tsx",
        "topic-card": "src/topic-card.tsx",
    },
    format: ["cjs", "esm"],
    dts: true,
    sourcemap: true,
    clean: true,
    external: ["react", "react-dom"],
});
