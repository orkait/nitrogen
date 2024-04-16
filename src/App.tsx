import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/Accordion/Accordion"
import "./main.css";


function App() {
    return (
        <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
                <AccordionTrigger>
                    Hello World
                </AccordionTrigger>
                <AccordionContent>
                    123
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}

export default App
