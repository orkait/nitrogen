import type { Meta, StoryObj } from "@storybook/react";
import { PlaceholderCard } from "@repo/blocks/placeholder-card";

const meta: Meta<typeof PlaceholderCard> = {
    title: "Blocks/PlaceholderCard",
    component: PlaceholderCard,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {
        title: {
            control: "text",
            description: "Card title",
        },
        description: {
            control: "text",
            description: "Card description",
        },
        imageHeight: {
            control: "text",
            description: "Height of the image placeholder",
        },
        showImage: {
            control: "boolean",
            description: "Whether to show the image placeholder",
        },
    },
    decorators: [
        (Story) => (
            <div style={{ width: "350px" }}>
                <Story />
            </div>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof PlaceholderCard>;

export const Default: Story = {
    args: {
        title: "Card Title",
        description: "Card description goes here",
        imageHeight: 200,
        showImage: true,
    },
};

export const WithoutImage: Story = {
    args: {
        title: "Text Only Card",
        description: "This card has no image placeholder",
        showImage: false,
    },
};

export const TallImage: Story = {
    args: {
        title: "Tall Image Card",
        description: "This card has a taller image",
        imageHeight: 300,
        showImage: true,
    },
};

export const ShortImage: Story = {
    args: {
        title: "Short Image Card",
        description: "This card has a shorter image",
        imageHeight: 150,
        showImage: true,
    },
};

export const LongContent: Story = {
    args: {
        title: "Card with Long Title That Wraps",
        description: "This is a much longer description that demonstrates how the card handles more text content. It should wrap nicely within the card boundaries.",
        imageHeight: 200,
        showImage: true,
    },
};
