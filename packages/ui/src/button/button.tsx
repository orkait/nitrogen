import React from "react";
import type { ButtonHTMLAttributes } from "react";
import buttonCVA from "./buttonCVA";
import { twMerge } from "tailwind-merge";
import { LoaderCircle, LucideIcon } from "lucide-react";


const intentEnum = {
    primary: "primary",
    secondary: "secondary",
    warning: "warning",
    danger: "danger",
    link: "link",
} as const;

const sizeEnum = {
    sm: "sm",
    md: "md",
    lg: "lg",
    xl: "xl",
} as const;


const paddingXEnum = {
    sm: "sm",
    md: "md",
    lg: "lg",
    xl: "xl",
} as const;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    intent?: typeof intentEnum[keyof typeof intentEnum];
    size?: typeof sizeEnum[keyof typeof sizeEnum];
    outline?: boolean;
    link?: boolean;
    paddingX?: typeof paddingXEnum[keyof typeof paddingXEnum];
    hasFullWidth?: boolean;
    icon?: LucideIcon;
    iconPosition?: "left" | "right";
    loading?: boolean;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    children,
    intent = "primary",
    size = "md",
    loading = false,
    outline = false,
    hasFullWidth = false,
    paddingX = "md",
    disabled = false,
    icon = React.Fragment,
    iconPosition = "left",
}) => {
    const classes = twMerge(
        buttonCVA({
            intent,
            outline,
            size,
            paddingX,
            fullWidth: hasFullWidth,
            loading,
            disabled,
            iconPosition,
        })
    );

    const Icon = icon;


    return (
        <button className={classes} disabled={loading || disabled}>
            {
                iconPosition === "left" && <Icon className="mr-[4px]" size={20} />
            }
            {
                loading && iconPosition === "left" && <LoaderCircle className="animate-spin mr-[4px]" size={20} />
            }
            {children}
            {
                iconPosition === "right" && <Icon className="ml-[4px]" size={20} />
            }
            {
                loading && iconPosition === "right" && <LoaderCircle className="animate-spin mr-[4px]" size={20} />
            }
        </button>
    );
};

export default Button;
