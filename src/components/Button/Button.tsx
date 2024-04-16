import React, { useEffect } from "react";
import { ButtonHTMLAttributes } from "react";
import { LucideIcon } from "lucide-react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    theme: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error' | 'ghost' | 'link';
    size: 'xs' | 'sm' | 'md' | 'lg';
    block: boolean;
    disabled: boolean;
    outline: boolean;
    rounded: boolean;
    shadow: boolean;
    loading: boolean;
    icon: LucideIcon | 'none';
    iconPosition: 'left' | 'right';
    responsive: 'wide' | 'block' | 'circle' | 'square' | 'none';
    className: string;
    style: React.CSSProperties;
    text: string;
    testingName: string;
    onClick?: () => void;
}

function Button({
    theme = 'primary',
    size = 'md',
    block = false,
    disabled = false,
    outline = false,
    rounded = false,
    shadow = false,
    loading = false,
    icon = 'none',
    iconPosition = 'left',
    responsive = 'none',
    className = '',
    style = {},
    text = 'Button',
    testingName = '',
    onClick,
}: ButtonProps) {

    const getClassNames = () => [
        'btn',
        `btn-${theme}`,
        `btn-${size}`,
        block && 'btn-block',
        responsive !== 'none' && `btn-${responsive}`,
        icon !== 'none' && `icon-${iconPosition}`,
        disabled && 'disabled',
        outline && `btn-outline`,
        rounded && `rounded-${size}`,
        shadow && 'shadow',
        loading && 'loading',
        className,
    ].filter(Boolean).join(' ');

    return (
        <button
            className={getClassNames()}
            onClick={onClick}
            disabled={disabled || loading}
            style={style}
            data-testing-id={testingName}
        >
            {
                icon !== 'none' && iconPosition === 'left' && <>
                    {icon}
                </>
            }
            {
                loading ? (
                    <>
                        <span className="loading loading-spinner"></span>
                        loading
                    </>
                ) : (
                    text
                )
            }
            {
                icon !== 'none' && iconPosition === 'right' && <>
                    {icon}
                </>
            }
        </button>
    )
}

export default Button;