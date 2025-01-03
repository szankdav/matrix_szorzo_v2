import { describe, expect, it, vi } from "vitest";
import { Context } from "../core/context";
import { TerminalReader } from "../core/terminalReader";
import { StartState } from "./start.state";
import { ModeState } from "./mode.state";

describe('StartState tests', () => {
    it("should set context's currentState to ModeState", async () => {
        const contextMock = {
            setCurrentState: vi.fn(),
            getCurrentState: vi.fn(),
        }

        const terminalReaderMock = {
            askQuestion: vi.fn(),
            displayText: vi.fn(),
        };

        contextMock.getCurrentState.mockReturnValue(new ModeState(contextMock as unknown as Context, terminalReaderMock as unknown as TerminalReader));
        const startState = new StartState(contextMock as unknown as Context, terminalReaderMock as unknown as TerminalReader);
        await startState.next();

        expect(contextMock.setCurrentState).toHaveBeenCalledWith(new ModeState(contextMock as unknown as Context, terminalReaderMock as unknown as TerminalReader));
        expect(contextMock.getCurrentState()).toBeInstanceOf(ModeState);
    })


    it("should call displayText with the given message", async () => {
        const START_MSG = '------------------Mátrixok szorzása------------------'

        const contextMock = {
            setCurrentState: vi.fn(),
            getCurrentState: vi.fn(),
        }

        const terminalReaderMock = {
            askQuestion: vi.fn(),
            displayText: vi.fn(),
        };

        const startState = new StartState(contextMock as unknown as Context, terminalReaderMock as unknown as TerminalReader);
        await startState.next();

        expect(terminalReaderMock.displayText).toHaveBeenCalledWith(START_MSG);
    })
})