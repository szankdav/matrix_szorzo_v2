export function validateAsNaturalNumber(input: string): boolean {
    const num = Number(input);
    if (input.split(" ").length > 1) {
        console.log("Csak egy számot adhat meg!");
        return false;
    } else if (num <= 0) {
        console.log("Csak pozitív számokat adhat meg!");
        return false;
    } else if (isNaN(num)) {
        console.log("Csak számokat adhat meg!");
        return false;
    } else {
        return true;
    }
}

export function validateAsLetter(input: string): boolean {
    const character = input.toUpperCase();
    if (input.split(" ").length > 1) {
        console.log("Kérem csak 'A' vagy 'M' betűvel válaszoljon!");
        return false;
    } else if (!(character === "A" || character === "M" || character === "K")) {
        console.log("Kérem csak 'A', 'M' vagy 'K' betűvel válaszoljon!");
        return false;
    } else {
        return true;
    }
}

export function validateAsIOrNLetter(input: string): boolean {
    const character = input.toUpperCase();
    if (input.split(" ").length > 1) {
        console.log("Kérem csak 'I' vagy 'N' betűvel válaszoljon!");
        return false;
    } else if (!(character === "I" || character === "N")) {
        console.log("Kérem csak 'I' vagy 'N' betűvel válaszoljon!");
        return false;
    } else {
        return true;
    }
}

export function validateAsWholeNumber(input: string): boolean {
    const num = Number(input);
    if (input.split(" ").length > 1) {
        console.log("Csak egy számot adhat meg!");
        return false;
    } else if (isNaN(num)) {
        console.log("Csak számokat adhat meg!");
        return false;
    } else {
        return true;
    }
}