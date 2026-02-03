import * as React from "react";
import { Button } from "@repo/ui/button";
import { cn } from "@repo/ui-utils";

export interface LanguageToggleProps {
    className?: string;
    /**
     * The current selected language
     */
    value?: string;
    /**
     * Callback when language changes
     */
    onChange?: (value: string) => void;
    /**
     * List of languages to display
     */
    languages?: string[];
}

export function LanguageToggle({
    className,
    value,
    onChange,
    languages = ["Python", "C++", "Java"],
}: LanguageToggleProps) {
    const [selected, setSelected] = React.useState(value || languages[0]);

    // Synchronize internal state if prop changes
    React.useEffect(() => {
        if (value) setSelected(value);
    }, [value]);

    const handleSelect = (lang: string) => {
        setSelected(lang);
        if (onChange) onChange(lang);
    };

    return (
        <div
            className={cn(
                "inline-flex items-center rounded-lg border bg-white p-1 shadow-sm",
                className
            )}
        >
            {languages.map((lang) => {
                const isSelected = selected === lang;
                return (
                    <Button
                        key={lang}
                        onClick={() => handleSelect(lang)}
                        variantColor={isSelected ? "primary" : "secondary"}
                        variant={isSelected ? "fill" : "ghost"}
                        size="sm"
                        borderRadiusSize="md"
                        className={cn(
                            "min-w-[80px] font-medium transition-all duration-200",
                            isSelected
                                ? "shadow-sm"
                                : "bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        )}
                    >
                        {lang}
                    </Button>
                );
            })}
        </div>
    );
}