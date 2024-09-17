import type { Meta, StoryObj } from "@storybook/react";
import Button from "@repo/ui/button"; // Adjust the import path based on your actual repo structure
import { MapPin } from "lucide-react";

const meta: Meta<typeof Button> = {
    component: Button,
    argTypes: {
        intent: {
            control: { type: "select" },
            options: ["primary", "secondary", "warning", "danger", "link"],
        },
        outline: {
            control: { type: "boolean" },
            options: [true, false],
        },
        size: {
            control: { type: "select" },
            options: ["sm", "md", "lg", "xl"],
        },
        paddingX: {
            control: { type: "select" },
            options: ["sm", "md", "lg", "xl"],
        },
        hasFullWidth: {
            control: { type: "boolean" },
        },
        loading: {
            control: { type: "boolean" },
        },
        disabled: {
            control: { type: "boolean" },
        },
        iconPosition: {
            control: { type: "select" },
            options: ["left", "right"],
        },
    },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const DefaultStory: Story = {
    render: (props) => (
        <Button
            {...props}
        >
            {props.children}
        </Button>
    ),
    args: {
        children: "Hello",
    },
};

export const ButtonWithIcon: Story = {
    render: (props) => (
        <Button
            {...props}
            icon={MapPin}
        >
            {props.children}
        </Button>
    ),
    args: {
        children: "Hello",
    },
    name: "Button with icon",
};


