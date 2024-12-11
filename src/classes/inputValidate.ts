export class InputValidate {
    input: string;

    constructor(input: string) {
        this.input = input;
    }

    validateAsNumber(): number | null {
        const num = parseInt(this.input);
        if (this.input.split(" ").length > 1) {
            console.log("Csak egy számot adhat meg!");
            return null;
        } else if (num <= 0) {
            console.log("Csak pozitív számokat adhat meg!");
            return null;
        } else if (isNaN(num)) {
            console.log("Csak számokat adhat meg!");
            return null;
        } else {
            return num;
        }
    }
}