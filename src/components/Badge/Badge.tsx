import css from "@/theme-generator/magic";
import { themeType } from "@/types/type";
import React from "react";
import { HTMLAttributes } from "react";

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
    theme: themeType;
    size: 'xs' | 'sm' | 'md' | 'lg';
    style?: React.CSSProperties;
    primaryText: string;
    secondaryText?: string;
    testingName: string;
    rounded?: boolean;
}

const themeClassNames: Record<themeType, string> = {
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


function Badge({
    theme = 'primary',
    style = {},
    testingName = '',
    primaryText = '',
    secondaryText = '',
    rounded = false,
    className = '',
}: BadgeProps) {

    const primaryBadgeClasses = `
        display-flex
        align-items-center
        justify-content-center
        user-select-none
        font-size-5
        display-flex
        px-2
        py-1
    `

    const secondaryBadgeClasses = `
        user-select-none
        display-flex
        font-size-5
        px-2
        py-1
    `

    return (
        <div className={css(`
            display-flex
            border-2
            border-solid
            ${rounded ? 'rounded-6' : ''}
        `)}
        >
            <div
                className={css(`${primaryBadgeClasses} ${themeClassNames[theme]} ${className}`)}
                style={style}
                data-testing-id={testingName}
            >
                {primaryText}
            </div>
            {
                secondaryText && (
                    <div className={secondaryBadgeClasses}>
                        {secondaryText}
                    </div>
                )
            }
        </div>
    )
}

export default Badge;