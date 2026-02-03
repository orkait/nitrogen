import * as React from "react";
import { cn } from "@repo/ui-utils";
import { Button } from "@repo/ui/button";

export interface CodeWindowProps extends React.HTMLAttributes<HTMLDivElement> {
    filename?: string;
    code?: string;
    showLineNumbers?: boolean;
    activeLine?: number;
    highlightMode?: "line" | "breakpoint" | "glow" | "pointer"; // New Prop
    variant?: "mac" | "windows";
}

const WindowsControls = () => (
    <div className="flex">
        <div className="flex h-full w-10 items-center justify-center hover:bg-[#3e3e3e]">
            <svg width="10" height="1" viewBox="0 0 10 1" fill="white"><rect width="10" height="1" /></svg>
        </div>
        <div className="flex h-full w-10 items-center justify-center hover:bg-[#3e3e3e]">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="white"><rect x="0.5" y="0.5" width="9" height="9" /></svg>
        </div>
        <div className="flex h-full w-10 items-center justify-center hover:bg-[#e81123]">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="white"><path d="M0.5 0.5L9.5 9.5M9.5 0.5L0.5 9.5" stroke="white" /></svg>
        </div>
    </div>
);

const MacControls = () => (
    <div className="flex space-x-2">
        <div className="h-3 w-3 rounded-full bg-[#ff5f56]" /> {/* Red */}
        <div className="h-3 w-3 rounded-full bg-[#ffbd2e]" /> {/* Yellow */}
        <div className="h-3 w-3 rounded-full bg-[#27c93f]" /> {/* Green */}
    </div>
);

const CopyIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
);

const CodeWindow = React.forwardRef<HTMLDivElement, CodeWindowProps>(
    ({
        className,
        filename = "algorithm.py",
        code = "",
        showLineNumbers = true,
        activeLine,
        highlightMode = "line", // Default to simple line
        variant = "mac",
        ...props
    }, ref) => {

        const lines = code.split("\n");
        const [copied, setCopied] = React.useState(false);

        const handleCopy = () => {
            navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        };

        return (
            <div
                ref={ref}
                className={cn(
                    "flex flex-col overflow-hidden rounded-lg border border-gray-700 bg-[#1e1e1e] shadow-2xl font-sans text-gray-300",
                    className
                )}
                {...props}
            >
                {/* Keep Header Logic Same */}
                {variant === "windows" ? (
                    <div className="flex h-10 select-none items-center justify-between bg-[#333333]">
                        <div className="flex h-full items-center bg-[#1e1e1e] px-4 text-xs tracking-wide text-white border-t-2 border-blue-500">
                            <span className="mr-2 text-blue-400">#</span> {filename}
                        </div>
                        <div className="flex h-full items-center">
                            <div className="mr-4 text-xs text-gray-500">Windows Editor</div>
                            <WindowsControls />
                        </div>
                    </div>
                ) : (
                    <div className="flex h-10 items-center justify-between bg-[#2d2d2d] px-4">
                        <MacControls />
                        <div className="text-xs font-medium text-gray-400">{filename}</div>
                        <div className="w-12" />
                    </div>
                )}

                {/* Toolbar */}
                <div className="flex h-8 items-center justify-between border-b border-gray-700 bg-[#1e1e1e] px-4 text-xs text-gray-400">
                    <div>src &gt; components &gt; {filename}</div>
                    <button onClick={handleCopy} className="flex items-center space-x-1 hover:text-white">
                        <CopyIcon />
                        <span>{copied ? "Copied!" : "Copy"}</span>
                    </button>
                </div>

                {/* Code Area */}
                <div className="lex-1 overflow-x-auto p-4 text-sm font-mono leading-6">
                    <div className="relative">
                        {lines.map((line, i) => {
                            const isLineActive = activeLine === (i + 1);

                            // Highlight Classes Logic
                            let highlightClass = "";
                            let gutterElement = null;

                            if (isLineActive) {
                                if (highlightMode === "line") {
                                    highlightClass = "bg-[#374151]/50 border-l-2 border-yellow-400";
                                } else if (highlightMode === "breakpoint") {
                                    highlightClass = "bg-red-900/30";
                                    gutterElement = <div className="absolute left-1.5 top-2 h-2.5 w-2.5 rounded-full bg-red-500" />;
                                } else if (highlightMode === "glow") {
                                    highlightClass = "shadow-[0_0_15px_rgba(59,130,246,0.5)] bg-blue-900/20 z-10 rounded-sm";
                                } else if (highlightMode === "pointer") {
                                    highlightClass = "bg-[#2d2d2d]";
                                    gutterElement = <div className="absolute left-1 text-green-400 font-bold">➔</div>;
                                }
                            }

                            return (
                                <div key={i} className={cn("flex relative", highlightClass)}>

                                    {/* Line Number / Gutter */}
                                    {showLineNumbers && (
                                        <div className={cn(
                                            "mr-4 w-10 select-none text-right text-xs relative",
                                            isLineActive ? "font-bold" : "text-gray-600",
                                            (isLineActive && highlightMode === "line") && "text-yellow-400",
                                            (isLineActive && highlightMode === "breakpoint") && "text-red-400",
                                            (isLineActive && highlightMode === "pointer") && "text-green-400",
                                        )}>
                                            {gutterElement ? gutterElement : (i + 1)}
                                        </div>
                                    )}

                                    {/* Code Text */}
                                    <span className={cn("whitespace-pre flex-1", isLineActive && "text-white")}>
                                        {line || " "}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Status Bar */}
                <div className="flex h-6 items-center justify-between bg-[#007acc] px-3 text-[10px] text-white">
                    <div className="flex space-x-4">
                        <span>READY</span>
                    </div>
                    <div className="flex space-x-4">
                        <span>Ln {activeLine || lines.length}, Col 0</span>
                        <span>UTF-8</span>
                    </div>
                </div>
            </div>
        );
    }
);

CodeWindow.displayName = "CodeWindow";
export { CodeWindow };