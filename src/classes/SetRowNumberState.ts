import { MatrixState } from "../states/MatrixState";
import { Matrix } from "./Matrix";
import { TerminalReader } from "./readFromCLI";
import { SetColumnNumberState } from "./SetColumnNumberState";

export class SetRowNumberState implements MatrixState {
    private matrix: Matrix;
    private reader: TerminalReader;

    constructor(matrix: Matrix, reader: TerminalReader) {
        this.matrix = matrix;
        this.reader = reader;
    }

    setNumberForRow(): Promise<void | null> {
        return new Promise((resolve) => {
            this.reader.rl.question("Kérem írja be a mátrix sorainak számát: ", (answer) => {
                const num = parseInt(answer);
                if (answer.split(" ").length > 1) {
                    console.log("Csak egy számot adhat meg!");
                    resolve(null)
                } else if (num <= 0) {
                    console.log("Csak pozitív számokat adhat meg!");
                    resolve(null)
                } else if (isNaN(num)) {
                    console.log("Csak számokat adhat meg!");
                    resolve(null)
                } else {
                    this.matrix.row = num;
                    this.matrix.setState(new SetColumnNumberState(this.matrix, this.reader))
                    resolve();
                }
            })
        })
    }
    setNumberForColumn(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    createTheMatrix(): number[][] {
        throw new Error("Method not implemented.");
    }

}