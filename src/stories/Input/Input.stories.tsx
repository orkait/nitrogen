import type { Meta } from '@storybook/react';
import Input, { InputProps } from '../../components/Input/Input';
import { JSX } from 'react/jsx-runtime';

const meta = {
    title: '@components/Input',
    component: Input,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Input>;

export default meta;

export const Default = {
    argTypes: {

    },
    render: (args: JSX.IntrinsicAttributes & InputProps) => (
        <Input
            {...args}
        />
    )
};


