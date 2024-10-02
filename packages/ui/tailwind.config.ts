import type { Config } from "tailwindcss";
import sharedConfig from "@repo/tailwind-config";

const childrenSupport = ({ addVariant }: { addVariant: (name: string, value: string) => void }) => {
    addVariant("child", "& > *");
    addVariant("child-hover", "& > *:hover");
};

const config: Pick<Config, "prefix" | "presets" | "content" | "theme" | "plugins"> = {
    content: ["./src/**/*.tsx", "../../apps/docs/stories/**/*.tsx"],
    presets: [sharedConfig],
    theme: {
        colors: {
            primary: '#1e64d4',
            'primary-action': '#174ca1',
            'primary-content': '#ffffff',

            secondary: '#333333',
            'secondary-action': '#1f1f1f',
            'secondary-content': '#ffffff',

            success: '#34a853',
            'success-action': '#267d3d',
            'success-content': '#000000',

            warning: '#fbbc05',
            'warning-action': '#c99703',
            'warning-content': '#000000',

            danger: '#ea4335',
            'danger-action': '#cb2415',
            'danger-content': '#000000',

            link: '#1e64d4',
            'link-content': '#ffffff',
        },
        extend: {
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
        },
    },
    plugins: [childrenSupport],
};

export default config;
