import { Context } from "./core/context";
import { TerminalReader } from "./core/terminalReader";
import { StartState } from "./states/start.state";

const context = new Context();
const reader = new TerminalReader();
const startState = new StartState(context, reader);
context.setCurrentState(startState);

(async function main() {
    do {
        await context.next();
    } while (context.getCurrentState() !== null)
    
    console.log("A program kilép!");
    process.exit(0);
})();