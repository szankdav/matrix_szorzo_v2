import { beforeEach, describe, expect, it, vi } from "vitest";
import { validateAsIOrNLetter, validateAsAOrMOrKLetter, validateAsNaturalNumber, validateAsWholeNumber } from "./inputValidate";


describe('validateAsNaturalNumber tests', () => {
    beforeEach(() => {
        vi.spyOn(console, 'log').mockImplementation(() => { });
    });

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

describe('validateAsLetter tests', () => {
    beforeEach(() => {
        vi.spyOn(console, 'log').mockImplementation(() => { });
    });

    it('should return true if the given input is "a"', async () => {
        const res = validateAsAOrMOrKLetter("a");
        expect(res).toBe(true);
    })

    it('should return true if the given input is "m"', async () => {
        const res = validateAsAOrMOrKLetter("m");
        expect(res).toBe(true);
    })

    it('should return true if the given input is "k"', async () => {
        const res = validateAsAOrMOrKLetter("k");
        expect(res).toBe(true);
    })

    it('should return true if the given input is "A"', async () => {
        const res = validateAsAOrMOrKLetter("A");
        expect(res).toBe(true);
    })

    it('should return true if the given input is "M"', async () => {
        const res = validateAsAOrMOrKLetter("M");
        expect(res).toBe(true);
    })

    it('should return true if the given input is "K"', async () => {
        const res = validateAsAOrMOrKLetter("K");
        expect(res).toBe(true);
    })

    it('should return false if the given input is not in "a", "m", "k", or "A", "M", "K"', async () => {
        const res = validateAsAOrMOrKLetter("d");
        expect(res).toBe(false);
    })
})

describe('validateAsIOrNLetter tests', () => {
    beforeEach(() => {
        vi.spyOn(console, 'log').mockImplementation(() => { });
    });

    it('should return true if the given input is "i"', async () => {
        const res = validateAsIOrNLetter("i");
        expect(res).toBe(true);
    })

    it('should return true if the given input is "I"', async () => {
        const res = validateAsIOrNLetter("I");
        expect(res).toBe(true);
    })

    it('should return true if the given input is "n"', async () => {
        const res = validateAsIOrNLetter("n");
        expect(res).toBe(true);
    })

    it('should return true if the given input is "N"', async () => {
        const res = validateAsIOrNLetter("N");
        expect(res).toBe(true);
    })

    it('should return false if the given input is not in "i", n", "I", or "N"', async () => {
        const res = validateAsIOrNLetter("d");
        expect(res).toBe(false);
    })
})

describe('validateAsWholeNumber tests', () => {
    beforeEach(() => {
        vi.spyOn(console, 'log').mockImplementation(() => { });
    });

    it('should return true if the given input is a valid number', async () => {
        const res = validateAsWholeNumber("5")
        expect(res).equal(true)
    })

    it('should return false if the given input is not a number', async () => {
        const res = validateAsWholeNumber("d")
        expect(res).equal(false)
    })

    it('should return false if the given input is not a number', async () => {
        const res = validateAsWholeNumber("5d")
        expect(res).equal(false)
    })

    it('should return false if the given input is not one number', async () => {
        const res = validateAsWholeNumber("5 4")
        expect(res).equal(false)
    })
})