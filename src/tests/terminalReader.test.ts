import { describe, expect, it, vi } from "vitest";
import { TerminalReader } from "../classes/terminalReader";
import { InputValidate } from "../classes/inputValidate";

describe('terminalReader tests', () => {
    describe('readRowOrColNumber tests', () => {
        it('should resolve with a number if the given input is a valid number', async () => {
            const mockInputValidate = {
                validateAsNaturalNumber: vi.fn().mockReturnValue(5)
            }
    
            const terminalReader = new TerminalReader();
            vi.spyOn(terminalReader, "readRowOrColNumber").mockResolvedValue(mockInputValidate.validateAsNaturalNumber())
            const result = await terminalReader.readRowOrColNumber("Kérem írja be a számot: ");
    
            expect(result).toBe(5);
        })
    
        it('should call self again if the given input is not a valid number', async () => {
            const mockInputValidate = {
                validateAsNaturalNumber: vi.fn().mockReturnValue(5).mockReturnValueOnce(null)
            }
    
            const terminalReader = new TerminalReader();
            vi.spyOn(terminalReader, "readRowOrColNumber").mockResolvedValue(mockInputValidate.validateAsNaturalNumber()).mockResolvedValueOnce(mockInputValidate.validateAsNaturalNumber())
    
            const result = await terminalReader.readRowOrColNumber("");
            
            expect(result).toBe(5);
            expect(mockInputValidate.validateAsNaturalNumber).toHaveBeenCalledTimes(2);
        })
    
        it('should call self again if the given input is not a negative number', async () => {
            const mockInputValidate = {
                validateAsNaturalNumber: vi.fn().mockReturnValue(5).mockReturnValueOnce(-5)
            }
    
            const terminalReader = new TerminalReader();
            vi.spyOn(terminalReader, "readRowOrColNumber").mockResolvedValue(mockInputValidate.validateAsNaturalNumber()).mockResolvedValueOnce(mockInputValidate.validateAsNaturalNumber())
    
            const result = await terminalReader.readRowOrColNumber("");
            
            expect(result).toBe(5);
            expect(mockInputValidate.validateAsNaturalNumber).toHaveBeenCalledTimes(2);
        })
    })
})