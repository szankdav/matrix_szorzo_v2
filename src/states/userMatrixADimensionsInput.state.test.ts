import { describe, it, vi, expect, beforeEach } from 'vitest';
import { UserMatrixADimensionsInputState } from './userMatrixADimensionsInput.state';
import { Context } from '../core/context';
import { TerminalReader } from '../core/terminalReader';
import { UserMatrixADataInputState } from './userMatrixADataInput.state';

describe('UserMatrixADimensionsInputState tests', () => {
    beforeEach(() => {
        vi.spyOn(console, 'log').mockImplementation(() => {});
      });

    it("should call askQuestion again if answer is not a valid number", async () => {
        const terminalReaderMock = {
            askQuestion: vi.fn(),
            displayText: vi.fn(),
        };
        const matrixAMock = {
            setRow: vi.fn(),
            setColumn: vi.fn(),
            setData: vi.fn(),
        };
        const contextMock = {
            getMatrixA: vi.fn(() => matrixAMock),
            setCurrentState: vi.fn(),
        };

        terminalReaderMock.askQuestion.mockResolvedValue('5').mockResolvedValueOnce('not a number').mockResolvedValueOnce('3').mockResolvedValueOnce('invalid');

        const userMatrixADimensionsInputState = new UserMatrixADimensionsInputState(contextMock as unknown as Context, terminalReaderMock as unknown as TerminalReader)
        await userMatrixADimensionsInputState.next();

        expect(terminalReaderMock.askQuestion).toHaveBeenCalledTimes(4);
    });

    it('should call askQuestion with the given messages', async () => {
        const ROW_QSTN = "Kérem írja be a létrehozni kívánt mátrix első dimenziójának, azaz sorainak számát: ";
        const COL_QSTN = "Kérem írja be a létrehozni kívánt mátrix második dimenziójának, azaz oszlopainak számát: ";

        const terminalReaderMock = {
            askQuestion: vi.fn(),
            displayText: vi.fn(),
        };
        const matrixAMock = {
            setRow: vi.fn(),
            setColumn: vi.fn(),
            setData: vi.fn(),
        };
        const contextMock = {
            getMatrixA: vi.fn(() => matrixAMock),
            setCurrentState: vi.fn(),
        };

        terminalReaderMock.askQuestion.mockResolvedValue('5').mockResolvedValueOnce('not a number').mockResolvedValueOnce('3').mockResolvedValueOnce('invalid');

        const userMatrixADimensionsInputState = new UserMatrixADimensionsInputState(contextMock as unknown as Context, terminalReaderMock as unknown as TerminalReader)
        await userMatrixADimensionsInputState.next();

        expect(terminalReaderMock.askQuestion).toHaveBeenCalledWith(ROW_QSTN);
        expect(terminalReaderMock.askQuestion).toHaveBeenCalledWith(COL_QSTN);
    });

    it('should call displayText with the given messages', async () => {
        const MATRIX_MSG = "------------------'A' mátrix------------------";

        const terminalReaderMock = {
            askQuestion: vi.fn(),
            displayText: vi.fn(),
        };
        const matrixAMock = {
            setRow: vi.fn(),
            setColumn: vi.fn(),
            setData: vi.fn(),
        };
        const contextMock = {
            getMatrixA: vi.fn(() => matrixAMock),
            setCurrentState: vi.fn(),
        };

        terminalReaderMock.askQuestion.mockResolvedValue('5').mockResolvedValueOnce('not a number').mockResolvedValueOnce('3').mockResolvedValueOnce('invalid');

        const userMatrixADimensionsInputState = new UserMatrixADimensionsInputState(contextMock as unknown as Context, terminalReaderMock as unknown as TerminalReader)
        await userMatrixADimensionsInputState.next();

        expect(terminalReaderMock.displayText).toHaveBeenCalledWith(MATRIX_MSG);
        expect(terminalReaderMock.displayText).toHaveBeenCalledWith("Az első dimenzió mérete, azaz a sorok száma: 3");
        expect(terminalReaderMock.displayText).toHaveBeenCalledWith("A második dimenzió mérete, azaz az oszlopok száma: 5");
    });

    it('should call setRow and setColumn with the given input', async () => {
        const terminalReaderMock = {
            askQuestion: vi.fn(),
            displayText: vi.fn(),
        };
        const matrixAMock = {
            setRow: vi.fn(),
            setColumn: vi.fn(),
            setData: vi.fn(),
        };
        const contextMock = {
            getMatrixA: vi.fn(() => matrixAMock),
            setCurrentState: vi.fn(),
        };

        terminalReaderMock.askQuestion.mockResolvedValue('5').mockResolvedValueOnce('not a number').mockResolvedValueOnce('3').mockResolvedValueOnce('invalid');

        const userMatrixADimensionsInputState = new UserMatrixADimensionsInputState(contextMock as unknown as Context, terminalReaderMock as unknown as TerminalReader)
        await userMatrixADimensionsInputState.next();

        expect(matrixAMock.setRow).toHaveBeenCalledWith(3);
        expect(matrixAMock.setColumn).toHaveBeenCalledWith(5);
    });

    it("should set context's currentState to userMatrixADataInputState", async () => {
        const terminalReaderMock = {
            askQuestion: vi.fn(),
            displayText: vi.fn(),
        };
        const matrixAMock = {
            setRow: vi.fn(),
            setColumn: vi.fn(),
            setData: vi.fn(),
        };
        const contextMock = {
            getMatrixA: vi.fn(() => matrixAMock),
            setCurrentState: vi.fn(),
            getCurrentState: vi.fn(),
        };

        terminalReaderMock.askQuestion.mockResolvedValue('5').mockResolvedValueOnce('3');
        contextMock.getCurrentState.mockReturnValue(new UserMatrixADataInputState(contextMock as unknown as Context, terminalReaderMock as unknown as TerminalReader));

        const userMatrixADimensionsInputState = new UserMatrixADimensionsInputState(contextMock as unknown as Context, terminalReaderMock as unknown as TerminalReader)
        await userMatrixADimensionsInputState.next();

        expect(contextMock.setCurrentState).toHaveBeenCalledWith(new UserMatrixADataInputState(contextMock as unknown as Context, terminalReaderMock as unknown as TerminalReader));
        expect(contextMock.getCurrentState()).toBeInstanceOf(UserMatrixADataInputState);
    })
});
