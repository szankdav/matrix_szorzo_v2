import { Context } from "../classes/context";
import { Matrix } from "../classes/matrix";
import { TerminalReader } from "../classes/terminalReader";
import { State } from "../interfaces/state";
import { SetColumnNumberState } from "./setColumnNumberState";

export class SetRowNumberState implements State {
    private matrix_A: Matrix;
    private matrix_B: Matrix;
    private reader: TerminalReader;
    private context: Context;
    private currentMatrix: string;

    constructor(matrix_A: Matrix, matrix_B: Matrix, reader: TerminalReader, context: Context, currentMatrix: string) {
        this.matrix_A = matrix_A;
        this.matrix_B = matrix_B;
        this.reader = reader;
        this.context = context;
        this.currentMatrix = currentMatrix;
    }

    run(): void { };

    async next(): Promise<void | null> {
        if (this.currentMatrix === "A") {
            console.log("'A' mátrix:")
            const rowNumber: number = await this.reader.readRowOrColNumber("Kérem írja be a mátrix sorainak számát: ");
            this.matrix_A.setRow(rowNumber);
            this.context.setCurrentState(new SetColumnNumberState(this.matrix_A, this.reader, this.context));
        }
        else if (this.currentMatrix === "B") {
            console.log("'B' mátrix:")
            let rowNumber: number = await this.reader.readRowOrColNumber("Kérem írja be a mátrix sorainak számát: ");
            if(rowNumber !== this.matrix_A.getMatrixColumn()){
                console.log("Hiba! Két mátrix szorzásához az 'A' mátrix oszlopainak száma meg kell, hogy egyezzen a 'B' mátrix sorainak számával!");
                await this.next();
            }
            this.matrix_B.setRow(rowNumber);
            this.context.setCurrentState(new SetColumnNumberState(this.matrix_B, this.reader, this.context));
        }
    }

    public setCurrentMatrix(currentMatrix: string) {
        this.currentMatrix = currentMatrix;
    }

    public getCurrentMatrix() {
        return this.currentMatrix;
    }
}