import { Matrix } from "../classes/matrix";
import { TerminalReader } from "../classes/terminalReader";
import { State } from "../interfaces/state";
import { SetRowNumberState } from "./setRowNumberState";
import { MultiplyTheMatricesState } from "./multiplyTheMatricesState";
import { Context } from "../classes/context";

export class RandomWithRangeMatrixFill implements State {
    private matrix: Matrix;
    private reader: TerminalReader;
    private context: Context;

    constructor(matrix: Matrix, reader: TerminalReader, context: Context) {
        this.matrix = matrix;
        this.reader = reader;
        this.context = context;
    }


    run(): void {

    }
    async next(): Promise<void | null> {
        console.log("------------------Aktuális state: mátrix feltöltése véletlenszerű számokkal.------------------");
        let generatedMatrix = this.matrix.getMatrixData();
        const lowerRange = await this.reader.readRangeOrMatrixNumber("Kérem adja meg a generálandó számok alsó határértékét: ");
        const upperRange = await this.reader.readRangeOrMatrixNumber("Kérem adja meg a generálandó számok felső határértékét: ");
        for (let i = 0; i < generatedMatrix.length; i++) {
            for (let j = 0; j < generatedMatrix[i].length; j++) {
                generatedMatrix[i][j] = Math.floor(Math.random() * (upperRange - lowerRange + 1) + lowerRange);
            }
        }
        console.log("A feltöltött mátrix:")
        console.log(this.matrix.toString());
        const currentState: State = this.context.getInitialState();
        if((currentState as SetRowNumberState).getCurrentMatrix() === "A"){
            (currentState as SetRowNumberState).setCurrentMatrix("B");
            console.log("------------------State átállítva: 'B' mátrix sorszámának bekérése.------------------")
            this.context.setCurrentState(currentState);
        }
        else{
            const matrix_A = (currentState as SetRowNumberState).getMatrixA();
            const matrix_B = (currentState as SetRowNumberState).getMatrixB();
            console.log("------------------State átállítva: A két mátrix szorzása.------------------")
            this.context.setCurrentState(new MultiplyTheMatricesState(matrix_A, matrix_B, this.reader, this.context));
        }
    }

}