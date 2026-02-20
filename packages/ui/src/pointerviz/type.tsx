import { ReactNode } from 'react';

export type PointerType = 'default' | 'active' | 'disabled' | 'warning' | 'error' | 'highlighted' | 'success';
export type PointerVariant = 'arrow-down' | 'arrow-up' | 'caret' | 'bracket-left' | 'bracket-right';
export type PointerSize = 'small' | 'medium' | 'large';

export interface PointerVizProps {
    type?: PointerType;
    variant?: PointerVariant;
    size?: PointerSize;
    label?: string;
    className?: string;
}
