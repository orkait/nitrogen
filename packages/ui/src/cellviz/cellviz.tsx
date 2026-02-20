import { Cell, CellDataType, CellType, CellSizeType } from "./type";
import React from "react";
import { Check, X, Lock } from "lucide-react";

const getCommonClasses = (type: CellType) => {
    const colorMapping: Record<CellType, string> = {
        active: "bg-amber-100 border-amber-400 text-gray-900 font-bold",
        default: "bg-white border-gray-300 text-gray-700",
        error: "bg-rose-100 border-rose-500 text-rose-900",
        compareA: "bg-blue-100 border-blue-500 text-blue-900",
        compareB: "bg-purple-100 border-purple-500 text-purple-900",
        empty: "bg-transparent border-dashed border-gray-300 text-gray-400",
        visited: "bg-gray-200 border-gray-400 text-gray-500",
        result: "bg-emerald-100 border-emerald-500 text-emerald-900 font-bold",
        swapping: "bg-amber-50 border-amber-300 border-dashed text-gray-700",
        "out-of-bounds": "bg-red-100 border-red-500 text-red-900"
    }

    return `border-2 ${colorMapping[type] || colorMapping.default}`
}

const getValueClasses = (valueType: CellDataType | undefined) => {
    if (!valueType) return "";
    const mapping: Record<CellDataType, string> = {
        positive: "",
        negative: "!text-rose-500",
        float: "",
        char: "text-emerald-600",
        string: "text-emerald-600",
    }
    return mapping[valueType];
}

const getSizeClasses = (size: CellSizeType) => {
    const sizeMap: Record<CellSizeType, string> = {
        small: "w-10 h-10 text-xs",
        medium: "w-16 h-16 text-base",
        large: "w-24 h-24 text-lg"
    }
    return sizeMap[size];
}

const getHatchedBackground = (type: CellType) => {
    if (type === "out-of-bounds") {
        return {
            backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(255,255,255,0.5) 5px, rgba(255,255,255,0.5) 10px)"
        }
    }
    return {};
}

function CellViz({
    size = 'medium',
    type = 'default',
    valueType = 'positive',
    label = '',
    sublabel = '',
    data,
    badge,
    isLocked = false
}: Cell) {
    const commonClasses = getCommonClasses(type);
    const sizeClasses = getSizeClasses(size);
    const valueClasses = getValueClasses(valueType);

    const style = {
        ...getHatchedBackground(type)
    };

    const renderData = () => {
        if (type === 'empty') return "null";

        let displayData: any = data;

        if (valueType === 'string' && data !== null && data !== undefined) {
            displayData = `"${data}"`;
        } else if (valueType === 'char' && data !== null && data !== undefined) {
            displayData = `'${data}'`;
        } else if (valueType === 'float' && !isNaN(Number(data)) && data !== '' && data !== null && data !== undefined) {
            displayData = Number(data).toFixed(2);
        } else if (valueType === 'negative' && !isNaN(Number(data)) && data !== '' && data !== null && data !== undefined) {
            const num = Number(data);
            displayData = num > 0 ? -num : -Math.abs(num);
        }

        return (
            <span className={valueClasses}>
                {displayData}
            </span>
        );
    };

    return (
        <div className="flex flex-col items-center gap-1">
            <div
                style={style}
                className={`relative flex items-center justify-center rounded-md transition-all duration-200 ${commonClasses} ${sizeClasses} shadow-sm`}
            >
                {/* Top Left Icons */}
                {isLocked && (
                    <div className="absolute top-1 left-1 text-gray-400">
                        <Lock size={12} strokeWidth={2.5} />
                    </div>
                )}

                {/* Main Data */}
                <div className="z-10 text-center font-medium">
                    {renderData()}
                </div>

                {/* Top Right Badges/Icons */}
                <div className="absolute top-1 right-1 flex items-center gap-1">
                    {badge && (
                        <span className="text-[10px] bg-gray-100 text-gray-600 px-1 rounded border border-gray-200 font-mono">
                            {badge}
                        </span>
                    )}
                    {type === 'result' && <Check size={14} className="text-emerald-600" strokeWidth={3} />}
                    {type === 'error' && <X size={14} className="text-rose-600" strokeWidth={3} />}
                </div>
            </div>

            {/* Labels outside the box */}
            {(label || sublabel) && (
                <div className="flex flex-col items-center">
                    {sublabel && (
                        <span className="text-xs text-gray-400 font-mono text-center leading-tight">
                            {sublabel}
                        </span>
                    )}
                    {label && (
                        <span className="text-sm font-semibold text-gray-700 mt-0.5">
                            {label}
                        </span>
                    )}
                </div>
            )}
        </div>
    )
}

export default CellViz;