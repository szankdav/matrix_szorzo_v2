import { MatrixState } from "../states/matrixState";
import { SetRowNumberState } from "../states/setRowNumberState";
import { TerminalReader } from "./terminalReader";

export class Matrix implements MatrixState{
    private row: number;
    private column: number;
    private currentState: MatrixState;
    private data: number[][];

    constructor(){
        // Beallitasra kerul a kezdeti allapot
        this.currentState = new SetRowNumberState(this);
        this.row = 0;
        this.column = 0;
        this.data = [[],[]];
    }

    public getMatrixData(){
        return this.data;
    }

    public getMatrixRow(){
        return this.row;
    }

    public getMatrixColumn(){
        return this.column;
    }

    public setRow(row: number){
        this.row = row;
    }

    public setColumn(column: number){
        this.column = column;
    }

    public toString() {
        return this.data.map(row => row.join(" ")).join("\n");
      }

    // Allapot modositasa
    setState(state: MatrixState){
        this.currentState = state;
    }

    setData(matrix: number[][]){
        this.data = matrix;
    }

    setNumberForRow(reader: TerminalReader): Promise<void> {
        // Az aktualis allapot fuggvenyet fogja meghivni
        console.log("Aktív state: sorok számának bekérése.")
        return this.currentState.setNumberForRow(reader);
    }
    setNumberForColumn(reader: TerminalReader): Promise<void> {
        // Az aktualis allapot fuggvenyet fogja meghivni
        console.log("Aktív state: oszlopok számának bekérése.")
        return this.currentState.setNumberForColumn(reader);
    }
    chooseMatrixGenerateMethod(reader: TerminalReader): Promise<void> {
        console.log("Aktív state: mátrix létrehozása a megadott sorok és oszlopok számával.")
        return this.currentState.chooseMatrixGenerateMethod(reader);
    }

    randomWithRangeMatrixFill(reader: TerminalReader): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
    manualMatrixFill(reader: TerminalReader): Promise<void> {
        return this.currentState.manualMatrixFill(reader);
    }
}