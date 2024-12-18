import { Context } from "../classes/context";
import { Matrix } from "../classes/matrix";
import { TerminalReader } from "../classes/terminalReader";
import { State } from "../interfaces/state";
import { SetRowNumberState } from "./setRowNumberState";

export class ManualMatrixFillState implements State {
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
        console.log("------------------Aktuális state: mátrix feltöltése manuálisan.------------------");
        let generatedMatrix: number[][] = this.matrix.getMatrixData();

        for (let i = 0; i < generatedMatrix.length; i++) {
            for (let j = 0; j < generatedMatrix[i].length; j++) {
                const answer = await this.reader.readRangeOrMatrixNumber(`Kérem adja meg a(z) ${i + 1}. sor ${j + 1}, oszlopának számát:`);
                generatedMatrix[i][j] = answer;
            }
        }
        console.log("A feltöltött mátrix:")
        console.log(this.matrix.toString());
        const currentState: State = this.context.getInitialState();
        if ((currentState as SetRowNumberState).getCurrentMatrix() === "A") {
            (currentState as SetRowNumberState).setCurrentMatrix("B");
            this.context.setCurrentState(currentState);
        }
        else {
            this.context.setCurrentState(null);
        }
    }
}