import type { Meta, StoryObj } from "@storybook/react";
import { IconBox } from "@repo/ui/icon-box";

const CodeIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
);

const meta: Meta<typeof IconBox> = {
    title: "UI/IconBox",
    component: IconBox,
    tags: ["autodocs"],
    argTypes: {
        variant: {
            control: "select",
            options: ["default", "primary", "success", "ghost"],
        },
        size: {
            control: "radio",
            options: ["sm", "md", "lg"],
        }
    },
};

export default meta;
type Story = StoryObj<typeof IconBox>;

export const Default: Story = {
    args: {
        children: <CodeIcon />,
    },
};

export const Primary: Story = {
    args: {
        variant: "primary",
        size: "md",
        children: <CodeIcon />,
    },
};

export const LargeSuccess: Story = {
    args: {
        variant: "success",
        size: "lg",
        children: <CodeIcon />,
    },
};
