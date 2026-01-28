import * as React from "react";
import { cn } from "@repo/ui-utils";

export interface PlaceholderProps extends React.HTMLAttributes<HTMLDivElement> {
    width?: string | number;
    height?: string | number;
    text?: string;
    variant?: "default" | "shimmer";
}

const Placeholder = React.forwardRef<HTMLDivElement, PlaceholderProps>(
    ({ className, width = "100%", height = "200px", text, variant = "default", ...props }, ref) => {
        const style = {
            width: typeof width === "number" ? `${width}px` : width,
            height: typeof height === "number" ? `${height}px` : height,
        };

        return (
            <div
                ref={ref}
                className={cn(
                    "flex items-center justify-center rounded-md border-2 border-dashed border-gray-300 bg-gray-100",
                    variant === "shimmer" && "animate-pulse bg-gray-200",
                    className
                )}
                style={style}
                {...props}
            >
                {text && (
                    <span className="text-sm text-gray-500 font-medium">
                        {text}
                    </span>
                )}
            </div>
        );
    }
);

Placeholder.displayName = "Placeholder";

export { Placeholder };
