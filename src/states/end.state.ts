import { Context } from "../core/context";
import { TerminalReader } from "../core/terminalReader";
import { State } from "../interfaces/state";

export class EndState implements State {
    private context: Context;
    private terminalReader: TerminalReader;

    constructor(context: Context, terminalReader: TerminalReader) {
        this.context = context;
        this.terminalReader = terminalReader;
    }

    async next(): Promise<void | null> {
        this.context.setCurrentState(null);
        this.terminalReader.displayText("A program kilép!");
        process.exit(0);
    }
}