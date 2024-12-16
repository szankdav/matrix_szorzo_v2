import { describe, expect, it } from "vitest";
import { InputValidate } from "../classes/inputValidate";


describe('NumberInputValidate tests', () => {
    it('should return the input as number if the given input is a valid number', async () => {
        const validator: InputValidate = new InputValidate()
        const res = validator.validateAsNumber("5")
        expect(res).equal(5)
        expect(res).toBeTypeOf("number")
    })

    it('should return null if the given input is not a number', async () => {
        const validator: InputValidate = new InputValidate()
        const res = validator.validateAsNumber("d")
        expect(res).equal(null)
        expect(res).toBeNull
    })

    it('should call self again if the given input is a negative number', async () => {
        const validator: InputValidate = new InputValidate()
        const res = validator.validateAsNumber("-5")
        expect(res).equal(null)
        expect(res).toBeNull
    })
})

describe('TextInputValidate tests', () => {
    it('should return true if the given input is "i"', async () => {
        const validator = new InputValidate();
        const res = validator.validateAsIOrN("i");
        expect(res).toBe(true);
    })

    it('should return true if the given input is "n"', async () => {
        const validator = new InputValidate();
        const res = validator.validateAsIOrN("n");
        expect(res).toBe(true);
    })

    it('should return true if the given input is "I"', async () => {
        const validator = new InputValidate();
        const res = validator.validateAsIOrN("I");
        expect(res).toBe(true);
    })

    it('should return true if the given input is "N"', async () => {
        const validator = new InputValidate();
        const res = validator.validateAsIOrN("N");
        expect(res).toBe(true);
    })

    it('should return false if the given input is not in "i", "n", "I", or "N"', async () => {
        const validator = new InputValidate();
        const res = validator.validateAsIOrN("d");
        expect(res).toBe(false);
    })
})