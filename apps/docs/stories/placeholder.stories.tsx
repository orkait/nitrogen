import type { Meta, StoryObj } from "@storybook/react";
import { Placeholder } from "@repo/ui/placeholder";

const meta: Meta<typeof Placeholder> = {
    title: "UI/Placeholder",
    component: Placeholder,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {
        width: {
            control: "text",
            description: "Width of the placeholder",
        },
        height: {
            control: "text",
            description: "Height of the placeholder",
        },
        text: {
            control: "text",
            description: "Text to display in the placeholder",
        },
        variant: {
            control: "select",
            options: ["default", "shimmer"],
            description: "Visual variant of the placeholder",
        },
    },
};

export default meta;
type Story = StoryObj<typeof Placeholder>;

export const Default: Story = {
    args: {
        width: "400px",
        height: "200px",
        text: "Placeholder",
        variant: "default",
    },
};

export const Shimmer: Story = {
    args: {
        width: "400px",
        height: "200px",
        text: "Loading...",
        variant: "shimmer",
    },
};

export const Square: Story = {
    args: {
        width: "300px",
        height: "300px",
        text: "Square",
        variant: "default",
    },
};

export const Wide: Story = {
    args: {
        width: "600px",
        height: "100px",
        text: "Wide Banner",
        variant: "default",
    },
};

export const NoText: Story = {
    args: {
        width: "400px",
        height: "200px",
        variant: "shimmer",
    },
};
