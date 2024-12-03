import { describe, it, expect } from "vitest";
import { createMatrix, fillMatrixWithRandomNumbers, pushNumberToMatrixElements } from "../utils/matrixUtils";

describe("createMatrix", () => {
  it("should create a matrix with the specified dimensions", () => {
    const rows = 3;
    const columns = 2;
    const matrix = createMatrix(rows, columns);
    
    expect(matrix.length).toBe(rows);
    expect(matrix[0].length).toBe(columns);
  });

  it("should initialize all elements to zero", () => {
    const rows = 2;
    const columns = 2;
    const matrix = createMatrix(rows, columns);
    
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        expect(matrix[i][j]).toBe(0);
      }
    }
  });

  it("should handle single row or column", () => {
    const rowMatrix = createMatrix(1, 3);
    const columnMatrix = createMatrix(3, 1);
    
    expect(rowMatrix.length).toBe(1);
    expect(rowMatrix[0].length).toBe(3);
    expect(columnMatrix.length).toBe(3);
    expect(columnMatrix[0].length).toBe(1);
  });

  it("should throw error for invalid dimensions", () => {
    expect(() => createMatrix(0, 2)).toThrow();
    expect(() => createMatrix(2, 0)).toThrow();
    expect(() => createMatrix(-1, 2)).toThrow();
    expect(() => createMatrix(2, -1)).toThrow();
  });

  it("should throw error for invalid inputs", () => {
    expect(() => createMatrix("not a number", 2)).toThrow();
    expect(() => createMatrix(2, "not a number")).toThrow();
    expect(() => createMatrix("not a number", "not a number")).toThrow();
  });

  it("should fill the matrix with random numbers", () => {
    const matrix = createMatrix(3, 3);
    const filledMatrix = fillMatrixWithRandomNumbers(matrix);
    expect(filledMatrix.length).toBe(3);
    expect(filledMatrix[0].length).toBe(3);
  });

  it("should fill the matrix with random numbers within the specified range", () => {
    const matrix = createMatrix(3, 3);
    const filledMatrix = fillMatrixWithRandomNumbers(matrix, 1, 100);
    expect(filledMatrix.length).toBe(3);
    expect(filledMatrix[0].length).toBe(3);
  });

  it("should throw error for invalid range", () => {
    const matrix = createMatrix(3, 3);
    expect(() => fillMatrixWithRandomNumbers(matrix, "not a number", "not a number")).toThrow();
  });

  it("should throw error for invalid matrix", () => {
    expect(() => fillMatrixWithRandomNumbers("not a matrix")).toThrow();
  });

  it("should return a new matrix with random numbers", () => {
    const matrix = createMatrix(3, 3);
    const filledMatrix = fillMatrixWithRandomNumbers(matrix, 1, 100);
    expect(filledMatrix).not.toBe(matrix);
  });

  it("should handle large matrices efficiently", () => {
    const matrix = createMatrix(1000, 1000);
    const filledMatrix = fillMatrixWithRandomNumbers(matrix, 1, 1000000);
    expect(filledMatrix.length).toBe(1000);
    expect(filledMatrix[0].length).toBe(1000);
  });

  it("should push number to the matrix's selected elements", () => {
    const matrix = createMatrix(3, 3);
    const numberToPush = 1;
    const selectedRowAndColumn = [1, 1];
    const pushedMatrix = pushNumberToMatrixElements(matrix, numberToPush, selectedRowAndColumn);
    expect(pushedMatrix.length).toBe(3);
    expect(pushedMatrix[0].length).toBe(3);
    expect(pushedMatrix[selectedRowAndColumn[0]][selectedRowAndColumn[1]]).toBe(numberToPush);
  });
});
