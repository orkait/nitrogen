import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@repo/ui-utils";

const iconBoxVariants = cva(
    "relative inline-flex items-center justify-center transition-all",
    {
        variants: {
            variant: {
                default: "bg-gray-100 text-gray-900 border border-transparent",
                primary: "bg-blue-100 text-blue-600 border border-transparent",
                success: "bg-green-100 text-green-600 border border-transparent",
                ghost: "bg-transparent hover:bg-gray-100",
                outline: "bg-transparent border border-gray-200 text-gray-600 hover:border-gray-300",
            },
            size: {
                sm: "h-8 w-8 text-xs",
                md: "h-10 w-10 text-sm",
                lg: "h-14 w-14 text-base",
            },
            shape: {
                square: "rounded-none",
                squircle: "rounded-lg",
                circle: "rounded-full",
            },
            interactive: {
                true: "cursor-pointer hover:opacity-80 active:scale-95",
            }
        },
        defaultVariants: {
            variant: "default",
            size: "md",
            shape: "squircle",
        },
    }
);

export interface IconBoxProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof iconBoxVariants> {
    badge?: React.ReactNode;
}

const IconBox = React.forwardRef<HTMLDivElement, IconBoxProps>(
    ({ className, variant, size, shape, interactive, badge, onClick, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(iconBoxVariants({ variant, size, shape, interactive: !!onClick || interactive, className }))}
            onClick={onClick}
            {...props}
        >
            {props.children}
            {badge && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white ring-2 ring-white">
                    {badge}
                </span>
            )}
        </div>
    )
);

IconBox.displayName = "IconBox";
export { IconBox };