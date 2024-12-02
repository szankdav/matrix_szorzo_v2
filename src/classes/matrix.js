class Matrix {
  constructor(row, column) {
    this.row = row;
    this.column = column;
  }
}

function createMatrix(row, column) {
  let matrix = new Matrix(row, column);
  matrix = Array.from({ length: matrix.row }, () =>
    new Array(matrix.column).fill(0)
  );

  return matrix;
}

function fillMatrixWithRandomNumbers(matrix) {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      matrix[i][j] = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
    }
  }
  return matrix;
}

module.exports = { Matrix, createMatrix, fillMatrixWithRandomNumbers };
