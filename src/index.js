"use strict";

const Matrix = require("./classes/matrix");
const {
  askNumber,
  askRange,
  askRowAndColumn,
  askQuestionForContinue,
} = require("./utils/inputUtils");
const { multiplyMatrices } = require("./classes/matrixOperations");

async function main() {
  try {
    console.log("Mátrix generálás bemutatása:");
    const rows = await askNumber("Kérem adja meg a mátrix sorainak számát: ");
    console.log("A mátrix sorainak száma: ", rows);

    const columns = await askNumber(
      "Kérem adja meg a mátrix oszlopainak számát: "
    );
    console.log("A mátrix oszlopainak száma: ", columns);

    const { min, max } = await askRange();
    console.log("A mátrix számok minimális és maximális értéke: ", min, max);

    let matrix = new Matrix(rows, columns).fillWithRandomNumbers(min, max);
    console.log("A generált mátrix:");
    console.log(matrix.toString());

    console.log("Mátrix módosítás bemutatása:");
    console.log(
      "Mátrix módosításához kérem adja meg a módosítani kívánt sor és oszlop számát, valamint a hozzáadni kívánt számot!"
    );

    do {
      const selectedRowAndColumn = await askRowAndColumn(matrix);
      console.log(
        "A kiválasztott sor és oszlop száma: ",
        selectedRowAndColumn[0] + 1,
        selectedRowAndColumn[1] + 1
      );

      const numberToPush = await askNumber(
        "Kérem adja meg a hozzáadandó számot: "
      );

      console.log("Az eredeti mátrix:");
      console.log(matrix.toString());

      matrix.setElement(
        selectedRowAndColumn[0],
        selectedRowAndColumn[1],
        numberToPush
      );
      console.log("A módosított mátrix:");
      console.log(matrix.toString());
    } while (
      await askQuestionForContinue(
        "Szeretne még módosítani a mátrixon? (i/n): "
      )
    );

    console.log("Két mátrix szorzásának bemutatása:");
    do {
      const a_matrix_row = await askNumber(
        "Kérem adja meg a mátrix_a sorainak számát: "
      );
      const a_matrix_column = await askNumber(
        "Kérem adja meg a mátrix_a oszlopainak számát: "
      );
      const matrix_a = new Matrix(
        a_matrix_row,
        a_matrix_column
      ).fillWithRandomNumbers();
      const b_matrix_row = await askNumber(
        "Kérem adja meg a mátrix_b sorainak számát: "
      );
      const b_matrix_column = await askNumber(
        "Kérem adja meg a mátrix_b oszlopainak számát: "
      );
      const matrix_b = new Matrix(
        b_matrix_row,
        b_matrix_column
      ).fillWithRandomNumbers();
      console.log("Az a mátrix feltöltve véletlen számokkal:");
      console.log(matrix_a.toString());
      console.log("A b mátrix feltöltve véletlen számokkal:");
      console.log(matrix_b.toString());

      const result = multiplyMatrices(matrix_a, matrix_b);
      if (result !== null) {
        console.log("A két mátrix szorzata:");
        console.log(result.toString());
      } else {
        console.log("A két mátrix nem szorozható össze!");
      }
    } while (
      await askQuestionForContinue(
        "Szeretne még mátrixokat összeszorozni? (i/n): "
      )
    );
    console.log("A program vége!");
    process.exit(0);
  } catch (error) {
    console.error("Hiba történt:", error);
    process.exit(1);
  }
}

main();
