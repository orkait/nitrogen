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
            resolve: {
                alias: {
                    ...config.resolve?.alias,
                    react: resolve(__dirname, "../../node_modules/react"),
                    "react-dom": resolve(__dirname, "../../node_modules/react-dom"),
                    "react/jsx-runtime": resolve(__dirname, "../../node_modules/react/jsx-runtime.js"),
                    "react/jsx-dev-runtime": resolve(__dirname, "../../node_modules/react/jsx-dev-runtime.js"),
                },
            },
            define: { "process.env": {} },
        };
    },

    docs: {},
};

module.exports = config;
