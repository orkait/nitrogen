import { HTMLAttributes } from 'react';

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

export type EdgeVariation =
    | 'undirected'
    | 'directed'
    | 'bidirectional'
    | 'self-loop'
    | 'parallel'
    | 'tree-edge';

export type EdgeWeightType =
    | 'none'
    | 'boxed-mid'
    | 'inline'
    | 'flow-cap'
    | 'cost-top'
    | 'distance-bottom';

export type EdgeRouting =
    | 'straight'
    | 'bezier'
    | 'orthogonal'
    | 'arc';

export interface EdgeStyleConfig {
    color: string;
    width: number;
    dash?: string;
    opacity: number;
}

export interface EdgeProps {
    x1?: number;
    y1?: number;
    x2?: number;
    y2?: number;
    type?: EdgeType;
    variation?: EdgeVariation;
    routing?: EdgeRouting;
    weight?: string | number;
    weightType?: EdgeWeightType;
    label?: string;
    animated?: boolean;
    className?: string;
}
