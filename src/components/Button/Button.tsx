import React from "react";
import { ButtonHTMLAttributes } from "react";
import { Loader2Icon, LucideIcon } from "lucide-react";
import styles from "./Button.module.scss";
import css from "../../theme-generator/magic";

type themeType = 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error' | 'ghost' | 'link' | 'none';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    theme: themeType;
    size: 'xs' | 'sm' | 'md' | 'lg';
    block: boolean;
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


const solidThemeCss: Record<themeType, string> = {
    primary: 'bg-blue-500 color-white',
    secondary: 'bg-gray-500 color-white',
    accent: 'bg-yellow-500 color-white',
    info: 'bg-blue-500 color-white',
    success: 'bg-green-500 color-white',
    warning: 'bg-yellow-500 color-white',
    error: 'bg-red-500 color-white',
    ghost: 'bg-transparent color-gray-500',
    link: 'bg-transparent color-blue-500',
    none: 'bg-transparent color-gray-500',
}

const outlineThemeCss: Record<themeType, string> = {
    primary: 'bg-transparent border-blue-500 color-blue-500',
    secondary: 'bg-transparent border-gray-500  color-gray-500',
    accent: 'bg-transparent border-yellow-500  color-yellow-500',
    info: 'bg-transparent border-blue-500  color-blue-500',
    success: 'bg-transparent border-green-500 color-green-500',
    warning: 'bg-transparent border-yellow-500 color-yellow-500',
    error: 'bg-transparent border-red-500 color-red-500',
    ghost: 'bg-transparent border-gray-500 color-gray-500',
    link: 'bg-transparent border-blue-500 color-blue-500',
    none: 'bg-transparent border-gray-500 color-gray-500',
}

const sizeMapping = {
    xs: 'font-6.5 px-2 py-1',
    sm: 'font-7 px-3 py-1.5',
    md: 'font-8 px-4 py-2',
    lg: 'font-9 px-5 py-3',
}

const loaderClasses = `
    ${styles.spin}
    ml-1
    display-inline-flex
    w-full
`

function Button({
    theme = 'primary',
    size = 'md',
    disabled = false,
    outline = false,
    rounded = true,
    shadow = false,
    loading = false,
    icon = 'none',
    iconPosition = 'left',
    responsive = 'none',
    className = '',
    style = {},
    testingName = '',
    onClick,
    children,
}: ButtonProps) {
    const getButtonClasses = (theme: themeType) => css(`
        ${sizeMapping[size]}
        ${disabled ? 'bg-transparent border-gray-300 color-gray-300 cursor-not-allowed' : 'cursor-pointer'}
        ${styles.button}
        ${outline ? outlineThemeCss[theme] : solidThemeCss[theme]}
        ${outline ? 'border-2' : 'border-none'}
        ${rounded ? 'rounded-4' : 'rounded-0'}
        ${shadow ? 'shadow-x0-y2-2-300' : ''}
        ${responsive === 'block' ? 'w-full' : ''}
        ${responsive === 'wide' ? 'w-64' : ''}
        ${responsive === 'circle' ? 'rounded-full' : ''}
        font-bold
        user-select-none
        ${className}
        display-inline-flex
        align-items-center
        justify-content-center
    `)

    return (
        <button
            className={getButtonClasses(theme)}
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
            {children}
            {
                loading && (
                    <Loader2Icon
                        size="1rem"
                        className={loaderClasses}
                    />
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