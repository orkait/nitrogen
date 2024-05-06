import { InputHTMLAttributes } from "react";
import { LucideIcon } from "lucide-react";
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    theme: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error' | 'ghost' | 'link';
    iconPosition: 'left' | 'right';
    icon?: LucideIcon | 'none';
    label?: string;
    labelClassName?: string;
    hasLegend?: boolean;
    placeholder?: string;
    onFocus?: () => void;
    onBlur?: () => void;
    hasAutocomplete?: boolean;
}

const inputThemeMapping = {
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

function Input({
    onChange,
    theme = 'primary',
    icon = 'none',
    iconPosition = 'left',
    placeholder = 'Name',
    onFocus,
    onBlur,
    hasAutocomplete = false,
}: InputProps) {

    return (
        <>
            {
                icon !== 'none' && iconPosition === 'left' && <>
                    {icon}
                </>
            }

            <input
                className={`border-2 border-solid ${inputThemeMapping[theme]} rounded-6 px-5 py-2 cursor-pointer`}
                onChange={onChange}
                placeholder={placeholder}
                onFocus={onFocus}
                onBlur={onBlur}
                autoComplete={hasAutocomplete ? 'on' : 'off'}
            >
            </input>


            {
                icon !== 'none' && iconPosition === 'right' && <>
                    {icon}
                </>
            }
        </>

    )
}

export default Input;