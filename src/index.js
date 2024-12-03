"use strict";

const { createMatrix, fillMatrixWithRandomNumbers } = require("./utils/matrixUtils");
const { askQuestion, askRange, rl } = require("./utils/inputUtils");

async function main() {
  try {
    const rows = await askQuestion("Kérem adja meg a mátrix sorainak számát: ");
    console.log("A mátrix sorainak száma: ", rows);
    
    const columns = await askQuestion("Kérem adja meg a mátrix oszlopainak számát: ");
    console.log("A mátrix oszlopainak száma: ", columns);
    
    console.log(createMatrix(rows, columns));

    const { min, max } = await askRange();
    console.log("A mátrix számok minimális és maximális értéke: ", min, max);
    console.log(fillMatrixWithRandomNumbers(createMatrix(rows, columns), min, max));
  } catch (error) {
    console.error("Hiba történt:", error);
    rl.close();
  }
}

main();