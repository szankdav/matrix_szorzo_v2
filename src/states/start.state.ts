import { Context } from "../core/context";
import { TerminalReader } from "../core/terminalReader";
import { State } from "../interfaces/state";
import { ModeState } from "./mode.state";

export const START_MSG = '------------------Mátrixok szorzása------------------'

export class StartState implements State{
    private context: Context;
    private terminalReader: TerminalReader;
    
    constructor(context: Context, terminalReader: TerminalReader){
        this.context = context;
        this.terminalReader = terminalReader;
    }

    async next(): Promise<void | null> {
        this.terminalReader.displayText(START_MSG);
        this.context.setCurrentState(new ModeState(this.context, this.terminalReader));
    }
    
}