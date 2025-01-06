import { describe, it, vi, expect, beforeEach } from 'vitest';
import { UserMatrixADataInputState } from './userMatrixADataInput.state';
import { Context } from '../core/context';
import { TerminalReader } from '../core/terminalReader';
import { UserMatrixBDimensionsInputState } from './userMatrixBDimensionsInput.state';

describe('UserMatrixADataInputState tests', () => {
    beforeEach(() => {
        vi.spyOn(console, 'log').mockImplementation(() => { });
    });

    it('should request inputs until matrix_A is filled with numbers', async () => {
        const terminalReaderMock = {
            askQuestion: vi.fn(),
            displayText: vi.fn(),
        };

        const mockMatrixData = Array(3).fill(null).map(() => []);

        const matrixAMock = {
            setRow: vi.fn(),
            setColumn: vi.fn(),
            getMatrixRow: vi.fn().mockReturnValue(3),
            getMatrixColumn: vi.fn().mockReturnValue(2),
            getMatrixData: vi.fn().mockReturnValue(mockMatrixData),
            toString: vi.fn(),
        };
        const contextMock = {
            getMatrixA: vi.fn(() => matrixAMock),
            setCurrentState: vi.fn(),
        };

        terminalReaderMock.askQuestion.mockResolvedValue('1').mockResolvedValueOnce('2').mockResolvedValueOnce('3').mockResolvedValueOnce('4').mockResolvedValueOnce('5').mockResolvedValueOnce('6');

        const userMatrixADataInput = new UserMatrixADataInputState(contextMock as unknown as Context, terminalReaderMock as unknown as TerminalReader);
        await userMatrixADataInput.next();

        expect(terminalReaderMock.askQuestion).toHaveBeenCalledTimes(6);
    })

    it('should request inputs until matrix_A is filled with numbers', async () => {
        const terminalReaderMock = {
            askQuestion: vi.fn(),
            displayText: vi.fn(),
        };

        const mockMatrixData = Array(3).fill(null).map(() => []);

        const matrixAMock = {
            setRow: vi.fn(),
            setColumn: vi.fn(),
            getMatrixRow: vi.fn().mockReturnValue(3),
            getMatrixColumn: vi.fn().mockReturnValue(2),
            getMatrixData: vi.fn().mockReturnValue(mockMatrixData),
            toString: vi.fn(),
        };
        const contextMock = {
            getMatrixA: vi.fn(() => matrixAMock),
            setCurrentState: vi.fn(),
        };

        terminalReaderMock.askQuestion.mockResolvedValue('1').mockResolvedValueOnce('2').mockResolvedValueOnce('f').mockResolvedValueOnce('3').mockResolvedValueOnce('4').mockResolvedValueOnce('5').mockResolvedValueOnce('6');

        const userMatrixADataInput = new UserMatrixADataInputState(contextMock as unknown as Context, terminalReaderMock as unknown as TerminalReader);
        await userMatrixADataInput.next();

        expect(terminalReaderMock.askQuestion).toHaveBeenCalledTimes(7);
    })

    it('should display the matrix in the console', async () => {
        const terminalReaderMock = {
            askQuestion: vi.fn(),
            displayText: vi.fn(),
        };

        const mockMatrixData = Array(3).fill(null).map(() => []);

        const matrixAMock = {
            setRow: vi.fn(),
            setColumn: vi.fn(),
            getMatrixRow: vi.fn().mockReturnValue(3),
            getMatrixColumn: vi.fn().mockReturnValue(2),
            getMatrixData: vi.fn().mockReturnValue(mockMatrixData),
            toString: vi.fn(),
        };
        const contextMock = {
            getMatrixA: vi.fn(() => matrixAMock),
            setCurrentState: vi.fn(),
        };

        terminalReaderMock.askQuestion.mockResolvedValue('1').mockResolvedValueOnce('2').mockResolvedValueOnce('f').mockResolvedValueOnce('3').mockResolvedValueOnce('4').mockResolvedValueOnce('5').mockResolvedValueOnce('6');

        const userMatrixADataInput = new UserMatrixADataInputState(contextMock as unknown as Context, terminalReaderMock as unknown as TerminalReader);
        await userMatrixADataInput.next();

        expect(matrixAMock.toString).toHaveBeenCalled();
    });

    it("should set context's currentState to UserMatrixBDimensionsInputState", async () => {
        const terminalReaderMock = {
            askQuestion: vi.fn(),
            displayText: vi.fn(),
        };

        const mockMatrixData = Array(3).fill(null).map(() => []);

        const matrixAMock = {
            setRow: vi.fn(),
            setColumn: vi.fn(),
            getMatrixRow: vi.fn().mockReturnValue(3),
            getMatrixColumn: vi.fn().mockReturnValue(2),
            getMatrixData: vi.fn().mockReturnValue(mockMatrixData),
            toString: vi.fn(),
        };
        const contextMock = {
            getMatrixA: vi.fn(() => matrixAMock),
            setCurrentState: vi.fn(),
            getCurrentState: vi.fn(),
        };

        terminalReaderMock.askQuestion.mockResolvedValue('1').mockResolvedValueOnce('2').mockResolvedValueOnce('f').mockResolvedValueOnce('3').mockResolvedValueOnce('4').mockResolvedValueOnce('5').mockResolvedValueOnce('6');
        contextMock.getCurrentState.mockReturnValue(new UserMatrixBDimensionsInputState(contextMock as unknown as Context, terminalReaderMock as unknown as TerminalReader));
        const userMatrixADataInput = new UserMatrixADataInputState(contextMock as unknown as Context, terminalReaderMock as unknown as TerminalReader);
        await userMatrixADataInput.next();

        expect(contextMock.setCurrentState).toHaveBeenCalledWith(new UserMatrixBDimensionsInputState(contextMock as unknown as Context, terminalReaderMock as unknown as TerminalReader));
        expect(contextMock.getCurrentState()).toBeInstanceOf(UserMatrixBDimensionsInputState);
    })
})