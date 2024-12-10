import { Matrix } from "./classes/Matrix";
import { TerminalReader } from "./classes/readFromCLI";

const main = async () => {
    const reader: TerminalReader = new TerminalReader();
    const matrix: Matrix = new Matrix(reader);
    // let response: null | void;
    // do {
    //     response = await matrix.setNumberForRow();
    // } while (response == null)
    await matrix.setNumberForRow();
    console.log(matrix.row)
    await matrix.setNumberForColumn();
    console.log(matrix.column)
    console.log(`Row: ${matrix.row}, column: ${matrix.column}`)
    process.exit(0);
}

main();