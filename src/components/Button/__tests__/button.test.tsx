import Button, { ButtonProps } from "../Button";
import { render, screen } from '@testing-library/react'

const allProps: ButtonProps = {
    theme: 'primary',
    size: 'md',
    disabled: false,
    outline: false,
    rounded: false,
    shadow: false,
    loading: false,
    icon: 'none',
    iconPosition: 'left',
    responsive: 'none',
    className: '',
    style: {},
    text: 'button',
    onClick: () => { },
    block: false,
    testingName: 'my-button',
}


describe('App', () => {
    it('renders the App component', () => {
        render(<Button {...allProps} />)
        screen.debug()
    })

    it("renders the button text", async () => {
        const { container } = render(
            <Button
                {...allProps}
                text="button-x"
            />
        )
        expect(container.textContent).toBe("button-x")
    })

    it.only("renders the button with outline", async () => {
        const { container } = render(
            <Button
                {...allProps}
                text="button-x"
                outline
            />
        )
        const button = container.querySelector('button')
        expect(button?.className).toContain('btn-outline')
    })
})