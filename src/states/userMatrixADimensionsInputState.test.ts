import { describe, it, vi, expect } from 'vitest';
import { UserMatrixADimensionsInputState } from './userMatrixADimensionsInputState.state';
import { Context } from '../core/context';
import { TerminalReader } from '../core/terminalReader';

describe('next', () => {
    it('should handle matrix dimensions with validation using mock implementations', async () => {
        const ROW_QSTN = "Kérem írja be a létrehozni kívánt mátrix első dimenziójának, azaz sorainak számát: ";
        const COL_QSTN = "Kérem írja be a létrehozni kívánt mátrix második dimenziójának, azaz oszlopainak számát: ";

        const terminalReaderMock = {
            askQuestion: vi.fn(),
            displayText: vi.fn(),
        };
        const matrixAMock = {
            setRow: vi.fn(),
            setColumn: vi.fn(),
        };
        const contextMock = {
            getMatrixA: vi.fn(() => matrixAMock),
            setCurrentState: vi.fn(),
        };

        terminalReaderMock.askQuestion.mockResolvedValue('5').mockResolvedValueOnce('not a number').mockResolvedValueOnce('3').mockResolvedValueOnce('invalid');

        const userMatrixADimensionsInputState = new UserMatrixADimensionsInputState(contextMock as unknown as Context, terminalReaderMock as unknown as TerminalReader)
        await userMatrixADimensionsInputState.next();

        expect(terminalReaderMock.askQuestion).toHaveBeenCalledWith(ROW_QSTN);
        expect(matrixAMock.setRow).toHaveBeenCalledWith(3);
        expect(terminalReaderMock.displayText).toHaveBeenCalledWith(
            `Az első dimenzió mérete, azaz a sorok száma: 3`
        );

        expect(terminalReaderMock.askQuestion).toHaveBeenCalledWith(COL_QSTN);
        expect(matrixAMock.setColumn).toHaveBeenCalledWith(5);
        expect(terminalReaderMock.displayText).toHaveBeenCalledWith(
            `A második dimenzió mérete, azaz az oszlopok száma: 5`
        );

        expect(terminalReaderMock.askQuestion).toHaveBeenCalledTimes(4);
    });
});
