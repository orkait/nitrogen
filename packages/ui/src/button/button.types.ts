import type { ButtonHTMLAttributes } from "react";
import type { LucideIcon } from "lucide-react";

export const intentEnum = {
    primary: "primary",
    secondary: "secondary",
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

export const IconPositionEnum = {
    "left": "left",
    "right": "right",
} as const;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    intent?: typeof intentEnum[keyof typeof intentEnum];
    size?: typeof sizeEnum[keyof typeof sizeEnum];
    outline?: boolean;
    link?: boolean;
    paddingX?: typeof paddingXEnum[keyof typeof paddingXEnum];
    hasFullWidth?: boolean;
    icon?: LucideIcon;
    iconPosition?: typeof IconPositionEnum[keyof typeof IconPositionEnum];
    loading?: boolean;
    disabled?: boolean;
    dataTestId?: string;
}
