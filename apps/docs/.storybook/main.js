// This file has been automatically migrated to valid ESM format by Storybook.
import { dirname, join, resolve } from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function getAbsolutePath(value) {
	return dirname(require.resolve(join(value, "package.json")));
}

const config = {
	stories: ["../stories/**/*.stories.tsx", "!../stories/_archive/**"],
	addons: [
		getAbsolutePath("@storybook/addon-essentials"),
		resolve(__dirname, "./scope-filter/register.js"),
	],
	framework: {
		name: getAbsolutePath("@storybook/react-vite"),
		options: {},
	},

	core: {},

	async viteFinal(config, { configType }) {
		return {
			...config,
			define: { "process.env": {} },
		};
	},

	docs: {},
};

export default config;
