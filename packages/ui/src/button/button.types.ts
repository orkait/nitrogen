import type { ButtonHTMLAttributes } from "react";
import type { LucideIcon } from "lucide-react";

export const intentEnum = {
    primary: "primary",
    secondary: "secondary",
    success: "success",
    warning: "warning",
    danger: "danger",
    link: "link",
} as const;

export const sizeEnum = {
    sm: "sm",
    md: "md",
    lg: "lg",
    xl: "xl",
} as const;


export const paddingXEnum = {
    sm: "sm",
    md: "md",
    lg: "lg",
    xl: "xl",
} as const;

export const iconPositionEnum = {
    "left": "left",
    "right": "right",
} as const;

export const roundedEnum = {
    sm: "sm",
    md: "md",
    lg: "lg",
    xl: "xl",
    full: "full",
    none: "none",
} as const;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    intent?: typeof intentEnum[keyof typeof intentEnum];
    size?: typeof sizeEnum[keyof typeof sizeEnum];
    outline?: boolean;
    link?: boolean;
    rounded?: typeof roundedEnum[keyof typeof roundedEnum];
    hasFullWidth?: boolean;
    icon?: LucideIcon;
    iconPosition?: typeof iconPositionEnum[keyof typeof iconPositionEnum];
    loading?: boolean;
    disabled?: boolean;
    dataTestId?: string;
}
