import { State } from '../states/state'

export class Reader {
    private state: State | undefined;

    constructor(state: State) {
        this.transitionTo(state);
    }

    public transitionTo(state: State): void {
        this.state = state;
        this.state.setReader(this);
    }

    public getRowNumberRequest(): void {
        this.state?.getRowNumber();
    }

    public getColumnNumberRequest(): void {
        this.state?.getColumnNumber();
    }
}