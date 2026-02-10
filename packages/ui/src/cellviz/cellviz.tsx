import { Cell, CellBadgeType, CellDataType, CellOverridingConfig, CellType, CellSizeType } from "./type";
import React from "react";

const getCommonClasses = (type: CellType) => {
    const colorMapping = {
        active: "bg-yellow-100 border-yellow-500",
        default: "bg-grey-200",
        error: "bg-red-200",
        compareA: "bg-blue-200",
        compareB: "bg-purple-200",
        empty: "bg-white border-dashed border-yellow-500",
        visited: "bg-grey-600 text-grey ",
        result: "bg-green-500 text-bold"
    }

    return `border-2 ${colorMapping[type]}`
}

const getBorderClasses = (type: CellType) => {
    const mapping = {
        active: "",
        default: "",
        error: "",
        compareA: "",
        compareB: "",
        empty: "border-solid",
        visited: "",
        result: ""
    }

    return mapping[type];
}

const getSizeClasses = (size: CellSizeType) => {
    const sizeMap: Record<CellSizeType, string> = {
        small: "w-8 h-8",
        medium: "w-16 h-16",
        large: "w-32 h-32"
    }
    return sizeMap[size];
}


function CellViz({
    size = 'medium',
    type = 'result',
    valueType = 'string',
    overriding_config,
    label = '',
    sublabel = '',
    data,
    badge,
}: Cell) {
    const commonClasses = getCommonClasses(type);
    const borderClasses = getBorderClasses(type);
    const sizeClasses = getSizeClasses(size);

    const width = overriding_config?.width;
    const height = overriding_config?.height;


    return (
        <div
            style={{ width, height }}
            className={`flex items-center justify-center ${commonClasses} ${borderClasses} ${sizeClasses}`}

        >
            {
                sublabel && (
                    <div className="mb-2">{sublabel}</div>
                )
            }

            {
                label && (
                    <div className="font-bold">
                        {label}
                    </div>
                )
            }

            <div className="flex items-center justify-center">
                {data || "null"}
            </div>
            {
                badge &&
                <div className="absolute">
                    badge
                </div>
            }
        </div>
    )
}


export default CellViz;