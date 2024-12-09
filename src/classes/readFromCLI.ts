import * as readline from 'readline';
import * as process from 'process';

export class TerminalReader{
    rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
}