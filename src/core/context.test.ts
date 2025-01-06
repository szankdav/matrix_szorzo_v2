import { describe, it } from "vitest";
import { expect, vi } from "vitest";

describe('context tests', () => {
    it('should resolve context.next() with currentState.next() ', async () => {
        const contextMock = {
            next: vi.fn().mockResolvedValue(null),
        };     

        await contextMock.next();
        expect(contextMock.next).toHaveResolvedWith(null);
    });

    it('should set currenState with the given state', async () => {
        const modeStateMock = {}

        const contextMock = {
            setCurrentState: vi.fn().mockReturnValue(modeStateMock),
            getCurrentState: vi.fn(() => contextMock.setCurrentState())
        };     

        await contextMock.setCurrentState();
        const result = contextMock.getCurrentState();
        expect(result).toBe(modeStateMock);
    });

    it('should return matrixA when getMatrixA is called', async () => {
        const mockMatrix_A = {};

        const contextMock = {
            getMatrixA: vi.fn(() => mockMatrix_A),
        };     

        const result = contextMock.getMatrixA();
        expect(result).toBe(mockMatrix_A);
    });

    it('should return matrixB when getMatrixB is called', async () => {
        const mockMatrix_B = {};

        const contextMock = {
            getMatrixB: vi.fn(() => mockMatrix_B),
        };     

        const result = contextMock.getMatrixB();
        expect(result).toBe(mockMatrix_B);
    });

    it('should return with the current state when getCurrentState is called', async () => {
        const currentState = {};

        const contextMock = {
            getCurrentState: vi.fn(() => currentState),
        };     

        const result = contextMock.getCurrentState();
        expect(result).toBe(currentState);
    });
})