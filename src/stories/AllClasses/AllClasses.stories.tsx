import type { Meta } from '@storybook/react';
import { JSX } from 'react/jsx-runtime';
import theme from '@/theme-generator/theme';

const AllClasses = () => {
    return (
        <>
            <div>
                {
                    JSON.stringify(theme, null, 2)
                }
            </div>
        </>
    )
}


const meta = {
    title: '@components/AllClasses',
    component: AllClasses,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof AllClasses>;

export default meta;

export const Default = {
    argTypes: {},
    render: (args: JSX.IntrinsicAttributes) => (
        <AllClasses
            {...args}
        >
            Hello World
        </AllClasses>
    )
};


