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
       
    },
    render: (args: JSX.IntrinsicAttributes & ButtonProps) => (
        <Button
            {...args}
        >
            Hello World
        </Button>
    )
};


