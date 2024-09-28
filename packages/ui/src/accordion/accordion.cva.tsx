import { cva } from "class-variance-authority";

export const accordionVariants = cva(
    "w-full",
    {
        variants: {
            variant: {
                default: "",
                compact: "max-w-md",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

export const accordionContentVariants = cva(
    "overflow-hidden text-sm transition-all  data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down ",
    {
        variants: {
            variant: {
                default: "",
                compact: "text-xs",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

export const accordionItemVariants = cva([], {
    variants: {
        variant: {
            default: "",
            compact: "py-2",
        },
        hasBorder: {
            true: "border-b",
            false: ""
        }
    },
    defaultVariants: {
        variant: "default",
        hasBorder: true
    },
});


export const accordionTriggerVariants = cva(
    "flex w-full items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
    {
        variants: {
            variant: {
                default: "text-lg",
                compact: "text-base",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)



