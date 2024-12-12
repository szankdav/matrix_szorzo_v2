import { MatrixState } from "./matrixState";
import { InputValidate } from "../classes/inputValidate";
import { ManualMatrixFillState } from "./manualMatrixFillState";
import { Matrix } from "../classes/matrix";
import { RandomWithRangeMatrixFill } from "./randomWithRangeMatrixFillState";
import { TerminalReader } from "../classes/terminalReader";

export class ChooseMatrixGenerateMethodState implements MatrixState {
    private matrix: Matrix;

    constructor(matrix: Matrix) {
        this.matrix = matrix;
    }

    setNumberForRow(reader: TerminalReader): Promise<void> {
        throw new Error("Method not implemented.");
    }

    setNumberForColumn(reader: TerminalReader): Promise<void> {
        throw new Error("Method not implemented.");
    }

    chooseMatrixGenerateMethod(reader: TerminalReader): Promise<void> {
        return new Promise((resolve) => {
            let validateResult: boolean;
            reader.rl.question("Szeretné manuálisan feltölteni a mátrixot számokkal? (Amennyiben nem, egy megadott számtartományon belüli véletlenszerű számokkal lesz feltöltve.) ['i'/'n']: ", async (answer) => {
                const validator = new InputValidate();
                validateResult = validator.validateAsIOrN(answer);
                if (validateResult === false) {
                    resolve(this.chooseMatrixGenerateMethod(reader));
                }
                else if (answer.toUpperCase() === 'N') {
                    const generatedMatrix = Array.from({ length: this.matrix.getMatrixRow() }, () => new Array(this.matrix.getMatrixColumn()).fill(0));
                    this.matrix.setData(generatedMatrix);
                    console.log("State átállítva: mátrix feltöltése véletlenszerű számokkal.");
                    this.matrix.setState(new RandomWithRangeMatrixFill());
                    resolve();
                }
                else {
                    const generatedMatrix = Array.from({ length: this.matrix.getMatrixRow() }, () => new Array(this.matrix.getMatrixColumn()).fill(0));
                    this.matrix.setData(generatedMatrix);
                    console.log("State átállítva: mátrix feltöltése manuálisan.");
                    this.matrix.setState(new ManualMatrixFillState(this.matrix));
                    resolve(await this.matrix.manualMatrixFill(reader));
                }
            })
        })
    }

    randomWithRangeMatrixFill(reader: TerminalReader): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
    manualMatrixFill(reader: TerminalReader): Promise<void> {
        throw new Error("Method not implemented.");
    }
}