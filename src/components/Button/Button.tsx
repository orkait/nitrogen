import React from "react";
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
    icon?: LucideIcon | 'none';
    iconPosition: 'left' | 'right';
    responsive: 'wide' | 'block' | 'circle' | 'square' | 'none';
    className: string;
    style?: React.CSSProperties;
    text: string;
    testingName: string;
    onClick?: () => void;
}

function Button({
    disabled = false,
    loading = false,
    icon = 'none',
    iconPosition = 'left',
    style = {},
    testingName = '',
    onClick,
    children,
}: ButtonProps) {


    return (
        <button
            className="px-5 pb-5 bg-red-500 pb-11 mb-5 "
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
                        <span className="loading loading-spinner "></span>
                        loading
                    </>
                ) : (
                    children
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