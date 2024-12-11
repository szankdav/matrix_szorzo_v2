import { describe, expect, it, vi } from "vitest";
import { SetRowNumberState } from "../classes/setRowNumberState";
import { Matrix } from "../classes/matrix";
import { TerminalReader } from "../classes/terminalReader";


function mocked_reader(input: string = "") {
    let mocked_reader = {
        rl: {
            question: (_: string, call: (answer: string) => void): void => {
                call(input);
            }
        }
    }
    return mocked_reader as unknown as TerminalReader;
}

const matrix = new Matrix();

describe('setRowNumberState tests', () => {
    it('should set matrix row if the given input value is valid', async () => {
        let mocked_setRowNumberState = new SetRowNumberState(matrix);
        await mocked_setRowNumberState.setNumberForRow(mocked_reader("5"))
        expect(matrix.row).equal(5)
    })

    it('should call the function again if the given input is invalid', async () => {
        let mocked_setRowNumberState: SetRowNumberState = new SetRowNumberState(matrix);
        let mocked_reader_instance = mocked_reader();
        let mockQuestion = vi.spyOn(mocked_reader_instance.rl, "question").mockImplementationOnce((_, call) => call("-5")).mockImplementationOnce((_, call) => call("5"))
        await mocked_setRowNumberState.setNumberForRow(mocked_reader() as unknown as TerminalReader)
        expect(mocked_reader_instance).toBeCalledTimes(2);
        expect(matrix.row).equal(5);
    })
})