import type { StorybookConfig } from "@storybook/react-vite";
import path from "path";

const storySourceAddon = {
    name: '@storybook/addon-storysource',
    options: {
        rule: {
            include: [path.resolve(__dirname, '../src')],
        },
        loaderOptions: {
            prettierConfig: { printWidth: 80, singleQuote: false },
        },
    },
}

const config: StorybookConfig = {
    stories: [
        "../src/**/*.mdx",
        "../src/**/**/*.stories.@(js|jsx|ts|tsx)",
        "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
    ],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-onboarding",
        "@storybook/addon-interactions",
        "@storybook/addon-styling-webpack",
        '@storybook/addon-storysource'
    ],
    framework: {
        name: "@storybook/react-vite",
        options: {},
    },
    docs: {
        autodocs: false,
    },
};
export default config;
