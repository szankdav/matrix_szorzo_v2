import { MatrixState } from "../states/matrixState";
import { Matrix } from "./matrix";
import { TerminalReader } from "./terminalReader";

export class GenerateMatrixState implements MatrixState{
    private matrix: Matrix;

    constructor(matrix: Matrix){
        this.matrix = matrix;
    }

    setNumberForRow(reader: TerminalReader): Promise<void> {
        throw new Error("Method not implemented.");
    }

    setNumberForColumn(reader: TerminalReader): Promise<void> {
        throw new Error("Method not implemented.");
    }

    setRangeForMatrix(reader: TerminalReader): Promise<void> {
        throw new Error("Method not implemented.");
    }

    generateMatrix(): void {
        this.matrix.data = Array.from({length: this.matrix.row}, () => new Array(this.matrix.column).fill(0))
    }
    
}