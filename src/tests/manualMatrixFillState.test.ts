import { describe, expect, it, vi } from "vitest";
import { TerminalReader } from "../classes/terminalReader";
import { Matrix } from "../classes/matrix";
import { Context } from "../classes/context";
import { ManualMatrixFillState } from "../states/manualMatrixFillState";
import { SetRowNumberState } from "../states/setRowNumberState";
import { State } from "../interfaces/state";


describe('manualMatrixFillState next', () => {
    it('should set the matrix with the given numbers', async () => {
        const mockMatrix = {
            getMatrixData: vi.fn().mockReturnValue([[0, 0], [0, 0]]),
            toString: vi.fn(),
        } as unknown as Matrix;

        const mockCurrentState = {
            getCurrentMatrix: vi.fn(),
            setCurrentMatrix: vi.fn(),
        } as unknown as State as SetRowNumberState;

        const mockContext = {
            setCurrentState: vi.fn(),
            getInitialState: vi.fn().mockReturnValue(mockCurrentState),
        } as unknown as Context;

        const mockReader = {
            readRangeOrMatrixNumber: vi.fn().mockResolvedValue(4).mockResolvedValueOnce(1).mockResolvedValueOnce(2).mockResolvedValueOnce(3),
        } as unknown as TerminalReader;

        const manualMatrixFillState = new ManualMatrixFillState(mockMatrix, mockReader, mockContext);

        vi.spyOn(mockCurrentState, "getCurrentMatrix").mockReturnValue("A");
        await manualMatrixFillState.next();

        expect(mockMatrix.getMatrixData()).toStrictEqual([[1, 2], [3, 4]])
    })

    it('should call reader.readRangeOrMatrixNumber for every matrix position', async () => {
        const mockMatrix = {
            getMatrixData: vi.fn().mockReturnValue([
                [0, 0],
                [0, 0],
            ]),
            toString: vi.fn(),
        } as unknown as Matrix;

        const mockCurrentState = {
            getCurrentMatrix: vi.fn().mockReturnValue("A"),
            setCurrentMatrix: vi.fn(),
        } as unknown as State as SetRowNumberState;

        const mockContext = {
            setCurrentState: vi.fn(),
            getInitialState: vi.fn().mockReturnValue(mockCurrentState),
        } as unknown as Context;

        const mockReader = {
            readRangeOrMatrixNumber: vi.fn().mockResolvedValue(1).mockResolvedValue(2).mockResolvedValue(3).mockResolvedValue(4),
        } as unknown as TerminalReader;

        const manualMatrixFillState = new ManualMatrixFillState(mockMatrix, mockReader, mockContext);

        await manualMatrixFillState.next();

        expect(mockReader.readRangeOrMatrixNumber).toHaveBeenCalledTimes(4);
    })

    it('should set context for creating B matrix if the currentMatrix in initialState is "A"', async () => {
        const mockMatrix = {
            getMatrixData: vi.fn().mockReturnValue([
                [0, 0],
                [0, 0],
            ]),
            toString: vi.fn(),
        } as unknown as Matrix;

        const mockCurrentState = {
            getCurrentMatrix: vi.fn().mockReturnValue("A"),
            setCurrentMatrix: vi.fn(),
        } as unknown as State as SetRowNumberState;

        const mockContext = {
            setCurrentState: vi.fn(),
            getInitialState: vi.fn().mockReturnValue(mockCurrentState),
        } as unknown as Context;

        const mockReader = {
            readRangeOrMatrixNumber: vi.fn().mockResolvedValue(1).mockResolvedValue(2).mockResolvedValue(3).mockResolvedValue(4),
        } as unknown as TerminalReader;

        const manualMatrixFillState = new ManualMatrixFillState(mockMatrix, mockReader, mockContext);

        await manualMatrixFillState.next();

        expect(mockContext.setCurrentState).toHaveBeenCalledWith(mockCurrentState);
    })


    it('should set context for null the currentMatrix in initialState is "B"', async () => {
        const mockMatrix = {
            getMatrixData: vi.fn().mockReturnValue([
                [0, 0],
                [0, 0],
            ]),
            toString: vi.fn(),
        } as unknown as Matrix;

        const mockCurrentState = {
            getCurrentMatrix: vi.fn().mockReturnValue("B"),
            setCurrentMatrix: vi.fn(),
        } as unknown as State as SetRowNumberState;

        const mockContext = {
            setCurrentState: vi.fn(),
            getInitialState: vi.fn().mockReturnValue(mockCurrentState),
        } as unknown as Context;

        const mockReader = {
            readRangeOrMatrixNumber: vi.fn().mockResolvedValue(1).mockResolvedValue(2).mockResolvedValue(3).mockResolvedValue(4),
        } as unknown as TerminalReader;

        const manualMatrixFillState = new ManualMatrixFillState(mockMatrix, mockReader, mockContext);

        await manualMatrixFillState.next();

        expect(mockContext.setCurrentState).toHaveBeenCalledWith(null);
    })
})