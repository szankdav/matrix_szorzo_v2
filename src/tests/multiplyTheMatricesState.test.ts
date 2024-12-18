import { describe, expect, it, vi } from "vitest";
import { TerminalReader } from "../classes/terminalReader";
import { Matrix } from "../classes/matrix";
import { Context } from "../classes/context";
import { MultiplyTheMatricesState } from "../states/multiplyTheMatricesState";
import { SetRowNumberState } from "../states/setRowNumberState";


describe('randomWithRangeMatrixFillState next', () => {
    it('should set multipliedMatrixData with the correct multiplied values', async () => {
        const mockMatrix_A = {
            getMatrixData: vi.fn().mockReturnValue([
                [2, 5],
                [7, 8],
            ]),
            getMatrixRow: vi.fn().mockReturnValue(2),
            toString: vi.fn(),
        } as unknown as Matrix;

        const mockMatrix_B = {
            getMatrixData: vi.fn().mockReturnValue([
                [7, 2],
                [3, 4],
            ]),
            getMatrixColumn: vi.fn().mockReturnValue(2),
            toString: vi.fn(),
        } as unknown as Matrix;

        const mockContext = {
            setCurrentState: vi.fn(),
            getInitialState: vi.fn(),
        } as unknown as Context;

        const mockReader = {
            readLetter: vi.fn(),
        } as unknown as TerminalReader;

        const mockMultipliedMatrix = {
            getMatrixRow: vi.fn().mockReturnValue(2),
            getMatrixColumn: vi.fn().mockReturnValue(2),
            getMatrixData: vi.fn().mockReturnValue([
                [0, 0],
                [0, 0],
            ]),
            toString: vi.fn(),
            setData: vi.fn(),
        };

        const multiplyTheMatricesState = new MultiplyTheMatricesState(mockMatrix_A, mockMatrix_B, mockReader, mockContext);
        Object.defineProperty(multiplyTheMatricesState, "multipliedMatrix", {
            value: mockMultipliedMatrix,
        });


        await multiplyTheMatricesState.next();

        expect(mockMultipliedMatrix.getMatrixData()).toEqual([[29, 53], [126, 172]]);
    }, 100000)

    it('should reset matrix_A and matrix_B data and set context with setMatrixRowState if the answer is "i"', async () => {
        const mockMatrix_A = {
            setData: vi.fn(),
            getMatrixData: vi.fn().mockReturnValue([
                [2, 5],
                [7, 8],
            ]),
            getMatrixRow: vi.fn().mockReturnValue(2),
            toString: vi.fn(),
        } as unknown as Matrix;

        const mockMatrix_B = {
            setData: vi.fn(),
            getMatrixData: vi.fn().mockReturnValue([
                [7, 2],
                [3, 4],
            ]),
            getMatrixColumn: vi.fn().mockReturnValue(2),
            toString: vi.fn(),
        } as unknown as Matrix;

        const mockContext = {
            setCurrentState: vi.fn(),
            getInitialState: vi.fn(),
            setInitialState: vi.fn(),
        } as unknown as Context;

        const mockReader = {
            readLetter: vi.fn().mockResolvedValue("I"),
        } as unknown as TerminalReader;

        const multiplyTheMatricesState = new MultiplyTheMatricesState(mockMatrix_A, mockMatrix_B, mockReader, mockContext);

        await multiplyTheMatricesState.next();

        expect(mockMatrix_A.setData).toHaveBeenCalledWith([[], []]);
        expect(mockMatrix_B.setData).toHaveBeenCalledWith([[], []]);

        expect(mockContext.setCurrentState).toHaveBeenCalledWith(
            expect.any(SetRowNumberState)
        );
        expect(mockContext.setInitialState).toHaveBeenCalledWith(
            expect.any(SetRowNumberState)
        );

    }, 100000)

    it('should set context with null if the answer is "n"', async () => {
        const mockMatrix_A = {
            setData: vi.fn(),
            getMatrixData: vi.fn().mockReturnValue([
                [2, 5],
                [7, 8],
            ]),
            getMatrixRow: vi.fn().mockReturnValue(2),
            toString: vi.fn(),
        } as unknown as Matrix;

        const mockMatrix_B = {
            setData: vi.fn(),
            getMatrixData: vi.fn().mockReturnValue([
                [7, 2],
                [3, 4],
            ]),
            getMatrixColumn: vi.fn().mockReturnValue(2),
            toString: vi.fn(),
        } as unknown as Matrix;

        const mockContext = {
            setCurrentState: vi.fn(),
            getInitialState: vi.fn(),
            setInitialState: vi.fn(),
        } as unknown as Context;

        const mockReader = {
            readLetter: vi.fn().mockResolvedValue("N"),
        } as unknown as TerminalReader;

        const multiplyTheMatricesState = new MultiplyTheMatricesState(mockMatrix_A, mockMatrix_B, mockReader, mockContext);

        await multiplyTheMatricesState.next();

        expect(mockContext.setCurrentState).toHaveBeenCalledWith(null);


    }, 100000)
})