import { GetRowNumber } from './classes/getRowNumberState';
import { Reader } from './classes/reader';
import { TerminalReader } from './classes/readFromCLI';

const reader = new Reader(new GetRowNumber());
reader.getRowNumberRequest();
reader.getColumnNumberRequest();


// const ask = (question: string): Promise<number> => {
//     const terminalReader = new TerminalReader();
//     return new Promise((resolve) => {
//         terminalReader.rl.question(`${question}`, (answer) => {
//             if (isNaN(parseInt(answer))) {
//                 console.log("Nem jo!");
//                 ask(question);
//             }
//             else if (parseInt(answer) <= 0) {
//                 console.log("Nem jo!");
//                 ask(question);
//             }
//             else {
//                 resolve(parseInt(answer));
//                 terminalReader.rl.close();
//             }
//         })
//     })
// }

// async function main(){
//     const sor = await ask("Sorok szama: ");
//     const row = await ask("Oszlopok szama: ")
//     console.log(sor, row)
// }

// main();
