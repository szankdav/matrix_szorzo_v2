import { describe, expect, it, vi } from "vitest";
import { TerminalReader } from "./terminalReader";

describe('terminalReader test', () => {
    it('should ask a question', async () => {
        const terminalReader = new TerminalReader();
        vi.spyOn(terminalReader, 'askQuestion');
        terminalReader.askQuestion("Kérem a számot:");
        expect(terminalReader.askQuestion).toHaveBeenCalledWith("Kérem a számot:");
    })

    it('should return with the answer', async () => {
        const terminalReader = new TerminalReader();
        vi.spyOn(terminalReader, 'askQuestion').mockResolvedValue("5");
        const result = await terminalReader.askQuestion("Kérem a számot:");
        expect(result).toBe("5");
    })

    it('should display the given text to the console', async () => {
        const terminalReader = new TerminalReader();
        vi.spyOn(terminalReader, 'displayText');
        vi.spyOn(console, 'log');
        terminalReader.displayText("Kérem a számot:");
        expect(console.log).toHaveBeenCalledWith("Kérem a számot:");
    })
})