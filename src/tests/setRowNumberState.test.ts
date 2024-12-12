import { describe, expect, it, vi } from "vitest";
import { SetRowNumberState } from "../classes/setRowNumberState";
import { Matrix } from "../classes/matrix";
import { TerminalReader } from "../classes/terminalReader";


function mocked_reader(input: string = "") {
    let mocked_reader = {
        rl: {
            question: (_: string, callback: (answer: string) => void): void => {
                callback(input);
            }
        }
    }
    return mocked_reader as unknown as TerminalReader;
}

const matrix = new Matrix();

describe('setRowNumberState tests', () => {
    it('should set matrix row if the given input value is valid', async () => {
        let mocked_setRowNumberState: SetRowNumberState = new SetRowNumberState(matrix);
        await mocked_setRowNumberState.setNumberForRow(mocked_reader("5"))
        expect(matrix.getMatrixRow()).equal(5)
    })

    it('should call self again if the given input is negative', async () => {
        let mocked_setRowNumberState: SetRowNumberState = new SetRowNumberState(matrix);
        let calls = 0;
        let reader = mocked_reader();
        const spy = vi.spyOn(mocked_setRowNumberState, "setNumberForRow")
        reader.rl.question = vi.fn((_:string, callback: (answer: string) => void) => {
            calls++;
            if(calls === 1){
                callback("-5")
            }
            else{
                callback("5")
            }
        }) as typeof reader.rl.question
        await mocked_setRowNumberState.setNumberForRow(reader)
        expect(matrix.getMatrixRow()).equal(5)
        expect(spy).toHaveBeenCalledTimes(2)
    })

    it('should call self again if the given input is not a number', async () => {
        let mocked_setRowNumberState: SetRowNumberState = new SetRowNumberState(matrix);
        let calls = 0;
        let reader = mocked_reader();
        const spy = vi.spyOn(mocked_setRowNumberState, "setNumberForRow")
        reader.rl.question = vi.fn((_:string, callback: (answer: string) => void) => {
            calls++;
            if(calls === 1){
                callback("d")
            }
            else{
                callback("5")
            }
        }) as typeof reader.rl.question
        await mocked_setRowNumberState.setNumberForRow(reader)
        expect(matrix.getMatrixRow()).equal(5)
        expect(spy).toHaveBeenCalledTimes(2)
    })

    it('should call self again if the given input is not one number', async () => {
        let mocked_setRowNumberState: SetRowNumberState = new SetRowNumberState(matrix);
        let calls = 0;
        let reader = mocked_reader();
        const spy = vi.spyOn(mocked_setRowNumberState, "setNumberForRow")
        reader.rl.question = vi.fn((_:string, callback: (answer: string) => void) => {
            calls++;
            if(calls === 1){
                callback("5 4")
            }
            else{
                callback("5")
            }
        }) as typeof reader.rl.question
        await mocked_setRowNumberState.setNumberForRow(reader)
        expect(matrix.getMatrixRow()).equal(5)
        expect(spy).toHaveBeenCalledTimes(2)
    })
})