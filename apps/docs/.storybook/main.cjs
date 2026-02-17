const { dirname, join, resolve } = require("path");

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up as monorepos.
 */
function getAbsolutePath(value) {
    return dirname(require.resolve(join(value, "package.json")));
}

/** @type { import('@storybook/react-vite').StorybookConfig } */
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
