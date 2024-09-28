import type { Meta, StoryObj } from "@storybook/react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@repo/ui/accordion";

const meta: Meta<typeof Accordion> = {
    component: Accordion,
    args: {
        collapsible: true,
        className: "",
        variant: "default",
        type: "single",
        disabled: false,
    },
    argTypes: {
        variant: {
            control: { type: "select" },
            options: ["compact", "default"],
        },
        type: {
            control: { type: "select" },
            options: ["single", "multiple"],
        },
    },
};

export default meta;

type Story = StoryObj<typeof Accordion>;

export const DefaultStory: Story = {
    render: (props) => (
        <Accordion {...props} >
            <AccordionItem value="item-1">
                <AccordionTrigger
                    className="AccordionTrigger "
                >
                    Is it accessible?
                </AccordionTrigger>
                <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger>
                    Is it styled?
                </AccordionTrigger>
                <AccordionContent>
                    Yes. It comes with default styles that matches the other components&apos; aesthetic.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" hasBorder={false} >
                <AccordionTrigger hasIcon={false}>
                    Is it animated?
                </AccordionTrigger>
                <AccordionContent>
                    Yes. It&apos;s animated by default, but you can disable it if you prefer.
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    ),
    args: {

    },
};


export const MultipleOpenAccordion: Story = {
    render: (props) => (
        <Accordion type="multiple" >
            <AccordionItem value="item-1">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger>Is it styled?</AccordionTrigger>
                <AccordionContent>
                    Yes. It comes with default styles that matches the other components&apos; aesthetic.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
                <AccordionTrigger>Is it animated?</AccordionTrigger>
                <AccordionContent>
                    Yes. It&apos;s animated by default, but you can disable it if you prefer.
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    ),
    args: {

    },
}

export const CompactAccordion: Story = {
    render: (props) => (
        <Accordion variant="compact" type="single" >
            <AccordionItem value="item-1">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger>Is it styled?</AccordionTrigger>
                <AccordionContent>
                    Yes. It comes with default styles that matches the other components&apos; aesthetic.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
                <AccordionTrigger>Is it animated?</AccordionTrigger>
                <AccordionContent>
                    Yes. It&apos;s animated by default, but you can disable it if you prefer.
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    ),
    args: {

    },
}
