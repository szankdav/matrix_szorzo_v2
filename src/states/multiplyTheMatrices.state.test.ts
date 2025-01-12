import { beforeEach, describe, expect, it, vi } from "vitest";
import { TerminalReader } from "../core/terminalReader";
import { Context } from "../core/context";
import { MultiplyTheMatricesState } from "./multiplyTheMatrices.state";
import { ModeState } from "./mode.state";
import * as asyncTimeout from "../utils/timeOut";


describe('randomWithRangeMatrixFillState next', () => {
    beforeEach(() => {
        vi.spyOn(console, 'log').mockImplementation(() => { });
    });

    it('should set multipliedMatrix data with the correct multiplied values', async () => {
        const mockMatrix_A = {
            getMatrixData: vi.fn().mockReturnValue([
                [2, 5],
                [7, 8],
            ]),
            getMatrixRow: vi.fn().mockReturnValue(2),
            getMatrixColumn: vi.fn().mockReturnValue(2),
        };

        const mockMatrix_B = {
            getMatrixData: vi.fn().mockReturnValue([
                [7, 2],
                [3, 4],
            ]),
            getMatrixRow: vi.fn().mockReturnValue(2),
            getMatrixColumn: vi.fn().mockReturnValue(2),
        };

        const contextMock = {
            setCurrentState: vi.fn(),
            getMatrixA: vi.fn(() => mockMatrix_A),
            getMatrixB: vi.fn(() => mockMatrix_B),
        };

        const terminalReaderMock = {
            displayText: vi.fn(),
            askQuestion: vi.fn(),
        }

        terminalReaderMock.askQuestion.mockResolvedValue("I");
        const multiplyTheMatricesState = new MultiplyTheMatricesState(contextMock as unknown as Context, terminalReaderMock as unknown as TerminalReader);
        //vi.spyOn(multiplyTheMatricesState, 'asyncTimeout').mockResolvedValue(undefined);
        const multipliedMatrixSpy = multiplyTheMatricesState['multipliedMatrix'];
        await multiplyTheMatricesState.next();

        expect(multipliedMatrixSpy.getMatrixData()).toEqual([[29, 24], [73, 46]]);
    })

    it('should display the correct text and the multiplied matrix on the console', async () => {
        const mockMatrix_A = {
            getMatrixData: vi.fn().mockReturnValue([
                [2, 5],
                [7, 8],
            ]),
            getMatrixRow: vi.fn().mockReturnValue(2),
            getMatrixColumn: vi.fn().mockReturnValue(2),
        };

        const mockMatrix_B = {
            getMatrixData: vi.fn().mockReturnValue([
                [7, 2],
                [3, 4],
            ]),
            getMatrixRow: vi.fn().mockReturnValue(2),
            getMatrixColumn: vi.fn().mockReturnValue(2),
        };

        const contextMock = {
            setCurrentState: vi.fn(),
            getMatrixA: vi.fn(() => mockMatrix_A),
            getMatrixB: vi.fn(() => mockMatrix_B),
        };

        const terminalReaderMock = {
            displayText: vi.fn(),
            askQuestion: vi.fn(),
        }

        terminalReaderMock.askQuestion.mockResolvedValue("I");
        const multiplyTheMatricesState = new MultiplyTheMatricesState(contextMock as unknown as Context, terminalReaderMock as unknown as TerminalReader);
        //vi.spyOn(multiplyTheMatricesState, 'asyncTimeout').mockResolvedValue(undefined);
        const multipliedMatrixSpy = multiplyTheMatricesState['multipliedMatrix'];
        const multipliedMatrixToStringSpy = vi.spyOn(multipliedMatrixSpy, 'toString');
        await multiplyTheMatricesState.next();

        expect(terminalReaderMock.displayText).toHaveBeenCalledWith("\nA mátrixok szorzásával létrejött mátrix:");
        expect(multipliedMatrixToStringSpy).toHaveBeenCalled();
    })

    it('should display the correct text and the multiplied matrix on the console in development mode', async () => {
        const mockMatrix_A = {
            getMatrixData: vi.fn().mockReturnValue([
                [2, 5],
                [7, 8],
            ]),
            getMatrixRow: vi.fn().mockReturnValue(2),
            getMatrixColumn: vi.fn().mockReturnValue(2),
        };

        const mockMatrix_B = {
            getMatrixData: vi.fn().mockReturnValue([
                [7, 2],
                [3, 4],
            ]),
            getMatrixRow: vi.fn().mockReturnValue(2),
            getMatrixColumn: vi.fn().mockReturnValue(2),
        };

        const contextMock = {
            setCurrentState: vi.fn(),
            getMatrixA: vi.fn(() => mockMatrix_A),
            getMatrixB: vi.fn(() => mockMatrix_B),
        };

        const terminalReaderMock = {
            displayText: vi.fn(),
            askQuestion: vi.fn(),
        }

        terminalReaderMock.askQuestion.mockResolvedValue("I");
        const multiplyTheMatricesState = new MultiplyTheMatricesState(contextMock as unknown as Context, terminalReaderMock as unknown as TerminalReader);
        vi.spyOn(asyncTimeout, 'asyncTimeout').mockResolvedValue(undefined);
        const multipliedMatrixSpy = multiplyTheMatricesState['multipliedMatrix'];
        const multipliedMatrixToStringSpy = vi.spyOn(multipliedMatrixSpy, 'toString');
        process.env.NODE_ENV = "development";
        await multiplyTheMatricesState.next();
        process.env.NODE_ENV = "production";

        expect(terminalReaderMock.displayText).toHaveBeenCalledWith("\nA mátrixok szorzásával létrejött mátrix:");
        expect(terminalReaderMock.displayText).toHaveBeenCalledWith("1. sor 1. oszlopérték: [2] szorozva 1. sor 1. oszlopérték: [7] ---> [2 * 7]");
        expect(multipliedMatrixToStringSpy).toHaveBeenCalled();
    })

    it("should set context's currentState to ModeState", async () => {
        const mockMatrix_A = {
            getMatrixData: vi.fn().mockReturnValue([
                [2, 5],
                [7, 8],
            ]),
            getMatrixRow: vi.fn().mockReturnValue(2),
            getMatrixColumn: vi.fn().mockReturnValue(2),
        };

        const mockMatrix_B = {
            getMatrixData: vi.fn().mockReturnValue([
                [7, 2],
                [3, 4],
            ]),
            getMatrixRow: vi.fn().mockReturnValue(2),
            getMatrixColumn: vi.fn().mockReturnValue(2),
        };

        const contextMock = {
            setCurrentState: vi.fn(),
            getCurrentState: vi.fn(),
            getMatrixA: vi.fn(() => mockMatrix_A),
            getMatrixB: vi.fn(() => mockMatrix_B),
        };

        const terminalReaderMock = {
            displayText: vi.fn(),
            askQuestion: vi.fn(),
        }

        terminalReaderMock.askQuestion.mockResolvedValue("I");
        contextMock.getCurrentState.mockReturnValue(new ModeState(contextMock as unknown as Context, terminalReaderMock as unknown as TerminalReader));
        const multiplyTheMatricesState = new MultiplyTheMatricesState(contextMock as unknown as Context, terminalReaderMock as unknown as TerminalReader);
        //vi.spyOn(multiplyTheMatricesState, 'asyncTimeout').mockResolvedValue(undefined);
        await multiplyTheMatricesState.next();

        expect(contextMock.setCurrentState).toHaveBeenCalledWith(expect.any(ModeState));
        expect(contextMock.getCurrentState()).toBeInstanceOf(ModeState);
    })
})