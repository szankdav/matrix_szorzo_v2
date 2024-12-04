import {Matrix} from '../classes/Matrix';

function multiplyMatrices(matrix_a, matrix_b) {
  if (matrix_a.column !== matrix_b.row) {
    return null;
  } else {
    let multipliedMatrix = new Matrix(matrix_a.row, matrix_b.column);
    const data_a = matrix_a.getData();
    const data_b = matrix_b.getData();

    for (let i = 0; i < multipliedMatrix.row; i++) {
      for (let j = 0; j < multipliedMatrix.column; j++) {
        let sum = 0;
        for (let k = 0; k < matrix_a.column; k++) {
          sum += data_a[i][k] * data_b[k][j];
        }
        multipliedMatrix.setElement(i, j, sum);
      }
    }
    return multipliedMatrix;
  }
}

module.exports = { multiplyMatrices };
