import React from "react";
import { ButtonHTMLAttributes } from "react";
import { LucideIcon } from "lucide-react";
import styles from "./button.module.scss";

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
    theme = 'primary',
    style = {},
    testingName = '',
    onClick,
    children,
}: ButtonProps) {

    const buttonThemeCss = {
        primary: 'bg-blue-500 color-white',
        secondary: 'bg-gray-500 color-white',
        accent: 'bg-yellow-500 color-white',
        info: 'bg-blue-500 color-white',
        success: 'bg-green-500 color-white',
        warning: 'bg-yellow-500 color-white',
        error: 'bg-red-500 color-white',
        ghost: 'bg-transparent color-gray-500',
        link: 'bg-transparent color-blue-500',
    }

    return (
        <button
            className={`${styles.button} user-select-none  rounded-6 px-5 py-2 ${buttonThemeCss[theme]} border-2 border-solid cursor-pointer`}
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