import { MatrixState } from "./matrixState";
import { InputValidate } from "../classes/inputValidate";
import { Matrix } from "../classes/matrix";
import { TerminalReader } from "../classes/terminalReader";

export class ManualMatrixFillState implements MatrixState {
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
        throw new Error("Method not implemented.");
    }

    randomWithRangeMatrixFill(reader: TerminalReader): Promise<void> {
        throw new Error("Method not implemented.");
    }

    manualMatrixFill(reader: TerminalReader): Promise<void> {
        return new Promise(async (resolve) => {
            let validateResult: number | null;
            let validator = new InputValidate();
            let generatedMatrix: number[][] = this.matrix.getMatrixData();
            for (let i = 0; i < generatedMatrix.length; i++) {
                for (let j = 0; j < generatedMatrix[i].length; j++) {
                    const answer = await new Promise<string>((resolve) => {
                        reader.rl.question(`Kérem adja meg a(z) ${i + 1}. sor ${j + 1}, oszlopának számát:`, (resolve))
                    })
                    validateResult = validator.validateAsNumber(answer)
                    if (validateResult === null) {
                        j--;
                        continue;
                    } else {
                        generatedMatrix[i][j] = parseInt(answer);
                    }
                }
            }
            this.matrix.setData(generatedMatrix);
            resolve();
        })
    }

}