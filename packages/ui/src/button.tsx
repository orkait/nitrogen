export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

function Button({ children, ...other }: ButtonProps): JSX.Element {
    return (
        <button className="bg-red-800" type="button" {...other}>
            {children}
        </button>
    );
}

Button.displayName = "Button";


export default Button;