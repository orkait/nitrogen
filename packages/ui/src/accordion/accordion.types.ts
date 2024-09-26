// Accordion.types.ts
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { VariantProps } from "class-variance-authority";
import { accordionVariants, accordionItemVariants, accordionTriggerVariants, accordionContentVariants } from "./accordion.cva";

export type AccordionProps = React.ComponentPropsWithoutRef<
    typeof AccordionPrimitive.Root
> &
    VariantProps<typeof accordionVariants>;

export type AccordionItemProps = React.ComponentPropsWithoutRef<
    typeof AccordionPrimitive.Item
> &
    VariantProps<typeof accordionItemVariants>;

export type AccordionTriggerProps = React.ComponentPropsWithoutRef<
    typeof AccordionPrimitive.Trigger
> &
    VariantProps<typeof accordionTriggerVariants>;

export type AccordionContentProps = React.ComponentPropsWithoutRef<
    typeof AccordionPrimitive.Content
> &
    VariantProps<typeof accordionContentVariants>;
