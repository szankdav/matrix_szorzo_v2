const readline = require("readline");

function createInterface() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
}

function askNumber(question) {
  return new Promise((resolve) => {
    const rl = createInterface();
    const ask = () => {
      rl.question(question, (answer) => {
        const num = parseInt(answer);
        if (num <= 0) {
          console.log("Csak pozitív számokat adhat meg!");
          ask();
        } else if (isNaN(num)) {
          console.log("Csak számokat adhat meg!");
          ask();
        } else {
          rl.close();
          resolve(num);
        }
      });
    };
    ask();
  });
}

function askRange() {
  return new Promise((resolve) => {
    const rl = createInterface();
    const ask = () => {
      rl.question("Kérem adja meg a mátrix számok minimális és maximális értékét szóközzel elválasztva: ", (answer) => {
        const parts = answer.split(" ");
        if (parts.length !== 2) {
          console.log("Két számot kell megadni!");
          ask();
        } else if (isNaN(parts[0]) || isNaN(parts[1])) {
          console.log("Csak számokat adhat meg!");
          ask();
        } else {
          const [min, max] = parts.map(Number);
          rl.close();
          resolve({ min, max });
        }
      });
    };
    ask();
  });
}

function askRowAndColumn(matrix) {
  return new Promise((resolve) => {
    const rl = createInterface();
    const ask = () => {
      rl.question("Kérem adja meg a mátrix sorának és oszlopának számát szóközzel elválasztva: ", (answer) => {
        const parts = answer.split(" ");
        if (parts.length !== 2) {
          console.log("Két számot kell megadni!");
          ask();
        } else if (isNaN(parts[0]) || isNaN(parts[1])) {
          console.log("Csak számokat adhat meg!");
          ask();
        } else if (parts[0] <= 0 || parts[1] <= 0) {
          console.log("Csak pozitív számokat adhat meg!");
          ask();
        } else if (parts[0] > matrix.length || parts[1] > matrix[0].length) {
          console.log("A sor és oszlop számoknak a mátrix határain belül kell lennie!");
          ask();
        } else {
          rl.close();
          const result = parts.map(Number);
          resolve(result);
        }
      });
    };
    ask();
  });
}

function askQuestionForContinue(question) {
  return new Promise((resolve) => {
    const rl = createInterface();
    rl.question(question, (answer) => {
      if (answer === "i") { 
        resolve(true);
      } else if (answer === "n") {
        resolve(false);
      } else {
        console.log("Csak i vagy n karaktert adhat meg!");
        askQuestionForContinue(question);
      }
    });
  });
}

module.exports = {
  askNumber,
  askRange,
  askRowAndColumn,
  createInterface,
  askQuestionForContinue
}; 