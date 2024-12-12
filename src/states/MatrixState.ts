import { TerminalReader } from "../classes/terminalReader";

export interface MatrixState{
    setNumberForRow(reader: TerminalReader):Promise<void>;
    setNumberForColumn(reader: TerminalReader):Promise<void>;
    setRangeForMatrix(reader: TerminalReader):Promise<void>;
    generateMatrix():void;
}