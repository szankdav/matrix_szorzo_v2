import { MatrixState } from "../states/matrixState";
import { InputValidate } from "./inputValidate";
import { Matrix } from "./matrix";
import { SetRowNumberState } from "./setRowNumberState";
import { TerminalReader } from "./terminalReader";

export class SetColumnNumberState implements MatrixState {
    private matrix: Matrix;

    constructor(matrix: Matrix) {
        this.matrix = matrix;
    }

    setNumberForRow(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    // Feltesszuk a kerdest, majd az inputot validaljuk. Ha nem jo az input, rekurzivan ujrahivjuk a fuggvenyt
    //Ha a validalas sikeres, akkor a matrixnak beallitjuk a sort, majd a matrix allapotat modositjuk a tartomany bekerese allapotra
    setNumberForColumn(reader: TerminalReader): Promise<void> {
        return new Promise((resolve) => {
            let validateResult: number | null;
            reader.rl.question("Kérem írja be a mátrix oszlopainak számát: ", (answer) => {
                const validator = new InputValidate(answer);
                validateResult = validator.validateAsNumber();
                if (validateResult == null) {
                    resolve(this.setNumberForColumn(reader));
                }
                else {
                    this.matrix.column = validateResult;
                    resolve();
                }
            })
        })
    }
    createTheMatrix(): number[][] {
        throw new Error("Method not implemented.");
    }

} 