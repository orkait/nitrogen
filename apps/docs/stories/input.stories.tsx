import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Input, {
    intentEnum,
    iconPositionEnum,
    roundedEnum,
    sizeEnum,
    inputTypeEnum,
} from "@repo/ui/input"; // Adjust the import path based on your actual repo structure

const meta: Meta<typeof Input> = {
    component: Input,
    args: {
        intent: "primary",
        size: "md",
        type: "text",
        defaultValue: "",
        disabled: false,
        rounded: "md",
        iconPosition: "left",
        hasFullWidth: false,
        hasIcon: true,
    },
    argTypes: {
        intent: {
            control: { type: "select" },
            options: Object.values(intentEnum),
        },
        placeholder: {
            control: { type: "text" },
        },
        size: {
            control: { type: "select" },
            options: Object.values(sizeEnum),
        },
        type: {
            control: { type: "select" },
            options: Object.values(inputTypeEnum),
        },
        defaultValue: {
            control: { type: "text" },
        },
        disabled: {
            control: { type: "boolean" },
        },
        rounded: {
            control: { type: "select" },
            options: Object.values(roundedEnum),
        },
        iconPosition: {
            control: { type: "select" },
            options: Object.values(iconPositionEnum),
        },
        hasFullWidth: {
            control: { type: "boolean" },
        },
        hasIcon: {
            control: { type: "boolean" },
        }
    },
};

export default meta;

type Story = StoryObj<typeof Input>;

const DefaultStoryExample = (props: any) => {
    const [value, setValue] = useState("");
    return (
        <Input
            onChange={(e) => setValue(e.target.value)}
            value={value}
            iconProps={{
                onClick: () => {
                    console.log("clicked");
                },
                className: "cursor-pointer"
            }}
            {...props}
        />
    );
}

export const DefaultStory: Story = {
    render: (props) => (
        <DefaultStoryExample {...props} />
    ),
    args: {},
};


