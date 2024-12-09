import { State } from "../states/state";
import { GetRowNumber } from "./getRowNumberState";
import { TerminalReader } from "./readFromCLI";

export class GetColumnNumberState extends State {
    public getRowNumber(): void { }

    public getColumnNumber(): void {
        console.log("Oszlopszam:")
        this.reader?.transitionTo(new GetRowNumber());
    }
} 