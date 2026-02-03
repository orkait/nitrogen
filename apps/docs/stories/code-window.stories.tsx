import type { Meta, StoryObj } from "@storybook/react";
import { CodeWindow } from "@repo/blocks/code-window";

const meta: Meta<typeof CodeWindow> = {
    title: "Blocks/CodeWindow",
    component: CodeWindow,
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CodeWindow>;

const pythonCode = `def binary_search(arr, low, high, x):
    if high >= low:
        mid = (high + low) // 2
        
        # If element is present at the middle itself
        if arr[mid] == x:
            return mid
            
        # If element is smaller than mid
        elif arr[mid] > x:
            return binary_search(arr, low, mid - 1, x)
            
        # Else the element can only be present in right subarray
        else:
            return binary_search(arr, mid + 1, high, x)
            
    else:
        # Element is not present in array
        return -1`;

export const MacStyle: Story = {
    args: {
        filename: "binary_search.py",
        code: pythonCode,
        showLineNumbers: true,
        variant: "mac",
    },
};

export const WindowsStyle: Story = {
    args: {
        filename: "binary_search.py",
        code: pythonCode,
        showLineNumbers: true,
        variant: "windows",
    },
};

export const animatingLine: Story = {
    args: {
        filename: "binary_search.py",
        code: pythonCode,
        activeLine: 3, // Highlights line 3
        showLineNumbers: true,
    }
};
export const BreakpointMode: Story = {
    args: {
        filename: "debug_test.py",
        code: pythonCode,
        activeLine: 4,
        highlightMode: "breakpoint",
        variant: "mac"
    }
};
export const PointerMode: Story = {
    args: {
        filename: "visualizer.cpp",
        code: pythonCode,
        activeLine: 7,
        highlightMode: "pointer",
        variant: "windows"
    }
};
export const GlowMode: Story = {
    args: {
        filename: "glow_effect.js",
        code: pythonCode,
        activeLine: 5,
        highlightMode: "glow",
        variant: "mac"
    }
};