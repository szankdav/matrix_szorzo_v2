import { describe, it, vi, expect } from 'vitest';
import { Context } from '../core/context';
import { TerminalReader } from '../core/terminalReader';
import { AutomateMatrixBState } from './automateMatrixB.state';
import { MultiplyTheMatricesState } from './multiplyTheMatrices.state';

describe('AutomateMatrixAState tests', () => {
    it("should set context's currentState to AutomateMatrixBState", async () => {
        const terminalReaderMock = {
            askQuestion: vi.fn(),
            displayText: vi.fn(),
        };
        const matrixAMock = {
            setRow: vi.fn(),
            setColumn: vi.fn(),
            setData: vi.fn(),
            getMatrixRow: vi.fn(),
            getMatrixColumn: vi.fn(),
            createRandomMatrix: vi.fn(),
        };
        const matrixBMock = {
            setRow: vi.fn(),
            setColumn: vi.fn(),
            setData: vi.fn(),
            getMatrixRow: vi.fn(),
            getMatrixColumn: vi.fn(),
            createRandomMatrix: vi.fn(),
        };
        const contextMock = {
            getMatrixA: vi.fn(() => matrixAMock),
            getMatrixB: vi.fn(() => matrixBMock),
            setCurrentState: vi.fn(),
            getCurrentState: vi.fn(),
        };

        contextMock.getCurrentState.mockReturnValue(new MultiplyTheMatricesState(contextMock as unknown as Context, terminalReaderMock as unknown as TerminalReader));

        const automateMatrixBState = new AutomateMatrixBState(contextMock as unknown as Context, terminalReaderMock as unknown as TerminalReader)
        await automateMatrixBState.next();

        expect(contextMock.setCurrentState).toHaveBeenCalledWith(expect.any(MultiplyTheMatricesState));
        expect(contextMock.getCurrentState()).toBeInstanceOf(MultiplyTheMatricesState);
    })

    it("should call createRandomMatrix again if matrix_A column and matrix_B row is not equal", async () => {
        const terminalReaderMock = {
            askQuestion: vi.fn(),
            displayText: vi.fn(),
        };
        const matrixAMock = {
            setRow: vi.fn(),
            setColumn: vi.fn(),
            setData: vi.fn(),
            getMatrixRow: vi.fn(),
            getMatrixColumn: vi.fn().mockReturnValue(3),
            createRandomMatrix: vi.fn(),
        };
        const matrixBMock = {
            setRow: vi.fn(),
            setColumn: vi.fn(),
            setData: vi.fn(),
            getMatrixRow: vi.fn().mockReturnValue(3).mockReturnValueOnce(3).mockReturnValueOnce(2),
            getMatrixColumn: vi.fn(),
            createRandomMatrix: vi.fn(() => matrixBMock.getMatrixRow()),
        };
        const contextMock = {
            getMatrixA: vi.fn(() => matrixAMock),
            getMatrixB: vi.fn(() => matrixBMock),
            setCurrentState: vi.fn(),
            getCurrentState: vi.fn(),
        };

        do {
            contextMock.getMatrixB().createRandomMatrix();
        } while (
            contextMock.getMatrixA().getMatrixColumn() !==
            contextMock.getMatrixB().getMatrixRow()
        );

        expect(contextMock.getMatrixB().createRandomMatrix).toHaveBeenCalledTimes(2);
    })
});