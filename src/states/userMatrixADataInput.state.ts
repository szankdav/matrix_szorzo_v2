import { Context } from "../core/context";
import { validateAsWholeNumber } from "../core/inputValidate";
import { TerminalReader } from "../core/terminalReader";
import { State } from "../interfaces/state";
import { UserMatrixBDimensionsInputState } from "./userMatrixBDimensionsInput.state";

export class UserMatrixADataInputState implements State{
    private context: Context;
    private terminalReader: TerminalReader;

    constructor(context: Context, terminalReader: TerminalReader){
        this.context = context;
        this.terminalReader = terminalReader;
    }
    
    async next(): Promise<void | null> {
        for (let i = 0; i < this.context.getMatrixA().getMatrixRow(); i++) {
            for (let j = 0; j < this.context.getMatrixA().getMatrixColumn(); j++) {
                let numberToMatrix = await this.terminalReader.askQuestion(`Kérem írja be a mátrix ${i+1}. sorának ${j+1}. számát: `);
                while(!validateAsWholeNumber(numberToMatrix)){
                    numberToMatrix = await this.terminalReader.askQuestion(`Kérem írja be a mátrix ${i+1}. sorának ${j+1}. számát: `);
                }
                this.context.getMatrixA().getMatrixData()[i].push(parseInt(numberToMatrix));
            }            
        }
        this.context.getMatrixA().toString();
        this.context.setCurrentState(new UserMatrixBDimensionsInputState(this.context, this.terminalReader));    
    }  
}