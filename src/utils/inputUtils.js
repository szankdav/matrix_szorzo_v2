const readline = require("readline");

function createInterface() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
}

function askQuestion(question) {
  return new Promise((resolve) => {
    const rl = createInterface();
    const ask = () => {
      rl.question(question, (answer) => {
        const num = parseInt(answer);
        if (num <= 0) {
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
          ask();
        } else if (isNaN(parts[0]) || isNaN(parts[1])) {
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

function askRowAndColumn() {
  return new Promise((resolve) => {
    const rl = createInterface();
    const ask = () => {
      rl.question("Kérem adja meg a mátrix sorának és oszlopának indexét szóközzel elválasztva: ", (answer) => {
        const parts = answer.split(" ");
        if (parts.length !== 2) {
          ask();
        } else if (isNaN(parts[0]) || isNaN(parts[1])) {
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

module.exports = {
  askQuestion,
  askRange,
  askRowAndColumn,
  createInterface
}; 