import type { Meta, StoryObj } from "@storybook/react";
import Cell from "@repo/ui/cellviz";

const meta: Meta<typeof Cell> = {
    title: "UI/CellViz",
    component: Cell,
    tags: ["autodocs"],
    argTypes: {
        size: {
            control: { type: "select" },
            options: ["small", "medium", "large"],
            description: "Controls the size of the cell component.",
            table: {
                defaultValue: { summary: "medium" },
            },
        },
        type: {
            control: { type: "select" },
            options: ["default", "active", "error", "compareA", "compareB", "empty", "visited", "result", "swapping", "out-of-bounds"],
            description: "The visual state/variant of the cell.",
            table: {
                defaultValue: { summary: "default" },
            },
        },
        valueType: {
            control: { type: "select" },
            options: ["positive", "negative", "float", "char", "string"],
            description: "Style variant for the cell content.",
            table: {
                defaultValue: { summary: "positive" },
            },
        },
        data: {
            description: "The content to display inside the cell.",
            control: "text",
        },
        label: {
            description: "Primary label text displayed below the cell.",
            control: "text",
        },
        sublabel: {
            description: "Secondary label text (e.g., index) displayed below the primary label.",
            control: "text",
        },
        badge: {
            description: "Small badge text displayed in the top-right corner.",
            control: "text",
        },
        isLocked: {
            description: "Enhances the cell with a lock icon to indicate immutability.",
            control: "boolean",
            table: {
                defaultValue: { summary: "false" },
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof Cell>;

export const Default: Story = {
    args: {
        data: "42",
        label: "Default",
    },
};

export const Active: Story = {
    args: {
        data: "42",
        type: "active",
        label: "Current / Active",
    },
};

export const ResultSuccess: Story = {
    args: {
        data: "42",
        type: "result",
        label: "Result / Success",
    },
};

export const ErrorInvalid: Story = {
    args: {
        data: "42",
        type: "error",
        label: "Error / Invalid",
    },
};

export const Visited: Story = {
    args: {
        data: "42",
        type: "visited",
        label: "Visited",
    },
};

export const Empty: Story = {
    args: {
        type: "empty",
        label: "Empty / Null",
    },
};

export const Comparison: Story = {
    args: {
        data: "42",
        valueType: "positive",
    },
    parameters: {
        controls: {
            exclude: ['type'],
        },
    },
    render: (args) => (
        <div className="flex gap-4">
            <Cell {...args} type="compareA" label="Comparison A" />
            <Cell {...args} type="compareB" label="Comparison B" />
        </div>
    )
};

export const Metadata: Story = {
    args: {
        data: "42",
        sublabel: "i=3",
        label: "With Index",
        badge: "int",
        type: "default"
    },
};

export const ValueTypes: Story = {
    args: {
        data: "3.14",
        label: "Value Type Example",
        valueType: "float",
        type: "default"
    },
};

export const SpecialStates: Story = {
    args: {
        data: "42",
        label: "Special State Example",
        isLocked: true,
        type: "default"
    },
};
