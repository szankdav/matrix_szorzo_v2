import { describe, expect, expectTypeOf, it, vi } from "vitest";
import { SetRowNumberState } from "../states/setRowNumberState";
import { Matrix } from "../classes/matrix";
import { TerminalReader } from "../classes/terminalReader";
import { Context } from "../classes/context";
import { SetColumnNumberState } from "../states/setColumnNumberState";
import { ChooseMatrixGenerateMethodState } from "../states/chooseMatrixGenerateMethodState";


describe('setColumnNumberState next tests', () => {
    it("should set the matrix row number", async () => {
        const matrix = new Matrix();
        vi.spyOn(matrix, "setRow");

        const mockContext = {
            setState: vi.fn(),
        } as unknown as Context;

        const mockReader = {
            readNumber: vi.fn().mockResolvedValue(3),
        } as unknown as TerminalReader;

        const setColumnNumberState = new SetColumnNumberState(matrix, mockReader, mockContext);

        await setColumnNumberState.next();

        expect(matrix.getMatrixColumn()).toBe(3);
    });

    it('should call matrix setRow function', async () => {
        const mockMatrix = {
            setColumn: vi.fn(),
        } as unknown as Matrix;

        const mockContext = {
            setState: vi.fn(),
        } as unknown as Context;

        const mockReader = {
            readNumber: vi.fn().mockResolvedValue(3),
        } as unknown as TerminalReader;

        const setColumnNumberState = new SetColumnNumberState(mockMatrix, mockReader, mockContext);

        await setColumnNumberState.next();

        expect(mockMatrix.setColumn).toHaveBeenCalledWith(3);
    })

    it('should call setState with an instance of ChooseMatrixGenerateMethodState', async () => {
        const mockMatrix = {
            setColumn: vi.fn(),
        } as unknown as Matrix;

        const mockContext = {
            setState: vi.fn(),
        } as unknown as Context;

        const mockReader = {
            readNumber: vi.fn().mockResolvedValue(3),
        } as unknown as TerminalReader;

        const setColumnNumberState = new SetColumnNumberState(mockMatrix, mockReader, mockContext);
        const chooseMatrixGenerateMethodState = new ChooseMatrixGenerateMethodState(mockMatrix, mockReader, mockContext);

        await setColumnNumberState.next();

        expect(chooseMatrixGenerateMethodState).toBeInstanceOf(ChooseMatrixGenerateMethodState);
        expect(mockContext.setState).toHaveBeenCalledWith((chooseMatrixGenerateMethodState));
    })

    it('should call readNumber with the proper text', async () => {
        const mockMatrix = {
            setColumn: vi.fn(),
        } as unknown as Matrix;

        const mockContext = {
            setState: vi.fn(),
        } as unknown as Context;

        const mockReader = {
            readNumber: vi.fn().mockResolvedValue(3),
        } as unknown as TerminalReader;

        const setColumnNumberState = new SetColumnNumberState(mockMatrix, mockReader, mockContext);

        await setColumnNumberState.next();
        expect(mockReader.readNumber).toHaveBeenCalledWith("Kérem írja be a mátrix oszlopainak számát: ");
    })
})