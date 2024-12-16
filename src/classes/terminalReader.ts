import * as readline from 'readline';
import * as process from 'process';
import { InputValidate } from './inputValidate';
import { resolve } from 'path';

export class TerminalReader {
    rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    readNumber(question: string): Promise<number> {
        return new Promise((resolve) => {
            let validateResult: number | null;
            this.rl.question(question, (answer) => {
                const validator = new InputValidate();
                validateResult = validator.validateAsNumber(answer);
                if (validateResult == null) {
                    resolve(this.readNumber(question));
                }
                else {
                    resolve(validateResult);
                }
            })
        })
    }

    readLetter(question: string): Promise<string> {
        return new Promise((resolve) => {
            let validateResult: boolean;
            this.rl.question(question, (answer) => {
                const validator = new InputValidate();
                validateResult = validator.validateAsIOrN(answer);
                if (validateResult == false) {
                    resolve(this.readLetter(question));
                }
                else {
                    resolve(answer.toUpperCase());
                }
            })
        })
    }
}