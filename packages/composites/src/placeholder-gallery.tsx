import * as React from "react";
import { PlaceholderCard } from "@repo/blocks/placeholder-card";
import { cn } from "@repo/ui-utils";

export interface PlaceholderGalleryProps extends React.HTMLAttributes<HTMLDivElement> {
    columns?: 1 | 2 | 3 | 4;
    count?: number;
    cardTitles?: string[];
    cardDescriptions?: string[];
}

const PlaceholderGallery = React.forwardRef<HTMLDivElement, PlaceholderGalleryProps>(
    ({ className, columns = 3, count = 6, cardTitles, cardDescriptions, ...props }, ref) => {
        const gridColsClass = {
            1: "grid-cols-1",
            2: "grid-cols-1 md:grid-cols-2",
            3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
            4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
        }[columns];

        const cards = Array.from({ length: count }, (_, i) => ({
            title: cardTitles?.[i] || `Placeholder Card ${i + 1}`,
            description: cardDescriptions?.[i] || `This is a description for card ${i + 1}`,
        }));

        return (
            <div
                ref={ref}
                className={cn(
                    "grid gap-6",
                    gridColsClass,
                    className
                )}
                {...props}
            >
                {cards.map((card, index) => (
                    <PlaceholderCard
                        key={index}
                        title={card.title}
                        description={card.description}
                    />
                ))}
            </div>
        );
    }
);

PlaceholderGallery.displayName = "PlaceholderGallery";

export { PlaceholderGallery };
