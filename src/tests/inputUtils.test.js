import MatrixInputUtils from "../classes/matrixInputUtils";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import Matrix from "../classes/matrix";

let inputUtils;

function mocked_rl_function(input_1 = 0, input_2 = 0) {
  let mocked_rl = {
    question: (_, call) => {
      if (input_1 != 0 && input_2 == 0) {
        call(input_1);
      } else if (input_1 != 0 && input_2 != 0) {
        call(input_1, input_2);
      }
    },
  };
  inputUtils = new MatrixInputUtils(mocked_rl);
}

describe("Matrix Input Functions", () => {
  describe("askNumber", () => {
    it("should resolve with a valid positive number", async () => {
      mocked_rl_function("5");
      let res = await inputUtils.askNumber("Enter a number: ");
      expect(res).equal(5);
    });

    it("should return null for invalid input", async () => {
      mocked_rl_function("d");
      let res = await inputUtils.askNumber("Enter a number: ");
      expect(res).equal(null);
    });

    it("should return null for negative input", async () => {
      mocked_rl_function("-5");
      let res = await inputUtils.askNumber("Enter a number: ");
      expect(res).equal(null);
    });
  });
  describe("askRange", async () => {
    it("should return with the number range to generate", async () => {
      mocked_rl_function("5 10");
      let res = await inputUtils.askRange();
      expect(res).toStrictEqual({ min: 5, max: 10 });
    });

    it("should return empty object for invalid input", async () => {
      mocked_rl_function("d 10");
      let res = await inputUtils.askRange();
      expect(res).toStrictEqual({min: null, max: null});
    });

    it("should return empty object for negative input", async () => {
      mocked_rl_function("-5 10");
      let res = await inputUtils.askRange();
      expect(res).toStrictEqual({min: null, max: null});
    });
  });

  describe("askRowAndColumn", () => {
    const testMatrix = new Matrix(3, 3);
    testMatrix.fillWithRandomNumbers();

    it("should resolve with valid row and column numbers", async () => {
      mocked_rl_function("2 2");
      let res = await inputUtils.askRowAndColumn(testMatrix);
      expect(res).toStrictEqual([1, 1]);
    });

    it("should return null if wrong amount of inputs provided", async () => {
      mocked_rl_function("1");
      let res = await inputUtils.askRowAndColumn(testMatrix);
      expect(res).equal(null);
    });

    it("should return null if non-numeric input provided", async () => {
      mocked_rl_function("d 5");
      let res = await inputUtils.askRowAndColumn(testMatrix);
      expect(res).equal(null);
    });

    it("should ask again if non-positive numbers provided", async () => {
      mocked_rl_function("-5 5");
      let res = await inputUtils.askRowAndColumn(testMatrix);
      expect(res).equal(null);
    });

    it("should return null if numbers are outside matrix bounds", async () => {
      mocked_rl_function("5 5");
      let res = await inputUtils.askRowAndColumn(testMatrix);
      expect(res).equal(null);
    });
  });

  describe("askQuestionForContinue", () => {
    it('should return true for "i"', async () => {
      mocked_rl_function("i");
      let res = await inputUtils.askQuestionForContinue("i");
      expect(res).equal(true);
    });

    it('should return false for "n"', async () => {
      mocked_rl_function("n");
      let res = await inputUtils.askQuestionForContinue("n");
      expect(res).equal(false);
    });

    it("should return null for invalid input", async () => {
      mocked_rl_function("g");
      let res = await inputUtils.askQuestionForContinue("g");
      expect(res).equal(null);
    });
  });
});
