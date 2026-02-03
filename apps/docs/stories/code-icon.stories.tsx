import type { Meta, StoryObj } from "@storybook/react";
import { CodeIcon } from "@repo/ui/code-icon";

const meta: Meta<typeof CodeIcon> = {
    title: "UI/CodeIcon",
    component: CodeIcon,
    tags: ["autodocs"],
    argTypes: {
        className: { control: "text" },
    },
};

export default meta;
type Story = StoryObj<typeof CodeIcon>;

export const Default: Story = {
    args: {
        size: 24,
    },
};

export const LargeColored: Story = {
    args: {
        size: 48,
        className: "text-blue-500",
    },
};