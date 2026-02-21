import React, { useMemo, useId } from "react";

import {
    EdgeType,
    EdgeVariation,
    EdgeWeightType,
    EdgeRouting,
    EdgeProps,
    EdgeStyleConfig
} from './type';

import {
    EDGE_PADDING,
    BOXED_MID_DIMENSIONS,
    FLOW_CAP_DIMENSIONS,
    INLINE_DIMENSIONS,
    COST_TOP_OFFSET_Y,
    DISTANCE_BOTTOM_OFFSET_Y
} from './constants';

const EDGE_STYLES: Record<EdgeType, EdgeStyleConfig> = {
    active: { color: "#eab308", width: 4, opacity: 1 },
    error: { color: "#ef4444", width: 4, opacity: 1 },
    result: { color: "#22c55e", width: 4, opacity: 1 },
    candidate: { color: "#60a5fa", width: 2, dash: "1 6", opacity: 1 },
    visited: { color: "#9ca3af", width: 2, dash: "8 6", opacity: 1 },
    backtracking: { color: "#f97316", width: 2, dash: "8 4", opacity: 1 },
    disabled: { color: "#e5e7eb", width: 1, dash: "2 2", opacity: 0.5 },
    tree: { color: "#0f172a", width: 2, opacity: 1 },
    back: { color: "#f87171", width: 2, dash: "6 4", opacity: 1 },
    forward: { color: "#22c55e", width: 2, dash: "6 4", opacity: 1 },
    cross: { color: "#3b82f6", width: 2, dash: "1 6", opacity: 1 },
    default: { color: "#d1d5db", width: 2, opacity: 1 },
};

function getCubicBezierPoint(t: number, p0: number, p1: number, p2: number, p3: number) {
    const k = 1 - t;
    return (k * k * k * p0) + (3 * k * k * t * p1) + (3 * k * t * t * p2) + (t * t * t * p3);
}

const calculateEdgePath = (
    x1: number, y1: number, x2: number, y2: number,
    type: EdgeType, variation: EdgeVariation, routing: EdgeRouting,
    padding: number
) => {
    const isSelfLoop = variation === "self-loop" && type !== 'back' && type !== 'tree';

    const minX = isSelfLoop ? x1 : Math.min(x1, x2);
    const minY = isSelfLoop ? y1 - 40 : Math.min(y1, y2);
    const maxX = isSelfLoop ? x1 : Math.max(x1, x2);
    const maxY = isSelfLoop ? y1 : Math.max(y1, y2);

    const width = maxX - minX + padding * 2;
    const height = maxY - minY + padding * 2;

    const lx1 = x1 - minX + padding;
    const ly1 = y1 - minY + padding;
    const lx2 = isSelfLoop ? lx1 : x2 - minX + padding;
    const ly2 = isSelfLoop ? ly1 : y2 - minY + padding;

    let pathD = "";
    let centerX = (lx1 + lx2) / 2;
    let centerY = (ly1 + ly2) / 2;

    const dx = lx2 - lx1;
    const dy = ly2 - ly1;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (type === 'back' || (type === 'tree' && variation === 'self-loop')) {
        pathD = `M ${lx1} ${ly1} A ${dist} ${dist} 0 0 1 ${lx2} ${ly2}`;
        centerY -= 24;
    } else if (type === 'forward') {
        pathD = `M ${lx1} ${ly1} A ${dist} ${dist} 0 0 0 ${lx2} ${ly2}`;
        centerY += 24;
    } else if (variation === "self-loop") {
        const r = 26;
        pathD = `M ${lx1} ${ly1} C ${lx1 - r} ${ly1 - r * 2}, ${lx1 + r} ${ly1 - r * 2}, ${lx1} ${ly1}`;
        centerX = lx1;
        centerY = ly1 - 40;
    } else {
        switch (routing) {
            case "bezier": {
                pathD = `M ${lx1} ${ly1} C ${centerX} ${ly1}, ${centerX} ${ly2}, ${lx2} ${ly2}`;
                centerX = getCubicBezierPoint(0.5, lx1, centerX, centerX, lx2);
                centerY = getCubicBezierPoint(0.5, ly1, ly1, ly2, ly2);
                break;
            }
            case "orthogonal": {
                pathD = `M ${lx1} ${ly1} L ${centerX} ${ly1} L ${centerX} ${ly2} L ${lx2} ${ly2}`;
                centerY = (ly1 + ly2) / 2;
                break;
            }
            case "arc": {
                pathD = `M ${lx1} ${ly1} A ${dist * 0.8} ${dist * 0.8} 0 0 1 ${lx2} ${ly2}`;
                centerY -= 24;
                break;
            }
            default:
                pathD = `M ${lx1} ${ly1} L ${lx2} ${ly2}`;
                break;
        }
    }

    return {
        pathD,
        centerX,
        centerY,
        viewBox: `0 0 ${width} ${height}`,
        bounds: {
            left: minX - padding,
            top: minY - padding,
            width,
            height
        }
    };
};

/**
 * EdgeViz - A flexible edge/connection visualization component for graphs and data structures.
 * 
 * This component uses "localized SVG rendering". Instead of creating a massive SVG execution context
 * from (0,0) to (x2,y2), it positions a smaller SVG container exactly covering the bounding box of the edge.
 * This drastically improves performance (layout/paint) when many edges are on screen.
 */
const EdgeViz: React.FC<EdgeProps> = ({
    x1 = 50,
    y1 = 50,
    x2 = 250,
    y2 = 50,
    type = "default",
    variation = "undirected",
    routing = "straight",
    weight,
    weightType = "none",
    label,
    animated = false,
    className = "",
}) => {
    const uid = useId();
    const style = EDGE_STYLES[type];

    const { pathD, centerX, centerY, viewBox, bounds } = useMemo(() => {
        return calculateEdgePath(x1, y1, x2, y2, type, variation, routing, EDGE_PADDING);
    }, [x1, y1, x2, y2, routing, variation, type]);

    const isBacktracking = type === "backtracking";
    const showStartMarker = variation === "bidirectional" || isBacktracking;
    const showEndMarker = !isBacktracking && (
        ["directed", "bidirectional", "self-loop", "tree-edge", "parallel"].includes(variation) ||
        ["result", "candidate"].includes(type)
    );

    const markerStartId = `edge-marker-start-${uid}`;
    const markerEndId = `edge-marker-end-${uid}`;

    const defaultLabels: Partial<Record<EdgeType, string>> = { tree: "T", back: "B", forward: "F", cross: "C" };
    const displayLabel = label ?? (defaultLabels[type] || "");

    const hasWeight = weight !== undefined && weight !== null && weight !== "" && weightType !== "none";

    return (
        <div
            className={`absolute pointer-events-none ${type === 'active' ? 'z-10' : 'z-0'} ${className}`}
            style={{ left: bounds.left, top: bounds.top, width: bounds.width, height: bounds.height }}
            aria-label={`Edge from (${x1},${y1}) to (${x2},${y2})`}
        >
            <svg
                width="100%"
                height="100%"
                viewBox={viewBox}
                className="overflow-visible"
            >
                <defs>
                    <marker
                        id={markerEndId}
                        viewBox="0 0 10 10"
                        refX="9"
                        refY="5"
                        markerWidth="6"
                        markerHeight="6"
                        orient="auto-start-reverse"
                    >
                        <path d="M 0 0 L 10 5 L 0 10 z" fill={style.color} />
                    </marker>

                    <marker
                        id={markerStartId}
                        viewBox="0 0 10 10"
                        refX="1"
                        refY="5"
                        markerWidth="6"
                        markerHeight="6"
                        orient="auto"
                    >
                        <path d="M 10 0 L 0 5 L 10 10 z" fill={style.color} />
                    </marker>
                </defs>

                <path
                    d={pathD}
                    fill="none"
                    stroke={style.color}
                    strokeWidth={style.width}
                    strokeDasharray={style.dash}
                    strokeLinecap={style.dash ? "round" : "butt"}
                    strokeOpacity={style.opacity}
                    markerStart={showStartMarker ? `url(#${markerStartId})` : undefined}
                    markerEnd={showEndMarker ? `url(#${markerEndId})` : undefined}
                    className="transition-all duration-300"
                />

                {animated && type === "active" && (
                    <path
                        d={pathD}
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth={2}
                        strokeDasharray="4 6"
                        className="animate-pulse opacity-50"
                    />
                )}

                {type === "error" && (
                    <g transform={`translate(${centerX}, ${centerY})`}>
                        <line x1={-6} y1={-6} x2={6} y2={6} stroke="#ef4444" strokeWidth={3} />
                        <line x1={-6} y1={6} x2={6} y2={-6} stroke="#ef4444" strokeWidth={3} />
                    </g>
                )}

                {(hasWeight || displayLabel) && (
                    <g transform={`translate(${centerX}, ${centerY})`}>
                        {hasWeight ? (
                            <>
                                {weightType === 'boxed-mid' && (
                                    <foreignObject x={BOXED_MID_DIMENSIONS.x} y={BOXED_MID_DIMENSIONS.y} width={BOXED_MID_DIMENSIONS.width} height={BOXED_MID_DIMENSIONS.height} className="overflow-visible">
                                        <div className="flex items-center justify-center w-8 h-6 bg-white border border-gray-300 rounded shadow-sm">
                                            <span className="text-xs font-medium text-gray-700 leading-none">{weight}</span>
                                        </div>
                                    </foreignObject>
                                )}

                                {weightType === 'flow-cap' && (
                                    <foreignObject x={FLOW_CAP_DIMENSIONS.x} y={FLOW_CAP_DIMENSIONS.y} width={FLOW_CAP_DIMENSIONS.width} height={FLOW_CAP_DIMENSIONS.height} className="overflow-visible">
                                        <div className="flex items-center justify-center px-2 h-6 bg-white border border-gray-300 rounded-full shadow-sm">
                                            <span className="text-xs font-bold text-gray-800 leading-none">{weight}</span>
                                        </div>
                                    </foreignObject>
                                )}

                                {weightType === 'inline' && (
                                    <g>
                                        <rect x={INLINE_DIMENSIONS.x} y={INLINE_DIMENSIONS.y} width={INLINE_DIMENSIONS.width} height={INLINE_DIMENSIONS.height} fill="white" rx="2" />
                                        <text y="4" textAnchor="middle" className="text-xs font-bold fill-black" style={{ pointerEvents: 'none' }}>{weight}</text>
                                    </g>
                                )}

                                {weightType === 'cost-top' && (
                                    <text y={COST_TOP_OFFSET_Y} textAnchor="middle" className="text-xs font-semibold fill-slate-600">${weight}</text>
                                )}

                                {weightType === 'distance-bottom' && (
                                    <text y={DISTANCE_BOTTOM_OFFSET_Y} textAnchor="middle" className="text-xs text-gray-500 fill-gray-500">{weight}</text>
                                )}
                            </>
                        ) : (
                            displayLabel && (
                                <g transform="translate(0, -12)">
                                    <text textAnchor="middle" className="text-sm font-bold fill-slate-700">
                                        {displayLabel}
                                    </text>
                                </g>
                            )
                        )}
                    </g>
                )}
            </svg>
        </div>
    );
};

EdgeViz.displayName = "EdgeViz";

export default EdgeViz;
