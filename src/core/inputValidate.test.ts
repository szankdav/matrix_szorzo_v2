import { describe, expect, it } from "vitest";
import { validateAsLetter, validateAsNaturalNumber, validateAsWholeNumber } from "./inputValidate";


describe('validateAsNaturalNumber tests', () => {
    it('should return true if the given input is a valid number', async () => {
        const res = validateAsNaturalNumber('5')
        expect(res).equal(true)
    })

    it('should return false if the given input is not a number', async () => {
        const res = validateAsNaturalNumber("d")
        expect(res).equal(false)
    })

    it('should return false if the given input is a negative number', async () => {
        const res = validateAsNaturalNumber("-5")
        expect(res).equal(false)
    })
})

describe('LetterInputValidate tests', () => {
    it('should return true if the given input is "a"', async () => {
        const res = validateAsLetter("a");
        expect(res).toBe(true);
    })

    it('should return true if the given input is "m"', async () => {
        const res = validateAsLetter("m");
        expect(res).toBe(true);
    })

    it('should return true if the given input is "k"', async () => {
        const res = validateAsLetter("k");
        expect(res).toBe(true);
    })

    it('should return true if the given input is "A"', async () => {
        const res = validateAsLetter("A");
        expect(res).toBe(true);
    })

    it('should return true if the given input is "M"', async () => {
        const res = validateAsLetter("M");
        expect(res).toBe(true);
    })

    it('should return true if the given input is "K"', async () => {
        const res = validateAsLetter("K");
        expect(res).toBe(true);
    })

    it('should return false if the given input is not in "a", "m", "k", or "A", "M", "K"', async () => {
        const res = validateAsLetter("d");
        expect(res).toBe(false);
    })
})

describe('RangeInpuValidate tests', () => {
    it('should return the input as number if the given input is a valid number', async () => {
        const res = validateAsWholeNumber("5")
        expect(res).equal(5)
        expect(res).toBeTypeOf("number")
    })

    it('should return null if the given input is not a number', async () => {
        const res = validateAsWholeNumber("d")
        expect(res).equal(null)
        expect(res).toBeNull
    })

    it('should return null if the given input is not a number', async () => {
        const res = validateAsWholeNumber("5d")
        expect(res).equal(null)
        expect(res).toBeNull
    })
})