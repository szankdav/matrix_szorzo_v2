import { InputValidate } from "../classes/inputValidate";
import { ManualMatrixFillState } from "./manualMatrixFillState";
import { Matrix } from "../classes/matrix";
import { RandomWithRangeMatrixFill } from "./randomWithRangeMatrixFillState";
import { TerminalReader } from "../classes/terminalReader";
import { Context } from "../classes/context";
import { State } from "../interfaces/state";

export class ChooseMatrixGenerateMethodState implements State {
    private matrix: Matrix;
    private reader: TerminalReader;
    private context: Context;

    constructor(matrix: Matrix, reader: TerminalReader, context: Context) {
        this.matrix = matrix;
        this.reader = reader;
        this.context = context;
    }


    run(): void { }
    async next(): Promise<void | null> {
        const answer = await this.reader.readLetter("Szeretné manuálisan feltölteni a mátrixot számokkal? (Amennyiben nem, egy megadott számtartományon belüli véletlenszerű számokkal lesz feltöltve.) ['i'/'n']: ");
        if (answer === "N") {
            const generatedMatrix = Array.from({ length: this.matrix.getMatrixRow() }, () => new Array(this.matrix.getMatrixColumn()).fill(0));
            this.matrix.setData(generatedMatrix);
            console.log("State átállítva: mátrix feltöltése véletlenszerű számokkal.");
            this.context.setState(new RandomWithRangeMatrixFill(this.matrix, this.reader, this.context));
        }
        else if(answer === "I") {
            const generatedMatrix = Array.from({ length: this.matrix.getMatrixRow() }, () => new Array(this.matrix.getMatrixColumn()).fill(0));
            this.matrix.setData(generatedMatrix);
            console.log("State átállítva: mátrix feltöltése manuálisan.");
            this.context.setState(new ManualMatrixFillState(this.matrix, this.reader, this.context));
        }
    }
}