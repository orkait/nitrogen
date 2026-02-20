const { resolve } = require("path");

const config = {
    stories: ["../stories/**/*.stories.tsx", "!../stories/_archive/**"],
    addons: [
        "@storybook/addon-essentials",
        resolve(__dirname, "./scope-filter/register.js"),
    ],
    framework: {
        name: "@storybook/react-vite",
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
