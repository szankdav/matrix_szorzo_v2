"use strict";

const { Matrix } = require("./classes/matrix");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let rows;
let columns;

rl.question("Kérem adja meg a mátrix sorainak számát: ", (ans) => {
  rows = parseInt(ans);
  console.log("A mátrix sorainak száma: ", rows);
  rl.question("Kérem adja meg a mátrix oszlopainak számát: ", (ans) => {
    columns = parseInt(ans);
    console.log("A mátrix oszlopainak száma: ", columns);
    console.log(createMatrix(rows, columns));
    rl.close();
  });
});