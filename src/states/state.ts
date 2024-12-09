import { Reader } from "../classes/reader";

export abstract class State {
    protected reader: Reader | undefined;

    public setReader(reader: Reader) {
        this.reader = reader;
    }

    public abstract getRowNumber(): void;
    public abstract getColumnNumber(): void;
}