import { State } from "../interfaces/state";

export class Context{
    private currentState: State | null;

    constructor(){
        this.currentState = null;
    }

    run():void{
        this.currentState?.run();
    }

    async next():Promise<void|null>{
        await this.currentState?.next();
    }

    public setState(state: State | null):void{
        this.currentState = state;
    }

    public getState(){
        return this.currentState;
    }
}