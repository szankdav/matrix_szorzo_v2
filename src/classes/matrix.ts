import { MatrixState } from "../states/matrixState";
import { SetRowNumberState } from "./setRowNumberState";
import { TerminalReader } from "./terminalReader";

export class Matrix implements MatrixState{
    row: number;
    column: number;
    private currentState: MatrixState;
    data: number[][];

    constructor(){
        // Beallitasra kerul a kezdeti allapot
        this.currentState = new SetRowNumberState(this);
        this.row = 0;
        this.column = 0;
        this.data = [[],[]];
    }

    setRangeForMatrix(reader: TerminalReader): Promise<void> {
        throw new Error("Method not implemented.");
    }

    public getMatrix(){
        return this.data;
    }

    public toString() {
        return this.data.map(row => row.join(" ")).join("\n");
      }

    // Allapot modositasa
    setState(state: MatrixState){
        this.currentState = state;
    }

    setNumberForRow(reader: TerminalReader): Promise<void> {
        // Az aktualis allapot fuggvenyet fogja meghivni
        return this.currentState.setNumberForRow(reader);
    }
    setNumberForColumn(reader: TerminalReader): Promise<void> {
        // Az aktualis allapot fuggvenyet fogja meghivni
        return this.currentState.setNumberForColumn(reader);
    }
    generateMatrix(): void {
        return this.currentState.generateMatrix();
    }
}