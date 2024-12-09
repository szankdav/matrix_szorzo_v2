"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TerminalReader = void 0;
var readline = require("readline");
var process = require("process");
var TerminalReader = /** @class */ (function () {
    function TerminalReader() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }
    return TerminalReader;
}());
exports.TerminalReader = TerminalReader;
