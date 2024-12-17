import { describe, expect, it, vi } from "vitest";
import { TerminalReader } from "../classes/terminalReader";
import { Matrix } from "../classes/matrix";
import { Context } from "../classes/context";
import { SetRowNumberState } from "../states/setRowNumberState";
import { State } from "../interfaces/state";
import { RandomWithRangeMatrixFill } from "../states/randomWithRangeMatrixFillState";


describe('randomWithRangeMatrixFillState next', () => {
    it('should call reader.readRange two times', async () => {
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
            readRangeOrMatrixNumber: vi.fn().mockResolvedValue(100).mockResolvedValueOnce(1),
        } as unknown as TerminalReader;

        const randomWithRangeMatrixFill = new RandomWithRangeMatrixFill(mockMatrix, mockReader, mockContext);

        vi.spyOn(mockCurrentState, "getCurrentMatrix").mockReturnValue("A");
        await randomWithRangeMatrixFill.next();

        expect(mockReader.readRangeOrMatrixNumber).toHaveBeenCalledTimes(2);
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
            readRangeOrMatrixNumber: vi.fn().mockResolvedValue(100).mockResolvedValueOnce(1),
        } as unknown as TerminalReader;

        const randomWithRangeMatrixFill = new RandomWithRangeMatrixFill(mockMatrix, mockReader, mockContext);

        await randomWithRangeMatrixFill.next();

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
            readRangeOrMatrixNumber: vi.fn().mockResolvedValue(100).mockResolvedValueOnce(1),
        } as unknown as TerminalReader;

        const randomWithRangeMatrixFill = new RandomWithRangeMatrixFill(mockMatrix, mockReader, mockContext);

        await randomWithRangeMatrixFill.next();

        expect(mockContext.setCurrentState).toHaveBeenCalledWith(null);
    })

    it('should should call reader.readRangeOrMatrixNumber with the proper text', async () => {
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
            readRangeOrMatrixNumber: vi.fn().mockResolvedValue(100).mockResolvedValueOnce(1),
        } as unknown as TerminalReader;

        const randomWithRangeMatrixFill = new RandomWithRangeMatrixFill(mockMatrix, mockReader, mockContext);

        await randomWithRangeMatrixFill.next();

        expect(mockReader.readRangeOrMatrixNumber).toHaveBeenCalledWith("Kérem adja meg a generálandó számok alsó határértékét: ");
        expect(mockReader.readRangeOrMatrixNumber).toHaveBeenCalledWith("Kérem adja meg a generálandó számok felső határértékét: ");
    })
})