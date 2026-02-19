import { HTMLAttributes } from 'react';

/**
 * Visual state of the edge, defining color and stroke style.
 */
export type EdgeType =
    | 'default'
    | 'active'
    | 'visited'
    | 'result'
    | 'error'
    | 'candidate'
    | 'backtracking'
    | 'disabled'
    | 'tree'
    | 'back'
    | 'forward'
    | 'cross';

/**
 * Structural variation of the edge.
 */
export type EdgeVariation =
    | 'undirected'
    | 'directed'
    | 'bidirectional'
    | 'self-loop'
    | 'parallel'
    | 'tree-edge';

/**
 * How to display the weight/data label.
 */
export type EdgeWeightType =
    | 'none'
    | 'boxed-mid'
    | 'inline'
    | 'flow-cap'
    | 'cost-top'
    | 'distance-bottom';

/**
 * Geometric routing capability.
 */
export type EdgeRouting =
    | 'straight'
    | 'bezier'
    | 'orthogonal'
    | 'arc';

export interface EdgeProps {
    /**
     * The horizontal (X) starting coordinate of the edge.
     * @default 50
     */
    x1?: number;

    /**
     * The vertical (Y) starting coordinate of the edge.
     * @default 50
     */
    y1?: number;

    /**
     * The horizontal (X) ending coordinate of the edge.
     * @default 250
     */
    x2?: number;

    /**
     * The vertical (Y) ending coordinate of the edge.
     * @default 50
     */
    y2?: number;

    /**
     * The semantic state that determines color and styling (e.g., 'active' is yellow/thick, 'error' is red).
     */
    type?: EdgeType;

    /**
     * The structural connection style (e.g., 'directed' has arrow at end, 'undirected' has no arrows).
     */
    variation?: EdgeVariation;

    /**
     * Geometric routing algorithm (e.g., 'straight', 'bezier', 'orthogonal').
     */
    routing?: EdgeRouting;

    /**
     * The content of the weight label (text or number).
     */
    weight?: string | number;

    /**
     * Visual style for the weight label.
     */
    weightType?: EdgeWeightType;

    /**
     * Optional text label (e.g., 'T', 'B') for graph theory edge types.
     */
    label?: string;

    /**
     * If true, adds an animated dash flow effect (useful for active paths).
     */
    animated?: boolean;

    /**
     * Additional CSS class names applied to the container div.
     */
    className?: string;
}
