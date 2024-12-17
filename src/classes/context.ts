import { State } from "../interfaces/state";

export class Context{
    private currentState: State | null;
    private initialState: State | null;

    constructor(){
        this.currentState = null;
        this.initialState = null;
    }

    run():void{
        this.currentState?.run();
    }

    async next():Promise<void|null>{
        await this.currentState?.next();
    }

    public setCurrentState(state: State | null){
        this.currentState = state;
    }

    public getCurrentState(){
        return this.currentState;
    }

    public setInitialState(state: State | null){
        this.initialState = state;
    }

    public getInitialState(): State{
        return this.initialState!;
    }
}