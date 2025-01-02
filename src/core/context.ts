import { State } from "../interfaces/state";
import { Matrix } from "./matrix";

export class Context{
    private currentState: State | null;
    private matrix_A: Matrix;
    private matrix_B: Matrix;

    constructor(){
        this.currentState = null;
        this.matrix_A = new Matrix();
        this.matrix_B = new Matrix();
    }

    async next():Promise<void|null>{
        await this.currentState?.next();
    }

    public setCurrentState(state: State | null){
        this.currentState = state;
    }

    //Nem fog kelleni
    public getCurrentState(){
        return this.currentState;
    }
}