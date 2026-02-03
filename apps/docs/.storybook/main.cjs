const { dirname, join, resolve } = require("path");

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

module.exports = config;
