import { TerminalReader } from "../classes/terminalReader";

export interface MatrixState{
    setNumberForRow(reader: TerminalReader):Promise<void>;
    setNumberForColumn(reader: TerminalReader):Promise<void>;
    randomWithRangeMatrixFill(reader: TerminalReader):Promise<void>;
    chooseMatrixGenerateMethod(reader: TerminalReader):Promise<void>;
    manualMatrixFill(reader: TerminalReader):Promise<void>;
}