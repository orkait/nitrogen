export type NodeSize = "sm" | "md" | "lg";

/** Algorithm lifecycle state */
export type NodeState =
    | "default"
    | "active"
    | "visited"
    | "result"
    | "error"
    | "discovered"
    | "inQueue"
    | "empty";

/** Graph-theoretic role */
export type NodeRole =
    | "root"
    | "leaf"
    | "sentinel"
    | "source"
    | "target"
    | "cutVertex";

/** Node geometry */
export type NodeShape =
    | "circle"
    | "diamond"
    | "roundedRect";

/** Connection topology (future EdgeViz use) */
export type NodeConnectionType =
    | "binaryTree"
    | "nAryTree"
    | "denseGraph"
    | "linkedList"
    | number;

/** Algorithm metadata */
export interface NodeMetadata {
    level?: number;
    parent?: number | string;
    rank?: number;
    degree?: number;
    distance?: number;
    dfsTime?: {
        in: number;
        out: number;
    };
}

/** Transient visual emphasis */
export type NodeMotion =
    | "none"
    | "highlight"
    | "pulse";

/** Public NodeViz API */
export interface NodeVizProps {
    value?: number | string | null;

    size?: NodeSize;
    state?: NodeState;
    role?: NodeRole;
    shape?: NodeShape;
    connections?: NodeConnectionType;

    metadata?: NodeMetadata;
    motion?: NodeMotion;
}
