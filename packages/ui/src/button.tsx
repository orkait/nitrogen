import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@repo/ui-utils";

// 1. Define all your Styles & Variants here
const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variantColor: {
                primary: "bg-black text-white hover:bg-black/90",
                secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
                danger: "bg-red-500 text-white hover:bg-red-600",
            },
            variant: {
                fill: "border-transparent",
                outline: "border-2 bg-transparent",
                ghost: "bg-transparent hover:bg-accent hover:text-accent-foreground",
            },
            size: {
                sm: "h-8 px-3",
                md: "h-10 px-6 py-2",
                lg: "h-12 px-8",
            },
            borderRadiusSize: {
                none: "rounded-none",
                sm: "rounded-sm",
                md: "rounded-md",
                lg: "rounded-lg",
                full: "rounded-full",
            },
            fontSize: {
                sm: "text-sm",
                md: "text-base",
                lg: "text-lg",
            },
            fontWeight: {
                normal: "font-normal",
                medium: "font-medium",
                bold: "font-bold",
            },
            block: {
                true: "w-full",
            },
        },
        // Default values if nothing is selected
        defaultVariants: {
            variantColor: "primary",
            variant: "fill",
            size: "md",
            borderRadiusSize: "md",
            fontSize: "md",
            fontWeight: "medium",
        },
    }
);

export interface ButtonProps
    extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variantColor, variant, size, borderRadiusSize, fontSize, fontWeight, block, asChild = false, leftIcon, rightIcon, children, ...props }, ref) => {
        const Comp = asChild ? Slot : "button";
        return (
            <Comp
                className={cn(buttonVariants({ variantColor, variant, size, borderRadiusSize, fontSize, fontWeight, block, className }))}
                ref={ref}
                {...props}
            >
                {leftIcon && <span className="mr-2">{leftIcon}</span>}
                {children}
                {rightIcon && <span className="ml-2">{rightIcon}</span>}
            </Comp>
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };