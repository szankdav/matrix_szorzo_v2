import { Context } from "./classes/context";
import { Matrix } from "./classes/matrix";
import { TerminalReader } from "./classes/terminalReader";
import { SetRowNumberState } from "./states/setRowNumberState";

const matrix = new Matrix();
const context = new Context();
const reader = new TerminalReader();
const initialState = new SetRowNumberState(matrix, reader, context);
context.setState(initialState);

(async function main() {
    do {
        context.run();
        await context.next();
    } while (context.getState() !== null)

    console.log("A program kilép!");
    process.exit(0);
})();