import type { Meta, StoryObj } from "@storybook/react";
import Button, {
    intentEnum,
    sizeEnum,
    roundedEnum,
    iconPositionEnum
} from "@repo/ui/button";
import { MapPin } from "lucide-react";

const meta: Meta<typeof Button> = {
    component: Button,
    tags: ['autodocs'],
    args: {
        children: "",
        intent: "primary",
        outline: false,
        size: "md",
        hasFullWidth: false,
        loading: false,
        disabled: false,
        iconPosition: "left",
        rounded: "md",
    },
    argTypes: {
        intent: {
            control: { type: "select" },
            options: Object.values(intentEnum),
        },
        outline: {
            control: { type: "boolean" },
            options: [true, false],
        },
        size: {
            control: { type: "select" },
            options: Object.values(sizeEnum),
        },
        rounded: {
            control: { type: "select" },
            options: Object.values(roundedEnum),
        },
        hasFullWidth: {
            control: { type: "boolean" },
        },
        loading: {
            control: { type: "boolean" },
        },
        disabled: {
            control: { type: "boolean" },
        },
        iconPosition: {
            control: { type: "select" },
            options: Object.values(iconPositionEnum),
        },
    },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const DefaultStory: Story = {
    render: (props) => (
        <Button
            {...props}
        >
            {props.children}
        </Button>
    ),
    args: {
        children: "Hello",
    },
};