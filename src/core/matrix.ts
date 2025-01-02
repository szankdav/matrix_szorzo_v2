export class Matrix {
    private row: number;
    private column: number;
    private data: number[][];

    constructor() {
        this.row = 0;
        this.column = 0;
        this.data = [[], []];
    }

    public getMatrixData() {
        return this.data;
    }

    public getMatrixRow() {
        return this.row;
    }

    public getMatrixColumn() {
        return this.column;
    }

    public setRow(row: number) {
        this.row = row;
    }

    public setColumn(column: number) {
        this.column = column;
    }

    public toString() {
        for (let i = 0; i < this.data.length; i++) {
            let nums: number [] = [];
            for (let j = 0; j < this.data[i].length; j++) {
                process.stdout.write(`\t${j + 1}. oszlop: `);
                nums.push(this.data[i][j]);
            }
            process.stdout.write('\n');
            if (i < this.data.length) {
                process.stdout.write(`${i + 1}. sor: `);
                for (let k = 0; k < nums.length; k++) {
                    process.stdout.write(`${nums[k]}\t\t`);
                }
                process.stdout.write("\n");
            }
        }
        //return this.data.map(row => row.join(" ")).join("\n");
    }

    setData(matrix: number[][]) {
        this.data = matrix;
    }
}