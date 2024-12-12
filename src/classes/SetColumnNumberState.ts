import { MatrixState } from "../states/matrixState";
import { ChooseMatrixGenerateMethodState } from "./chooseMatrixGenerateMethodState";
import { InputValidate } from "./inputValidate";
import { Matrix } from "./matrix"
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
    //Ha a validalas sikeres, akkor a matrixnak beallitjuk a sort, majd a matrix allapotat modositjuk a matrix letrehozasa allapotra
    setNumberForColumn(reader: TerminalReader): Promise<void> {
        return new Promise((resolve) => {
            let validateResult: number | null;
            reader.rl.question("Kérem írja be a mátrix oszlopainak számát: ", (answer) => {
                const validator = new InputValidate();
                validateResult = validator.validateAsNumber(answer);
                if (validateResult == null) {
                    resolve(this.setNumberForColumn(reader));
                }
                else {
                    this.matrix.setColumn(validateResult);
                    console.log("State átállítva: mátrix létrehozása a megadott sorok és oszlopok számával.")
                    this.matrix.setState(new ChooseMatrixGenerateMethodState(this.matrix));
                    resolve();
                }
            })
        })
    }

    chooseMatrixGenerateMethod(reader: TerminalReader): Promise<void> {
        throw new Error("Method not implemented.");
    }

    randomWithRangeMatrixFill(reader: TerminalReader): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
    manualMatrixFill(reader: TerminalReader): Promise<void> {
        throw new Error("Method not implemented.");
    }
} 