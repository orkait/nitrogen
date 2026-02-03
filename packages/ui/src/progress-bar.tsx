import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@repo/ui-utils";

const progressVariants = cva(
    "flex-1 bg-primary transition-all relative overflow-hidden",
    {
        variants: {
            variant: {
                default: "bg-blue-600",
                success: "bg-green-500",
                warning: "bg-yellow-500",
                danger: "bg-red-500",
            },
            striped: {
                true: "bg-[linear-gradient(45deg,rgba(255,255,255,0.15)25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)50%,rgba(255,255,255,0.15)75%,transparent_75%,transparent)] bg-[length:1rem_1rem] animate-[progress-stripe_1s_linear_infinite]",
            }
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof progressVariants> {
    value?: number;
    max?: number;
    showLabel?: boolean;
    animated?: boolean;
    orientation?: "horizontal" | "vertical";
    steps?: number;
}

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
    ({ className, value = 0, max = 100, variant, showLabel, animated = false, orientation = "horizontal", steps, ...props }, ref) => {
        const percentage = Math.min(Math.max(value, 0), max) / max * 100;

        // Define keyframe for stripe animation in your global CSS or styles.css if not present,
        // but for now relying on Tailwind config or arbitrary value backup.
        // NOTE: "animate-stripe" usually needs to be defined in tailwind.config.
        // We will stick to the inline gradient for now.

        // Shared container styles
        const containerClasses = cn(
            "overflow-hidden rounded-full bg-gray-100",
            orientation === "vertical" ? "w-2 h-full flex flex-col-reverse" : "h-4 w-full",
            className
        );

        // Steps Mode
        if (steps) {
            const activeSteps = Math.floor((value / max) * steps);
            return (
                <div className={cn("flex w-full gap-1", className)} ref={ref} {...props}>
                    {Array.from({ length: steps }).map((_, i) => (
                        <div
                            key={i}
                            className={cn(
                                "h-2 w-full rounded-full transition-colors",
                                i < activeSteps
                                    ? progressVariants({ variant })
                                    : "bg-gray-200"
                            )}
                        />
                    ))}
                </div>
            )
        }

        return (
            <div
                ref={ref}
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={max}
                aria-valuenow={value}
                className={containerClasses}
                {...props}
            >
                <div
                    className={cn(
                        progressVariants({ variant, striped: animated }),
                        "flex items-center justify-center text-[10px] font-bold text-white shadow-sm"
                    )}
                    style={{
                        width: orientation === "horizontal" ? `${percentage}%` : "100%",
                        height: orientation === "vertical" ? `${percentage}%` : "100%",
                    }}
                >
                    {showLabel && orientation === "horizontal" && percentage > 10 && `${Math.round(percentage)}%`}
                </div>
            </div>
        );
    }
);

ProgressBar.displayName = "ProgressBar";
export { ProgressBar };