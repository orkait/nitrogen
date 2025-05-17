"use client"

import React, { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown, ChevronUp, LucideIcon } from "lucide-react"
import {
    accordionVariants,
    accordionItemVariants,
    accordionTriggerVariants,
    accordionContentVariants,
} from "./accordion.cva"

// Accordion Root
const Accordion = forwardRef<
    ElementRef<typeof AccordionPrimitive.Root>,
    ComponentPropsWithoutRef<typeof AccordionPrimitive.Root> & {
        variant?: "default" | "compact",
        openIcon?: LucideIcon,
        closeIcon?: LucideIcon,
        hasIcon?: boolean,
    }
>(({
    variant,
    openIcon = ChevronUp,
    closeIcon = ChevronDown,
    className,
    ...props
}, ref) => (

    <AccordionPrimitive.Root
        ref={ref}
        className={accordionVariants({ variant, className })}
        {...props}
    >
        {props.children}
    </AccordionPrimitive.Root>
))

// Accordion Item
const AccordionItem = forwardRef<
    ElementRef<typeof AccordionPrimitive.Item>,
    ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> & {
        variant?: "default" | "compact",
        hasBorder?: boolean,
    }
>(({
    className,
    variant,
    hasBorder,
    ...props
}, ref) => {

    return (
        <AccordionPrimitive.Item
            ref={ref}
            className={accordionItemVariants({ variant, hasBorder, className })}
            {...props}
        >
            {props.children}
        </AccordionPrimitive.Item>
    )
})

// Accordion Trigger
const AccordionTrigger = forwardRef<
    ElementRef<typeof AccordionPrimitive.Trigger>,
    ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & {
        variant?: "default" | "compact",
        hasIcon?: boolean,
        className?: string,
    }
>(({
    variant,
    hasIcon = true,
    className,
    children,
    ...props
}, ref) => {

    return (
        <AccordionPrimitive.Header className="flex">
            <AccordionPrimitive.Trigger
                ref={ref}
                className={accordionTriggerVariants({ variant, className })}
                {...props}
            >
                {children}

                {
                    hasIcon && (
                        <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
                    )
                }

            </AccordionPrimitive.Trigger>
        </AccordionPrimitive.Header>
    )
})

// Accordion Content
const AccordionContent = forwardRef<
    ElementRef<typeof AccordionPrimitive.Content>,
    ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> & {
        variant?: "default" | "compact"
    }
>(({ className, children, variant, ...props }, ref) => (
    <AccordionPrimitive.Content
        ref={ref}
        className={accordionContentVariants({ variant, className })}
        {...props}
    >
        <div className="pb-4 pt-0">{children}</div>
    </AccordionPrimitive.Content>
))

// Display names for better debugging and React devtools
Accordion.displayName = "Accordion"
AccordionItem.displayName = "AccordionItem"
AccordionTrigger.displayName = "AccordionTrigger"
AccordionContent.displayName = "AccordionContent"

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
