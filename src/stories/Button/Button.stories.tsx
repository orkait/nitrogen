import type { Meta } from '@storybook/react';
import Button, { ButtonProps } from '../../components/Button/Button';
import { JSX } from 'react/jsx-runtime';

const meta = {
    title: '@components/Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;

export const Default = {
    argTypes: {
        theme: {
            options: ['primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error', 'ghost', 'link', 'none'],
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
        hasRawStyling: {
            control: { type: 'boolean' },
        }
    },
    render: (args: JSX.IntrinsicAttributes & ButtonProps) => (
        <Button
            {...args}
        >
            Hello World
        </Button>
    )
};


