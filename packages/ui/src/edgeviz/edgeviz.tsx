import React, { useMemo, useId } from "react";

import {
    EdgeType,
    EdgeVariation,
    EdgeWeightType,
    EdgeRouting,
    EdgeProps
} from './type';

const EDGE_STYLES: Record<EdgeType, {
    color: string;
    width: number;
    dash?: string;
    opacity: number;
}> = {
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
    const PADDING = 30;

    const { pathD, centerX, centerY, viewBox, bounds } = useMemo(() => {
        const minX = Math.min(x1, x2);
        const minY = Math.min(y1, y2);
        const maxX = Math.max(x1, x2);
        const maxY = Math.max(y1, y2);

        const lx1 = x1 - minX + PADDING;
        const ly1 = y1 - minY + PADDING;
        const lx2 = x2 - minX + PADDING;
        const ly2 = y2 - minY + PADDING;

        let d = "";
        let lx = (lx1 + lx2) / 2;
        let ly = (ly1 + ly2) / 2;

        if (type === 'back' || (type === 'tree' && variation === 'self-loop')) {
            const dx = lx2 - lx1;
            const dy = ly2 - ly1;
            const dist = Math.sqrt(dx * dx + dy * dy);
            d = `M ${lx1} ${ly1} A ${dist} ${dist} 0 0 1 ${lx2} ${ly2}`;
            ly -= 24;
        } else if (type === 'forward') {
            const dx = lx2 - lx1;
            const dy = ly2 - ly1;
            const dist = Math.sqrt(dx * dx + dy * dy);
            d = `M ${lx1} ${ly1} A ${dist} ${dist} 0 0 0 ${lx2} ${ly2}`;
            ly += 24;
        } else if (variation === "self-loop") {
            const r = 26;
            d = `M ${lx1} ${ly1} C ${lx1 - r} ${ly1 - r * 2}, ${lx1 + r} ${ly1 - r * 2}, ${lx1} ${ly1}`;
            ly = ly1 - 40;
        } else {
            switch (routing) {
                case "bezier": {
                    const cx = (lx1 + lx2) / 2;
                    d = `M ${lx1} ${ly1} C ${cx} ${ly1}, ${cx} ${ly2}, ${lx2} ${ly2}`;
                    lx = getCubicBezierPoint(0.5, lx1, cx, cx, lx2);
                    ly = getCubicBezierPoint(0.5, ly1, ly1, ly2, ly2);
                    break;
                }
                case "orthogonal": {
                    const midX = (lx1 + lx2) / 2;
                    d = `M ${lx1} ${ly1} L ${midX} ${ly1} L ${midX} ${ly2} L ${lx2} ${ly2}`;
                    lx = midX;
                    ly = (ly1 + ly2) / 2;
                    break;
                }
                case "arc": {
                    const dx = lx2 - lx1;
                    const dy = ly2 - ly1;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    d = `M ${lx1} ${ly1} A ${dist * 0.8} ${dist * 0.8} 0 0 1 ${lx2} ${ly2}`;
                    ly -= 24;
                    break;
                }
                default:
                    d = `M ${lx1} ${ly1} L ${lx2} ${ly2}`;
                    break;
            }
        }

        const width = (maxX - minX) + (PADDING * 2);
        const height = (maxY - minY) + (PADDING * 2);

        return {
            pathD: d,
            centerX: lx,
            centerY: ly,
            viewBox: `0 0 ${width} ${height}`,
            bounds: {
                left: minX - PADDING,
                top: minY - PADDING,
                width,
                height
            }
        };

    }, [x1, y1, x2, y2, routing, variation, type]);

    const isBacktracking = type === "backtracking";
    const showStartMarker = variation === "bidirectional" || isBacktracking;
    const showEndMarker = !isBacktracking && (
        variation === "directed" ||
        variation === "bidirectional" ||
        variation === "self-loop" ||
        variation === "tree-edge" ||
        variation === "parallel" ||
        type === "result" ||
        type === "candidate"
    );

    const markerStartId = `edge-marker-start-${uid}`;
    const markerEndId = `edge-marker-end-${uid}`;

    const displayLabel = label ?? (() => {
        switch (type) {
            case "tree": return "T";
            case "back": return "B";
            case "forward": return "F";
            case "cross": return "C";
            default: return "";
        }
    })();

    const hasWeight = weight !== undefined && weight !== null && weight !== "" && weightType !== "none";

    return (
        <div
            className={`absolute pointer-events-none ${className}`}
            style={{
                left: bounds.left,
                top: bounds.top,
                width: bounds.width,
                height: bounds.height,
                zIndex: type === 'active' ? 10 : 1
            }}
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
                                    <foreignObject x="-16" y="-12" width="32" height="24" className="overflow-visible">
                                        <div className="flex items-center justify-center w-8 h-6 bg-white border border-gray-300 rounded shadow-sm">
                                            <span className="text-xs font-medium text-gray-700 leading-none">{weight}</span>
                                        </div>
                                    </foreignObject>
                                )}

                                {weightType === 'flow-cap' && (
                                    <foreignObject x="-24" y="-12" width="48" height="24" className="overflow-visible">
                                        <div className="flex items-center justify-center px-2 h-6 bg-white border border-gray-300 rounded-full shadow-sm">
                                            <span className="text-xs font-bold text-gray-800 leading-none">{weight}</span>
                                        </div>
                                    </foreignObject>
                                )}

                                {weightType === 'inline' && (
                                    <g>
                                        <rect x="-12" y="-9" width="24" height="18" fill="white" rx="2" />
                                        <text y="4" textAnchor="middle" className="text-xs font-bold fill-black" style={{ pointerEvents: 'none' }}>{weight}</text>
                                    </g>
                                )}

                                {weightType === 'cost-top' && (
                                    <text y="-12" textAnchor="middle" className="text-xs font-semibold fill-slate-600">${weight}</text>
                                )}

                                {weightType === 'distance-bottom' && (
                                    <text y="18" textAnchor="middle" className="text-xs text-gray-500 fill-gray-500">{weight}</text>
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
