import { Context } from "./classes/context";
import { Matrix } from "./classes/matrix";
import { TerminalReader } from "./classes/terminalReader";
import { SetRowNumberState } from "./states/setRowNumberState";

const matrix_A = new Matrix()
const matrix_B = new Matrix();
const context = new Context();
const reader = new TerminalReader();
const initialState = new SetRowNumberState(matrix_A, matrix_B, reader, context, "A");
context.setInitialState(initialState);
context.setCurrentState(initialState);

(async function main() {
    console.log("------------------Mátrixok szorzásának bemutatása------------------\n")

    do {
        context.run();
        await context.next();
    } while (context.getCurrentState() !== null)
    
    console.log("A program kilép!");
    process.exit(0);
})();