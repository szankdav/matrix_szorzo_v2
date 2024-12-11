import { TerminalReader } from "../classes/terminalReader";

export interface MatrixState{
    setNumberForRow(reader: TerminalReader):Promise<void>;
    setNumberForColumn(reader: TerminalReader):Promise<void>;
    createTheMatrix():number[][];
}