import { describe, expect, it, vi } from "vitest";

describe('terminalReader test', () => {
    it('should ask a question', async () => {
        const mockReader = {
            askQuestion: vi.fn().mockResolvedValue('5'),
        };

        await mockReader.askQuestion("Kérem a számot:");
        expect(mockReader.askQuestion).toHaveBeenCalledWith("Kérem a számot:");
    })

    it('should return with the answer', async () => {
        const mockReader = {
            askQuestion: vi.fn().mockResolvedValue('5'),
        };

        const result = await mockReader.askQuestion("Kérem a számot:");
        expect(result).toBe('5');
    })

    it('should display the given text to the console', async () => {
        const mockReader = {
            displayText: vi.fn().mockReturnValue('Test'),
        };

        const result = mockReader.displayText();

        expect(result).toBe("Test");
    })
})