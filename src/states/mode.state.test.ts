import { describe, expect, it, vi } from "vitest";
import { ModeState } from "./mode.state";
import { Context } from "../core/context";
import { TerminalReader } from "../core/terminalReader";
import { UserMatrixADimensionsState } from "./userMatrixADimensionsState.state";
import { AutomateMatrixAState } from "./automateMatrixAState.state";

describe('ModeState tests', () => {
    it("should set context's currentState to null if answer is 'k' or 'K'", async () => {
        const context = new Context();
        const terminalReader = new TerminalReader();
        const modeState = new ModeState(context, terminalReader);
        vi.spyOn(terminalReader, 'askQuestion').mockResolvedValue('k');
        await modeState.next();
        expect(context.getCurrentState()).toBe(null);

        const mockContext = {
            getCurrentState: vi.fn().mockReturnValue(null),
        }

        const mockModeState = {
            next: vi.fn(),
        }

        mockModeState.next();

        expect(mockContext.getCurrentState()).toBe(null);
    })

    it("should call askQuestion again if answer is not 'k' or 'K'", async () => {
        const context = new Context();
        const terminalReader = new TerminalReader();
        const modeState = new ModeState(context, terminalReader);
        vi.spyOn(terminalReader, 'askQuestion').mockResolvedValue('k').mockResolvedValueOnce('f');
        await modeState.next();
        expect(terminalReader.askQuestion).toHaveBeenCalledTimes(2);
        expect(context.getCurrentState()).toBe(null);
    })

    it("should set context's currentState to matrixADimensionsState if answer is 'm' or 'M'", async () => {
        const context = new Context();
        const terminalReader = new TerminalReader();
        const modeState = new ModeState(context, terminalReader);
        vi.spyOn(terminalReader, 'askQuestion').mockResolvedValue('m');
        await modeState.next();
        expect(context.getCurrentState()).toBeInstanceOf(UserMatrixADimensionsState);

        const mockContext = {
            getCurrentState: vi.fn().mockReturnValue(UserMatrixADimensionsState),
        }

        const mockModeState = {
            next: vi.fn(),
        }

        mockModeState.next();

        expect(mockContext.getCurrentState()).toBe(UserMatrixADimensionsState);
    })

    it("should call askQuestion again if answer is not 'm' or 'M'", async () => {
        const context = new Context();
        const terminalReader = new TerminalReader();
        const modeState = new ModeState(context, terminalReader);
        vi.spyOn(terminalReader, 'askQuestion').mockResolvedValue('m').mockResolvedValueOnce('g');
        await modeState.next();
        expect(terminalReader.askQuestion).toHaveBeenCalledTimes(2);
        expect(context.getCurrentState()).toBeInstanceOf(UserMatrixADimensionsState);
    })

    it("should set context's currentState to createMatrixAState if answer is 'a' or 'A'", async () => {
        const context = new Context();
        const terminalReader = new TerminalReader();
        const modeState = new ModeState(context, terminalReader);
        vi.spyOn(terminalReader, 'askQuestion').mockResolvedValue('k');
        await modeState.next();
        expect(context.getCurrentState()).toBe(null);

        const mockContext = {
            getCurrentState: vi.fn().mockReturnValue(AutomateMatrixAState),
        }

        const mockModeState = {
            next: vi.fn(),
        }

        mockModeState.next();

        expect(mockContext.getCurrentState()).toBe(AutomateMatrixAState);
    })

    it("should call askQuestion again if answer is not 'a' or 'A'", async () => {
        const context = new Context();
        const terminalReader = new TerminalReader();
        const modeState = new ModeState(context, terminalReader);
        vi.spyOn(terminalReader, 'askQuestion').mockResolvedValue('a').mockResolvedValueOnce('g');
        await modeState.next();
        expect(terminalReader.askQuestion).toHaveBeenCalledTimes(2);
        expect(context.getCurrentState()).toBeInstanceOf(AutomateMatrixAState);
    })
})