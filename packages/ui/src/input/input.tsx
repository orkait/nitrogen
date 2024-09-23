
import React, { useState } from "react";
import inputCVA, { iconCVA } from "./input.cva";
import { twMerge } from "tailwind-merge";
import { InputProps } from "./input.types";
import { makeDTI } from "../utils";
import { SearchIcon } from "lucide-react";


const labelLegendWind = [
    "transform",
    "transition-all",
    "absolute",
    "top-0",
    "left-0",
    "h-full",
    "flex",
    "items-center",
    "pl-2",
    "text-sm",
    "group-focus-within:text-xs",
    "peer-valid:text-xs",
    "group-focus-within:h-1/2",
    "peer-valid:h-1/2",
    "group-focus-within:-translate-y-full",
    "peer-valid:-translate-y-full",
    "group-focus-within:pl-0",
    "peer-valid:pl-0"
]

const inputLegendWind = [
    "peer",
]

const Input: React.FC<InputProps> = ({
    dataTestId = '',
    disabled = false,
    intent = "primary",
    paddingX = "md",
    size = "md",
    type = "text",
    defaultValue = "",
    hasLegend = false,
    rounded = "md",
    iconPosition = "left",
    icon = SearchIcon,
    hasFullWidth = false,
    value,
    onFocus = () => { },
    onBlur = () => { },
    onEnter = () => { },
    ...otherProps
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const dti = makeDTI("input", dataTestId);
    const Icon = icon;

    const iconWind = twMerge(
        iconCVA({
            intent,
            disabled,
            isFocused
        })
    )

    const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") onEnter && onEnter();
    }

    const onBlurHandler = (event: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(false);
        onBlur && onBlur(event);
    }

    const onFocusHandler = (event: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(true);
        onFocus && onFocus(event);
    }


    return (
        <div className={`relative flex`}>
            {
                icon !== React.Fragment && iconPosition === "left" && (
                    <Icon
                        data-test-id={dti("icon-left")}
                        className={`ml-[12px] h-full absolute ${iconWind}`}
                        size={20}
                        strokeWidth={2}
                    />
                )
            }

            <input
                type={type}
                value={value || defaultValue}
                disabled={disabled}
                className={
                    twMerge(
                        inputCVA({
                            intent,
                            paddingX,
                            size,
                            disabled,
                            rounded,
                            hasFullWidth
                        }),
                        hasLegend ? inputLegendWind : [],
                        iconPosition === "left" ? "pl-10" : "pr-10"
                    )
                }
                data-test-id={dti()}
                {...otherProps}
                onFocus={onFocusHandler}
                onBlur={onBlurHandler}
                onKeyDown={onKeyPress}
            />

            {
                hasLegend && (
                    <label htmlFor="username" className={labelLegendWind.join(' ')}>
                        Username
                    </label>
                )
            }

            {
                icon !== React.Fragment && iconPosition === "right" && (
                    <Icon
                        data-test-id={dti("icon-right")}
                        className="ml-[4px] absolute top-1/2 right-0 transform -translate-y-1/2"
                        size={20}
                    />
                )
            }
        </div>
    )
}

export default Input