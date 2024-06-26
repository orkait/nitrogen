import type { Meta } from '@storybook/react';
import Badge, { BadgeProps } from '../../components/Badge/Badge';
import { JSX } from 'react/jsx-runtime';

const meta = {
    title: '@components/Badge',
    component: Badge,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Badge>;

export default meta;

export const Default = {
    argTypes: {


    },
    render: (args: JSX.IntrinsicAttributes & BadgeProps) => (
        <Badge
            {...args}
        >
            Hello World
        </Badge>
    )
};


