import { PointerVizProps, PointerType, PointerVariant, PointerSize } from "./type";
import React from "react";

const getColorClasses = (type: PointerType) => {
    const map: Record<PointerType, string> = {
        default: "text-blue-500 fill-blue-500",
        active: "text-blue-500 fill-blue-500",
        disabled: "text-gray-300 stroke-gray-300 fill-transparent",
        warning: "text-orange-500 fill-orange-500",
        error: "text-red-500 fill-red-500",
        highlighted: "text-yellow-400 fill-yellow-400",
        success: "text-emerald-500 fill-emerald-500",
    };
    return map[type];
};

const getAnimationClass = (type: PointerType) => {
    if (type === 'active') return "animate-bounce";
    if (type === 'highlighted') return "animate-scale-pulse";
    return "";
};

const styles = `
@keyframes scale-pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.25); }
    100% { transform: scale(1); }
}
.animate-scale-pulse {
    animation: scale-pulse 1.5s ease-in-out infinite;
}
`;

const getPositionHelper = (variant: PointerVariant) => {
    switch (variant) {
        case 'arrow-down':
        case 'caret':
            return {
                container: "flex-col items-center",
                pointerOrder: "order-last mt-1",
                labelOrder: "mb-1"
            };
        case 'arrow-up':
            return {
                container: "flex-col items-center",
                pointerOrder: "order-first mb-1",
                labelOrder: "mt-1"
            };
        case 'bracket-left':
            return {
                container: "flex-col items-center",
                pointerOrder: "order-first mb-1",
                labelOrder: ""
            };
        case 'bracket-right':
            return {
                container: "flex-col items-center",
                pointerOrder: "order-first mb-1",
                labelOrder: ""
            };
        default:
            return { container: "flex-col items-center", pointerOrder: "", labelOrder: "" };
    }
};

const getSizeClasses = (size: PointerSize) => {
    switch (size) {
        case 'small': return "w-4 h-4";
        case 'large': return "w-8 h-8";
        default: return "w-6 h-6";
    }
};

const PointerShape = ({ variant, type, size, className }: { variant: PointerVariant, type: PointerType, size: PointerSize, className: string }) => {
    const sizeClasses = getSizeClasses(size);
    const svgProps = {
        className: className,
        strokeWidth: 0,
        viewBox: "0 0 24 24"
    };

    const isDisabled = type === 'disabled';
    const strokeProps = isDisabled ? { strokeWidth: 2, strokeDasharray: "4 2" } : {};

    if (variant === 'arrow-down') {
        return (
            <svg {...svgProps} {...strokeProps} viewBox="0 0 24 24" className={`${className} ${sizeClasses}`}>
                <path d="M2 4 L22 4 L12 20 Z" strokeLinejoin="round" />
            </svg>
        );
    }
    if (variant === 'arrow-up') {
        return (
            <svg {...svgProps} {...strokeProps} viewBox="0 0 24 24" className={`${className} ${sizeClasses}`}>
                <path d="M2 20 L22 20 L12 4 Z" strokeLinejoin="round" />
            </svg>
        );
    }
    if (variant === 'caret') {
        return (
            <svg viewBox="0 0 24 24" className={`${className} ${sizeClasses} fill-none stroke-current`} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" {...strokeProps}>
                <line x1="12" y1="2" x2="12" y2="22" />
                <polyline points="19 15 12 22 5 15" />
            </svg>
        );
    }
    if (variant === 'bracket-left') {
        const bracketClasses = size === 'small' ? 'w-3 h-8' : size === 'large' ? 'w-5 h-16' : 'w-4 h-12';
        return (
            <svg viewBox="0 0 24 48" className={`${className} ${bracketClasses} fill-none stroke-current`} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" {...strokeProps}>
                <path d="M 16 4 L 4 4 L 4 44 L 16 44" />
            </svg>
        );
    }
    if (variant === 'bracket-right') {
        const bracketClasses = size === 'small' ? 'w-3 h-8' : size === 'large' ? 'w-5 h-16' : 'w-4 h-12';
        return (
            <svg viewBox="0 0 24 48" className={`${className} ${bracketClasses} fill-none stroke-current`} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" {...strokeProps}>
                <path d="M 8 4 L 20 4 L 20 44 L 8 44" />
            </svg>
        );
    }
    return null;
};

export function PointerViz({
    type = 'default',
    variant = 'arrow-down',
    size = 'medium',
    label,
    className
}: PointerVizProps) {
    const colors = getColorClasses(type);
    const animation = getAnimationClass(type);
    const { container, pointerOrder, labelOrder } = getPositionHelper(variant);

    let displayLabel = label;
    if (displayLabel === undefined) {
        if (variant === 'bracket-left') displayLabel = "Range Start";
        if (variant === 'bracket-right') displayLabel = "Range End";
    }

    return (
        <div className={`flex ${container} justify-center z-10 p-0.5 ${className || ''}`}>
            <style>{styles}</style>
            {displayLabel && (
                <span className={`font-bold leading-none whitespace-nowrap ${colors.split(' ')[0]} ${labelOrder} ${size === 'small' ? 'text-[10px]' : size === 'large' ? 'text-sm' : 'text-xs'}`}>
                    {displayLabel}
                </span>
            )}

            <PointerShape variant={variant} type={type} size={size} className={`${colors} ${animation} ${pointerOrder}`} />
        </div>
    );
}

export default PointerViz;
