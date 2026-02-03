import type { Meta, StoryObj } from "@storybook/react";
import { ProfileCard } from "@repo/blocks/profile-card";

const meta: Meta<typeof ProfileCard> = {
    title: "Blocks/ProfileCard",
    component: ProfileCard,
    tags: ["autodocs"],
    argTypes: {
        onFollow: { action: "follow clicked" },
    },
};

export default meta;
type Story = StoryObj<typeof ProfileCard>;

export const Default: Story = {
    args: {
        name: "Alex Morgan",
        username: "@amorgan",
        role: "Product Designer",
        isFollowing: false,
    },
};

export const Following: Story = {
    args: {
        name: "Sarah Connor",
        username: "@sarah.c",
        role: "Security Lead",
        isFollowing: true,
    },
};