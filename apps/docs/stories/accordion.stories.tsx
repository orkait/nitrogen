import type { Meta, StoryObj } from "@storybook/react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@repo/ui/accordion";

const meta: Meta<typeof Accordion> = {
    component: Accordion,
    argTypes: {

    },
};

export default meta;

type Story = StoryObj<typeof Accordion>;

export const DefaultStory: Story = {
    render: (props) => (
        <Accordion
            variant="compact" type="single" collapsible className="w-full max-w-md mx-auto">
            <AccordionItem value="item-1">
                <AccordionTrigger
                    className="AccordionTrigger"
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
            <AccordionItem value="item-3">
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


export const MultipleAccordion: Story = {
    render: (props) => (
        <Accordion variant="compact" type="multiple" className="w-full max-w-md mx-auto">
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