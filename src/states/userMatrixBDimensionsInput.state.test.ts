import { describe, it, vi, expect } from 'vitest';
import { Context } from '../core/context';
import { TerminalReader } from '../core/terminalReader';
import { UserMatrixBDimensionsInputState } from './userMatrixBDimensionsInput.state';
import { UserMatrixBDataInputState } from './userMatrixBDataInput.state';

describe('UserMatrixBDimensionsInputState tests', () => {
    it("should call askQuestion again if answer is not a valid number", async () => {
        const terminalReaderMock = {
            askQuestion: vi.fn(),
            displayText: vi.fn(),
        };
        const matrixAMock = {
            getMatrixColumn: vi.fn().mockReturnValue(3),
        };
        const matrixBMock = {
            setRow: vi.fn(),
            setColumn: vi.fn(),
            setData: vi.fn(),
        };
        const contextMock = {
            getMatrixA: vi.fn(() => matrixAMock),
            getMatrixB: vi.fn(() => matrixBMock),
            setCurrentState: vi.fn(),
        };

        terminalReaderMock.askQuestion.mockResolvedValue('5').mockResolvedValueOnce('not a number').mockResolvedValueOnce('3').mockResolvedValueOnce('invalid');

        const userMatrixBDimensionsInputState = new UserMatrixBDimensionsInputState(contextMock as unknown as Context, terminalReaderMock as unknown as TerminalReader)
        await userMatrixBDimensionsInputState.next();

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
            getMatrixColumn: vi.fn().mockReturnValue(3),
        };
        const matrixBMock = {
            setRow: vi.fn(),
            setColumn: vi.fn(),
            setData: vi.fn(),
        };
        const contextMock = {
            getMatrixA: vi.fn(() => matrixAMock),
            getMatrixB: vi.fn(() => matrixBMock),
            setCurrentState: vi.fn(),
        };

        terminalReaderMock.askQuestion.mockResolvedValue('5').mockResolvedValueOnce('not a number').mockResolvedValueOnce('3').mockResolvedValueOnce('invalid');

        const userMatrixBDimensionsInputState = new UserMatrixBDimensionsInputState(contextMock as unknown as Context, terminalReaderMock as unknown as TerminalReader)
        await userMatrixBDimensionsInputState.next();

        expect(terminalReaderMock.askQuestion).toHaveBeenCalledWith(ROW_QSTN);
        expect(terminalReaderMock.askQuestion).toHaveBeenCalledWith(COL_QSTN);
    });

    it('should call displayText with the given messages', async () => {
        const MATRIX_MSG = "------------------'B' mátrix------------------";

        const terminalReaderMock = {
            askQuestion: vi.fn(),
            displayText: vi.fn(),
        };
        const matrixAMock = {
            getMatrixColumn: vi.fn().mockReturnValue(3),
        };
        const matrixBMock = {
            setRow: vi.fn(),
            setColumn: vi.fn(),
            setData: vi.fn(),
        };
        const contextMock = {
            getMatrixA: vi.fn(() => matrixAMock),
            getMatrixB: vi.fn(() => matrixBMock),
            setCurrentState: vi.fn(),
        };

        terminalReaderMock.askQuestion.mockResolvedValue('5').mockResolvedValueOnce('not a number').mockResolvedValueOnce('3').mockResolvedValueOnce('invalid');

        const userMatrixBDimensionsInputState = new UserMatrixBDimensionsInputState(contextMock as unknown as Context, terminalReaderMock as unknown as TerminalReader)
        await userMatrixBDimensionsInputState.next();

        expect(terminalReaderMock.displayText).toHaveBeenCalledWith(MATRIX_MSG);
        expect(terminalReaderMock.displayText).toHaveBeenCalledWith("Az első dimenzió mérete, azaz a sorok száma: 3");
        expect(terminalReaderMock.displayText).toHaveBeenCalledWith("A második dimenzió mérete, azaz az oszlopok száma: 5");
    });

    it('should call displayText with the given messages if matrix_A column and matrix_B row numbers are not equal', async () => {
        const ROW_COL_ERR_MSG = "Az 'A' mátrix oszlopainak száma és a 'B' mátrix sorainak száma nem egyenlő! Két mátrix szorzásához a két értéknek meg kell egyeznie!";
        const MATRIX_MSG = "------------------'B' mátrix------------------";

        const terminalReaderMock = {
            askQuestion: vi.fn(),
            displayText: vi.fn(),
        };
        const matrixAMock = {
            getMatrixColumn: vi.fn().mockReturnValue(3),
        };
        const matrixBMock = {
            setRow: vi.fn(),
            setColumn: vi.fn(),
            setData: vi.fn(),
        };
        const contextMock = {
            getMatrixA: vi.fn(() => matrixAMock),
            getMatrixB: vi.fn(() => matrixBMock),
            setCurrentState: vi.fn(),
        };

        terminalReaderMock.askQuestion.mockResolvedValue('2').mockResolvedValueOnce('2').mockResolvedValueOnce('3').mockResolvedValueOnce('5');

        const userMatrixBDimensionsInputState = new UserMatrixBDimensionsInputState(contextMock as unknown as Context, terminalReaderMock as unknown as TerminalReader)
        await userMatrixBDimensionsInputState.next();

        expect(terminalReaderMock.displayText).toHaveBeenCalledWith(ROW_COL_ERR_MSG);
        expect(terminalReaderMock.displayText).toHaveBeenCalledWith("Az első dimenzió mérete, azaz a sorok száma: 3");
        expect(terminalReaderMock.displayText).toHaveBeenCalledWith("A második dimenzió mérete, azaz az oszlopok száma: 5");
    });

    it('should call setRow and setColumn with the given input', async () => {
        const terminalReaderMock = {
            askQuestion: vi.fn(),
            displayText: vi.fn(),
        };
        const matrixAMock = {
            getMatrixColumn: vi.fn().mockReturnValue(3),
        };
        const matrixBMock = {
            setRow: vi.fn(),
            setColumn: vi.fn(),
            setData: vi.fn(),
        };
        const contextMock = {
            getMatrixA: vi.fn(() => matrixAMock),
            getMatrixB: vi.fn(() => matrixBMock),
            setCurrentState: vi.fn(),
        };

        terminalReaderMock.askQuestion.mockResolvedValue('5').mockResolvedValueOnce('not a number').mockResolvedValueOnce('3').mockResolvedValueOnce('invalid');

        const userMatrixBDimensionsInputState = new UserMatrixBDimensionsInputState(contextMock as unknown as Context, terminalReaderMock as unknown as TerminalReader)
        await userMatrixBDimensionsInputState.next();

        expect(matrixBMock.setRow).toHaveBeenCalledWith(3);
        expect(matrixBMock.setColumn).toHaveBeenCalledWith(5);
    });

    it("should set context's currentState to userMatrixADataInputState", async () => {
        const terminalReaderMock = {
            askQuestion: vi.fn(),
            displayText: vi.fn(),
        };
        const matrixAMock = {
            getMatrixColumn: vi.fn().mockReturnValue(3),
        };
        const matrixBMock = {
            setRow: vi.fn(),
            setColumn: vi.fn(),
            setData: vi.fn(),
        };
        const contextMock = {
            getMatrixA: vi.fn(() => matrixAMock),
            getMatrixB: vi.fn(() => matrixBMock),
            setCurrentState: vi.fn(),
            getCurrentState: vi.fn(),
        };

        terminalReaderMock.askQuestion.mockResolvedValue('5').mockResolvedValueOnce('3');
        contextMock.getCurrentState.mockReturnValue(new UserMatrixBDataInputState(contextMock as unknown as Context, terminalReaderMock as unknown as TerminalReader));

        const userMatrixBDimensionsInputState = new UserMatrixBDimensionsInputState(contextMock as unknown as Context, terminalReaderMock as unknown as TerminalReader)
        await userMatrixBDimensionsInputState.next();

        expect(contextMock.setCurrentState).toHaveBeenCalledWith(new UserMatrixBDataInputState(contextMock as unknown as Context, terminalReaderMock as unknown as TerminalReader));
        expect(contextMock.getCurrentState()).toBeInstanceOf(UserMatrixBDataInputState);
    })
});
