import { describe, expect, it, vi } from "vitest";
import { Matrix } from "../classes/matrix";
import { TerminalReader } from "../classes/terminalReader";
import { ChooseMatrixGenerateMethodState } from "../states/chooseMatrixGenerateMethodState";
import { Context } from "../classes/context";
import { ManualMatrixFillState } from "../states/manualMatrixFillState";
import { RandomWithRangeMatrixFill } from "../states/randomWithRangeMatrixFillState";

describe('chooseMatrixGenerateMethodState next tests', () => {
    it('should call readLetter with the proper text', async () => {
        const mockMatrix = {
            setData: vi.fn(),
            getMatrixRow: vi.fn(),
            getMatrixColumn: vi.fn(),
        } as unknown as Matrix;

        const mockContext = {
            setCurrentState: vi.fn(),
        } as unknown as Context;

        const mockReader = {
            readLetter: vi.fn(),
        } as unknown as TerminalReader;

        const chooseMatrixGenerateMethodState = new ChooseMatrixGenerateMethodState(mockMatrix, mockReader, mockContext);

        await chooseMatrixGenerateMethodState.next();
        expect(mockReader.readLetter).toHaveBeenCalledWith("Szeretné manuálisan feltölteni a mátrixot számokkal? (Amennyiben nem, egy megadott számtartományon belüli véletlenszerű számokkal lesz feltöltve.) ['i'/'n']: ");
    })

    it('should generate a new Matrix filled with zeros', async () => {
        const matrix = new Matrix();
        matrix.setRow(2);
        matrix.setColumn(3);

        const mockContext = {
            setCurrentState: vi.fn(),
        } as unknown as Context;

        const mockReader = {
            readLetter: vi.fn().mockResolvedValue("I"),
        } as unknown as TerminalReader;

        const chooseMatrixGenerateMethodState = new ChooseMatrixGenerateMethodState(matrix, mockReader, mockContext);

        await chooseMatrixGenerateMethodState.next();

        for (let i = 0; i < matrix.getMatrixRow(); i++) {
            for (let j = 0; j < matrix.getMatrixColumn(); j++) {
                expect(matrix.getMatrixData()[i][j]).toBe(0);
            }
        }
    })

    it('should set Matrix data with the generated matrix', async () => {
        const matrix = new Matrix();
        matrix.setRow(2);
        matrix.setColumn(3);

        const mockContext = {
            setCurrentState: vi.fn(),
        } as unknown as Context;

        const mockReader = {
            readLetter: vi.fn().mockResolvedValue("I"),
        } as unknown as TerminalReader;

        const chooseMatrixGenerateMethodState = new ChooseMatrixGenerateMethodState(matrix, mockReader, mockContext);

        await chooseMatrixGenerateMethodState.next();

        expect(matrix.getMatrixData()).toStrictEqual([[0, 0, 0], [0, 0, 0]]);
    })

    it('should call setCurrentState with an instance of ManualMatrixFillState if answer is "i"', async () => {
        const mockMatrix = {
            setData: vi.fn(),
            getMatrixRow: vi.fn(),
            getMatrixColumn: vi.fn(),
        } as unknown as Matrix;

        const mockContext = {
            setCurrentState: vi.fn(),
        } as unknown as Context;

        const mockReader = {
            readLetter: vi.fn().mockResolvedValue("I"),
        } as unknown as TerminalReader;

        const chooseMatrixGenerateMethodState = new ChooseMatrixGenerateMethodState(mockMatrix, mockReader, mockContext);

        await chooseMatrixGenerateMethodState.next();
        expect(mockContext.setCurrentState).toHaveBeenCalledWith(expect.any(ManualMatrixFillState));
    })

    it('should call setCurrentState with an instance of RandomWithRangeMatrixFill if answer is "n"', async () => {
        const mockMatrix = {
            setData: vi.fn(),
            getMatrixRow: vi.fn(),
            getMatrixColumn: vi.fn(),
        } as unknown as Matrix;

        const mockContext = {
            setCurrentState: vi.fn(),
        } as unknown as Context;

        const mockReader = {
            readLetter: vi.fn().mockResolvedValue("N"),
        } as unknown as TerminalReader;

        const chooseMatrixGenerateMethodState = new ChooseMatrixGenerateMethodState(mockMatrix, mockReader, mockContext);

        await chooseMatrixGenerateMethodState.next();
        expect(mockContext.setCurrentState).toHaveBeenCalledWith(expect.any(RandomWithRangeMatrixFill));
    })
});