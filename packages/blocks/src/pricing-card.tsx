import * as React from "react";
import { Button } from "@repo/ui/button";
import { cn } from "@repo/ui-utils";

export interface PricingCardProps extends React.HTMLAttributes<HTMLDivElement> {
    tierName?: string;
    price?: string;
    period?: string;
    features?: string[];
    ctaLabel?: string;
    isPopular?: boolean;
    onCtaClick?: () => void;
}

const CheckIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M20 6 9 17l-5-5" />
    </svg>
);

const PricingCard = React.forwardRef<HTMLDivElement, PricingCardProps>(
    ({
        className,
        tierName = "Pro",
        price = "$29",
        period = "/mo",
        features = ["Unlimited Projects", "Analytics Dashboard", "24/7 Support"],
        ctaLabel = "Get Started",
        isPopular = false,
        onCtaClick,
        ...props
    }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "relative flex flex-col rounded-2xl border bg-white p-6 shadow-sm transition-all hover:shadow-lg lg:p-8",
                    isPopular ? "border-blue-500 ring-1 ring-blue-500" : "border-gray-200",
                    className
                )}
                {...props}
            >
                {isPopular && (
                    <div className="absolute -top-4 left-0 right-0 mx-auto w-fit rounded-full bg-blue-500 px-3 py-1 text-xs font-semibold text-white shadow-md">
                        Most Popular
                    </div>
                )}

                {/* Header */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">{tierName}</h3>
                    <div className="mt-4 flex items-baseline text-gray-900">
                        <span className="text-4xl font-bold tracking-tight">{price}</span>
                        <span className="ml-1 text-sm font-semibold text-gray-500">{period}</span>
                    </div>
                </div>

                {/* Feature List */}
                <ul className="mb-8 flex-1 space-y-4">
                    {features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                            <div className="rounded-full bg-blue-50 p-1">
                                <CheckIcon className="h-3 w-3 text-blue-500" />
                            </div>
                            <span className="ml-3 text-sm text-gray-600">{feature}</span>
                        </li>
                    ))}
                </ul>

                {/* CTA Button */}
                <Button
                    className="w-full"
                    onClick={onCtaClick}
                    variantColor={isPopular ? "primary" : "secondary"}
                    size="lg"
                >
                    {ctaLabel}
                </Button>
            </div>
        );
    }
);

PricingCard.displayName = "PricingCard";
export { PricingCard };