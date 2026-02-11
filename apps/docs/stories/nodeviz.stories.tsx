import type { Meta, StoryObj } from "@storybook/react";
import { NodeViz } from "@repo/ui/nodeviz";

const meta: Meta<typeof NodeViz> = {
    title: "UI/NodeViz",
    component: NodeViz,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: "A versatile node visualization component for graph and tree algorithms. Supports various states, shapes, roles, and connection points."
            }
        }
    },
    argTypes: {
        value: {
            description: "The content displayed inside the node. Can be a number, string, or null (Ø).",
            control: "text",
            table: { type: { summary: 'string | number | null' } }
        },
        size: {
            description: "The dimensions of the node.",
            control: "select",
            options: ["sm", "md", "lg"],
            table: {
                type: { summary: '"sm" | "md" | "lg"' },
                defaultValue: { summary: "md" },
            },
        },
        state: {
            description: "The current algorithmic state affecting color and styling.",
            control: "select",
            options: [
                "default",
                "active",
                "visited",
                "result",
                "error",
                "discovered",
                "inQueue",
                "empty",
            ],
            table: {
                defaultValue: { summary: "default" },
                type: { summary: '"default" | "active" | "visited" | "result" | "error" | "discovered" | "inQueue" | "empty"' },
            },
        },
        shape: {
            description: " The geometric shape of the node container.",
            control: "select",
            options: ["circle", "diamond", "roundedRect"],
            table: {
                type: { summary: '"circle" | "diamond" | "roundedRect"' },
                defaultValue: { summary: "circle" },
            },
        },
        role: {
            description: "Semantic role in the graph (e.g., Root, Leaf). Adds specific icons or badges.",
            control: "select",
            options: [
                "root",
                "leaf",
                "sentinel",
                "source",
                "target",
                "cutVertex",
            ],
            table: { type: { summary: '"root" | "leaf" | "sentinel" | "source" | "target" | "cutVertex"' } }
        },
        connections: {
            description: "Visual connection points (ports) on the node boundary.",
            control: "select",
            options: ["binaryTree", "nAryTree", "linkedList", "denseGraph"],
            table: { type: { summary: '"binaryTree" | "nAryTree" | "linkedList" | "denseGraph" | number' } }
        },
        motion: {
            description: "Animation effects for emphasis.",
            control: "select",
            options: ["none", "highlight", "pulse"],
            table: {
                type: { summary: '"none" | "highlight" | "pulse"' },
                defaultValue: { summary: "none" },
            },
        },
        metadata: {
            description: 'Optional data overlays. Example: `{"level": 1, "parent": 0, "degree": 2}`',
            control: "object",
            table: { type: { summary: 'object' } }
        },
    },
};

export default meta;
type Story = StoryObj<typeof NodeViz>;

export const Default: Story = {
    args: {
        value: 1,
        size: "md",
        state: "default",
        shape: "circle",
        motion: "none",
    },
};

export const ActiveHighlighted: Story = {
    args: {
        value: 5,
        state: "active",
        motion: "highlight",
    },
};

export const BFSNode: Story = {
    args: {
        value: 5,
        state: "discovered",
        metadata: {
            level: 2,
            parent: 3,
            degree: 2,
        },
    },
};

export const SourceNode: Story = {
    args: {
        value: "S",
        role: "source",
        state: "active",
        motion: "pulse",
    },
};

export const TargetNode: Story = {
    args: {
        value: "T",
        role: "target",
        state: "result",
    },
};

export const CutVertex: Story = {
    args: {
        value: 7,
        role: "cutVertex",
        shape: "diamond",
    },
};

export const DFSNode: Story = {
    args: {
        value: 9,
        state: "visited",
        metadata: {
            dfsTime: { in: 1, out: 8 },
            rank: 4,
        },
    },
};

export const ConnectionPoints: Story = {
    args: {
        value: 10,
        connections: "binaryTree",
    }
};

export const AllFeatures: Story = {
    args: {
        value: 42,
        size: "lg",
        state: "active",
        role: "root",
        connections: "denseGraph",
        metadata: {
            level: 0,
            parent: "None",
            degree: 8,
            rank: 1,
            distance: 0,
            dfsTime: { in: 1, out: 20 },
        },
        motion: "highlight",
    },
};

export const SentinelNode: Story = {
    args: {
        value: null,
        role: "sentinel",
        state: "empty",
    }
};
