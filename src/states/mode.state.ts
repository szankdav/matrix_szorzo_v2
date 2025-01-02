import { Context } from "../core/context";
import { validateAsLetter } from "../core/inputValidate";
import { TerminalReader } from "../core/terminalReader";
import { State } from "../interfaces/state";
import { AutomateMatrixAState } from "./automateMatrixAState.state";
import { UserMatrixADimensionsState } from "./userMatrixADimensionsState.state";

export const MODE_MSG = "Kérem válasszon az alábbi lehetőségek közül:";
export const RANDOM_MSG = "'A' (automatikus): a program automatikusan, véletlenszerű dimenziókkal és adatokkal létrehoz két mátrixot, majd elvégzi a szorzást. Minden lépés megjelenítésre kerül a konzolon.";
export const USER_MSG = "'M' (manuális): a program a felhasználótól kéri be az adatokat, majd elvégzi a szorzást. Minden lépés megjelenítésre kerül a konzolon.";
export const EXIT_MSG = "'K' (kilépés): a program kilép."

export class ModeState implements State{
    private context: Context;
    private terminalReader: TerminalReader;

    constructor(context: Context, terminalReader: TerminalReader){
        this.context = context;
        this.terminalReader = terminalReader;
    }
    
    async next(): Promise<void | null> {
        this.terminalReader.displayText(MODE_MSG);
        this.terminalReader.displayText(RANDOM_MSG);
        this.terminalReader.displayText(USER_MSG);
        this.terminalReader.displayText(EXIT_MSG);
        let choosenMode = await this.terminalReader.askQuestion("Válaszott mód: ['A'/'M'/'K']: ");
        while(!validateAsLetter(choosenMode)){
            choosenMode = await this.terminalReader.askQuestion("Válaszott mód: ['A'/'M'/'K']: ");
        }
        if(choosenMode.toUpperCase() === "M"){
            this.context.setCurrentState(new UserMatrixADimensionsState(this.context, this.terminalReader));
        }
        else if(choosenMode.toUpperCase() === "A"){
            this.context.setCurrentState(new AutomateMatrixAState(this.context, this.terminalReader));
        }
        else if(choosenMode.toUpperCase() === "K"){
            this.context.setCurrentState(null);
        }
    }
}