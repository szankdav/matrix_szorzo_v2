import { Context } from "vm";
import { Matrix } from "../classes/matrix";
import { TerminalReader } from "../classes/terminalReader";
import { State } from "../interfaces/state";

export class RandomWithRangeMatrixFill implements State{
    private matrix: Matrix;
        private reader: TerminalReader;
        private context: Context;
    
        constructor(matrix: Matrix, reader: TerminalReader, context: Context) {
            this.matrix = matrix;
            this.reader = reader;
            this.context = context;
        }
    
    
    run(): void {
        
    }
    next(): Promise<void | null> {
        throw new Error("Method not implemented.");
    }

}