import { Matrix } from "./classes/matrix";
import { TerminalReader } from "./classes/terminalReader";

const main = async () => {
    // Letrehozzuk a readert a user inputok terminalrol torteno fogadasahoz
    const reader: TerminalReader = new TerminalReader();
    // Letrehozunk egy uj matrixot
    const matrix: Matrix = new Matrix();
    // Meghivjuk a matrix setNumberForRow fuggvenyt, ami az osztalyon belul az aktualisan beallitott allapot megfelelo fuggvenyet fogja meghivni
    await matrix.setNumberForRow(reader);
    console.log(matrix.row);
    // Meghivjuk a matrix setNumberForColumn fuggvenyt, ami az osztalyon belul az aktualisan beallitott allapot megfelelo fuggvenyet fogja meghivni
    await matrix.setNumberForColumn(reader);
    console.log(matrix.column);
    console.log(`Rownumbers: ${matrix.row}, columnumbers: ${matrix.column}`);
    // Meghivjuk a matrix generateMatrix fuggvenyt, ami az osztalyon belul az aktualisan beallitott allapot megfelelo fuggvenyet fogja meghivni
    matrix.generateMatrix();
    // Meghivjuk a matrix toString fuggvenyt, ami formazva megjeleniti a matrixunkat
    console.log(`The generated matrix:\n${matrix.toString()}`);
    process.exit(0);
}

main();