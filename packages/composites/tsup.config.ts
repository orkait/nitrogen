import { defineConfig } from "tsup";

export default defineConfig({
	entry: {
		"placeholder-gallery": "src/placeholder-gallery.tsx",
	},
	format: ["cjs", "esm"],
	dts: true,
	sourcemap: true,
	clean: true,
	external: ["react", "react-dom"],
});
