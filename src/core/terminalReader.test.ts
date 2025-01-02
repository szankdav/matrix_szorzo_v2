import { describe, expect, it, vi } from "vitest";
import { TerminalReader } from "./terminalReader";


describe('terminalReader test', () => {
    it('should ask a question', async () => {
        const mockReader = {
            askQuestion: vi.fn().mockResolvedValue('5'),
        } as unknown as TerminalReader;

        const result = await mockReader.askQuestion("Kérem a számot:");
        expect(mockReader.askQuestion).toHaveBeenCalledWith("Kérem a számot:");
    })

    it('should return with the answer', async () => {
        const mockReader = {
            askQuestion: vi.fn().mockResolvedValue('5'),
        } as unknown as TerminalReader;

        const result = await mockReader.askQuestion("Kérem a számot:");
        expect(result).toBe('5');
    })

    it('should display the given text to the console', async () => {
        const reader = new TerminalReader();
        const logSpy = vi.spyOn(console, 'log');
        reader.displayText("Test");
        expect(logSpy).toHaveBeenCalledWith("Test");
    })
})