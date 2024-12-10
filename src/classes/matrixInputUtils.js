class MatrixInputUtils {
  constructor(readline) {
    this.rl = readline;
  }

  askNumber(question) {
    return new Promise((resolve) => {
      this.rl.question(question, (answer) => {
        const num = parseInt(answer);
        if (answer.split(" ").length > 1) {
          console.log("Csak egy számot adhat meg!");
          resolve(null);
        } else if (num <= 0) {
          console.log("Csak pozitív számokat adhat meg!");
          resolve(null);
        } else if (isNaN(num)) {
          console.log("Csak számokat adhat meg!");
          resolve(null);
        } else {
          resolve(num);
        }
      });
    });
  }

  askRange() {
    return new Promise((resolve) => {
      this.rl.question(
        "Kérem adja meg a mátrix számok minimális és maximális értékét szóközzel elválasztva: ",
        (answer) => {
          const parts = answer.split(" ");
          if (parts.length !== 2) {
            console.log("Két számot kell megadni!");
            resolve({min: null, max: null});
          } else if (isNaN(parts[0]) || isNaN(parts[1])) {
            console.log("Csak számokat adhat meg!");
            resolve({min: null, max: null});
          } else if (parts[0] <= 0 || parts[1] <= 0) {
            console.log("Csak pozitív számokat adhat meg!");
            resolve({min: null, max: null});
          } else {
            const [min, max] = parts.map(Number);
            resolve({ min, max });
          }
        }
      );
    });
  }

  askRowAndColumn(matrix) {
    return new Promise((resolve) => {
      this.rl.question(
        "Kérem adja meg a mátrix sorának és oszlopának számát szóközzel elválasztva: ",
        (answer) => {
          const parts = answer.split(" ");
          if (parts.length !== 2) {
            console.log("Két számot kell megadni!");
            resolve(null);
          } else if (isNaN(parts[0]) || isNaN(parts[1])) {
            console.log("Csak számokat adhat meg!");
            resolve(null);
          } else if (parts[0] <= 0 || parts[1] <= 0) {
            console.log("Csak pozitív számokat adhat meg!");
            resolve(null);
          } else if (parts[0] > matrix.row || parts[1] > matrix.column) {
            console.log(
              "A sor és oszlop számoknak a mátrix határain belül kell lennie!"
            );
            resolve(null);
          } else {
            const result = parts.map((part) => parseInt(part) - 1);
            resolve(result);
          }
        }
      );
    });
  }

  askQuestionForContinue(question) {
    return new Promise((resolve) => {
        this.rl.question(question, (answer) => {
          if (answer === "i") {
            resolve(true);
          } else if (answer === "n") {
            resolve(false);
          } else {
            console.log("Csak i vagy n karaktert adhat meg!");
            resolve(null);
          }
        });
    });
  }
}

module.exports = MatrixInputUtils;
