import type { Meta } from '@storybook/react';
import SingleAccordion from './SingleAccordion';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: '@components/Accordion',
    component: SingleAccordion,
    parameters: {},
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
    },
} satisfies Meta<typeof SingleAccordion>;
export default meta;


export const Single = {
    args: {
        type: "single",
        collapsible: true,
    },
    render: () => <SingleAccordion />,
}