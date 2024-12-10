export interface MatrixState{
    setNumberForRow():Promise<void | null>;
    setNumberForColumn():Promise<void>;
    createTheMatrix():number[][];
}