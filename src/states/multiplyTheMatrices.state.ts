import { Context } from "../core/context";
import { Matrix } from "../core/matrix";
import { TerminalReader } from "../core/terminalReader";
import { State } from "../interfaces/state";
import { ModeState } from "./mode.state";

const MSG = "\nA mátrixok szorzásával létrejött mátrix:";

export class MultiplyTheMatricesState implements State {
    private multipliedMatrix: Matrix;
    private context: Context;
    private terminalReader: TerminalReader;

    constructor(context: Context, terminalReader: TerminalReader) {
        this.context = context;
        this.terminalReader = terminalReader;
        this.multipliedMatrix = new Matrix();
    }

    public asyncTimeout = (ms: number) => {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        })
    }

    async next(): Promise<void | null> {
        this.multipliedMatrix.setRow(this.context.getMatrixA().getMatrixRow());
        this.multipliedMatrix.setData();
        this.multipliedMatrix.setColumn(this.context.getMatrixB().getMatrixColumn());

        for (let i = 0; i < this.multipliedMatrix.getMatrixRow(); i++) {
            for (let j = 0; j < this.multipliedMatrix.getMatrixColumn(); j++) {
                let sum: number = 0;
                let multiply: string[] = [];
                for (let k = 0; k < this.context.getMatrixA().getMatrixData()[0].length; k++) {
                    sum += this.context.getMatrixA().getMatrixData()[i][k] * this.context.getMatrixB().getMatrixData()[k][j];
                    if (process.env.NODE_ENV == "development") {
                        let multiplyText = `${i + 1}. sor ${k + 1}. oszlopérték: [${this.context.getMatrixA().getMatrixData()[i][k]}] szorozva ${k + 1}. sor ${j + 1}. oszlopérték: [${this.context.getMatrixB().getMatrixData()[k][j]}] ---> [${this.context.getMatrixA().getMatrixData()[i][k]} * ${this.context.getMatrixB().getMatrixData()[k][j]}]`;
                        multiply.push(multiplyText);
                        if (k < this.context.getMatrixA().getMatrixData()[0].length - 1) {
                            multiply.push("+");
                            this.terminalReader.displayText(multiply[k]);
                        }
                        else {
                            this.terminalReader.displayText("=");
                        }
                        await this.asyncTimeout(1000);
                    }
                }
                if (process.env.NODE_ENV == "development") {
                    multiply.push(`${sum}`);
                    this.terminalReader.displayText(multiply[multiply.length - 1]);
                    multiply = [];
                }
                this.multipliedMatrix.getMatrixData()[i].push(sum);
            }
        }

        this.terminalReader.displayText(MSG);
        this.multipliedMatrix.toString();

        this.context.setCurrentState(new ModeState(this.context, this.terminalReader));
    }
}