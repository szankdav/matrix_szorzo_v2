import { describe, expect, it, vi } from "vitest";
import { ModeState } from "./mode.state";
import { Context } from "../core/context";
import { TerminalReader } from "../core/terminalReader";
import { UserMatrixADimensionsInputState } from "./userMatrixADimensionsInputState.state";
import { AutomateMatrixAState } from "./automateMatrixAState.state";

describe('ModeState tests', () => {
    it("should set context's currentState to null if answer is 'k' or 'K'", async () => {
        const contextMock = {
            setCurrentState: vi.fn(),
            getCurrentState: vi.fn(),
        }

        const terminalReaderMock = {
            askQuestion: vi.fn(),
            displayText: vi.fn(),
        };

        terminalReaderMock.askQuestion.mockResolvedValue('k');
        contextMock.getCurrentState.mockReturnValue(null);
        const modeState = new ModeState(contextMock as unknown as Context, terminalReaderMock as unknown as TerminalReader);
        await modeState.next();

        expect(terminalReaderMock.askQuestion).toHaveBeenCalledWith("Válaszott mód: ['A'/'M'/'K']: ");
        expect(contextMock.setCurrentState).toHaveBeenCalledWith(null);
        expect(contextMock.getCurrentState()).toBe(null);
    })

    it("should call askQuestion again if answer is not 'k' or 'K'", async () => {
        const contextMock = {
            setCurrentState: vi.fn(),
            getCurrentState: vi.fn(),
        }

        const terminalReaderMock = {
            askQuestion: vi.fn(),
            displayText: vi.fn(),
        };

        terminalReaderMock.askQuestion.mockResolvedValue('k').mockResolvedValueOnce('f');
        const modeState = new ModeState(contextMock as unknown as Context, terminalReaderMock as unknown as TerminalReader);
        await modeState.next();

        expect(terminalReaderMock.askQuestion).toHaveBeenCalledWith("Válaszott mód: ['A'/'M'/'K']: ");
        expect(terminalReaderMock.askQuestion).toHaveBeenCalledTimes(2);
    })

    it("should set context's currentState to userMatrixADimensionsInputState if answer is 'm' or 'M'", async () => {
        const contextMock = {
            setCurrentState: vi.fn(),
            getCurrentState: vi.fn(),
        }

        const terminalReaderMock = {
            askQuestion: vi.fn(),
            displayText: vi.fn(),
        };

        terminalReaderMock.askQuestion.mockResolvedValue('m');
        contextMock.getCurrentState.mockReturnValue(new UserMatrixADimensionsInputState(contextMock as unknown as Context, terminalReaderMock as unknown as TerminalReader));

        const modeState = new ModeState(contextMock as unknown as Context, terminalReaderMock as unknown as TerminalReader);
        await modeState.next();
        expect(terminalReaderMock.askQuestion).toHaveBeenCalledWith("Válaszott mód: ['A'/'M'/'K']: ");
        expect(contextMock.setCurrentState).toHaveBeenCalledWith(new UserMatrixADimensionsInputState(contextMock as unknown as Context, terminalReaderMock as unknown as TerminalReader));
        expect(contextMock.getCurrentState()).toBeInstanceOf(UserMatrixADimensionsInputState);
    })

    it("should call askQuestion again if answer is not 'm' or 'M'", async () => {
        const contextMock = {
            setCurrentState: vi.fn(),
            getCurrentState: vi.fn(),
        }

        const terminalReaderMock = {
            askQuestion: vi.fn(),
            displayText: vi.fn(),
        };

        terminalReaderMock.askQuestion.mockResolvedValue('m').mockResolvedValueOnce('r');

        const modeState = new ModeState(contextMock as unknown as Context, terminalReaderMock as unknown as TerminalReader);
        await modeState.next();
        expect(terminalReaderMock.askQuestion).toHaveBeenCalledWith("Válaszott mód: ['A'/'M'/'K']: ");
        expect(terminalReaderMock.askQuestion).toHaveBeenCalledTimes(2);
    })

    it("should set context's currentState to automateMatrixAState if answer is 'a' or 'A'", async () => {
        const contextMock = {
            setCurrentState: vi.fn(),
            getCurrentState: vi.fn(),
        }

        const terminalReaderMock = {
            askQuestion: vi.fn(),
            displayText: vi.fn(),
        };

        terminalReaderMock.askQuestion.mockResolvedValue('a');
        contextMock.getCurrentState.mockReturnValue(new AutomateMatrixAState(contextMock as unknown as Context, terminalReaderMock as unknown as TerminalReader));

        const modeState = new ModeState(contextMock as unknown as Context, terminalReaderMock as unknown as TerminalReader);
        await modeState.next();
        expect(terminalReaderMock.askQuestion).toHaveBeenCalledWith("Válaszott mód: ['A'/'M'/'K']: ");
        expect(contextMock.setCurrentState).toHaveBeenCalledWith(new AutomateMatrixAState(contextMock as unknown as Context, terminalReaderMock as unknown as TerminalReader));
        expect(contextMock.getCurrentState()).toBeInstanceOf(AutomateMatrixAState);
    })

    it("should call askQuestion again if answer is not 'a' or 'A'", async () => {
        const contextMock = {
            setCurrentState: vi.fn(),
            getCurrentState: vi.fn(),
        }

        const terminalReaderMock = {
            askQuestion: vi.fn(),
            displayText: vi.fn(),
        };

        terminalReaderMock.askQuestion.mockResolvedValue('a').mockResolvedValueOnce('r');

        const modeState = new ModeState(contextMock as unknown as Context, terminalReaderMock as unknown as TerminalReader);
        await modeState.next();
        expect(terminalReaderMock.askQuestion).toHaveBeenCalledWith("Válaszott mód: ['A'/'M'/'K']: ");
        expect(terminalReaderMock.askQuestion).toHaveBeenCalledTimes(2);
    })
})