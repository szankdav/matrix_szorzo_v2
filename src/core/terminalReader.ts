import * as readlinePromises from 'readline/promises';
import * as process from 'process';

export class TerminalReader {
    rl = readlinePromises.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    async askQuestion(question: string): Promise<string> {
        return await this.rl.question(question);
    }

    displayText(text: string){
        console.log(text);
    }
}