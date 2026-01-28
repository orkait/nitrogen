import * as React from "react";
import { Placeholder } from "@repo/ui/placeholder";
import { cn } from "@repo/ui-utils";

export interface PlaceholderCardProps extends React.HTMLAttributes<HTMLDivElement> {
    title?: string;
    description?: string;
    imageHeight?: string | number;
    showImage?: boolean;
}

const PlaceholderCard = React.forwardRef<HTMLDivElement, PlaceholderCardProps>(
    ({ className, title = "Card Title", description = "Card description goes here", imageHeight = 200, showImage = true, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow",
                    className
                )}
                {...props}
            >
                {showImage && (
                    <Placeholder
                        height={imageHeight}
                        text="Image"
                        variant="shimmer"
                        className="rounded-none border-0"
                    />
                )}
                <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {title}
                    </h3>
                    <p className="text-sm text-gray-600">
                        {description}
                    </p>
                </div>
            </div>
        );
    }
);

PlaceholderCard.displayName = "PlaceholderCard";

export { PlaceholderCard };
