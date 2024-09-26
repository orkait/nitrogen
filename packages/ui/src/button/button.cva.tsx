import { cva } from "class-variance-authority";

const buttonCVA = cva(["flex", "items-center", "justify-center",  "font-semibold", "border", "rounded", "focus:outline-none", "transition"], {
    variants: {
        intent: {
            primary: ["bg-blue-600", "text-white", "hover:bg-blue-700"],
            secondary: ["bg-gray-600", "text-white", "hover:bg-gray-700"],
            warning: ["bg-yellow-600", "text-white", "hover:bg-yellow-700"],
            danger: ["bg-red-600", "text-white", "hover:bg-red-700"],
            link: [],
        },
        size: {
            sm: ["px-2", "py-1", "text-sm"],
            md: ["px-4", "py-2", "text-md"],
            lg: ["px-6", "py-3", "text-lg"],
            xl: ["px-8", "py-4", "text-xl"],
        },
        paddingX: {
            sm: ["px-2"],
            md: ["px-4"],
            lg: ["px-6"],
            xl: ["px-8"],
        },
        outline: {
            true: ["border-[1px]", "border-solid"],
            false: [],
        },
        fullWidth: {
            true: ["w-full"],
            false: [],
        },
        loading: {
            true: ["cursor-wait"],
            false: [],
        },
        disabled: {
            true: ["cursor-not-allowed", "opacity-50"],
            false: [],
        },
        iconPosition: {
            left: [],
            right: [],
        }
    },
    compoundVariants: [
        {
            intent: "primary",
            outline: true,
            class: ["bg-transparent", "border-[1px]", "text-blue-600", "border-blue-600", "hover:text-blue-800", "hover:bg-blue-100"],
        },
        {
            intent: "secondary",
            outline: true,
            class: ["bg-transparent", "border-[1px]", "text-gray-600", "border-gray-600", "hover:text-gray-800", "hover:bg-gray-100"],
        },
        {
            intent: "warning",
            outline: true,
            class: ["bg-transparent", "border-[1px]", "text-yellow-600", "border-yellow-600", "hover:text-yellow-800", "hover:bg-yellow-100"],
        },
        {
            intent: "danger",
            outline: true,
            class: ["bg-transparent", "border-[1px]", "text-red-600", "border-red-600", "hover:text-red-800", "hover:bg-red-100"],
        },
        {
            intent: "link",
            outline: false,
            class: ["bg-transparent", "underline", "border-none", "text-blue-600", "hover:text-blue-800"],
        },
        {
            intent: "link",
            outline: true,
            class: ["bg-transparent", "border-[1px]", "border-blue-800", "underline", "text-blue-600", "hover:text-blue-800"],
        },
        {
            loading: true,
            // intent: "primary",
            class: ["opacity-50", "cursor-not-allowed", "hover:bg-blue-600"],
        }
    ],
    defaultVariants: {
        intent: "primary",
        size: "md",
        paddingX: "md",
        outline: false,
        fullWidth: false,
    },
});


export default buttonCVA;
