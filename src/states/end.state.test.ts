import { beforeEach, describe, expect, it, vi } from "vitest";
import { ModeState } from "./mode.state";
import { Context } from "../core/context";
import { TerminalReader } from "../core/terminalReader";
import { EndState } from "./end.state";

describe('EndState tests', () => {
    beforeEach(() => {
        vi.spyOn(console, 'log').mockImplementation(() => { });
    });

    it("should call displayText with the given message", async () => {
        const contextMock = {
            setCurrentState: vi.fn(),
            getCurrentState: vi.fn(),
        }

        const terminalReaderMock = {
            askQuestion: vi.fn(),
            displayText: vi.fn(),
        };

        const exitSpy = vi.spyOn(process, "exit").mockImplementation(((code?: number) => {
            console.log(`Mocked process.exit(${code})`);
          }) as typeof process.exit);

        terminalReaderMock.askQuestion.mockResolvedValue('k');
        contextMock.getCurrentState.mockReturnValue(null);
        const endState = new EndState(contextMock as unknown as Context, terminalReaderMock as unknown as TerminalReader);
        await endState.next();

        expect(terminalReaderMock.displayText).toHaveBeenCalledWith("A program kilép!");

        exitSpy.mockRestore();
    })

    it("should set context's currentState to null", async () => {
        const contextMock = {
            setCurrentState: vi.fn(),
            getCurrentState: vi.fn(),
        }

        const terminalReaderMock = {
            askQuestion: vi.fn(),
            displayText: vi.fn(),
        };

        const exitSpy = vi.spyOn(process, "exit").mockImplementation(((code?: number) => {
          console.log(`Mocked process.exit(${code})`);
        }) as typeof process.exit);

        terminalReaderMock.askQuestion.mockResolvedValue('k');
        contextMock.getCurrentState.mockReturnValue(null);
        const endState = new EndState(contextMock as unknown as Context, terminalReaderMock as unknown as TerminalReader);
        await endState.next();

        expect(contextMock.setCurrentState).toHaveBeenCalledWith(null);
        expect(contextMock.getCurrentState()).toBe(null);

        exitSpy.mockRestore();
    })

    it("should set call process.exit(0)", async () => {
        const contextMock = {
            setCurrentState: vi.fn(),
            getCurrentState: vi.fn(),
        }

        const terminalReaderMock = {
            askQuestion: vi.fn(),
            displayText: vi.fn(),
        };

        const exitSpy = vi.spyOn(process, "exit").mockImplementation(((code?: number) => {
          console.log(`Mocked process.exit(${code})`);
        }) as typeof process.exit);

        terminalReaderMock.askQuestion.mockResolvedValue('k');
        contextMock.getCurrentState.mockReturnValue(null);
        const endState = new EndState(contextMock as unknown as Context, terminalReaderMock as unknown as TerminalReader);
        await endState.next();

        expect(exitSpy).toHaveBeenCalledWith(0);

        exitSpy.mockRestore();
    })
})