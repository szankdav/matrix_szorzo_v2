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

    public setData(){
        this.data = Array(this.getMatrixRow()).fill(null).map(() => []);
    }

    public setColumn(column: number) {
        this.column = column;
    }

    public toString() {
        for (let i = 0; i < this.data.length; i++) {
            let nums: number[] = [];
            let matrixString: string = "";
            for (let j = 0; j < this.data[i].length; j++) {
                matrixString += `\t${j + 1}. oszlop: `;
                nums.push(this.data[i][j]);
            }
            console.log(matrixString);
            matrixString = "";
            if (i < this.data.length) {
                matrixString += `${i + 1}. sor: `;
                for (let k = 0; k < nums.length; k++) {
                    matrixString += `${nums[k]}\t\t`;
                }
                console.log(matrixString);
                matrixString = "";
            }
        }
    }

    createRandomMatrix() {
        this.row = Math.floor(Math.random() * (10 - 1 + 1) + 1);
        this.setData();
        this.column = Math.floor(Math.random() * (10 - 1 + 1) + 1);
        for (let i = 0; i < this.row; i++) {
            for (let j = 0; j < this.column; j++) {
                this.data[i].push(Math.floor(Math.random() * (100 - (-100) + 1) + (-100)));
            }
        }
    }
}