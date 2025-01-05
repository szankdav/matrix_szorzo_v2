import { Context } from "../core/context";
import { TerminalReader } from "../core/terminalReader";
import { State } from "../interfaces/state";
import { MultiplyTheMatricesState } from "./multiplyTheMatrices.state";

const MATRIX_MSG = "------------------'B' mátrix------------------";

export class AutomateMatrixBState implements State {
    private context: Context;
    private terminalReader: TerminalReader;

    constructor(context: Context, terminalReader: TerminalReader) {
        this.context = context;
        this.terminalReader = terminalReader;
    }

    async next(): Promise<void | null> {
        this.terminalReader.displayText(MATRIX_MSG);
        do {
            this.context.getMatrixB().createRandomMatrix();
        } while (this.context.getMatrixA().getMatrixColumn() !== this.context.getMatrixB().getMatrixRow());
        this.context.getMatrixB().toString();
        this.context.setCurrentState(new MultiplyTheMatricesState(this.context, this.terminalReader));
    }
}