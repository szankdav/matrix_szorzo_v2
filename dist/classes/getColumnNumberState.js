"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetColumnNumberState = void 0;
var state_1 = require("../states/state");
var GetColumnNumberState = /** @class */ (function (_super) {
    __extends(GetColumnNumberState, _super);
    function GetColumnNumberState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GetColumnNumberState.prototype.getRowNumber = function () { };
    GetColumnNumberState.prototype.getColumnNumber = function () {
        console.log("Oszlopszam:");
        //this.reader?.transitionTo(new GetRowNumber());
    };
    return GetColumnNumberState;
}(state_1.State));
exports.GetColumnNumberState = GetColumnNumberState;
