import { Context } from "../core/context";
import { validateAsNaturalNumber } from "../core/inputValidate";
import { TerminalReader } from "../core/terminalReader";
import { State } from "../interfaces/state";
import { UserMatrixBDataInputState } from "./userMatrixBDataInput.state";

const MATRIX_MSG = "------------------'B' mátrix------------------";
const ROW_QSTN = "Kérem írja be a létrehozni kívánt mátrix első dimenziójának, azaz sorainak számát: ";
const COL_QSTN = "Kérem írja be a létrehozni kívánt mátrix második dimenziójának, azaz oszlopainak számát: ";
const ROW_COL_ERR_MSG = "Az 'A' mátrix oszlopainak száma és a 'B' mátrix sorainak száma nem egyenlő! Két mátrix szorzásához a két értéknek meg kell egyeznie!";

export class UserMatrixBDimensionsInputState implements State {
    private context: Context;
    private terminalReader: TerminalReader;

    constructor(context: Context, terminalReader: TerminalReader) {
        this.context = context;
        this.terminalReader = terminalReader;
    }

    async next(): Promise<void | null> {
        this.terminalReader.displayText(MATRIX_MSG);

        let matrixRow = await this.terminalReader.askQuestion(ROW_QSTN);
        while(!validateAsNaturalNumber(matrixRow)){
            matrixRow = await this.terminalReader.askQuestion(ROW_QSTN);
        }
        
        const matrix_ACol = this.context.getMatrixA().getMatrixColumn();
        while(parseInt(matrixRow) !== matrix_ACol){
            this.terminalReader.displayText(ROW_COL_ERR_MSG);
            matrixRow = await this.terminalReader.askQuestion(ROW_QSTN);
        }

        this.context.getMatrixB().setRow(parseInt(matrixRow));
        this.context.getMatrixB().setData();

        this.terminalReader.displayText(`Az első dimenzió mérete, azaz a sorok száma: ${matrixRow}`);

        let matrixCol = await this.terminalReader.askQuestion(COL_QSTN);
        while(!validateAsNaturalNumber(matrixCol)){
            matrixCol = await this.terminalReader.askQuestion(COL_QSTN);
        }
        this.context.getMatrixB().setColumn(parseInt(matrixCol));
        
        this.terminalReader.displayText(`A második dimenzió mérete, azaz az oszlopok száma: ${matrixCol}`);

        this.context.setCurrentState(new UserMatrixBDataInputState(this.context, this.terminalReader));
    }
}