
import React, { useState } from "react";
import inputCVA, { iconCVA, inputWidthCVA } from "./input.cva";
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
    onIconClick = () => { },
    hasIcon = true,
    ...otherProps
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const dti = makeDTI("input", dataTestId);
    const Icon = icon;

    const iconWind = iconCVA.check({
        intent,
        disabled,
        isFocused,
        size
    })

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

    const inputWidthWind = inputWidthCVA.check({
        hasFullWidth
    });


    return (
        <div className={`relative flex ${inputWidthWind}`}>
            {
                hasIcon && iconPosition === "left" && (
                    <Icon
                        data-test-id={dti(`icon-${iconPosition}`)}
                        size={32}
                        onClick={onIconClick}
                        {...iconProps}
                        className={`absolute top-[50%] -translate-y-[50%] ${iconWind} ${iconProps?.className}`}
                    />
                )
            }

            <input
                placeholder={placeholder}
                type={type}
                value={value || defaultValue}
                disabled={disabled}
                className={
                    inputCVA.check({
                        intent,
                        size,
                        disabled,
                        rounded,
                        iconPosition,
                    })
                }
                data-test-id={dti()}
                {...otherProps}
                onFocus={onFocusHandler}
                onBlur={onBlurHandler}
                onKeyDown={onKeyPress}
            />

            {
                hasIcon && iconPosition === "right" && (
                    <Icon
                        data-test-id={dti(`icon-${iconPosition}`)}
                        size={32}
                        onClick={onIconClick}
                        {...iconProps}
                        className={`absolute right-[12px] top-[50%] -translate-y-[50%] ${iconWind} ${iconProps?.className}`}
                    />
                )
            }
        </div>
    )
}


export * from "./input.types";
export default Input