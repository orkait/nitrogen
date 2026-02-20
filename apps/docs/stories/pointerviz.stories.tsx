import type { Meta, StoryObj } from "@storybook/react";
import PointerViz from "@repo/ui/pointerviz";

const meta: Meta<typeof PointerViz> = {
    title: "UI/PointerViz",
    component: PointerViz,
    tags: ["autodocs"],
    argTypes: {
        type: {
            control: { type: "select" },
            options: ["default", "active", "disabled", "warning", "error", "highlighted", "success"],
            description: "The visual style of the pointer.",
            table: {
                defaultValue: { summary: "default" },
            },
        },
        variant: {
            control: { type: "select" },
            options: ["arrow-down", "arrow-up", "caret", "bracket-left", "bracket-right"],
            description: "The shape and position of the pointer.",
            table: {
                defaultValue: { summary: "arrow-down" },
            },
        },
        size: {
            control: { type: "select" },
            options: ["small", "medium", "large"],
            description: "Size of the pointer.",
            table: {
                defaultValue: { summary: "medium" },
            },
        },
        label: {
            control: "text",
            description: "Optional label (e.g. 'L', 'R', 'mid').",
        },
    },
};

export default meta;
type Story = StoryObj<typeof PointerViz>;

export const Playground: Story = {
    args: {
        label: "Pointer",
        type: "default",
        variant: "arrow-down",
        size: "medium",
    },
};

// Types
export const Active: Story = {
    args: {
        ...Playground.args,
        type: "active",
        label: "Active",
    },
};

export const Disabled: Story = {
    args: {
        ...Playground.args,
        type: "disabled",
        label: "Disabled",
    },
};

export const Warning: Story = {
    args: {
        ...Playground.args,
        type: "warning",
        label: "Warn",
    },
};

export const ErrorState: Story = {
    args: {
        ...Playground.args,
        type: "error",
        label: "Error",
    },
};

export const Highlighted: Story = {
    args: {
        ...Playground.args,
        type: "highlighted",
        label: "Target",
    },
};

export const Success: Story = {
    args: {
        ...Playground.args,
        type: "success",
        label: "Done",
    },
};

// Variants
export const ArrowUp: Story = {
    args: {
        ...Playground.args,
        variant: "arrow-up",
        label: "Up",
    },
};

export const Caret: Story = {
    args: {
        ...Playground.args,
        variant: "caret",
        label: "Caret",
    },
};

export const BracketLeft: Story = {
    args: {
        ...Playground.args,
        variant: "bracket-left",
        label: undefined,
    },
};

export const BracketRight: Story = {
    args: {
        ...Playground.args,
        variant: "bracket-right",
        label: undefined,
    },
};

