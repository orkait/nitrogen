import { cva } from "class-variance-authority";

const inputCVA = cva([
    "text-black",
    "border",
], {
    variants: {
        intent: {
            primary: "border-blue-500",
            secondary: "border-gray-500",
            warning: "border-yellow-500",
            danger: "border-red-500",
            disabled: "border-gray"
        },
        size: {
            sm: "p-1",
            md: "p-2",
            lg: "p-3",
            xl: "p-4",
        },
        paddingX: {
            sm: "px-1",
            md: "px-2",
            lg: "px-3",
            xl: "px-4",
        },
        fullWidth: {
            true: "w-full",
        },
        disabled: {
            true: "bg-gray-100",
        },
        rounded: {
            sm: "rounded-sm",
            md: "rounded-md",
            lg: "rounded-lg",
            xl: "rounded-xl",
            full: "rounded-full",
        },
        iconPosition: {
            left: "pl-10",
            right: "pr-10",

        }
    },
    compoundVariants: [

    ],
    defaultVariants: {
        intent: "primary",
        size: "md",
        paddingX: "md",
        fullWidth: false,
        disabled: false,
        rounded: "md",
    },
});

export default inputCVA;
