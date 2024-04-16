import type { Meta, StoryObj } from '@storybook/react';
import Button from '../../components/Button/Button';

const meta = {
    title: '@components/Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Default: Story = {
    argTypes: {
        theme: {
            options: ['primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error', 'ghost', 'link'],
            control: { type: 'select' },
        },
        text: {
            control: { type: 'text' },
            defaultValue: 'Default Button',
        },
        size: {
            options: ['xs', 'sm', 'md', 'lg'],
            control: { type: 'select' },
        },
        block: {
            control: { type: 'boolean' },
        },
        disabled: {
            control: { type: 'boolean' },
        },
        outline: {
            control: { type: 'boolean' },
        },
        rounded: {
            control: { type: 'boolean' },
        },
        shadow: {
            control: { type: 'boolean' },
        },
        loading: {
            control: { type: 'boolean' },
        },

    },
    render: (args) => (
        <Button
            {...args}
            onClick={() => alert("Default Button Clicked")}
        />
    )
};


