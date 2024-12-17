import { Context } from "vm";
import { Matrix } from "../classes/matrix";
import { TerminalReader } from "../classes/terminalReader";
import { State } from "../interfaces/state";
import { SetRowNumberState } from "./setRowNumberState";

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
            this.context.setCurrentState(currentState);
        }
        else{
            this.context.setCurrentState(null);
        }
    }

}