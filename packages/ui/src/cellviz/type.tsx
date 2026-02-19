import { HTMLAttributes } from 'react';

export type CellSizeType = "small" | 'medium' | "large"
export type CellType = "default" | "active" | "error" | "compareA" | "compareB" | "empty" | "visited" | "result" | "swapping" | "out-of-bounds"
export type CellDataType = "positive" | "negative" | "float" | "char" | "string"

export type CellBadgeType = "icon-only" | "text-only" | "icon-with-background"

export interface Cell {
    /**
     * Controls the overall dimensions and text size of the cell.
     * @default 'medium'
     */
    size: CellSizeType,

    /**
     * The visual state of the cell, determining usage colors and border styles.
     * @default 'default'
     */
    type: CellType,

    /**
     * formatting style for the cell's content value (e.g., specific colors for booleans or strings).
     * @default 'positive'
     */
    valueType: CellDataType,

    /**
     * Primary label text displayed directly below the cell.
     */
    label?: string,

    /**
     * Secondary label text (e.g., index or address) displayed below the primary label.
     */
    sublabel?: string,

    /**
     * The main content to display inside the cell. Can be a number, string, or boolean.
     */
    data?: any,

    /**
     * A small text badge displayed in the top-right corner of the cell.
     */
    badge?: string,

    /**
     * If true, displays a lock icon in the top-left corner indicating immutability.
     * @default false
     */
    isLocked?: boolean
}
