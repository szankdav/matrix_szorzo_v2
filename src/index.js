"use strict";

const Matrix = require("./classes/matrix");
const MatrixInputUtils = require("./classes/matrixInputUtils");
const { multiplyMatrices } = require("./classes/matrixOperations");
const readline = require("readline");

async function main() {
  try {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const inputUtils = new MatrixInputUtils(rl);

    console.log("Mátrix generálás bemutatása:");
    let rows;
    do {
      rows = await inputUtils.askNumber(
        "Kérem adja meg a mátrix sorainak számát: "
      );
    } while (rows == null);

    console.log("A mátrix sorainak száma: ", rows);

    let columns;
    do {
      columns = await inputUtils.askNumber(
        "Kérem adja meg a mátrix oszlopainak számát: "
      );
    } while (columns == null);

    console.log("A mátrix oszlopainak száma: ", columns);

    let response = {};
    do {
      response = await inputUtils.askRange();
    } while (response.min == null || response.max == null);

    console.log(
      "A mátrix számok minimális és maximális értéke: ",
      response.min,
      response.max
    );

    let matrix = new Matrix(rows, columns).fillWithRandomNumbers(
      response.min,
      response.max
    );
    console.log("A generált mátrix:");
    console.log(matrix.toString());

    console.log("Mátrix módosítás bemutatása:");
    console.log(
      "Mátrix módosításához kérem adja meg a módosítani kívánt sor és oszlop számát, valamint a hozzáadni kívánt számot!"
    );

    let modify_answer;
    do {
      let selectedRowAndColumn;
      do {
        selectedRowAndColumn = await inputUtils.askRowAndColumn(matrix);
      } while (selectedRowAndColumn == null);

      console.log(
        "A kiválasztott sor és oszlop száma: ",
        selectedRowAndColumn[0] + 1,
        selectedRowAndColumn[1] + 1
      );

      let numberToPush;
      do {
        numberToPush = await inputUtils.askNumber(
          "Kérem adja meg a hozzáadandó számot: "
        );
      } while (numberToPush == null);

      console.log("Az eredeti mátrix:");
      console.log(matrix.toString());

      matrix.setElement(
        selectedRowAndColumn[0],
        selectedRowAndColumn[1],
        numberToPush
      );
      console.log("A módosított mátrix:");
      console.log(matrix.toString());

      do {
        modify_answer = await inputUtils.askQuestionForContinue(
          "Szeretne még módosítani a mátrixon? (i/n): "
        );
      } while (modify_answer == null);
    } while (modify_answer == true);

    console.log("Két mátrix szorzásának bemutatása:");

    let multiply_answer;
    do {
      let a_matrix_row;
      do {
        a_matrix_row = await inputUtils.askNumber(
          "Kérem adja meg a mátrix_a sorainak számát: "
        );
      } while (a_matrix_row == null);

      let a_matrix_column;
      do {
        a_matrix_column = await inputUtils.askNumber(
          "Kérem adja meg a mátrix_a oszlopainak számát: "
        );
      } while (a_matrix_column == null);

      const matrix_a = new Matrix(
        a_matrix_row,
        a_matrix_column
      ).fillWithRandomNumbers();

      let b_matrix_row;
      do {
        b_matrix_row = await inputUtils.askNumber(
          "Kérem adja meg a mátrix_b sorainak számát: "
        );
      } while (b_matrix_row == null);

      if (b_matrix_row != a_matrix_column) {
        do {
          console.log(
            "A mátrix_b sorainak száma meg kell, hogy egyezzen a mátrix_a oszlopainak számával a szorzáshoz!"
          );
          do {
            b_matrix_row = await inputUtils.askNumber(
              "Kérem adja meg a mátrix_b sorainak számát: "
            );
          } while (b_matrix_row == null);
        } while (b_matrix_row != a_matrix_column);
      }

      let b_matrix_column;
      do {
        b_matrix_column = await inputUtils.askNumber(
          "Kérem adja meg a mátrix_b oszlopainak számát: "
        );
      } while (b_matrix_column == null);

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

      do {
        multiply_answer = await inputUtils.askQuestionForContinue(
          "Szeretne még mátrixokat összeszorozni? (i/n): "
        );
      } while (multiply_answer == null);
    } while (multiply_answer == true);
    console.log("A program vége!");
    process.exit(0);
  } catch (error) {
    console.error("Hiba történt:", error);
    process.exit(1);
  }
}

main();
