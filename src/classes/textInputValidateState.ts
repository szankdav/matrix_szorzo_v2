import { MatrixState } from "../states/matrixState";

export class NumberInputValidateState implements MatrixState{



    setNumberForRow(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    setNumberForColumn(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    createTheMatrix(): number[][] {
        throw new Error("Method not implemented.");
    }
    
}