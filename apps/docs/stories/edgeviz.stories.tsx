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
    // Default args ensure that decorators (which read context.args) stay in sync with component defaults
    args: {
        x1: 50,
        y1: 50,
        x2: 250,
        y2: 50,
        type: 'default',
        variation: 'undirected',
        routing: 'straight',
        weight: '',
        weightType: 'none',
        label: '',
        animated: false,
        className: '',
    },
    // Add visual context to help users see the coordinates relative to the canvas
    decorators: [
        (Story, context) => {
            // Layout context to simulate a graph canvas
            // We safely access args that might not be inferred by TS in the decorator context
            const args = context.args as any;
            const x1 = args.x1 ?? 50;
            const y1 = args.y1 ?? 50;
            const x2 = args.x2 ?? 250;
            const y2 = args.y2 ?? 50;

            return (
                <div
                    className="relative border border-dashed border-gray-200 rounded-lg bg-slate-50 shadow-sm"
                    style={{ width: 500, height: 500 }}
                >
                    {/* Grid Background */}
                    <div
                        className="absolute inset-0 pointer-events-none opacity-20 rounded-lg overflow-hidden"
                        style={{
                            backgroundImage: 'radial-gradient(#64748b 1px, transparent 1px)',
                            backgroundSize: '20px 20px'
                        }}
                    />

                    {/* Visual Markers for Start/End Points (Debug helpers) */}
                    <div
                        className="absolute w-3 h-3 bg-blue-500 rounded-full ring-2 ring-white shadow-md -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10"
                        style={{ left: x1, top: y1 }}
                        title={`Start (${x1}, ${y1})`}
                    />
                    <div
                        className="absolute w-3 h-3 bg-red-500 rounded-full ring-2 ring-white shadow-md -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10"
                        style={{ left: x2, top: y2 }}
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
            control: { type: 'range', min: 20, max: 480, step: 10 },
            name: "Start X",
            description: "The horizontal (X) starting coordinate.",
            table: {
                category: 'Coordinates',
                defaultValue: { summary: '50' },
                type: { summary: null as any }
            },
        },
        y1: {
            control: { type: 'range', min: 20, max: 480, step: 10 },
            name: "Start Y",
            description: "The vertical (Y) starting coordinate.",
            table: {
                category: 'Coordinates',
                defaultValue: { summary: '50' },
                type: { summary: null as any }
            },
        },
        x2: {
            control: { type: 'range', min: 20, max: 480, step: 10 },
            name: "End X",
            description: "The horizontal (X) ending coordinate.",
            table: {
                category: 'Coordinates',
                defaultValue: { summary: '250' },
                type: { summary: null as any }
            },
        },
        y2: {
            control: { type: 'range', min: 20, max: 480, step: 10 },
            name: "End Y",
            description: "The vertical (Y) ending coordinate.",
            table: {
                category: 'Coordinates',
                defaultValue: { summary: '50' },
                type: { summary: null as any }
            },
        },
        type: {
            description: 'The semantic state of the edge (color/style).',
            control: 'select',
            options: ['default', 'active', 'visited', 'result', 'error', 'candidate', 'backtracking', 'disabled', 'tree', 'back', 'forward', 'cross'],
            table: {
                category: 'Styling',
                defaultValue: { summary: 'default' },
                type: { summary: null as any }
            }
        },
        variation: {
            description: 'The structural connection style (like arrows).',
            control: 'select',
            options: ['undirected', 'directed', 'bidirectional', 'self-loop', 'parallel', 'tree-edge'],
            table: {
                category: 'Structure',
                defaultValue: { summary: 'undirected' },
                type: { summary: null as any }
            }
        },
        routing: {
            description: 'Geometric routing algorithm.',
            control: 'select',
            options: ['straight', 'bezier', 'orthogonal', 'arc'],
            table: {
                category: 'Geometry',
                defaultValue: { summary: 'straight' },
                type: { summary: null as any }
            }
        },
        weightType: {
            description: 'Visual style for the weight label.',
            control: 'select',
            options: ['none', 'boxed-mid', 'inline', 'flow-cap', 'cost-top', 'distance-bottom'],
            table: {
                category: 'Labels',
                defaultValue: { summary: 'none' },
                type: { summary: null as any }
            }
        },
        weight: {
            description: 'The content of the label.',
            control: 'text',
            table: {
                category: 'Labels',
                type: { summary: null as any }
            }
        },
        label: {
            description: 'Optional text label for the edge.',
            control: 'text',
            table: {
                category: 'Labels',
                type: { summary: null as any }
            }
        },
        animated: {
            description: 'If true, adds a flow animation.',
            control: 'boolean',
            table: {
                category: 'Animation',
                defaultValue: { summary: 'false' },
                type: { summary: null as any }
            }
        },
        className: {
            description: 'Additional CSS classes.',
            control: 'text',
            table: {
                category: 'Styling',
                type: { summary: null as any }
            }
        },
    },
};

export default meta;
type Story = StoryObj<typeof EdgeViz>;

/**
 * Main interactive playground. Adjust controls to see updates.
 */
export const Playground: Story = {
    args: {
        x1: 50,
        y1: 50,
        x2: 250,
        y2: 50,
        type: 'active',
        variation: "directed",
        routing: "straight",
        weight: "12",
        weightType: "boxed-mid",
        animated: true,
    },
};

/**
 * Right-angled connections often used in Organization Charts or Circuit diagrams.
 */
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

/**
 * Self-loops indicate a node connecting to itself.
 * Note: Coordinates for start/end are usually the same for self-loops.
 */
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

/**
 * Arc routing is useful for showing "back edges" in DFS traversals or 
 * overlapping connections.
 */
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

/**
 * Example of a "Flow Network" edge with capacity/weight labeling.
 */
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

/**
 * Tree structuring using orthogonal lines (implicit structure visualization).
 */
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

/**
 * Error state visualization, useful for debugging visualizers.
 */
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
