import { State } from "../interfaces/state";
import { Matrix } from "./matrix";

export class Context {
    private currentState: State | null;
    private matrix_A: Matrix;
    private matrix_B: Matrix;

    constructor(matrix_A: Matrix, matrix_B: Matrix) {
        this.currentState = null;
        this.matrix_A = matrix_A;
        this.matrix_B = matrix_B;
    }

    async next(): Promise<void | null> {
        await this.currentState?.next();
    }

    public setCurrentState(state: State | null) {
        this.currentState = state;
    }

    public getMatrixA():Matrix{
        return this.matrix_A;
    }

    public getMatrixB():Matrix{
        return this.matrix_B;
    }

    //Nem fog kelleni
    public getCurrentState() {
        return this.currentState;
    }
}