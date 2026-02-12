import React from "react";
import { Crown, Leaf, Check, X } from "lucide-react";
import {
    NodeVizProps,
    NodeSize,
    NodeState,
    NodeShape,
    NodeRole,
    NodeMotion,
    NodeConnectionType,
} from "./type";

/* ---------- constants ---------- */
const NODE_SIZES: Record<NodeSize, number> = {
    sm: 40,
    md: 64,
    lg: 96,
};

const BORDER_RADIUS_RATIOS: Record<NodeSize, number> = {
    sm: 0.6,
    md: 0.375,
    lg: 0.25,
};

/* ---------- components ---------- */
type DotType = {
    style?: React.CSSProperties;
    className?: string;
};

const Dot = ({ style, className }: DotType) => (
    <span
        style={style}
        className={`absolute w-1.5 h-1.5 bg-slate-300 border border-slate-400 rounded-full -translate-x-1/2 -translate-y-1/2 ${className ?? ""}`}
    />
);

/* ---------- size ---------- */
const getSizeClasses = (size: NodeSize) => {
    switch (size) {
        case "sm":
            return "min-w-10 min-h-10 text-sm";
        case "lg":
            return "min-w-24 min-h-24 text-xl";
        case "md":
        default:
            return "min-w-16 min-h-16 text-lg";
    }
};

/* ---------- shape ---------- */
const getShapeClasses = (shape: NodeShape, role?: NodeRole) => {
    if (role === "cutVertex") return "rotate-45 rounded-xl";

    switch (shape) {
        case "diamond":
            return "rotate-45 rounded-xl";
        case "roundedRect":
            return "rounded-xl";
        case "circle":
        default:
            return "rounded-full";
    }
};

/* ---------- state ---------- */
const getStateClasses = (state: NodeState) => {
    const map: Record<NodeState, string> = {
        default: "bg-white border-slate-300 text-slate-700",
        active: "bg-amber-50 border-amber-400 text-slate-900 ring-4 ring-amber-100",
        visited: "bg-slate-100 border-slate-300 text-slate-500",
        result: "bg-emerald-50 border-emerald-500 text-slate-900 ring-4 ring-emerald-100",
        error: "bg-rose-50 border-rose-500 text-rose-700",
        discovered: "bg-cyan-50 border-cyan-400 text-slate-900",
        inQueue: "bg-violet-50 border-violet-400 text-slate-900",
        empty: "bg-transparent border-dashed border-slate-300 text-slate-300",
    };

    return map[state];
};

/* ---------- role ---------- */
const getRoleClasses = (role?: NodeRole) => {
    if (!role) return "";

    const map: Partial<Record<NodeRole, string>> = {
        root: "border-amber-400",
        source: "border-blue-500",
        target: "border-emerald-500",
        sentinel: "border-slate-300 text-slate-400",
        cutVertex: "border-slate-800",
    };

    return map[role] ?? "";
};

/* ---------- motion ---------- */
const getMotionClasses = (motion: NodeMotion) => {
    switch (motion) {
        case "highlight":
            return "ring-4 ring-yellow-300/50 scale-110 transition-transform";
        case "pulse":
            return "animate-pulse";
        case "none":
        default:
            return "transition-all duration-300 ease-out";
    }
};

/* ---------- value ---------- */
const renderValue = (value: NodeVizProps["value"]) => {
    if (value === null) return "Ø";
    if (value === undefined) return "";
    return value;
};

/* ---------- connections helper ---------- */
const calculateConnectionPoints = (
    type?: NodeConnectionType,
    shape: NodeShape = "circle",
    role?: NodeRole,
    size: NodeSize = "md"
) => {
    const resolvedType = type ?? 0;
    const pixelSize = NODE_SIZES[size];
    const borderOffsetPct = (1 / pixelSize) * 100;
    const r = BORDER_RADIUS_RATIOS[size];

    const getPositionOnBorder = (angleDeg: number) => {
        const angleRad = (angleDeg * Math.PI) / 180;
        const isSquareLike =
            shape === "roundedRect" || shape === "diamond" || role === "cutVertex";

        let left = 50;
        let top = 50;

        if (isSquareLike) {
            const limit = 1 - r;
            const dx = Math.cos(angleRad);
            const dy = Math.sin(angleRad);

            let x: number;
            let y: number;

            if (Math.abs(dx) > Math.abs(dy)) {
                x = Math.sign(dx);
                y = dy * (x / dx);
            } else {
                y = Math.sign(dy);
                x = dx * (y / dy);
            }

            if (Math.abs(x) > limit && Math.abs(y) > limit) {
                const cx = Math.sign(x) * limit;
                const cy = Math.sign(y) * limit;
                const B = -2 * (cx * dx + cy * dy);
                const E = cx * cx + cy * cy - r * r;
                const det = B * B - 4 * E;
                if (det >= 0) {
                    const t = (-B + Math.sqrt(det)) / 2;
                    x = t * dx;
                    y = t * dy;
                }
            }

            left = borderOffsetPct + ((x + 1) * (100 - 2 * borderOffsetPct)) / 2;
            top = borderOffsetPct + ((y + 1) * (100 - 2 * borderOffsetPct)) / 2;
        } else {
            const x = Math.cos(angleRad);
            const y = Math.sin(angleRad);
            left = borderOffsetPct + ((x + 1) * (100 - 2 * borderOffsetPct)) / 2;
            top = borderOffsetPct + ((y + 1) * (100 - 2 * borderOffsetPct)) / 2;
        }

        return { left, top };
    };

    if (typeof resolvedType === "number") {
        return Array.from({ length: resolvedType }, (_, i) =>
            getPositionOnBorder((i / resolvedType) * 360 - 90)
        );
    }

    if (resolvedType === "denseGraph") {
        return calculateConnectionPoints(8, shape, role, size);
    }

    const presetAngles: Partial<Record<NodeConnectionType, number[]>> = {
        binaryTree: [-90, 135, 45],
        nAryTree: [-90, 90, 135, 45],
        linkedList: [180, 0],
    };

    return (presetAngles[resolvedType] ?? []).map(getPositionOnBorder);
};

/* ---------- visual overlays (badges) ---------- */
const renderOverlays = (state: NodeState, role?: NodeRole, hasLevel?: boolean) => {
    const crownPos = hasLevel ? "-top-16" : "-top-7";

    return (
        <>
            {role === "root" && (
                <Crown
                    className={`absolute ${crownPos} left-1/2 -translate-x-1/2 text-amber-500 w-6 h-6 drop-shadow-sm z-30`}
                    strokeWidth={2.5}
                />
            )}

            {role === "leaf" && (
                <div className="absolute -bottom-3 -right-3 bg-white rounded-full p-1.5 shadow-sm border border-slate-200 z-30">
                    <Leaf className="text-emerald-500 w-5 h-5 fill-emerald-100" />
                </div>
            )}

            {role === "source" && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-blue-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full shadow-sm ring-2 ring-white z-30">
                    S
                </span>
            )}

            {role === "target" && (
                <span className="absolute -top-3 -right-3 h-5 min-w-[1.25rem] px-1 bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center rounded-md shadow-sm z-30">
                    T
                </span>
            )}

            {state === "result" && role !== "target" && (
                <div className="absolute -top-2 -right-2 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-200 p-0.5 shadow-sm ring-2 ring-white z-30">
                    <Check className="w-3 h-3" strokeWidth={3} />
                </div>
            )}

            {state === "error" && (
                <div className="absolute -top-3 -right-3 bg-white text-rose-600 rounded-full border border-rose-500 p-0.5 shadow-sm z-30 w-6 h-6 flex items-center justify-center">
                    <X className="w-4 h-4" strokeWidth={3} />
                </div>
            )}
        </>
    );
};

/* ---------- main component ---------- */
export const NodeViz: React.FC<NodeVizProps> = ({
    value,
    size = "md",
    state = "default",
    role,
    shape = "circle",
    connections,
    metadata,
    motion = "none",
}) => {
    const sentinelStyle =
        role === "sentinel"
            ? {
                backgroundImage:
                    "repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(0,0,0,0.05) 5px, rgba(0,0,0,0.05) 10px)",
            }
            : {};

    const isRotatedHelper = shape === "diamond" || role === "cutVertex";
    const counterRotate = isRotatedHelper ? "-rotate-45" : "";

    const connectionPoints = React.useMemo(
        () => calculateConnectionPoints(connections, shape, role, size),
        [connections, shape, role, size]
    );

    return (
        <div className="relative inline-flex flex-col items-center justify-center m-6">
            {metadata?.level !== undefined && (
                <span className="absolute -top-8 text-xs font-medium text-slate-400 font-mono tracking-tight whitespace-nowrap">
                    L:{metadata.level}
                </span>
            )}

            <div
                style={sentinelStyle}
                className={`relative flex items-center justify-center border-2 aspect-square p-2
                    ${getSizeClasses(size)}
                    ${getShapeClasses(shape, role)}
                    ${getStateClasses(state)}
                    ${getRoleClasses(role)}
                    ${getMotionClasses(motion)}
                `}
            >
                <div className="absolute inset-0 z-20 pointer-events-none">
                    {connectionPoints.map((p, i) => (
                        <Dot key={i} style={{ left: `${p.left}%`, top: `${p.top}%` }} />
                    ))}
                </div>

                <span className={`font-semibold z-10 select-none text-center break-all ${counterRotate}`}>
                    {renderValue(value)}
                </span>

                {/* DFS Time */}
                {metadata?.dfsTime && (
                    <>
                        <span className={`absolute top-2 left-2 text-[10px] leading-none text-slate-400 opacity-80 select-none ${counterRotate}`}>
                            {metadata.dfsTime.in}
                        </span>
                        <span className={`absolute bottom-2 right-2 text-[10px] leading-none text-slate-400 opacity-80 select-none ${counterRotate}`}>
                            {metadata.dfsTime.out}
                        </span>
                    </>
                )}

                {/* Degree */}
                {metadata?.degree !== undefined && (
                    <div className={`absolute -top-4 -left-4 bg-white border border-slate-300 shadow-sm rounded-lg px-1.5 py-0.5 min-w-[2rem] flex items-center justify-center z-20 ${counterRotate}`}>
                        <span className="text-xs text-slate-700 font-sans font-semibold leading-tight block">D:{metadata.degree}</span>
                    </div>
                )}

                {/* Rank */}
                {metadata?.rank !== undefined && (
                    <div className={`absolute -top-4 -right-4 bg-white border border-slate-300 shadow-sm rounded-lg px-1.5 py-0.5 min-w-[2rem] flex items-center justify-center z-20 ${counterRotate}`}>
                        <span className="text-xs text-slate-700 font-sans font-semibold leading-tight block">R:{metadata.rank}</span>
                    </div>
                )}

                {/* Distance */}
                {metadata?.distance !== undefined && (
                    <div className={`absolute -bottom-4 -right-4 bg-slate-50 border border-slate-300 rounded-lg px-1.5 py-0.5 min-w-[2rem] flex items-center justify-center z-20 ${counterRotate}`}>
                        <span className="text-xs text-slate-700 font-sans font-semibold leading-tight block">d:{metadata.distance}</span>
                    </div>
                )}

                <div className={`absolute w-full h-full top-0 left-0 pointer-events-none ${counterRotate}`}>
                    {renderOverlays(state, role, metadata?.level !== undefined)}
                </div>
            </div>

            {metadata?.parent !== undefined && (
                <span className="absolute -bottom-8 text-xs text-slate-400 font-mono tracking-tight whitespace-nowrap">
                    P:{metadata.parent}
                </span>
            )}
        </div>
    );
};

export default NodeViz;