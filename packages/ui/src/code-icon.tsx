import * as React from "react";
import { cn } from "@repo/ui-utils";

export interface CodeIconProps extends React.SVGProps<SVGSVGElement> {
    size?: number;
}

const CodeIcon = React.forwardRef<SVGSVGElement, CodeIconProps>(
    ({ className, size = 24, ...props }, ref) => (
        <svg
            ref={ref}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn("text-current", className)}
            {...props}
        >
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
        </svg>
    )
);

CodeIcon.displayName = "CodeIcon";
export { CodeIcon };