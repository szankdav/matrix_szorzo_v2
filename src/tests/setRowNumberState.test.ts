import { describe, expect, it, vi } from "vitest";
import { SetRowNumberState } from "../states/setRowNumberState";
import { Matrix } from "../classes/matrix";
import { TerminalReader } from "../classes/terminalReader";
import { Context } from "../classes/context";
import { SetColumnNumberState } from "../states/setColumnNumberState";


describe('setRowNumberState next tests', () => {
    it("should set the matrix row number", async () => {
        const matrix_A = new Matrix();
        vi.spyOn(matrix_A, "setRow");

        const matrix_B = new Matrix();
        vi.spyOn(matrix_A, "setRow");

        const mockContext = {
            setCurrentState: vi.fn(),
        } as unknown as Context;

        const mockReader = {
            readRowOrColNumber: vi.fn().mockResolvedValue(3),
        } as unknown as TerminalReader;

        const setRowNumberState = new SetRowNumberState(matrix_A, matrix_B, mockReader, mockContext, "A");

        await setRowNumberState.next();

        expect(matrix_A.getMatrixRow()).toBe(3);
    });

    it('should call matrix setRow function', async () => {
        const mockMatrix_A = {
            setRow: vi.fn(),
        } as unknown as Matrix;

        const mockMatrix_B = {
            setRow: vi.fn(),
        } as unknown as Matrix;

        const mockContext = {
            setCurrentState: vi.fn(),
        } as unknown as Context;

        const mockReader = {
            readRowOrColNumber: vi.fn().mockResolvedValue(3),
        } as unknown as TerminalReader;

        const setRowNumberState = new SetRowNumberState(mockMatrix_A, mockMatrix_B, mockReader, mockContext, "A");

        await setRowNumberState.next();

        expect(mockMatrix_A.setRow).toHaveBeenCalledWith(3);
    })

    it('should call setCurrentState with an instance of SetColumnNumberState', async () => {
        const mockMatrix_A = {
            setRow: vi.fn(),
        } as unknown as Matrix;

        const mockMatrix_B = {
            setRow: vi.fn(),
        } as unknown as Matrix;

        const mockContext = {
            setCurrentState: vi.fn(),
        } as unknown as Context;

        const mockReader = {
            readRowOrColNumber: vi.fn().mockResolvedValue(3),
        } as unknown as TerminalReader;

        const setRowNumberState = new SetRowNumberState(mockMatrix_A, mockMatrix_B, mockReader, mockContext, "A");

        await setRowNumberState.next();

        expect(mockContext.setCurrentState).toHaveBeenCalledWith(expect.any(SetColumnNumberState));
    })

    it('should call readNumber with the proper text', async () => {
        const mockMatrix_A = {
            setRow: vi.fn(),
        } as unknown as Matrix;

        const mockMatrix_B = {
            setRow: vi.fn(),
        } as unknown as Matrix;

        const mockContext = {
            setCurrentState: vi.fn(),
        } as unknown as Context;

        const mockReader = {
            readRowOrColNumber: vi.fn().mockResolvedValue(3),
        } as unknown as TerminalReader;

        const setRowNumberState = new SetRowNumberState(mockMatrix_A, mockMatrix_B, mockReader, mockContext, "A");

        await setRowNumberState.next();
        expect(mockReader.readRowOrColNumber).toHaveBeenCalledWith("Kérem írja be a mátrix sorainak számát: ");
    })

    it('should call next() again if matrix_A column and matrix_B row is not equal', async () => {
        const mockMatrix_A = {
            setRow: vi.fn(),
            getMatrixColumn: vi.fn().mockReturnValue(2),
        } as unknown as Matrix;

        const mockMatrix_B = {
            setRow: vi.fn(),
        } as unknown as Matrix;

        const mockContext = {
            setCurrentState: vi.fn(),
        } as unknown as Context;

        const mockReader = {
            readRowOrColNumber: vi.fn().mockResolvedValue(2).mockResolvedValueOnce(3),
        } as unknown as TerminalReader;

        const setRowNumberState = new SetRowNumberState(mockMatrix_A, mockMatrix_B, mockReader, mockContext, "B");
        vi.spyOn(setRowNumberState, "next");

        await setRowNumberState.next();
        
        expect(setRowNumberState.next).toHaveBeenCalledTimes(2);
    })
})