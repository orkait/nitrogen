import { InputHTMLAttributes } from "react";
import { LucideIcon } from "lucide-react";
import styles from "./input.module.scss";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    theme: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error' | 'ghost' | 'link';
    iconPosition: 'left' | 'right';
    icon?: LucideIcon | 'none';
    label?: string;
    labelClassName?: string;
    hasLegend?: boolean;
}

function Input({
    onChange,
    theme = 'primary',
    icon = 'none',
    iconPosition = 'left',
    hasLegend = false,
    label = '',
    labelClassName = 'font-size-6 bg-white color-black',
}: InputProps) {

    const inputTHemeCss = {
        primary: 'border-blue-500 ',
        secondary: 'border-gray-500 ',
        accent: 'border-yellow-500 ',
        info: 'border-blue-500 ',
        success: 'border-green-500 ',
        warning: 'border-yellow-500 ',
        error: 'border-red-500 ',
        ghost: 'border-transparent color-gray-500',
        link: 'border-transparent color-blue-500',
    }

    return (
        <>
            {
                icon !== 'none' && iconPosition === 'left' && <>
                    {icon}
                </>
            }

            {hasLegend ? (
                <div className={styles['input-field']}>
                    <input
                        className={`border-2 border-solid ${inputTHemeCss[theme]} rounded-6 px-5 py-2 cursor-pointer`}
                        onChange={onChange}
                    >
                    </input>
                    <label
                        className={labelClassName}
                    >
                        {label}
                    </label>
                </div>
            ) : (
                <input
                    className={`border-2 border-solid ${inputTHemeCss[theme]} rounded-6 px-5 py-2 cursor-pointer`}
                    onChange={onChange}
                >
                </input>
            )}


            {
                icon !== 'none' && iconPosition === 'right' && <>
                    {icon}
                </>
            }
        </>

    )
}

export default Input;