import type { Meta, StoryFn, StoryObj } from "@storybook/react";
import { PlaceholderGallery } from "@repo/composites/placeholder-gallery";

const meta: Meta<typeof PlaceholderGallery> = {
    title: "Blocks/PlaceholderGallery",
    component: PlaceholderGallery,
    tags: ["autodocs"],
    argTypes: {
        cardTitles: {
            control: "object",
            description: "Array of custom card titles",
        },
        cardDescriptions: {
            control: "object",
            description: "Array of custom card descriptions",
        },
    },
};

export default meta;
type Story = StoryObj<typeof PlaceholderGallery>;

export const Default: Story = {
    args: {
        columns: 3,
        count: 6,
    },
};

export const TwoColumns: Story = {
    args: {
        columns: 2,
        count: 4,
    },
};

export const FourColumns: Story = {
    args: {
        columns: 4,
        count: 8,
    },
};

export const SingleColumn: Story = {
    args: {
        columns: 1,
        count: 3,
    },
};

export const ManyItems: Story = {
    args: {
        columns: 3,
        count: 12,
    },
};

export const CustomContent: Story = {
    args: {
        columns: 3,
        count: 6,
        cardTitles: [
            "Product 1",
            "Product 2",
            "Product 3",
            "Product 4",
            "Product 5",
            "Product 6",
        ],
        cardDescriptions: [
            "High quality product with amazing features",
            "Best seller in our collection",
            "Limited edition item",
            "Customer favorite",
            "New arrival",
            "Special discount available",
        ],
    },
};
