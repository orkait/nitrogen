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

const primaryTextClassNames: Record<themeType, string> = {
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

// secondary are slightly darker than primary
const secondaryTextClassNames: Record<themeType, string> = {
    primary: 'bg-blue-600 color-white',
    secondary: 'bg-gray-600 color-white',
    accent: 'bg-yellow-600 color-white',
    info: 'bg-blue-600 color-white',
    success: 'bg-green-600 color-white',
    warning: 'bg-yellow-600 color-white',
    error: 'bg-red-600 color-white',
    ghost: 'bg-transparent color-gray-400',
    link: 'bg-transparent color-blue-400',
}

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
    display-flex
    align-items-center
    justify-content-center
    user-select-none
    font-size-5
    px-2
    py-1
`
const getBadgeWrapperClasses = (isRounded: boolean) => css(`
    display-flex
    border-2
    border-solid
    ${isRounded ? 'rounded-6' : ''}
`)

function Badge({
    theme = 'primary',
    style = {},
    testingName = '',
    primaryText = 'Primary',
    secondaryText = 'Secondary',
    rounded = false,
    className = '',
}: BadgeProps) {

    return (
        <div className={getBadgeWrapperClasses(rounded)}>
            <div
                className={css(`${primaryBadgeClasses} ${primaryTextClassNames[theme]} ${className}`)}
                style={style}
                data-testing-id={testingName}
            >
                {primaryText}
            </div>
            {
                secondaryText && (
                    <div
                        className={css(`${secondaryBadgeClasses} ${secondaryTextClassNames[theme]} ${className}`)}
                        style={style}
                        data-testing-id={testingName}
                    >
                        {secondaryText}
                    </div>
                )
            }
        </div>
    )
}

export default Badge;