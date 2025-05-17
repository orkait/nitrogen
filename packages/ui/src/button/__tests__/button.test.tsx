// ExampleComponent.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import Button, { defaultValues } from '../button';
import '@testing-library/jest-dom'
import { intentEnum, sizeEnum, paddingXEnum, iconPositionEnum, ButtonProps } from '../button.types';
import { BrushIcon } from 'lucide-react';
import buttonCVA from '../button.cva';
import { twMerge } from 'tailwind-merge';

const allProps: ButtonProps = {
    ...defaultValues,
    dataTestId: 'test',
}


describe("Button UI Tests", () => {
    // check if the component renders without crashing
    test("renders with default props", () => {
        render(<Button>Click Me 123</Button>);

        expect(screen.queryByText("Click Me 123")).toBeInTheDocument();
        expect(screen.queryByText("Click Me 1234")).not.toBeInTheDocument();
    });

    // check if the component renders with all props
    test("renders with all props", () => {
        render((
            <Button {...allProps}>
                Button Text
            </Button>
        ));
        expect(screen.queryByText("Button Text")).toBeInTheDocument();
    })

    // check if the component renders with dataTestId
    test("renders with dataTestId", () => {
        render((
            <Button {...allProps}>
                Button Text
            </Button>
        ));

        const dtiString = `button-${allProps.dataTestId}`;
        expect(screen.queryByTestId(dtiString)).toBeInTheDocument();
    })
})


describe("Button Props Tests", () => {
    // check if the component renders with some icon
    test("renders with icon", () => {
        render((
            <Button icon={BrushIcon}>
                Button Text
            </Button>
        ));

        const dtiString = `button-icon-left`;
        expect(screen.queryByTestId(dtiString)).toBeInTheDocument();
    })

    // check if the component renders with iconPosition
    test("renders with iconPosition", () => {
        render((
            <Button icon={BrushIcon} iconPosition={iconPositionEnum.right}>
                Button Text
            </Button>
        ));
        const dtiString = `button-icon-right`;
        expect(screen.queryByTestId(dtiString)).toBeInTheDocument();
    })

    // check if the component renders with loading
    test("renders with loading", () => {
        render((
            <Button loading>
                Button Text
            </Button>
        ));

        const dtiString = `button-icon-loader`;
        expect(screen.queryByTestId(dtiString)).toBeInTheDocument();
    })

    // check if the component renders with disabled
    test("renders with disabled", () => {
        render((
            <Button disabled>
                Button Text
            </Button>
        ));

        expect(screen.queryByText("Button Text")).toBeDisabled();
    })

    // check if the component renders with outline
    test("renders with outline", () => {
        render((
            <Button {...allProps} outline>
                Button Text
            </Button>
        ));

        const cva = twMerge(buttonCVA.check({
            ...allProps,
            outline: true,
        }))

        const buttonClasses = screen.getByTestId('button-test').className.split(' ').sort();
        const cvaClasses = cva.split(' ').sort();
        expect(buttonClasses).toEqual(cvaClasses);
    })

    // check if the component renders with hasFullWidth
    test("renders with hasFullWidth", () => {
        render((
            <Button {...allProps} hasFullWidth>
                Button Text
            </Button>
        ));

        const buttonClasses = screen.getByTestId('button-test').className.includes('w-full');
        expect(buttonClasses).toBeTruthy();
    })

    // check if the component renders with size
    test("renders with size", () => {
        render((
            <Button {...allProps} size={sizeEnum.lg}>
                Button Text
            </Button>
        ));

        const cva = twMerge(buttonCVA.check({
            ...allProps,
            size: sizeEnum.lg,
        }))

        const buttonClasses = screen.getByTestId('button-test').className.split(' ').sort();
        const cvaClasses = cva.split(' ').sort();
        expect(buttonClasses).toEqual(cvaClasses);
    })

    // check if the component renders with intent
    test("renders with intent", () => {
        render((
            <Button {...allProps} intent={intentEnum.secondary}>
                Button Text
            </Button>
        ));

        const cva = twMerge(buttonCVA.check({
            ...allProps,
            intent: intentEnum.secondary,
        }))

        const buttonClasses = screen.getByTestId('button-test').className.split(' ').sort();
        const cvaClasses = cva.split(' ').sort();
        expect(buttonClasses).toEqual(cvaClasses);
    })
});