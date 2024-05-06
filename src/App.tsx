import { Button } from "./components"
import { buttonSizeType } from "./components/Button/Button";
import magicClasses from "./theme-generator/magic";
import "./theme-generator/theme.css";

function App() {
    return (
        <div>
            <div >
                {
                    ['xs', 'sm', 'md', 'lg'].map((size) => {
                        return (
                            <Button
                                onClick={() => console.log('clicked')}
                                className={magicClasses('m-4 border-solid border-3 border-bottom-dashed rounded-5')}
                                theme={"primary"}
                                disabled={false}
                                outline={false}
                                rounded={false}
                                shadow={false}
                                loading={false}
                                text={""}
                                testingName={""}
                                size={size as buttonSizeType}
                                block={false}
                            >
                                Hello world
                            </Button>
                        )
                    })
                }
            </div>

            <div style={{
                display: 'flex',
            }}>
                <Button
                    onClick={() => console.log('clicked')}
                    className={magicClasses('m-4 border-solid border-3 border-bottom-dashed rounded-5')}
                    theme={"primary"}
                    size={"md"}
                    block={true}
                    disabled={false}
                    outline={true}
                    rounded={false}
                    shadow={false}
                    loading={false}
                    text={""}
                    testingName={""}
                >
                    Hello world
                </Button>

            </div>

        </div>
    )
}

export default App
