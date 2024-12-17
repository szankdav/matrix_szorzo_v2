export class InputValidate {
    validateAsNumber(input: string): number | null {
        const num = Number(input);
        if (input.split(" ").length > 1) {
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

    validateAsIOrN(input: string): boolean {
        const character = input.toUpperCase();
        if (input.split(" ").length > 1) {
            console.log("Kérem csak 'i' vagy 'n' betűvel válaszoljon!");
            return false;
        } else if (!(character === "I" || character === "N")) {
            console.log("Kérem csak 'i' vagy 'n' betűvel válaszoljon!");
            return false;
        } else {
            return true;
        }
    }

    validateAsRange(input: string): number | null {
        const num = Number(input);
        if (input.split(" ").length > 1) {
            console.log("Csak egy számot adhat meg!");
            return null;
        } else if (isNaN(num)) {
            console.log("Csak számokat adhat meg!");
            return null;
        } else {
            return num;
        }
    }
}