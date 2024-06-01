import type { Preview } from "@storybook/react";
import React from "react";
import "../src/theme-generator/css/theme.css";
import "./normalize.css";

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: "^on[A-Z].*" },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
};

export default preview;
