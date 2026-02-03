import type { Meta, StoryObj } from "@storybook/react";
import { PricingCard } from "@repo/blocks/pricing-card";

const meta: Meta<typeof PricingCard> = {
    title: "Blocks/PricingCard",
    component: PricingCard,
    tags: ["autodocs"],
    argTypes: {
        onCtaClick: { action: "cta clicked" },
    },
};

export default meta;
type Story = StoryObj<typeof PricingCard>;

export const Starter: Story = {
    args: {
        tierName: "Starter",
        price: "Free",
        period: "",
        features: ["1 User", "5 Projects", "Community Support"],
        isPopular: false,
        ctaLabel: "Sign Up Free",
    },
};

export const Pro: Story = {
    args: {
        tierName: "Pro Plan",
        price: "$29",
        period: "/month",
        features: ["Unlimited Users", "Unlimited Projects", "Analytics", "Priority Support"],
        isPopular: true,
    },
};