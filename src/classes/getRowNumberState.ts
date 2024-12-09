import { State } from "../states/state";
import { GetColumnNumberState } from "./getColumnNumberState";
import { TerminalReader } from "./readFromCLI";

export class GetRowNumber extends State {
    public getRowNumber(): void {
        console.log("Sorszam:");
        this.reader?.transitionTo(new GetColumnNumberState());
    }
    public getColumnNumber(): void { }
}