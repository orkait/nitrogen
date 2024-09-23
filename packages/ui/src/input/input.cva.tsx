import { cva } from "class-variance-authority";

const inputCVA = cva([
    "text-black",
    "w-full",
    "border",
    "border-2",
    "outline-none",
    "disabled:bg-slate-50",
    "disabled:text-slate-500",
    "disabled:border-slate-200",
    "disabled:shadow-none",
    "invalid:border-pink-500",
    "invalid:text-pink-600",
    "focus:invalid:border-pink-500",
    "focus:invalid:ring-pink-500",
    "focus:outline-none",
    "vertical-align-middle",


], {
    variants: {
        intent: {
            primary: "border-blue-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500",
            secondary: "border-gray-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-500",
            warning: "border-yellow-300 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500",
            danger: "border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-500",
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
        hasFullWidth: {
            true: "w-full",
        },
        disabled: {
            true: "border-gray-300 bg-gray-100 text-gray-100 cursor-not-allowed",
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
        },
    },
    compoundVariants: [

    ],
    defaultVariants: {
        intent: "primary",
        size: "md",
        paddingX: "md",
        hasFullWidth: false,
        disabled: false,
        rounded: "md",
    },
});

export const iconCVA = cva([], {
    variants: {
        intent: {
            primary: "text-blue-300",
            secondary: "text-gray-300",
            warning: "text-yellow-300",
            danger: "text-red-300",
        },
        disabled: {
            true: "border-gray-400 bg-gray-100 text-gray-300 cursor-not-allowed",
        },
        isFocused: {
            true: "",
            false: ""
        }
    },
    compoundVariants: [
        {
            intent: "primary",
            disabled: false,
            isFocused: true,
            class: ["text-blue-500"]
        },
        {
            intent: "secondary",
            disabled: false,
            isFocused: true,
            class: ["text-gray-500"]
        },
        {
            intent: "warning",
            disabled: false,
            isFocused: true,
            class: ["text-yellow-500"]
        },
        {
            intent: "danger",
            disabled: false,
            isFocused: true,
            class: ["text-red-500"]
        }

    ],
    defaultVariants: {

    },
})

export default inputCVA;
