
import React from "react";
import inputCVA from "./input.cva";
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
    "peer"
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
    value,
    ...otherProps
}) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const [isValid, setIsValid] = React.useState(false);
    const [isTouched, setIsTouched] = React.useState(false);
    
    const dti = makeDTI("input", dataTestId);
    const Icon = icon;

    return (
        <div className="relative border-2 border-solid">
            {
                icon !== React.Fragment && iconPosition === "left" && (
                    <Icon
                        data-test-id={dti("icon-left")}
                        className="mr-[4px] absolute translate-y-[50%] translate-x-[50%]"
                        size={20}
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
                            rounded
                        }),
                        hasLegend ? inputLegendWind : [],
                        iconPosition === "left" ? "pl-10" : "pr-10"
                    )
                }
                data-test-id={dti()}
                {...otherProps}
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