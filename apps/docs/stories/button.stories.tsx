import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@repo/ui/button";
import { CodeIcon } from "@repo/ui/code-icon"; // We can reuse your icon!

const meta: Meta<typeof Button> = {
    title: "UI/Button",
    component: Button,
    tags: ["autodocs"],
    argTypes: {
        // 1. Label Input (Text method, as requested)
        children: {
            control: "text",
            name: "Label",
            description: "The text content of the button",
        },
        // 2. Color & Variant
        variantColor: {
            control: "select",
            options: ["primary", "secondary", "danger"],
        },
        variant: {
            control: "select",
            options: ["fill", "outline", "ghost"],
        },
        // 3. Size & Shape
        size: {
            control: "radio",
            options: ["sm", "md", "lg"],
        },
        borderRadiusSize: {
            control: "select",
            options: ["none", "sm", "md", "lg", "full"],
        },

        // 4. Boolean Toggles
        block: {
            control: "boolean",
        },
        disabled: {
            control: "boolean",
        },
        // 5. Typography
        fontSize: {
            control: "select",
            options: ["sm", "md", "lg"]
        },
        fontWeight: {
            control: "select",
            options: ["normal", "medium", "bold"]
        },
        // 6. Icon Position Config
        leftIcon: { table: { disable: true } }, // Hide direct prop node
        rightIcon: { table: { disable: true } }, // Hide direct prop node
        iconPosition: {
            control: "radio",
            options: ["none", "left", "right"],
            mapping: {
                none: {},
                left: { leftIcon: <CodeIcon size={16} /> },
                right: { rightIcon: <CodeIcon size={16} /> }
            },
            description: "Choose icon placement"
        },
        // 7. Actions & Links
        onClick: { action: "clicked" },
        asChild: { table: { disable: true } },
    },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
    args: {
        children: "Pseudocode", // Matches your image
        variantColor: "primary",
        variant: "fill",
        size: "md",
        borderRadiusSize: "md",
        block: false,
        fontSize: "md",
        fontWeight: "medium",
    },
};