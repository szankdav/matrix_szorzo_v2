import { Context } from "../classes/context";
import { Matrix } from "../classes/matrix";
import { TerminalReader } from "../classes/terminalReader";
import { State } from "../interfaces/state";
import { SetRowNumberState } from "./setRowNumberState";

export class MultiplyTheMatricesState implements State {
    private matrix_A: Matrix;
    private matrix_B: Matrix;
    private reader: TerminalReader;
    private context: Context;
    private multipliedMatrix: Matrix;

    constructor(matrix_A: Matrix, matrix_B: Matrix, reader: TerminalReader, context: Context) {
        this.matrix_A = matrix_A,
            this.matrix_B = matrix_B,
            this.reader = reader,
            this.context = context,
            this.multipliedMatrix = new Matrix();
        this.multipliedMatrix.setRow(matrix_A.getMatrixRow());
        this.multipliedMatrix.setColumn(matrix_B.getMatrixColumn());
    }

    asyncTimeout = (ms: number) => {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        })
    }

    run(): void { }

    async next(): Promise<void | null> {
        console.log("------------------Aktuális state: A két mátrix szorzása.------------------");
        console.log("A két szorzandó mátrix:");
        console.log("'A' mátrix");
        console.log(this.matrix_A.toString());
        console.log("'B' mátrix");
        console.log(this.matrix_B.toString());
        let multipliedMatrixRow: number = this.multipliedMatrix.getMatrixRow();
        let multipliedMatrixColumn: number = this.multipliedMatrix.getMatrixColumn();
        let multipliedMatrixData: number[][] = this.multipliedMatrix.getMatrixData();
        let sum: number = 0;
        for (let i = 0; i < multipliedMatrixRow; i++) {
            for (let j = 0; j < multipliedMatrixColumn; j++) {
                for (let k = 0; k < this.matrix_A.getMatrixData()[0].length; k++) {
                    sum += this.matrix_A.getMatrixData()[i][k] * this.matrix_B.getMatrixData()[k][j];
                    process.stdout.write(`${i + 1}. sor ${k + 1}. oszlopérték: [${this.matrix_A.getMatrixData()[i][k]}] szorozva ${k + 1}. sor ${j + 1}. oszlopérték: [${this.matrix_B.getMatrixData()[k][j]}] ---> [${this.matrix_A.getMatrixData()[i][k]} * ${this.matrix_B.getMatrixData()[k][j]}]`);
                    if (k < this.matrix_A.getMatrixData()[0].length - 1) {
                        process.stdout.write(" + ");
                    }
                    else {
                        process.stdout.write(" = ");
                    }
                    await this.asyncTimeout(2000);
                }
                process.stdout.write(`${sum}\n`);
                multipliedMatrixData[i][j] = sum;
            }
        }

        console.log("\nA mátrixok szorzásval létrejött mátrix:")
        console.log(this.multipliedMatrix.toString());

        const answer = await this.reader.readLetter("Szeretne egy újabb szorzást indítani? ['i'/'n'] ");
        if (answer === "I") {
            this.matrix_A.setData([[], []]);
            this.matrix_B.setData([[], []]);
            this.context.setCurrentState(new SetRowNumberState(this.matrix_A, this.matrix_B, this.reader, this.context, "A"));
            this.context.setInitialState(new SetRowNumberState(this.matrix_A, this.matrix_B, this.reader, this.context, "A"));
        }
        else if (answer === "N") {
            this.context.setCurrentState(null);
        }
    }
}