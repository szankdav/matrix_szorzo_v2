import { describe, expect, it, vi } from "vitest";
import { Context } from "../core/context";
import { TerminalReader } from "../core/terminalReader";
import { StartState } from "./start.state";
import { ModeState } from "./mode.state";

describe('StartState tests', () => {
    it("should set context's currentState to ModeState", async () => {
        const context = new Context();
        const terminalReader = new TerminalReader();
        const startState = new StartState(context, terminalReader);
        await startState.next();
        expect(context.getCurrentState()).toBeInstanceOf(ModeState);

        const mockContext = {
            getCurrentState: vi.fn().mockReturnValue(ModeState),
        }

        const mockStartState = {
            next: vi.fn(),
        }

        mockStartState.next();

        expect(mockContext.getCurrentState()).toBe(ModeState);
    })
})