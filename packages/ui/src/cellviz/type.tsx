import { HTMLAttributes } from 'react';

export type CellSizeType = "small" | 'medium' | "large"
export type CellType = "default" | "active" | "error" | "compareA" | "compareB" | "empty" | "visited" | "result"
export type CellDataType = "positive" | "negative" | "float" | "char" | "string" | "boolean" | "overflow"


// ⚠️ Warning: using this will value side effects in the UI (test before deployment)
export type CellOverridingConfig = {
    width: number | string,
    height: number | string
}

export type CellBadgeType = "icon-only" | "text-only" | "icon-with-background"

export interface Cell{
    size: CellSizeType,
    type: CellType,
    valueType: CellDataType,
    overriding_config: CellOverridingConfig,
    label?: string,
    sublabel?: string,
    data?: any, // no data -> NULL
    badge?: string
}
