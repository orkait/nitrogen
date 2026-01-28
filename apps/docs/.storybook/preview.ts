import { Preview } from '@storybook/react';
import "@repo/ui/styles";

const preview: Preview = {
    parameters: {},
    tags: ["autodocs"],
    globalTypes: {
        scope: {
            name: "Scope",
            description: "Filter stories by scope",
            defaultValue: "all",
            toolbar: {
                icon: "component",
                items: [
                    { value: "ui", title: "UI" },
                    { value: "blocks", title: "Blocks" },
                    { value: "composites", title: "Composites" },
                    { value: "all", title: "All" },
                ],
                showName: true,
            },
        },
    },
};

export default preview;