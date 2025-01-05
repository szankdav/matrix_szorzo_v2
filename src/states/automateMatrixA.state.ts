import { Context } from "../core/context";
import { TerminalReader } from "../core/terminalReader";
import { State } from "../interfaces/state";
import { AutomateMatrixBState } from "./automateMatrixB.state";

const MATRIX_MSG = "------------------'A' mátrix------------------";

export class AutomateMatrixAState implements State {
    private context: Context;
    private terminalReader: TerminalReader;

    constructor(context: Context, terminalReader: TerminalReader) {
        this.context = context;
        this.terminalReader = terminalReader;
    }

    async next(): Promise<void | null> {
        this.terminalReader.displayText(MATRIX_MSG);
        this.context.getMatrixA().createRandomMatrix();
        this.context.getMatrixA().toString();
        this.context.setCurrentState(new AutomateMatrixBState(this.context, this.terminalReader));
    }
}