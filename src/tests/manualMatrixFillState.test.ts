import { describe, expect, it, vi } from "vitest";
import { TerminalReader } from "../classes/terminalReader";
import { Matrix } from "../classes/matrix";
import { ManualMatrixFillState } from "../states/manualMatrixFillState";

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

describe('manualMatrixFillState', () => {
    it('should fill the matrix with the given numbers', async () => {
        let calls = 0;
        let reader = mocked_reader();
        matrix.setRow(2);
        matrix.setColumn(2);
        const generatedMatrix = Array.from({ length: matrix.getMatrixRow() }, () => new Array(matrix.getMatrixColumn()).fill(0));
        matrix.setData(generatedMatrix);
        let mocked_manualMatrixFillState: ManualMatrixFillState = new ManualMatrixFillState(matrix);
        reader.rl.question = vi.fn((_:string, callback: (answer: string) => void) => {
            calls++;
            if(calls <= 4){
                callback("1")
            }
        }) as typeof reader.rl.question
        await mocked_manualMatrixFillState.manualMatrixFill(reader)
        expect(matrix.getMatrixData()).toStrictEqual([[1,1],[1,1]])
    })
})