import { MatrixState } from "../states/MatrixState";
import { SetRowNumberState } from "./SetRowNumberState";
import { TerminalReader } from "./readFromCLI";

export class Matrix implements MatrixState{
    row: number;
    column: number;
    private currentState: MatrixState;
    private reader: TerminalReader;

    constructor(reader: TerminalReader){
        this.currentState = new SetRowNumberState(this, reader);
        this.reader = reader
        this.row = 0;
        this.column = 0;
    }

    public getMatrix(){
        return;
    }

    setState(state: MatrixState){
        this.currentState = state;
    }

    setNumberForRow(): Promise<void | null> {
        return this.currentState.setNumberForRow();
    }
    setNumberForColumn(): Promise<void> {
        return this.currentState.setNumberForColumn();
    }
    createTheMatrix(): number[][] {
        throw new Error("Method not implemented.");
    }
}