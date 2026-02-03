import type { Meta, StoryObj } from "@storybook/react";
import { ProgressBar } from "@repo/ui/progress-bar";

const meta: Meta<typeof ProgressBar> = {
    title: "UI/ProgressBar",
    component: ProgressBar,
    tags: ["autodocs"],
    argTypes: {
        value: { control: { type: "range", min: 0, max: 100 } },
        variant: {
            control: "select",
            options: ["default", "success", "warning"],
        }
    },
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {
    args: {
        value: 50,
    },
};

export const Success: Story = {
    args: {
        value: 100,
        variant: "success",
    },
};

export const Warning: Story = {
    args: {
        value: 75,
        variant: "warning",
    },
};
