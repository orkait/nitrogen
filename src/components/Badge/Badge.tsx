import React from "react";
import { HTMLAttributes } from "react";
import { LucideIcon } from "lucide-react";

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
    theme: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error' | 'ghost' | 'link';
    size: 'xs' | 'sm' | 'md' | 'lg';
    style?: React.CSSProperties;
    primaryText: string;
    secondaryText?: string;
    testingName: string;
}

function Badge({
    theme = 'primary',
    style = {},
    testingName = '',
    primaryText = '',
    secondaryText = '',
}: BadgeProps) {

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
        <div className="display-flex gap-0 m-0">

            <div
                className={`user-select-none font-size-5 display-flex  rounded-6 px-2 py-1 ${buttonThemeCss[theme]} border-2 border-solid cursor-pointer`}
                style={style}
                data-testing-id={testingName}
            >
                {primaryText}
            </div>
            {
                secondaryText && (
                    <div className={`user-select-none display-flex font-size-5  rounded-6 px-2 py-1 ${buttonThemeCss[theme]} border-2 border-solid cursor-pointer`}>
                        {secondaryText}
                    </div>
                )
            }
        </div>
    )
}

export default Badge;