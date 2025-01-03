import { describe, it, vi, expect } from 'vitest';
import { Context } from '../core/context';
import { TerminalReader } from '../core/terminalReader';
import { UserMatrixBDataInputState } from './userMatrixBDataInput.state';
import { MultiplyTheMatricesState } from './multiplyTheMatrices.state';

describe('UserMatrixBDataInputState tests', () => {
    it('should request inputs until matrix_B is filled with numbers', async () => {
        const terminalReaderMock = {
            askQuestion: vi.fn(),
            displayText: vi.fn(),
        };

        const mockMatrixData = Array(3).fill(null).map(() => []);

        const matrixBMock = {
            setRow: vi.fn(),
            setColumn: vi.fn(),
            getMatrixRow: vi.fn().mockReturnValue(3),
            getMatrixColumn: vi.fn().mockReturnValue(2),
            getMatrixData: vi.fn().mockReturnValue(mockMatrixData),
            toString: vi.fn(),
        };
        const contextMock = {
            getMatrixB: vi.fn(() => matrixBMock),
            setCurrentState: vi.fn(),
        };

        terminalReaderMock.askQuestion.mockResolvedValue('1').mockResolvedValueOnce('2').mockResolvedValueOnce('3').mockResolvedValueOnce('4').mockResolvedValueOnce('5').mockResolvedValueOnce('6');

        const userMatrixBDataInput = new UserMatrixBDataInputState(contextMock as unknown as Context, terminalReaderMock as unknown as TerminalReader);
        await userMatrixBDataInput.next();

        expect(terminalReaderMock.askQuestion).toHaveBeenCalledTimes(6);
    })

    it('should request inputs until matrix_B is filled with numbers', async () => {
        const terminalReaderMock = {
            askQuestion: vi.fn(),
            displayText: vi.fn(),
        };

        const mockMatrixData = Array(3).fill(null).map(() => []);

        const matrixBMock = {
            setRow: vi.fn(),
            setColumn: vi.fn(),
            getMatrixRow: vi.fn().mockReturnValue(3),
            getMatrixColumn: vi.fn().mockReturnValue(2),
            getMatrixData: vi.fn().mockReturnValue(mockMatrixData),
            toString: vi.fn(),
        };
        const contextMock = {
            getMatrixB: vi.fn(() => matrixBMock),
            setCurrentState: vi.fn(),
        };

        terminalReaderMock.askQuestion.mockResolvedValue('1').mockResolvedValueOnce('2').mockResolvedValueOnce('f').mockResolvedValueOnce('3').mockResolvedValueOnce('4').mockResolvedValueOnce('5').mockResolvedValueOnce('6');

        const userMatrixBDataInput = new UserMatrixBDataInputState(contextMock as unknown as Context, terminalReaderMock as unknown as TerminalReader);
        await userMatrixBDataInput.next();

        expect(terminalReaderMock.askQuestion).toHaveBeenCalledTimes(7);
    })

    it('should display the matrix in the console', async () => {
        const terminalReaderMock = {
            askQuestion: vi.fn(),
            displayText: vi.fn(),
        };

        const mockMatrixData = Array(3).fill(null).map(() => []);

        const matrixBMock = {
            setRow: vi.fn(),
            setColumn: vi.fn(),
            getMatrixRow: vi.fn().mockReturnValue(3),
            getMatrixColumn: vi.fn().mockReturnValue(2),
            getMatrixData: vi.fn().mockReturnValue(mockMatrixData),
            toString: vi.fn(),
        };
        const contextMock = {
            getMatrixB: vi.fn(() => matrixBMock),
            setCurrentState: vi.fn(),
        };

        terminalReaderMock.askQuestion.mockResolvedValue('1').mockResolvedValueOnce('2').mockResolvedValueOnce('f').mockResolvedValueOnce('3').mockResolvedValueOnce('4').mockResolvedValueOnce('5').mockResolvedValueOnce('6');

        const userMatrixBDataInput = new UserMatrixBDataInputState(contextMock as unknown as Context, terminalReaderMock as unknown as TerminalReader);
        await userMatrixBDataInput.next();

        expect(matrixBMock.toString).toHaveBeenCalled();
    });

    it("should set context's currentState to MultiplyMatricesState", async () => {
        const terminalReaderMock = {
            askQuestion: vi.fn(),
            displayText: vi.fn(),
        };

        const mockMatrixData = Array(3).fill(null).map(() => []);

        const matrixBMock = {
            setRow: vi.fn(),
            setColumn: vi.fn(),
            getMatrixRow: vi.fn().mockReturnValue(3),
            getMatrixColumn: vi.fn().mockReturnValue(2),
            getMatrixData: vi.fn().mockReturnValue(mockMatrixData),
            toString: vi.fn(),
        };
        const contextMock = {
            getMatrixB: vi.fn(() => matrixBMock),
            setCurrentState: vi.fn(),
            getCurrentState: vi.fn(),
        };

        terminalReaderMock.askQuestion.mockResolvedValue('1').mockResolvedValueOnce('2').mockResolvedValueOnce('3').mockResolvedValueOnce('4').mockResolvedValueOnce('5').mockResolvedValueOnce('6');
        contextMock.getCurrentState.mockReturnValue(new MultiplyTheMatricesState(contextMock as unknown as Context, terminalReaderMock as unknown as TerminalReader));
        const userMatrixBDataInput = new UserMatrixBDataInputState(contextMock as unknown as Context, terminalReaderMock as unknown as TerminalReader);
        await userMatrixBDataInput.next();

        expect(contextMock.setCurrentState).toHaveBeenCalledWith(expect.any(MultiplyTheMatricesState));
        expect(contextMock.getCurrentState()).toBeInstanceOf(MultiplyTheMatricesState);
    })
})