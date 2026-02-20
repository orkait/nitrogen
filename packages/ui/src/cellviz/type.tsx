import { HTMLAttributes } from 'react';

export type CellSizeType = "small" | 'medium' | "large"
export type CellType = "default" | "active" | "error" | "compareA" | "compareB" | "empty" | "visited" | "result" | "swapping" | "out-of-bounds"
export type CellDataType = "positive" | "negative" | "float" | "char" | "string"

export type CellBadgeType = "icon-only" | "text-only" | "icon-with-background"

export interface Cell {
    size: CellSizeType,
    type: CellType,
    valueType: CellDataType,
    label?: string,
    sublabel?: string,
    data?: any,
    badge?: string,
    isLocked?: boolean
}
