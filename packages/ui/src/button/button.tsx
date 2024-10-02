import React from "react";
import buttonCVA from "./button.cva";
import { twMerge } from "tailwind-merge";
import { LoaderCircle } from "lucide-react";
import { ButtonProps } from "./button.types";
import { makeDTI } from "../utils";

export const defaultValues: ButtonProps = {
    intent: "primary",
    size: "md",
    loading: false,
    outline: false,
    hasFullWidth: false,
    rounded: "md",
    disabled: false,
    icon: React.Fragment,
    iconPosition: "left",
    dataTestId: '',
    className: '',
}

const Button: React.FC<ButtonProps> = ({
    children,
    intent = defaultValues.intent,
    size = defaultValues.size,
    loading = defaultValues.loading,
    outline = defaultValues.outline,
    hasFullWidth = defaultValues.hasFullWidth,
    rounded = defaultValues.rounded,
    disabled = defaultValues.disabled,
    icon = defaultValues.icon,
    iconPosition = defaultValues.iconPosition,
    dataTestId = defaultValues.dataTestId,
}) => {


    const dti = makeDTI("button", dataTestId || '');

    const classes = twMerge(
        buttonCVA({
            intent,
            outline,
            size,
            rounded,
            fullWidth: hasFullWidth,
            loading,
            disabled,
            iconPosition,
        })
    );

    const Icon = icon || React.Fragment;

    return (
        <button className={classes} disabled={loading || disabled} data-test-id={dti()}>
            {
                icon !== React.Fragment && iconPosition === "left" && <Icon data-test-id={dti("icon-left")} className="mr-[4px]" size={20} />
            }
            {
                loading && iconPosition === "left" && <LoaderCircle data-test-id={dti("icon-loader")} className="animate-spin" size={20} />
            }
            {children}
            {
                icon !== React.Fragment && iconPosition === "right" && <Icon data-test-id={dti("icon-right")} className="ml-[4px]" size={20} />
            }
            {
                loading && iconPosition === "right" && <LoaderCircle data-test-id={dti("icon-loader")} className="animate-spin" size={20} />
            }
        </button>
    );
};



export * from "./button.types";
export default Button;
