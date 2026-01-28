import { defineConfig } from "tsup";

export default defineConfig({
	entry: {
		index: "src/index.ts",
		cn: "src/cn.ts",
	},
	format: ["cjs", "esm"],
	dts: true,
	sourcemap: true,
	clean: true,
	external: ["react"],
});
