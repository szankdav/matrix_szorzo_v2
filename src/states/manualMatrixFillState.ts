import { Context } from "../classes/context";
import { InputValidate } from "../classes/inputValidate";
import { Matrix } from "../classes/matrix";
import { TerminalReader } from "../classes/terminalReader";
import { State } from "../interfaces/state";

export class ManualMatrixFillState implements State {
    private matrix: Matrix;
    private reader: TerminalReader;
    private context: Context;

    constructor(matrix: Matrix, context: Context) {
        this.matrix = matrix;
        this.reader = new TerminalReader();
        this.context = context;
    }

    run(): void { }
    async next(): Promise<void | null> {
        let generatedMatrix: number[][] = this.matrix.getMatrixData();
        for (let i = 0; i < generatedMatrix.length; i++) {
            for (let j = 0; j < generatedMatrix[i].length; j++) {
                const answer = await this.reader.readNumber(`Kérem adja meg a(z) ${i + 1}. sor ${j + 1}, oszlopának számát:`);
                generatedMatrix[i][j] = answer;
            }
        }
        this.context.setState(null);
    }
}