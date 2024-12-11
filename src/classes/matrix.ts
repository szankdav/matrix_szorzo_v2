import { MatrixState } from "../states/matrixState";
import { SetRowNumberState } from "./setRowNumberState";
import { TerminalReader } from "./terminalReader";

export class Matrix implements MatrixState{
    row: number;
    column: number;
    private currentState: MatrixState;

    constructor(){
        // Beallitasra kerul a kezdeti allapot
        this.currentState = new SetRowNumberState(this);
        this.row = 0;
        this.column = 0;
    }

    public getMatrix(){
        return this;
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
    createTheMatrix(): number[][] {
        throw new Error("Method not implemented.");
    }
}