import { cva } from "class-variance-authority";

const intentColorMapping = {
    outline: {
        primary: "text-primary bg-transparent border-primary hover:text-primary-content hover:bg-primary",
        secondary: "text-secondary bg-transparent border-secondary hover:text-secondary-content hover:bg-secondary",
        warning: "text-warning bg-transparent border-yellow-500 hover:text-warning-content hover:bg-warning",
        danger: "text-danger bg-transparent border-danger hover:text-danger-content hover:bg-danger",
        success: "text-success bg-transparent border-sucess hover:text-success-content hover:bg-success",
    },
    filled: {
        primary: "bg-primary text-white hover:bg-primary-action text-primary-content",
        secondary: "bg-secondary text-white hover:bg-secondary-action text-secondary-content",
        warning: "bg-warning text-white hover:bg-warning-action text-warning-content",
        danger: "bg-danger text-white hover:bg-danger-action text-danger-content",
        success: "bg-success text-white hover:bg-success-action text-success-content",
    },
}


const buttonCVA = cva([
    "flex",
    "items-center",
    "justify-center",
    "font-semibold",
    "border",
    "border-transparent",
    "rounded",
    "focus:outline-none",

], {
    variants: {
        intent: {
            primary: intentColorMapping.filled.primary,
            secondary: intentColorMapping.filled.secondary,
            warning: intentColorMapping.filled.warning,
            danger: intentColorMapping.filled.danger,
            success: intentColorMapping.filled.success,
            link: [],
        },
        size: {
            sm: ["px-2", "py-1", "text-sm"],
            md: ["px-4", "py-1", "text-md"],
            lg: ["px-6", "py-2", "text-lg"],
            xl: ["px-8", "py-2", "text-xl"],
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
            true: ["cursor-wait", "bg-transparent"],
            false: [],
        },
        rounded: {
            sm: ["rounded-[4px]"],
            md: ["rounded-[6px]"],
            lg: ["rounded-[8px]"],
            xl: ["rounded-[12px]"],
            full: ["rounded-full"],
            none: [],
        },
        disabled: {
            true: ["cursor-not-allowed", "opacity-50"],
            false: ["transition", "active:scale-90", "duration-200", "ease-in-out"],
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
            className: intentColorMapping.outline.primary,
        },
        {
            intent: "secondary",
            outline: true,
            className: intentColorMapping.outline.secondary,
        },
        {
            intent: "warning",
            outline: true,
            className: intentColorMapping.outline.warning,
        },
        {
            intent: "danger",
            outline: true,
            className: intentColorMapping.outline.danger,
        },
        {
            intent: "success",
            outline: true,
            className: intentColorMapping.outline.success,
        },
        {
            loading: true,
            class: ["opacity-50", "cursor-not-allowed"],
        },
    ],
    defaultVariants: {
        intent: "primary",
        size: "md",
        outline: false,
        fullWidth: false,
    },
});


export default buttonCVA;
