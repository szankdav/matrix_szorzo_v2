import { MatrixState } from "../states/matrixState";
import { InputValidate } from "./inputValidate";
import { Matrix } from "./matrix";
import { TerminalReader } from "./terminalReader";
import { SetColumnNumberState } from "./setColumnNumberState";

export class SetRowNumberState implements MatrixState {
    private matrix: Matrix;

    constructor(matrix: Matrix) {
        this.matrix = matrix;
    }

    // Feltesszuk a kerdest, majd az inputot validaljuk. Ha nem jo az input, rekurzivan ujrahivjuk a fuggvenyt
    //Ha a validalas sikeres, akkor a matrixnak beallitjuk a sort, majd a matrix allapotat modositjuk az oszlopok beolvasasa allapotra
    setNumberForRow(reader: TerminalReader): Promise<void> {
        return new Promise((resolve) => {
            let validateResult: number | null;
            reader.rl.question("Kérem írja be a mátrix sorainak számát: ", (answer) => {
                const validator = new InputValidate();
                validateResult = validator.validateAsNumber(answer);
                if (validateResult == null) {
                    resolve(this.setNumberForRow(reader));
                }
                else {
                    this.matrix.row = validateResult;
                    this.matrix.setState(new SetColumnNumberState(this.matrix))
                    resolve();
                }
            })
        })
    }

    setNumberForColumn(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    setRangeForMatrix(reader: TerminalReader): Promise<void> {
        throw new Error("Method not implemented.");
    }

    generateMatrix(): void {
        throw new Error("Method not implemented.");
    }

}