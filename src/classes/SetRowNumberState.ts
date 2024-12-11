import { MatrixState } from "../states/matrixState";
import { InputValidate } from "./inputValidate";
import { Matrix } from "./matrix";
import { TerminalReader } from "./readFromCLI";
import { SetColumnNumberState } from "./setColumnNumberState";

export class SetRowNumberState implements MatrixState {
    private matrix: Matrix;
    private reader: TerminalReader;

    constructor(matrix: Matrix, reader: TerminalReader) {
        this.matrix = matrix;
        this.reader = reader;
    }

    // Feltesszuk a kerdest, majd az inputot validaljuk. Ha nem jo az input, rekurzivan ujrahivjuk a fuggvenyt
    //Ha a validalas sikeres, akkor a matrixnak beallitjuk a sort, majd a matrix allapotat modositjuk az oszlopok beolvasasa allapotra
    setNumberForRow(): Promise<void | null> {
        return new Promise((resolve) => {
            let validateResult: number | null;
            this.reader.rl.question("Kérem írja be a mátrix sorainak számát: ", (answer) => {
                const validator = new InputValidate(answer);
                validateResult = validator.validateAsNumber();
                if (validateResult == null) {
                    resolve(this.setNumberForRow());
                }
                else {
                    this.matrix.row = validateResult;
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