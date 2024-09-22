import type { Meta, StoryObj } from "@storybook/react";
import Input from "@repo/ui/input"; // Adjust the import path based on your actual repo structure
import { BrushIcon } from "lucide-react";
import React from "react";

const meta: Meta<typeof Input> = {
    component: Input,
    argTypes: {
        intent: {
            control: { type: "select" },
            options: ["primary", "secondary", "warning", "danger", "link"],
        },
        paddingX: {
            control: { type: "select" },
            options: ["sm", "md", "lg", "xl"],
        },
        size: {
            control: { type: "select" },
            options: ["sm", "md", "lg", "xl"],
        },
        type: {
            control: { type: "select" },
            options: ["text", "password", "email", "number"],
        },
        defaultValue: {
            control: { type: "text" },
        },
        disabled: {
            control: { type: "boolean" },
        },
        hasLegend: {
            control: { type: "boolean" },
        },
        rounded: {
            control: { type: "select" },
            options: ["sm", "md", "lg", "xl", "full"],
        },
        iconPosition: {
            control: { type: "select" },
            options: ["left", "right"],
        }
    },
};

export default meta;

type Story = StoryObj<typeof Input>;

const DefaultStoryExample = (props: any) => {
    const [value, setValue] = React.useState("");
    return (
        <Input
            onChange={(e) => setValue(e.target.value)}
            value={value}
            {...props}
        />
    );
}

export const DefaultStory: Story = {
    render: (props) => (
        <DefaultStoryExample {...props} />
    ),
    args: {},
};


