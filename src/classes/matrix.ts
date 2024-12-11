import { MatrixState } from "../states/matrixState";
import { SetRowNumberState } from "./setRowNumberState";
import { TerminalReader } from "./readFromCLI";

export class Matrix implements MatrixState{
    row: number;
    column: number;
    private currentState: MatrixState;
    private reader: TerminalReader;

    constructor(reader: TerminalReader){
        // Beallitasra kerul a kezdeti allapot
        this.currentState = new SetRowNumberState(this, reader);
        // User input beolvasasahoz szukseges a terminalrol
        this.reader = reader
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

    setNumberForRow(): Promise<void | null> {
        // Az aktualis allapot fuggvenyet fogja meghivni
        return this.currentState.setNumberForRow();
    }
    setNumberForColumn(): Promise<void> {
        // Az aktualis allapot fuggvenyet fogja meghivni
        return this.currentState.setNumberForColumn();
    }
    createTheMatrix(): number[][] {
        throw new Error("Method not implemented.");
    }
}