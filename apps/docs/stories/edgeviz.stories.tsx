import type { Meta, StoryObj } from "@storybook/react";
import EdgeViz from "@repo/ui/edgeviz";

const meta: Meta<typeof EdgeViz> = {
    title: "UI/EdgeViz",
    component: EdgeViz,
    tags: ["autodocs"],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A flexible edge/connection visualization component for graphs and data structures. Supports various visual states, structural variations, routing algorithms, and weight labels. Optimized for performance with localized SVG rendering.',
            },
        },
    },
    decorators: [
        (Story, context) => {
            const args = context.args as any;
            const x1 = args.x1 ?? 50;
            const y1 = args.y1 ?? 50;
            const x2 = args.x2 ?? 250;
            const y2 = args.y2 ?? 50;

            return (
                <div
                    className="relative border border-dashed border-gray-200 rounded-lg bg-slate-50 shadow-sm w-[500px] h-[500px]"
                >
                    {/* Grid Background */}
                    <div
                        className="absolute inset-0 pointer-events-none opacity-20 rounded-lg overflow-hidden bg-[image:radial-gradient(#64748b_1px,transparent_1px)] bg-[length:20px_20px]"
                    />

                    {/* Visual Markers for Start/End Points (Debug helpers) */}
                    <div
                        className="absolute w-3 h-3 bg-blue-500 rounded-full ring-2 ring-white shadow-md -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10"
                        style={{ top: y1, left: x1 }}
                        title={`Start (${x1}, ${y1})`}
                    />
                    <div
                        className="absolute w-3 h-3 bg-red-500 rounded-full ring-2 ring-white shadow-md -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10"
                        style={{ top: y2, left: x2 }}
                        title={`End (${x2}, ${y2})`}
                    />

                    {/* Render the component */}
                    <Story />
                </div>
            );
        },
    ],
    argTypes: {
        x1: {
            control: { type: 'range', min: 0, max: 500, step: 10 },
            name: "Start X",
            description: "The horizontal (X) starting coordinate.",
            table: {
                category: 'Coordinates',
                defaultValue: { summary: '50' },
                type: { summary: 'number' }
            },
        },
        y1: {
            control: { type: 'range', min: 0, max: 500, step: 10 },
            name: "Start Y",
            description: "The vertical (Y) starting coordinate.",
            table: {
                category: 'Coordinates',
                defaultValue: { summary: '50' },
                type: { summary: 'number' }
            },
        },
        x2: {
            control: { type: 'range', min: 0, max: 500, step: 10 },
            name: "End X",
            description: "The horizontal (X) ending coordinate.",
            table: {
                category: 'Coordinates',
                defaultValue: { summary: '250' },
                type: { summary: 'number' }
            },
        },
        y2: {
            control: { type: 'range', min: 0, max: 500, step: 10 },
            name: "End Y",
            description: "The vertical (Y) ending coordinate.",
            table: {
                category: 'Coordinates',
                defaultValue: { summary: '50' },
                type: { summary: 'number' }
            },
        },
        type: {
            description: 'The semantic state of the edge (color/style).',
            control: 'select',
            options: ['default', 'active', 'visited', 'result', 'error', 'candidate', 'backtracking', 'disabled', 'tree', 'back', 'forward', 'cross'],
            table: {
                category: 'Styling',
                defaultValue: { summary: 'default' },
                type: { summary: 'EdgeType' }
            }
        },
        variation: {
            description: 'The structural connection style (like arrows).',
            control: 'select',
            options: ['undirected', 'directed', 'bidirectional', 'self-loop', 'parallel', 'tree-edge'],
            table: {
                category: 'Structure',
                defaultValue: { summary: 'undirected' },
                type: { summary: 'EdgeVariation' }
            }
        },
        routing: {
            description: 'Geometric routing algorithm.',
            control: 'select',
            options: ['straight', 'bezier', 'orthogonal', 'arc'],
            table: {
                category: 'Geometry',
                defaultValue: { summary: 'straight' },
                type: { summary: 'EdgeRouting' }
            }
        },
        weightType: {
            description: 'Visual style for the weight label.',
            control: 'select',
            options: ['none', 'boxed-mid', 'inline', 'flow-cap', 'cost-top', 'distance-bottom'],
            table: {
                category: 'Labels',
                defaultValue: { summary: 'none' },
                type: { summary: 'EdgeWeightType' }
            }
        },
        weight: {
            description: 'The content of the label.',
            control: 'text',
            table: {
                category: 'Labels',
                type: { summary: 'string | number' }
            }
        },
        label: {
            description: 'Optional text label for the edge.',
            control: 'text',
            table: {
                category: 'Labels',
                type: { summary: 'string' }
            }
        },
        animated: {
            description: 'If true, adds a flow animation.',
            control: 'boolean',
            table: {
                category: 'Animation',
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
            }
        },
        className: {
            description: 'Additional CSS classes.',
            control: 'text',
            table: {
                category: 'Styling',
                type: { summary: 'string' }
            }
        },
    },
};

export default meta;
type Story = StoryObj<typeof EdgeViz>;

export const Playground: Story = {
    args: {
        x1: 150,
        y1: 250,
        x2: 350,
        y2: 250,
        type: 'active',
        variation: "directed",
        routing: "straight",
        weight: "12",
        weightType: "boxed-mid",
        animated: true,
    },
};

export const Orthogonal: Story = {
    args: {
        x1: 50,
        y1: 50,
        x2: 300,
        y2: 250,
        routing: "orthogonal",
        type: "default",
        variation: "directed",
    }
};

export const SelfLoop: Story = {
    args: {
        x1: 200,
        y1: 200,
        x2: 200,
        y2: 200,
        variation: "self-loop",
        type: "visited",
        label: "i++",
    }
};

export const CurvedArc: Story = {
    args: {
        x1: 50,
        y1: 300,
        x2: 350,
        y2: 300,
        type: "back",
        variation: "directed",
        routing: "arc",
        label: "back-edge",
    }
};

export const WeightedFlow: Story = {
    args: {
        x1: 50,
        y1: 200,
        x2: 350,
        y2: 200,
        type: "default",
        variation: "directed",
        weight: "15/20",
        weightType: "flow-cap",
        animated: true,
    },
};

export const TreeStructure: Story = {
    args: {
        x1: 200,
        y1: 50,
        x2: 200,
        y2: 250,
        type: "tree",
        variation: "tree-edge",
        label: "Parent -> Child"
    }
};

export const ErrorState: Story = {
    args: {
        x1: 50,
        y1: 100,
        x2: 350,
        y2: 200,
        type: "error",
        variation: "undirected",
        routing: "straight"
    }
};
