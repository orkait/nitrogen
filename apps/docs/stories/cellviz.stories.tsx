import type { Meta, StoryFn, StoryObj } from "@storybook/react";
import Cell from "@repo/ui/cellviz";

const meta: Meta<typeof Cell> = {
    title: "UI/CellViz",
    component: Cell,
    tags: ["autodocs"],
    argTypes: {

    },
};

export default meta;
type Story = StoryObj<typeof Cell>;

export const Default: Story = {
    args: {
        data: "one",
        size: "large",
        type: "active",
        overriding_config: {
            width: '300px',
            height: '400px'
        }

    },
};
