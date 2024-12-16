import { describe, expect, it, vi } from "vitest";
import { SetRowNumberState } from "../states/setRowNumberState";
import { Matrix } from "../classes/matrix";
import { TerminalReader } from "../classes/terminalReader";
import { Context } from "../classes/context";
import { SetColumnNumberState } from "../states/setColumnNumberState";


describe('setRowNumberState next tests', () => {
    it("should set the matrix row number", async () => {
        const matrix = new Matrix();
        vi.spyOn(matrix, "setRow");

        const mockContext = {
            setState: vi.fn(),
        } as unknown as Context;

        const mockReader = {
            readNumber: vi.fn().mockResolvedValue(3),
        } as unknown as TerminalReader;

        const setRowNumberState = new SetRowNumberState(matrix, mockReader, mockContext);

        await setRowNumberState.next();

        expect(matrix.getMatrixRow()).toBe(3);
    });

    it('should call matrix setRow function', async () => {
        const mockMatrix = {
            setRow: vi.fn(),
        } as unknown as Matrix;

        const mockContext = {
            setState: vi.fn(),
        } as unknown as Context;

        const mockReader = {
            readNumber: vi.fn().mockResolvedValue(3),
        } as unknown as TerminalReader;

        const setRowNumberState = new SetRowNumberState(mockMatrix, mockReader, mockContext);

        await setRowNumberState.next();

        expect(mockMatrix.setRow).toHaveBeenCalledWith(3);
    })

    it('should call setState with an instance of SetColumnNumberState', async () => {
        const mockMatrix = {
            setRow: vi.fn(),
        } as unknown as Matrix;

        const mockContext = {
            setState: vi.fn(),
        } as unknown as Context;

        const mockReader = {
            readNumber: vi.fn().mockResolvedValue(3),
        } as unknown as TerminalReader;

        const setRowNumberState = new SetRowNumberState(mockMatrix, mockReader, mockContext);
        const setColumnNumberState = new SetColumnNumberState(mockMatrix, mockReader, mockContext);

        await setRowNumberState.next();
        expect(setColumnNumberState).toBeInstanceOf(SetColumnNumberState);
        expect(mockContext.setState).toHaveBeenCalledWith(setColumnNumberState);
    })

    it('should call readNumber with the proper text', async () => {
        const mockMatrix = {
            setRow: vi.fn(),
        } as unknown as Matrix;

        const mockContext = {
            setState: vi.fn(),
        } as unknown as Context;

        const mockReader = {
            readNumber: vi.fn().mockResolvedValue(3),
        } as unknown as TerminalReader;

        const setRowNumberState = new SetRowNumberState(mockMatrix, mockReader, mockContext);

        await setRowNumberState.next();
        expect(mockReader.readNumber).toHaveBeenCalledWith("Kérem írja be a mátrix sorainak számát: ");
    })
})