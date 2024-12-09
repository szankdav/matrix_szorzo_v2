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
exports.GetRowNumber = void 0;
var state_1 = require("../states/state");
var getColumnNumberState_1 = require("./getColumnNumberState");
var GetRowNumber = /** @class */ (function (_super) {
    __extends(GetRowNumber, _super);
    function GetRowNumber() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GetRowNumber.prototype.getRowNumber = function () {
        var _a;
        console.log("Sorszam:");
        (_a = this.reader) === null || _a === void 0 ? void 0 : _a.transitionTo(new getColumnNumberState_1.GetColumnNumberState());
    };
    GetRowNumber.prototype.getColumnNumber = function () { };
    return GetRowNumber;
}(state_1.State));
exports.GetRowNumber = GetRowNumber;
