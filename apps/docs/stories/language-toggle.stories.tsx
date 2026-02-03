import type { Meta, StoryObj } from "@storybook/react";
import { LanguageToggle } from "@repo/blocks/language-toggle";

const meta: Meta<typeof LanguageToggle> = {
    title: "Blocks/LanguageToggle",
    component: LanguageToggle,
    tags: ["autodocs"],
    argTypes: {
        onChange: { action: "changed" },
    },
};

export default meta;
type Story = StoryObj<typeof LanguageToggle>;

export const Default: Story = {
    args: {
        languages: ["Python", "C++", "Java"],
    },
};

export const ExtendedOptions: Story = {
    args: {
        languages: ["TypeScript", "Rust", "Go", "Swift"],
    },
};