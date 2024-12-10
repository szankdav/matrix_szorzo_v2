import { MatrixState } from "../states/MatrixState";
import { Matrix } from "./Matrix";
import { SetRowNumberState } from "./SetRowNumberState";
import { TerminalReader } from "./readFromCLI";

export class SetColumnNumberState implements MatrixState {
    private matrix: Matrix;
    private reader: TerminalReader;

    constructor(matrix: Matrix, reader: TerminalReader) {
        this.matrix = matrix;
        this.reader = reader;
    }
    
    setNumberForRow(): Promise<void | null> {
        throw new Error("Method not implemented.");
    }
    setNumberForColumn(): Promise<void> {
        return new Promise((resolve) => {
            this.reader.rl.question("Kérem írja be a mátrix oszlopainak számát: ", (answer) => {
                const num = parseInt(answer);
                if (answer.split(" ").length > 1) {
                    console.log("Csak egy számot adhat meg!");
                    this.setNumberForColumn();
                } else if (num <= 0) {
                    console.log("Csak pozitív számokat adhat meg!");
                    this.setNumberForColumn();
                } else if (isNaN(num)) {
                    console.log("Csak számokat adhat meg!");
                    this.setNumberForColumn();
                } else {
                    this.matrix.column = num;
                    resolve();
                }
            })
        })
    }
    createTheMatrix(): number[][] {
        throw new Error("Method not implemented.");
    }
   
} 