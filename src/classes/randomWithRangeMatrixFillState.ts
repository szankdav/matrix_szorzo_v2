import { MatrixState } from "../states/matrixState";
import { TerminalReader } from "./terminalReader";

export class RandomWithRangeMatrixFill implements MatrixState{
    setNumberForRow(reader: TerminalReader): Promise<void> {
        throw new Error("Method not implemented.");
    }
    setNumberForColumn(reader: TerminalReader): Promise<void> {
        throw new Error("Method not implemented.");
    }
    randomWithRangeMatrixFill(reader: TerminalReader): Promise<void> {
        throw new Error("Method not implemented.");
    }
    chooseMatrixGenerateMethod(reader: TerminalReader): Promise<void> {
        throw new Error("Method not implemented.");
    }
    manualMatrixFill(reader: TerminalReader): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
}