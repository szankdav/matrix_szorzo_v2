function createMatrix(row, column) {
  if (row <= 0 || column <= 0) {
    throw new Error("A mátrix dimenziói nem lehetnek negatívak vagy nulla.");
  }

  if (typeof row !== "number" || typeof column !== "number") {
    throw new Error("A mátrix dimenziói csak számok lehetnek.");
  }

  return Array.from({ length: row }, () =>
    new Array(column).fill(0)
  );
}

function fillMatrixWithRandomNumbers(matrix, min = 1, max = 100) {
  if (!Array.isArray(matrix) || !Array.isArray(matrix[0])) {
    throw new Error("A bemenet nem egy érvényes mátrix.");
  }

  if (typeof min !== "number" || typeof max !== "number") {
    throw new Error("A min és max értékeknek számoknak kell lennie.");
  }

  return matrix.map(row => 
    row.map(() => Math.floor(Math.random() * (max - min + 1)) + min)
  );
}

function pushNumberToMatrixElements(matrix, numberToPush, selectedRowAndColumn) {
  if (!Array.isArray(matrix) || !Array.isArray(matrix[0])) {
    throw new Error("A bemenet nem egy érvényes mátrix.");
  }

  if (typeof numberToPush !== "number") {
    throw new Error("A hozzáadandó értéknek számnak kell lennie.");
  }

  if (!Array.isArray(selectedRowAndColumn) || selectedRowAndColumn.length !== 2) {
    throw new Error("A sor és oszlop indexeknek tömbnek kell lennie.");
  }

  if (typeof selectedRowAndColumn[0] !== "number" || typeof selectedRowAndColumn[1] !== "number") {
    throw new Error("A sor és oszlop indexeknek számoknak kell lennie.");
  }

  if (selectedRowAndColumn[0] < 0 || selectedRowAndColumn[1] < 0) {
    throw new Error("A sor és oszlop indexeknek pozitív számoknak kell lennie.");
  }

  if (selectedRowAndColumn[0] - 1 >= matrix.length || selectedRowAndColumn[1] - 1 >= matrix[0].length) {
    throw new Error("A sor és oszlop indexeknek a mátrix határain belül kell lennie.");
  }

  return matrix.map((row, rowIndex) => 
    row.map((element, columnIndex) => 
      rowIndex === selectedRowAndColumn[0] - 1 && columnIndex === selectedRowAndColumn[1] - 1 ? element = numberToPush : element
    )
  );
}

function printMatrix(matrix) {
  return matrix.map(row => row.join(" ")).join("\n");
}

module.exports = { createMatrix, fillMatrixWithRandomNumbers, pushNumberToMatrixElements, printMatrix }; 