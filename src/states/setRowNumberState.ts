import { Context } from "../classes/context";
import { Matrix } from "../classes/matrix";
import { TerminalReader } from "../classes/terminalReader";
import { State } from "../interfaces/state";
import { SetColumnNumberState } from "./setColumnNumberState";

export class SetRowNumberState implements State {
    private matrix: Matrix;
    private reader: TerminalReader;
    private context: Context;

    constructor(matrix: Matrix, context: Context) {
        this.matrix = matrix;
        this.reader = new TerminalReader();
        this.context = context;
    }

    run(): void { };

    async next(): Promise<void | null> {
        const rowNumber: number = await this.reader.readNumber("Kérem írja be a mátrix sorainak számát: ");
        this.matrix.setRow(rowNumber);
        this.context.setState(new SetColumnNumberState(this.matrix, this.context));
    }
}