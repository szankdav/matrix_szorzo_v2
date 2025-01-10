import { Context } from "./core/context";
import { Matrix } from "./core/matrix";
import { TerminalReader } from "./core/terminalReader";
import { EndState } from "./states/end.state";
import { StartState } from "./states/start.state";

const matrix_A = new Matrix();
const matrix_B = new Matrix();
const context = new Context(matrix_A, matrix_B);
const reader = new TerminalReader();
const startState = new StartState(context, reader);
context.setCurrentState(startState);

(async function main() {
    do {
        await context.next();
    } while (true)
})();