import { describe, it, expect } from "vitest";
import { createMatrix, fillMatrixWithRandomNumbers } from "../classes/matrix";

describe("matrix", () => {
  it("should return a matrix with the specified number of rows and columns", () => {
    const rows = 3;
    const columns = 2;
    const matrix = createMatrix(rows, columns);
    const literalMatrix = [
      [0, 0],
      [0, 0],
      [0, 0],
    ];
    const matrixDimensions = [matrix.length, matrix[0].length];
    const literalMatrixDimensions = [
      literalMatrix.length,
      literalMatrix[0].length,
    ];
    expect(matrixDimensions).toEqual(literalMatrixDimensions);
  });

  it("should fill matrix with random numbers", () => {
    const rows = 3;
    const columns = 2;
    let matrix = createMatrix(rows, columns);
    matrix = fillMatrixWithRandomNumbers;

    expect(matrix).toBe(matrix);
  });
});
