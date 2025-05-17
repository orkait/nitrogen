import cva from "@repo/cva";

export const inputWidthCVA = cva({
    simple: () => {
        return {
            hasFullWidth: {
                true: "w-full",
                false: "max-w-[320px]",
            },
        }
    },
    defaultProps: {
        hasFullWidth: false
    }
})


const inputCVA = cva({
    default: [
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
        "align-bottom",
        "focus:ring-1",
    ],
    simple: () => {
        return {
            size: {
                sm: "p-[8px]",
                md: "p-[10px]",
                lg: "p-[12px]",
                xl: "p-[14px]"
            },
            intent: {
                primary: "border-blue-300 focus:border-blue-500 focus:ring-blue-500",
                secondary: "border-gray-300 focus:border-gray-500 focus:ring-gray-500",
                warning: "border-yellow-300 focus:border-yellow-500 focus:ring-yellow-500",
                danger: "border-red-300 focus:border-red-500 focus:ring-red-500",
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
                left: "pl-10 pr-5",
                right: "pr-10 pl-5",
            }
        }
    },
    defaultProps: {
        intent: "primary",
        disabled: false,
        rounded: "sm",
        size: "md"
    },
});

export const iconCVA = cva({
    default: [
        "ml-2",
        "p-2"
    ],
    simple: () => ({
        size: {
            sm: "",
            md: "",
            lg: "",
            xl: ""
        },
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
    }),
    complex: (args) => {
        return [
            {
                intent: "primary",
                disabled: false,
                isFocused: true,
                className: ["text-blue-500"]
            },
            {
                intent: "secondary",
                disabled: false,
                isFocused: true,
                className: ["text-gray-500"]
            },
            {
                intent: "warning",
                disabled: false,
                isFocused: true,
                className: ["text-yellow-500"]
            },
            {
                intent: "danger",
                disabled: false,
                isFocused: true,
                className: ["text-red-500"]
            }
        ]
    },
    defaultProps: {
        intent: "primary"
    }
})

export default inputCVA;