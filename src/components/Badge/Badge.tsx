import css from "@/theme-generator/magic";
import React from "react";
import { HTMLAttributes } from "react";

type sizeType = 'xs' | 'sm' | 'md' | 'lg';
type themeType = 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error';


export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
    theme: themeType;
    size: sizeType;
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
}

// secondary are slightly darker than primary
const secondaryTextClassNames: Record<themeType, string> = {
    primary: 'bg-blue-700 color-white',
    secondary: 'bg-gray-700 color-white',
    accent: 'bg-yellow-700 color-white',
    info: 'bg-blue-700 color-white',
    success: 'bg-green-700 color-white',
    warning: 'bg-yellow-700 color-white',
    error: 'bg-red-700 color-white',
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
`

const sizeMapping = {
    xs: 'font-6.5 px-2 py-1',
    sm: 'font-7 px-3 py-1.5',
    md: 'font-8 px-4 py-2',
    lg: 'font-9 px-5 py-3',
}

const getBadgeWrapperClasses = (isRounded: boolean) => css(`
    display-flex
    border-1
    border-solid
    ${isRounded ? 'rounded-4' : ''}
`)

function Badge({
    theme = 'primary',
    style = {},
    testingName = '',
    primaryText = 'Primary',
    secondaryText = 'Secondary',
    rounded = true,
    className = '',
    size = 'xs',
}: BadgeProps) {
    return (
        <div className={getBadgeWrapperClasses(rounded)}>
            <div
                className={css(`${primaryBadgeClasses} ${sizeMapping[size]} ${primaryTextClassNames[theme]} ${className}`)}
                style={style}
                data-testing-id={testingName}
            >
                {primaryText}
            </div>
            {
                secondaryText && (
                    <div
                        className={css(`${secondaryBadgeClasses} ${sizeMapping[size]} ${secondaryTextClassNames[theme]} ${className}`)}
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