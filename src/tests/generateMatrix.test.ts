import { describe, expect, it, vi } from "vitest";
import { Matrix } from "../classes/matrix";
import { TerminalReader } from "../classes/terminalReader";
import { ChooseMatrixGenerateMethodState } from "../classes/chooseMatrixGenerateMethodState";


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

describe('chooseMatrixGenerateMethod tests', () => {
    it('should call self again if the given input is not "i" or "n"', async () => {
        let calls = 0;
        let reader = mocked_reader();
        let mocked_chooseMatrixGenerateMethodState: ChooseMatrixGenerateMethodState = new ChooseMatrixGenerateMethodState(matrix);
        const spy = vi.spyOn(mocked_chooseMatrixGenerateMethodState, "chooseMatrixGenerateMethod")
        reader.rl.question = vi.fn((_:string, callback: (answer: string) => void) => {
            calls++;
            if(calls === 1){
                callback("d")
            }
            else{
                callback("i")
            }
        }) as typeof reader.rl.question
        await mocked_chooseMatrixGenerateMethodState.chooseMatrixGenerateMethod(reader)
        expect(spy).toHaveBeenCalledTimes(2)
    })
})