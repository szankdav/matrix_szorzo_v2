"use strict";

const { createMatrix, fillMatrixWithRandomNumbers, printMatrix, pushNumberToMatrixElements } = require("./utils/matrixUtils");
const { askNumber, askRange, askRowAndColumn, askQuestionForContinue, rl } = require("./utils/inputUtils");

async function main() {
  try {
    console.log("Mátrix generálás bemutatása:");
    const rows = await askNumber("Kérem adja meg a mátrix sorainak számát: ");
    console.log("A mátrix sorainak száma: ", rows);
    
    const columns = await askNumber("Kérem adja meg a mátrix oszlopainak számát: ");
    console.log("A mátrix oszlopainak száma: ", columns);

    const { min, max } = await askRange();
    console.log("A mátrix számok minimális és maximális értéke: ", min, max);
    let randomMatrix =  fillMatrixWithRandomNumbers(createMatrix(rows, columns), min, max);
    console.log("A generált mátrix:");
    console.log(printMatrix(randomMatrix));
    console.log("Mátrix módosítás bemutatása:");
    console.log("Mátrix módosításához kérem adja meg a módosítani kívánt sor és oszlop számát, valamint a hozzáadni kívánt számot!");
    do {
      const selectedRowAndColumn = await askRowAndColumn(randomMatrix);
      console.log("A kiválasztott sor és oszlop száma: ", selectedRowAndColumn);
      const numberToPush = await askNumber("Kérem adja meg a hozzáadandó számot: ");
      const pushedMatrix = pushNumberToMatrixElements(randomMatrix, numberToPush, selectedRowAndColumn);
      console.log("Az eredeti mátrix:");
      console.log(printMatrix(randomMatrix));
      console.log("A módosított mátrix:");
      console.log(printMatrix(pushedMatrix));
    } while (await askQuestionForContinue("Szeretne még módosítani a mátrixon? (i/n): ") === true);
  } catch (error) {
    console.error("Hiba történt:", error);
    rl.close();
  }
}

main();