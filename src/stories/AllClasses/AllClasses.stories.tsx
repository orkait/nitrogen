import type { Meta } from '@storybook/react';
import { JSX } from 'react/jsx-runtime';
import { getTheme } from '@/theme-generator/theme';
import styles from './AllClasses.module.scss';

function getCSSProperties(css: string) {
    const properties: string[] = [];
    // Split properties and remove empty entries
    const lines = css?.split(';').filter((line: string) => line.trim() !== '');

    lines?.forEach((line: string) => {
        const [property, value] = line.split(':').map(part => part.trim());
        properties.push(`${property}: ${value}`);
    });

    return properties;
}

const AllClasses = () => {
    let cssString = Object.values(getTheme(false)).join(" ")
    cssString = cssString.replace(/\n/g, " ").replace(/\t/g, " ")

    const mapping = cssString.split("}").map((css) => {
        const [className, cssProperties] = css.split("{").map((str) => str.trim())
        const cleanedClassName = className.slice(1, className.length).replace("\\", '');

        return {
            className: cleanedClassName,
            cssProperties: getCSSProperties(cssProperties)
        }
    })


    return (
        <>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Class Name</th>
                        <th>CSS Properties</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        mapping.map((css) => {
                            return (
                                <tr>
                                    <td>
                                        <div className='font-semibold'>
                                            {css.className}
                                        </div>
                                    </td>
                                    <td >
                                        {
                                            css.cssProperties.map((property) => {
                                                // contains color hex code 
                                                const color = property.match(/#(?:[0-9a-fA-F]{3}){1,2}/g);

                                                if (color) {
                                                    return (
                                                        <p
                                                            className='border-1 border-solid rounded-2 px-2 py-1'
                                                            style={{
                                                                backgroundColor: color[0],
                                                            }}>
                                                            <span className='bg-white'>
                                                                {property}
                                                            </span>
                                                        </p>
                                                    )
                                                } else {
                                                    return (
                                                        <p
                                                            className='border-1 border-solid rounded-2 px-2 py-1'
                                                        >
                                                            {property}
                                                        </p>
                                                    )
                                                }
                                            })
                                        }
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>

            </table>
        </>
    )
}


const meta = {
    title: '@theme/AllClasses',
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


