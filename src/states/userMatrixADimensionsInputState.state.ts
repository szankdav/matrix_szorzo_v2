import { Context } from "../core/context";
import { validateAsNaturalNumber } from "../core/inputValidate";
import { TerminalReader } from "../core/terminalReader";
import { State } from "../interfaces/state";

const ROW_QSTN = "Kérem írja be a létrehozni kívánt mátrix első dimenziójának, azaz sorainak számát: ";
const COL_QSTN = "Kérem írja be a létrehozni kívánt mátrix második dimenziójának, azaz oszlopainak számát: ";

export class UserMatrixADimensionsInputState implements State {
    private context: Context;
    private terminalReader: TerminalReader;

    constructor(context: Context, terminalReader: TerminalReader) {
        this.context = context;
        this.terminalReader = terminalReader;
    }

    async next(): Promise<void | null> {
        let matrixRow = await this.terminalReader.askQuestion(ROW_QSTN);
        while(!validateAsNaturalNumber(matrixRow)){
            matrixRow = await this.terminalReader.askQuestion(ROW_QSTN);
        }
        this.context.getMatrixA().setRow(parseInt(matrixRow));
        this.terminalReader.displayText(`Az első dimenzió mérete, azaz a sorok száma: ${matrixRow}`);

        let matrixCol = await this.terminalReader.askQuestion(COL_QSTN);
        while(!validateAsNaturalNumber(matrixCol)){
            matrixCol = await this.terminalReader.askQuestion(COL_QSTN);
        }
        this.context.getMatrixA().setColumn(parseInt(matrixCol));
        this.terminalReader.displayText(`A második dimenzió mérete, azaz az oszlopok száma: ${matrixCol}`);

        this.context.setCurrentState(null); // new UserMatrixADataInputState
    }
}