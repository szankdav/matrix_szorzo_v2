import { Matrix } from "../classes/matrix"
import { TerminalReader } from "../classes/terminalReader";
import { State } from "../interfaces/state";
import { Context } from "../classes/context";
import { ChooseMatrixGenerateMethodState } from "./chooseMatrixGenerateMethodState";

export class SetColumnNumberState implements State {
    private matrix: Matrix;
    private reader: TerminalReader;
    private context: Context;

    constructor(matrix: Matrix, reader: TerminalReader, context: Context) {
        this.matrix = matrix;
        this.reader = reader;
        this.context = context;
    }

    run(): void { }

    async next(): Promise<void | null> {
        const colNumber: number = await this.reader.readNumber("Kérem írja be a mátrix oszlopainak számát: ");
        this.matrix.setColumn(colNumber);
        this.context.setState(new ChooseMatrixGenerateMethodState(this.matrix, this.reader, this.context));
    }
} 