import { Button } from "./components"
import "./theme-generator/theme.css";

function App() {
    return (
        <div>
            <Button
                onClick={() => console.log('clicked')}
                className="bg-cyan-500 border-solid border-3 border-bottom-dashed rounded-5"
                theme={"primary"}
                size={"xs"}
                block={false}
                disabled={false}
                outline={false}
                rounded={false}
                shadow={false}
                loading={false}
                iconPosition={"left"}
                responsive={"block"}
                text={""}
                testingName={""}
            >
                Hello world
            </Button>
        </div>
    )
}

export default App
