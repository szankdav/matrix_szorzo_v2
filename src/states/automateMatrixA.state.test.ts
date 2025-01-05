import { describe, it, vi, expect } from 'vitest';
import { Context } from '../core/context';
import { TerminalReader } from '../core/terminalReader';
import { AutomateMatrixAState } from './automateMatrixA.state';
import { AutomateMatrixBState } from './automateMatrixB.state';

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
            createRandomMatrix: vi.fn(),
        };
        const contextMock = {
            getMatrixA: vi.fn(() => matrixAMock),
            setCurrentState: vi.fn(),
            getCurrentState: vi.fn(),
        };

        contextMock.getCurrentState.mockReturnValue(new AutomateMatrixBState(contextMock as unknown as Context, terminalReaderMock as unknown as TerminalReader));

        const automateMatrixAState = new AutomateMatrixAState(contextMock as unknown as Context, terminalReaderMock as unknown as TerminalReader)
        await automateMatrixAState.next();

        expect(contextMock.setCurrentState).toHaveBeenCalledWith(new AutomateMatrixBState(contextMock as unknown as Context, terminalReaderMock as unknown as TerminalReader));
        expect(contextMock.getCurrentState()).toBeInstanceOf(AutomateMatrixBState);
    })
});