
import React, { useState } from "react";
import inputCVA, { iconCVA, inputWidthCVA } from "./input.cva";
import { twMerge } from "tailwind-merge";
import { InputProps } from "./input.types";
import { makeDTI } from "../utils";
import { SearchIcon } from "lucide-react";

const Input: React.FC<InputProps> = ({
    dataTestId = '',
    disabled = false,
    intent = "primary",
    size = "md",
    type = "text",
    defaultValue = "",
    rounded = "md",
    iconPosition = "left",
    icon = SearchIcon,
    hasFullWidth = false,
    value,
    onFocus = () => { },
    onBlur = () => { },
    onEnter = () => { },
    placeholder = "",
    iconProps = {},
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

    const inputWidthWind = inputWidthCVA({
        hasFullWidth
    });


    return (
        <div className={`relative flex ${inputWidthWind}`}>
            {
                icon !== React.Fragment && iconPosition === "left" && (
                    <Icon
                        data-test-id={dti("icon-left")}
                        className={`ml-[12px] absolute top-[50%] -translate-y-[50%]  ${iconWind}`}
                        size={20}
                        {...iconProps}
                    />
                )
            }

            <input
                placeholder={placeholder}
                type={type}
                value={value || defaultValue}
                disabled={disabled}
                className={
                    `${twMerge(
                        inputCVA({
                            intent,
                            size,
                            disabled,
                            rounded,
                            iconPosition,
                        }),
                    )} `
                }
                data-test-id={dti()}
                {...otherProps}
                onFocus={onFocusHandler}
                onBlur={onBlurHandler}
                onKeyDown={onKeyPress}
            />

            {
                icon !== React.Fragment && iconPosition === "right" && (
                    <Icon
                        data-test-id={dti("icon-right")}
                        className={`absolute right-[12px] top-[50%] -translate-y-[50%] ${iconWind}`}
                        size={20}
                        {...iconProps}
                    />
                )
            }
        </div>
    )
}


export * from "./input.types";
export default Input